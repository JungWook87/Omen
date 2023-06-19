package com.ln.intranet.meeting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MeetingRoomController {

	@RequestMapping("/meetingRoom")
	public String meetingRoomEntry() {
		
		
		return "/meetingRoom/meetingRoom";
	}

}
