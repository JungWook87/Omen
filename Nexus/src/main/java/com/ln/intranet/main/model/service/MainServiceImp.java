package com.ln.intranet.main.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.main.model.dao.MainDAO;
import com.ln.intranet.member.model.vo.Member;

@Service
public class MainServiceImp implements MainService{

	@Autowired
	MainDAO dao;
	
	// 공지사항 조회
	@Override
	public List noticeSelect(Member loginMember) {
		return dao.noticeSelect(loginMember);
	}
	
	
	
}
