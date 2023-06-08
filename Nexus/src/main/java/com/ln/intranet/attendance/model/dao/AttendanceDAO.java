package com.ln.intranet.attendance.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.attendance.model.vo.Attendance;

@Repository
public class AttendanceDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;

	// 근태 리스트 조회
	public List<Attendance> selectAttendanceList(int memNo) {
		return sqlSession.selectList("attendanceMapper.selectAttendanceList", memNo);
	}

	// 출근 시간 입력
	public int attnStrartHours(Map<String, Object> map) {
		return sqlSession.insert("attendanceMapper.startHours", map);
	}
	
	// 출근 시작 시간 조회
	public String selectStartTime(Map<String, Object> map) {
		return sqlSession.selectOne("attendanceMapper.selectStartTime", map);
	}

	// 퇴근 시간 입력
	public int attnEndHours(Map<String, Object> map) {
		return sqlSession.update("attendanceMapper.endHours", map);
	}


}
