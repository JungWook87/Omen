package com.ln.intranet.meeting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/meetingRoom")
public class MeetingRoomController {

	@GetMapping("reservation")
	public String meetingRoomEntry() {
		
		
		
		
		return "/meetingRoom/meetingRoom";
	}
	
   @GetMapping("/reservationRoom")
   @ResponseBody
   public String reservationRoom(
		   
		   @RequestParam("room") String room, 
		   @RequestParam("time") String time
		    ) {
	  
	  
        return null;
   }
}


