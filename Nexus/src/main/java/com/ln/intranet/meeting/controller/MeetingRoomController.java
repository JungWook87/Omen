package com.ln.intranet.meeting.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.google.gson.Gson;
import com.ln.intranet.meeting.model.service.MeetingRoomService;
import com.ln.intranet.meeting.model.vo.MeetingRoom;
import com.ln.intranet.member.model.vo.Member;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/meetingRoom")
public class MeetingRoomController {
	
	@Autowired
	private MeetingRoomService service;
	
	private Logger logger = LoggerFactory.getLogger(MeetingRoomController.class);
	
	
	@GetMapping("reservation")
	public String meetingRoomEntry() {
		

		return "/meetingRoom/meetingRoom";
	}
	
   @GetMapping("/reservationRoom")
   @ResponseBody
   public String reservationRoom(
		   @RequestParam("room") int roomNo, 
		   @RequestParam("time") String time,
		   @RequestParam("reservationDate") String reservationDate,
		   @ModelAttribute("loginMember") Member loginMember
		    ) {
	   
	   MeetingRoom meetingRoom = new MeetingRoom();
	 
	   meetingRoom.setRoomNo(roomNo);
	   meetingRoom.setReservationTime(time);
	   meetingRoom.setMemNo(loginMember.getMemNo());
	   meetingRoom.setReservationDate(reservationDate);
	  
	   MeetingRoom result = new MeetingRoom();
	   
	   result = service.reservationRoom(meetingRoom);
       
	   return new Gson().toJson(result);
   }
   
   @ResponseBody
   @GetMapping("allReservation")
   public List<MeetingRoom> allReservation(){
	   
	   List<MeetingRoom> resvList = new ArrayList<MeetingRoom>();
	   
	   resvList = service.allReservation();
	   
	   return resvList;
   }
   
}


