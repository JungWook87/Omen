package com.ln.intranet.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.member.model.vo.Member;

@Repository
public class MemberDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	private Logger logger = LoggerFactory.getLogger(MemberDAO.class);
	
	// 로그인DAO
	public Member login(Member inputMember) {
		
		Member loginMember = sqlSession.selectOne("memberMapper.login",inputMember);
		
		return loginMember;
	}

}
