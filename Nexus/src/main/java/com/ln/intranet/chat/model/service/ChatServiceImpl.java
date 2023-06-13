package com.ln.intranet.chat.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.chat.model.dao.ChatDAO;

@Service
public class ChatServiceImpl implements ChatService{

	@Autowired
	private ChatDAO dao;
}
