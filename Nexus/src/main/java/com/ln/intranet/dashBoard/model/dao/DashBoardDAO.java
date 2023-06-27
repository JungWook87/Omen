package com.ln.intranet.dashBoard.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.dashBoard.model.vo.AttnDoughnut;

@Repository
public class DashBoardDAO {
	
	@Autowired
	SqlSessionTemplate sqlSession;

	// 근태 도넛 리스트 DAO
	public List<AttnDoughnut> doughnutList(int deptNo) {
		return sqlSession.selectList("dashBoardMapper,doughnutList",deptNo);
	}

}
