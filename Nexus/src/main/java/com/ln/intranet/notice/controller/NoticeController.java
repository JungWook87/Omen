package com.ln.intranet.notice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ln.intranet.notice.model.service.NoticeService;
import com.ln.intranet.notice.model.vo.Notice;

import lombok.extern.slf4j.Slf4j;

@RequestMapping("/notice")
@Slf4j
@Controller
public class NoticeController {

	@Autowired
	private NoticeService service;
	
	@GetMapping("/deptNoticeList")
	public String selectNoticeList(@ModelAttribute("loginMember") Member loginMember) {
		
		int deptCode = loginMember.getDeptCode;
		
		List<Notice> noticeList = service.selectNoticeList(deptCode);
		
		log.debug(noticeList + "");
		
		return "/noticeList";
	}

	@GetMapping("/noticeList")
	public String selectNoticeList2() {
		
		List<Notice> noticeList2 = service.selectNoticeList2();
		
		return "";
	}
	
	
}
