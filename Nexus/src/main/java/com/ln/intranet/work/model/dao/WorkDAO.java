package com.ln.intranet.work.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.work.model.vo.WorkGeneralList;

@Repository
public class WorkDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 결재 상신 리스트 조회
	public List<WorkGeneralList> workSend(int memNo) {
		return sqlSession.selectList("workMapper.workSendList", memNo);
	}

	// 결재 상신 일자 지정 조회
	public List<WorkGeneralList> workSendSelectDate(Map<String, Object> map) {
		return sqlSession.selectList("workMapper.workSendSelectDate", map);
	}

	// 결재 상신 작성
	public int workWrite(Map<String, Object> map) {
		return sqlSession.insert("workMapper.workWrite", map);
	}
	
}
