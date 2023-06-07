package com.ln.intranet.attendance.model.service;

import java.util.List;
import java.util.Map;

import com.ln.intranet.attendance.model.vo.Attendance;

public interface AttendanceService {

	// 근태 기록 조회
	List<Attendance> selectAttendanceList(int memNo);

	// 출근 시간 입력
	int attnStrartHours(Map<String, Object> map, int memNo);

}
