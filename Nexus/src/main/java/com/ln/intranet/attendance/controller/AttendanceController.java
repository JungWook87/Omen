package com.ln.intranet.attendance.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.core.tools.picocli.CommandLine.Parameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ln.intranet.attendance.model.service.AttendanceService;
import com.ln.intranet.attendance.model.vo.Attendance;
import com.ln.intranet.member.model.vo.Member;

@Controller
@RequestMapping("/attendance")
@SessionAttributes({"loginMember"})
public class AttendanceController {

	@Autowired
	AttendanceService service;
	
	@GetMapping("/list")
	public String selectAttendanceList(Model model,
									   @ModelAttribute("loginMember") Member loginMember) {
		
		List<Attendance> attendanceList = new ArrayList<Attendance>();
		
		int memNo = loginMember.getMemNo();
		
		attendanceList = service.selectAttendanceList(memNo);
		
		model.addAttribute("attendanceList", attendanceList);
		
		return "attendance/attendance"; 
		
	}
	
	@ResponseBody
	@GetMapping("/attn_hours")
	public int attnHours(Model model,
			@ModelAttribute("loginMember") Member loginMember,
			@RequestParam Map<String, Object> map) {
		
		int memNo = loginMember.getMemNo();
		
		int result = 0;
	
		
		if(map.get("type").equals("start")) {
			result = service.attnStrartHours(map, memNo); 
		}
		
		
		return result;
	}
}
