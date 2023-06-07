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

	public List<Attendance> selectAttendanceList(int memNo) {
		return sqlSession.selectList("attendanceMapper.selectAttendanceList", memNo);
	}

	public int attnStrartHours(Map<String, Object> map, int memNo) {
		return sqlSession.insert("attendanceMapper.startHours", memNo);
	}
}
