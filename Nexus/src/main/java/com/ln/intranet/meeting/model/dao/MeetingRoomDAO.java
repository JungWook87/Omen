package com.ln.intranet.meeting.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	// 모든 예약 정보 조회
	public List<MeetingRoom> allReservation() {
		
		return sqlSession.selectList("meetingRoomMapper.reservationList");
	}
	
	// 회의실 예약 후 예약 정보 반환
	public MeetingRoom reservationRoom(MeetingRoom meetingRoom) {
		
		int resultNo = sqlSession.insert("meetingRoomMapper.reservationRoom",meetingRoom);
		
		MeetingRoom result = new MeetingRoom();
		
		result = null;
		
		if(resultNo > 0) {
			result = sqlSession.selectOne("meetingRoomMapper.returnResult",resultNo);
		} 
		
		logger.info("result : " + result);
		
		return result;
	}



}
