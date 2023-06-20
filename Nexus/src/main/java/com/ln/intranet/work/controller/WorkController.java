package com.ln.intranet.work.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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
	public String workSend(Model model,
			@ModelAttribute("loginMember") Member loginMember,
			RedirectAttributes ra) {
		
		
		List<WorkGeneralList> list = service.workSend(loginMember.getMemNo());
		
		model.addAttribute("list", list);
		
		String messageFlag = null;
		
		if(ra != null) {
			messageFlag = (String)model.getAttribute("message");
		}
		
		model.addAttribute("messageFlag", messageFlag);
		
		
		return "/work/work-send";
	}
	
	
	// 결재 상신함 페이지 일정 지정
	@ResponseBody
	@GetMapping("/workSendSelectDate")
	public String workSendSelectDate(Model model,
									@ModelAttribute("loginMember") Member loginMember,
									@RequestParam Map<String, Object> map) {
		
		
		map.put("memNo", loginMember.getMemNo());
		
		List<WorkGeneralList> list = service.workSendSelectDate(map);
		
		Gson gson = new Gson();
		
		gson.toJson(list);
		
		return gson.toJson(list);
	}
	
	
	// 결재 상신 작성
	@PostMapping("/write")
	public String workWrite(@ModelAttribute("loginMember") Member loginMember,
			@RequestParam("file-uploads") MultipartFile uploadFile,
			@RequestParam Map<String, Object> map,
			HttpServletRequest req,
			RedirectAttributes ra) {
		
		map.put("memNo", loginMember.getMemNo());
		
		String workTypeWord = map.get("workTypeWord").toString();
		int typeNo = 0;
		
		// type == 결재 타입(일반, 연차, 출장 ..)
		// 연차 attnType = 4 // workType = 2
		// 출장 attnType = 5 // workType = 3 
		if(workTypeWord.equals("normal-check")) typeNo = 1;
		else if(workTypeWord.equals("vacation")) typeNo = 2;
		else if(workTypeWord.equals("business-trip")) typeNo = 3;
		
		map.put("typeNo", typeNo);
	
		int result = service.workWrite(map, uploadFile, req);
		
		String message = "";
		if(result != 0) message = "성공";
		else message = "실패";
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:workSend";
	}
	
	
	
	// 결재 수신함 (결재할것) 페이지 진입
	@GetMapping("/workInbox")
	public String workInbox(Model model,
			@ModelAttribute("loginMember") Member loginMember) {
			
		List <WorkGeneralList> list = service.workInbox(loginMember.getMemNo());
		
		model.addAttribute("list", list);
		
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
