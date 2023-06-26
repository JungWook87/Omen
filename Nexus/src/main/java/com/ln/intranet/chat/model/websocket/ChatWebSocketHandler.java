package com.ln.intranet.chat.model.websocket;

import java.sql.Date;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ln.intranet.chat.model.service.ChatService;
import com.ln.intranet.chat.model.vo.Message;


public class ChatWebSocketHandler extends TextWebSocketHandler {
	
	@Autowired
	private ChatService service;
	
	
	private Set<WebSocketSession> sessions
	= Collections.synchronizedSet(new HashSet<WebSocketSession>());
	
	
	// afterConnectionEstablished가 자동으로 다시 수행되기 때문에 페이지를 이동해도 결론적으론 session에 남아잇음
	// 클라이언트와 연결이 완료되고, 통신할 준비가 되면 수행
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
			
		System.out.println("Websocket MemberID : " + session.getId() + " Connected");		
			
		sessions.add(session);
		
		session.sendMessage(new TextMessage("연결이 성립되었습니다."));
	}
	
	

	// 클라이언트로부터 텍스트 메세지를 전달 받았을 때 수행
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("전달된 메시지 : " + message.getPayload());
		
				
		ObjectMapper objectMapper = new ObjectMapper();
				
		Message chatMessage = objectMapper.readValue(message.getPayload(), Message.class);
				
		chatMessage.setMDate(new Date(System.currentTimeMillis()));
				
		System.out.println(chatMessage);
		
		
		
		
		int result = service.insertMessage(chatMessage);
			
		if(result > 0) {
					
			// 같은 방에 접속 중인 클라이언트에게만 메세지 보내기
			// -> Set<WebSocketSession>에서 같은방 클라이언트만 골라내기
					
			for(WebSocketSession s : sessions) {
				
				Map<String, Object> attributes = session.getAttributes();
				System.out.println(attributes);
				
					
				// WebSocketSession == HttpSession(로그인정보, 채팅방번호)을 가로챈 것
				int chatRoomNo = (Integer)s.getAttributes().get("cmNo");
					
				// WebSocketSession에 담겨있는 채팅방번호와
				// 메시지에 담겨있는 채팅방 번호가 같을경우
				// 같은방 클라이언트다.				
				if(chatRoomNo == chatMessage.getCmNo())  {
					
					// 같은방 클라이언트에게 JSON형식 메시지를 보냄
					s.sendMessage(new TextMessage(new Gson().toJson(chatMessage)));
					
				
						
				}
					
			}
		}
	}


	// 클라이언트와 연결이 종료되는 수행
		@Override
		public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
			
			sessions.remove(session);
			// 웹소켓 연결이 종료되는 경우
			// 종료된 WebSocketSession을 Set에서 제거
			
		}
	
	
}