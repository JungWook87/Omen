package com.ln.intranet.attendance.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.ln.intranet.attendance.model.service.AttendanceService;

@Controller
public class AttendanceController {

	@Autowired
	AttendanceService service;
}
