package com.ln.intranet.chat.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.chat.model.dao.ChatDAO;
import com.ln.intranet.chat.model.vo.ChatRoom;
import com.ln.intranet.chat.model.vo.ChatRoomJoin;
import com.ln.intranet.chat.model.vo.Message;
import com.ln.intranet.common.Util;
import com.ln.intranet.member.model.vo.Member;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatDAO dao;

	// 해당된 채팅방 리스트 조회
	@Override
	public List<ChatRoom> selectChatRoomList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.selectChatRoomList(map);
	}

	// 해당된 채팅 메세지 리스트
	@Override
	public List<Message> selectChatMessageList(int cmNo) {
		// TODO Auto-generated method stub
		return dao.selectChatMessageList(cmNo);
	}


	// 채팅방 개설 & 선택된 사원 초대
	@Override
	public int inviteMember(Map<String, Object> paramMap, ChatRoomJoin join) {
		
		int result = dao.CreateChatRoom(join);
		
		if(result > 0) {
			
			paramMap.put("cmNo", result);
			
			dao.inviteMember(paramMap);
			
		}
		return result;

		
	}
	
	// websocket 채팅 저장
	@Override
	public int insertMessage(Message chatMessage) {
		chatMessage.setMContent(Util.newLineHandling(chatMessage.getMContent()));
		return dao.insertMessage(chatMessage);
	}





















}
