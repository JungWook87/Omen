package com.ln.intranet.member.model.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ln.intranet.member.model.dao.MemberDAO;
import com.ln.intranet.member.model.vo.Member;

@Service
public class MemberServiceImpl implements MemberService {
	
	@Autowired
	private MemberDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	private Logger logger = LoggerFactory.getLogger(MemberServiceImpl.class);
	
	// 로그인서비스
	@Override
	public Member login(Member inputMember) {
		
		
		logger.info(inputMember.getMemPw()+"/"+bcrypt.encode(inputMember.getMemPw()));
		
		Member loginMember = dao.login(inputMember);
		
		//logger.info("아이디:" + loginMember.getMemId());
		
		if(loginMember != null) { 	
			
			if( bcrypt.matches(inputMember.getMemPw(),loginMember.getMemPw())) {
				loginMember.setMemPw(null); 
			} else { 
				loginMember = null;
			}	
		}
		
		return loginMember;
	}

}
