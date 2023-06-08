package com.ln.intranet.dept.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.common.model.vo.Pagination;
import com.ln.intranet.dept.model.dao.DeptDAO;
import com.ln.intranet.dept.model.vo.Board;


@Service
public class DeptServiceImpl implements DeptService{
	
	@Autowired
	private DeptDAO dao;

	
	/** 부서 게시판 글목록 조회 서비스
	 *
	 */
	@Override
	public Map<String, Object> boardList(int cp, int deptNo) {
		
		int totalCount = dao.totalCount(deptNo);
		
		Pagination pagination = new Pagination(cp, totalCount);
		
		List<Board> boardList = dao.boardList(pagination,deptNo);
		
		Map<String,Object> map = new HashMap<String,Object>();
		
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
		return map;
	}

}
