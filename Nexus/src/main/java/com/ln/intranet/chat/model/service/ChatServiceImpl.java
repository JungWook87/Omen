package com.ln.intranet.chat.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.chat.model.dao.ChatDAO;
import com.ln.intranet.chat.model.vo.ChatRoom;
import com.ln.intranet.chat.model.vo.Message;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatDAO dao;


	@Override
	public List<ChatRoom> selectChatRoomList(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return dao.selectChatRoomList(map);
	}

	
	

	@Override
	public List<Message> selectChatMessageList(int chatRoomNo) {
		
		return null;
	}

	
	
	
	
	
	
	
	
	
	

	@Override
	public int insertMessage(Message chatMessage) {
		// TODO Auto-generated method stub
		return 0;
	}


















}
