package com.ln.intranet.dashBoard.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.dashBoard.model.vo.AttnDoughnut;
import com.ln.intranet.dashBoard.model.vo.DeptTeam;
import com.ln.intranet.dashBoard.model.vo.HumanResourceManage;

@Repository
public class DashBoardDAO {
	
	@Autowired
	SqlSessionTemplate sqlSession;

	// 근태 도넛 리스트 DAO
	public List<AttnDoughnut> doughnutList(int deptNo) {
		return sqlSession.selectList("dashBoardMapper.doughnutList",deptNo);
	}

	// 인적 자원 정보 DAO
	public List<HumanResourceManage> hrList(int deptNo) {
		return sqlSession.selectList("dashBoardMapper.hrList",deptNo);
	}

	// 단순 팀부서 정보 DAO
	public List<DeptTeam> dtList(int deptNo) {
		return sqlSession.selectList("dashBoardMapper.dtList",deptNo);
	}

}
