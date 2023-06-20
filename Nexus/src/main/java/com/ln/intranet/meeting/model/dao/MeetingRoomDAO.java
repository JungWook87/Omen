package com.ln.intranet.meeting.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.meeting.model.vo.MeetingRoom;

@Repository
public class MeetingRoomDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	private Logger logger = LoggerFactory.getLogger(MeetingRoomDAO.class);
	
	public MeetingRoom reservationRoom(MeetingRoom meetingRoom) {
		
		int resultNo = sqlSession.insert("meetingRoomMapper.reservationRoom",meetingRoom);
		
		MeetingRoom result = new MeetingRoom();
		
		if(resultNo > 0) {
			result = sqlSession.selectOne("meetingRoomMapper.returnResult",resultNo);
		}
		
		return result;
	}

}
