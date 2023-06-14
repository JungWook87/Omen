package com.ln.intranet.chat.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.chat.model.dao.ChatDAO;
import com.ln.intranet.chat.model.vo.Message;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatDAO dao;

	@Override
	public int insertMessage(Message chatMessage) {
		// TODO Auto-generated method stub
		return 0;
	}
}
