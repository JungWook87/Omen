package com.ln.intranet.attendance.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.attendance.model.dao.AttendanceDAO;
import com.ln.intranet.attendance.model.vo.Attendance;

@Service
public class AttendanceServiceImp implements AttendanceService {

	@Autowired
	AttendanceDAO dao;
	
	// 근태 리스트 조회
	@Override
	public List<Attendance> selectAttendanceList(int memNo) {
		
		return dao.selectAttendanceList(memNo);
	}
	
	// 출근 시간 입력
	@Override
	public int attnStrartHours(Map<String, Object> map, int memNo) {
		
		return dao.attnStrartHours(map, memNo);
	}
	
	 
}
