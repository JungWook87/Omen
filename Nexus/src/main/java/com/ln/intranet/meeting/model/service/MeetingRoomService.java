package com.ln.intranet.meeting.model.service;

import java.util.List;
import java.util.Map;

import com.ln.intranet.meeting.model.vo.MeetingRoom;

public interface MeetingRoomService {

	int reservationRoom(MeetingRoom meetingRoom);

	List<MeetingRoom> allReservation();

}
