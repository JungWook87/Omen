package com.ln.intranet.chat.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.chat.model.vo.ChatRoom;

@Repository
public class ChatDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<ChatRoom> selectChatRoomList(Map<String, Object> map) {
		
		return sqlSession.selectList("chatMapper.selectChatRoomList" , map);
	}
	
	

}
