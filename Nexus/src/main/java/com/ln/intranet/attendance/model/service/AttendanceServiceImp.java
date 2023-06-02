package com.ln.intranet.attendance.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.attendance.model.dao.AttendanceDAO;

@Service
public class AttendanceServiceImp implements AttendanceService {

	@Autowired
	AttendanceDAO dao;
}
