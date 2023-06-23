package com.ln.intranet.member.model.service;

import java.util.List;
import java.util.Map;

import com.ln.intranet.member.model.vo.Member;

// 로그인서비스
public interface MemberService {

	Member login(Member inputMember);
	
	List<Member> selectChatMemberList();

	int changePw(Map<String, Object> paramMap);

	// 직원 추가
	int signUp(Member member);

	// 직원 검색
	Member searchMember(int memNo);



	

}
