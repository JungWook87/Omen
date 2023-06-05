package com.ln.intranet.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.member.model.vo.Member;

@Repository
public class MemberDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 로그인DAO
	public Member login(Member inputMember) {

		return sqlSession.selectOne("memberMapper.login",inputMember);
	}

}
