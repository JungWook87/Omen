package com.ln.intranet.attendance.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ln.intranet.attendance.model.service.AttendanceService;
import com.ln.intranet.attendance.model.vo.Attendance;

@Controller
public class AttendanceController {

	@Autowired
	AttendanceService service;
	
	@RequestMapping("/attendance")
	public String selectAttendanceList(Model model) {
		
		List<Attendance> attendanceList = new ArrayList<Attendance>();
		
		int memNo = 4;
		
		attendanceList = service.selectAttendanceList(memNo);
		
		model.addAttribute("attendanceList", attendanceList);
		
		return "attendance/attendance"; 
		
	}
}
