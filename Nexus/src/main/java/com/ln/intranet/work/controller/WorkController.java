package com.ln.intranet.work.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.ln.intranet.member.model.vo.Member;
import com.ln.intranet.work.model.service.WorkService;
import com.ln.intranet.work.model.vo.WorkGeneralList;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/work")
public class WorkController {
	
	@Autowired
	WorkService service;
	
	
	// 결재 상신함 페이지 진입
	@GetMapping("/workSend")
	public String workSend(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
		
		
		List<WorkGeneralList> list = service.workSend(loginMember.getMemNo());
		
		model.addAttribute("list", list);
		
		return "/work/work-send";
	}
	
	// 결재 상신함 페이지 일정 지정
	@ResponseBody
	@GetMapping("/workSendSelectDate")
	public String workSendSelectDate(@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
									Model model,
									@ModelAttribute("loginMember") Member loginMember,
									@RequestParam Map<String, Object> map) {
		
		System.out.println(map.get("start"));
		System.out.println(map.get("end"));
		
		map.put("memNo", loginMember.getMemNo());
		
		List<WorkGeneralList> list = service.workSendSelectDate(map);
		
		Gson gson = new Gson();
		
		gson.toJson(list);
		
		return gson.toJson(list);
	}
	
	// 결재 상신 작성
	@ResponseBody
	@PostMapping("/workSend/write")
	public String workWrite(@ModelAttribute("loginMember") Member loginMember,
			@RequestParam Map<String, Object> map) {
		
		map.put("memNo", loginMember.getMemNo());
		
		Map<String, Object> resultMap = null;
		
		// type == 결재 타입(일반, 연차, 출장 ..)
		// 연차 attnType = 4 // workType = 2
		// 출장 attnType = 5 // workType = 3
		int type = Integer.parseInt(map.get("typeNo").toString());
		
		System.out.println(map.get("uploadsFile"));
		
		if(type == 1) {
			
			resultMap = service.workWrite(map);
			
		} else if(type == 2 || type ==3) {
			
		}
		
		Gson gson = new Gson();
		
		return gson.toJson(resultMap);
	}
	
	// 결재 수신함 (결재할것) 페이지 진입
	@GetMapping("/workInbox")
	public String workInbox(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-inbox(1)";
	}

	// 결재 수신함 (결재진행중) 페이지 진입
	@GetMapping("/workInboxIng")
	public String workIng(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-inbox-ing(2)";
	}
	
	// 결재 수신함 (결재완료) 페이지 진입
	@GetMapping("/workInboxEnd")
	public String workEnd(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-inobx-end(3)";
	}
	
	// 결재 임시저장 페이지 진입
	@GetMapping("/workTemp")
	public String workTemp(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-temp";
	}
	
	// 결재 템플릿 페이지 진입
	@GetMapping("/workTemplate")
	public String workTemplate(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-template";
	}
	
	
	
	
	
	
}
