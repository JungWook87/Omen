package com.ln.intranet.member.model.service;

import java.util.List;

import com.ln.intranet.member.model.vo.Member;

// 로그인서비스
public interface MemberService {

	Member login(Member inputMember);
	
	List<Member> selectChatMemberList();

}
