package com.ln.intranet.dept.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.common.model.vo.Pagination;
import com.ln.intranet.dept.model.vo.Board;


@Repository
public class DeptDAO {

	private Logger logger = LoggerFactory.getLogger(DeptDAO.class);
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	// 부서 게시판 글 개수 총합
	public int totalCount(int deptNo) {
		return sqlSession.selectOne("deptMapper.totalCount",deptNo);
	}
	
	// 부서 게시판 목록 조회
	public List<Board> boardList(Pagination pagination, int deptNo) {
		

		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset,pagination.getLimit());
		
		return sqlSession.selectList("deptMapper.selectPublicNoticeList",deptNo,rowBounds);
	}

	
	
}
