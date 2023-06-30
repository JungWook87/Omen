package com.ln.intranet.main.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.member.model.vo.Member;

@Repository
public class MainDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	// 공지사항 조회
	public List noticeSelect(Member loginMember) {
		List notice = new ArrayList();
		
		notice = sqlSession.selectList("mainMapper.noticeSelect", loginMember);
				
		return notice;
	}

}
