package com.ln.intranet.main.model.service;

import java.util.List;

import com.ln.intranet.member.model.vo.Member;

public interface MainService {

	// 공지사항 조회
	List noticeSelect(Member loginMember);

}
