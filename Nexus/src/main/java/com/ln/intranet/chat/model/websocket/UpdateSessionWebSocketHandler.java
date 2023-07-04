package com.ln.intranet.chat.model.websocket;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ln.intranet.chat.model.vo.Message;


public class UpdateSessionWebSocketHandler extends TextWebSocketHandler {
	
	private Set<WebSocketSession> sessions
	= Collections.synchronizedSet(new HashSet<WebSocketSession>());
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
	    System.out.println("session Update socketID: " + session.getId() + " Connected");
	    synchronized (sessions) {
	    	
	        sessions.add(session);
	    }
	}

	
	
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	    ObjectMapper objectMapper = new ObjectMapper();
	    Message sessionMessage = objectMapper.readValue(message.getPayload(), Message.class);
	    
	    int cmNo = sessionMessage.getCmNo();
	    
	    HttpSession httpSession = (HttpSession) session.getAttributes().get("cmNo");
	    
	    // 세션 업데이트
	    System.out.println("cmNo매우매애욷러ㅠㅈㄷ륮뎌ㅠㄹㅈㄷ" + cmNo);
	    httpSession.setAttribute("cmNo", cmNo);
	    
	    System.out.println("매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우매우 잘 작동중임");
	}


	
	// 클라이언트와 연결이 종료되는 수행
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		
		sessions.remove(session);
		// 웹소켓 연결이 종료되는 경우
		// 종료된 WebSocketSession을 Set에서 제거
		
	}

}
