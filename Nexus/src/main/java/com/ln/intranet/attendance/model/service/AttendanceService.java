package com.ln.intranet.attendance.model.service;

import java.util.List;

import com.ln.intranet.attendance.model.vo.Attendance;

public interface AttendanceService {

	// 근태 기록 조회
	List<Attendance> selectAttendanceList();

}
