package com.ln.intranet.work.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/work")
public class WorkController {
	
	// 결재 상신함 페이지 진입
	@GetMapping("workSend")
	public String workSend(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
			
		
		return "/work/work-send";
	}
	
	// 결재 수신함 (결재할것) 페이지 진입
	@GetMapping("workInbox")
	public String workInbox(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
			
		
		return "/work/work-inbox(1)";
	}

	// 결재 수신함 (결재진행중) 페이지 진입
	@GetMapping("workInboxIng")
	public String workIng(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
			
		
		return "/work/work-inbox-ing(2)";
	}
	
	// 결재 수신함 (결재완료) 페이지 진입
	@GetMapping("workInboxEnd")
	public String workEnd(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
			
		
		return "/work/work-inobx-end(3)";
	}
	
	// 결재 임시저장 페이지 진입
	@GetMapping("workTemp")
	public String workTemp(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
			
		
		return "/work/work-temp";
	}
	
	// 결재 템플릿 페이지 진입
	@GetMapping("workTemplate")
	public String workTemplate(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
			
		
		return "/work/work-template";
	}
}
