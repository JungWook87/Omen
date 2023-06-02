package com.ln.intranet.attendance.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.ln.intranet.attendance.model.service.AttendanceService;
import com.ln.intranet.attendance.model.vo.Attendance;

@Controller
public class AttendanceController {

	@Autowired
	AttendanceService service;
	
	public void selectAttendanceList() {
		
		List<Attendance> attendanceList = new ArrayList<Attendance>();
		
		attendanceList = service.selectAttendanceList();
	}
}
