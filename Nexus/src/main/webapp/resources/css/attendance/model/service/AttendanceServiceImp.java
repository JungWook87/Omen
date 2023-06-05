package com.ln.intranet.attendance.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.attendance.model.dao.AttendanceDAO;
import com.ln.intranet.attendance.model.vo.Attendance;

@Service
public class AttendanceServiceImp implements AttendanceService {

	@Autowired
	AttendanceDAO dao;
	
	@Override
	public List<Attendance> selectAttendanceList(int memNo) {
		
		return dao.selectAttendanceList(memNo);
	}
}
