package com.ln.intranet.meeting.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.meeting.model.dao.MeetingRoomDAO;
import com.ln.intranet.meeting.model.vo.MeetingRoom;

@Service
public class MeetingRoomServiceImpl implements MeetingRoomService{
	
	@Autowired
	private MeetingRoomDAO dao;
	
	// 회의실 예약 
	@Override
	public MeetingRoom reservationRoom(MeetingRoom meetingRoom) {
		
		return dao.reservationRoom(meetingRoom);
	}

}
