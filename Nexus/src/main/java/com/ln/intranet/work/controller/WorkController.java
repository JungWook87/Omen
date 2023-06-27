package com.ln.intranet.work.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.ln.intranet.work.model.service.WorkServiceImp;
import com.ln.intranet.work.model.vo.ApprovalMember;
import com.ln.intranet.work.model.vo.WorkDetail;
import com.ln.intranet.work.model.vo.WorkGeneralList;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/work")
public class WorkController {
	
	@Autowired
	WorkService service;
	
	private Logger logger = LoggerFactory.getLogger(WorkController.class);
	
	
	// 결재 상신 리스트 조회
	@GetMapping("/workSend")
	public String workSend(Model model,
			@ModelAttribute("loginMember") Member loginMember,
			RedirectAttributes ra) {
		
		List<WorkGeneralList> list = service.workSend(loginMember.getMemNo());
		List<WorkGeneralList> projectList = service.projectSendList(loginMember.getMemNo());
		List<WorkGeneralList> taskList = service.taskSendList(loginMember.getMemNo());
		
		model.addAttribute("list", list);
		model.addAttribute("projectList", projectList);
		model.addAttribute("taskList", taskList);
		
		String messageFlag = null;
		
		if(ra != null) {
			messageFlag = (String)model.getAttribute("message");
			model.addAttribute("messageFlag", messageFlag);
		}
		
		return "/work/work-send";
	}
	
	
	// 결재 상신 날짜 지정
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
	
	// 결재 디테일 조회
	@ResponseBody
	@GetMapping("/detail")
	public String detailSelect(@RequestParam("workNo") int workNo) {
		
		WorkDetail detailSelect = service.detailSelect(workNo);
		
		Gson gson = new Gson();
		
		return gson.toJson(detailSelect);
	}
	
	// 반려 / 승인
	@PostMapping("/clickApproval")
	public String clickApproval(@RequestParam Map<String, Object> map,
								Model model) {
		System.out.println(map);
		
		int result = service.clickApproval(map);
		
		return "";
	}
	
	// 결재 취소
	@ResponseBody
	@GetMapping("/workCancle")
	public int workCancle(@RequestParam("workNo") int workNo) {
		System.out.println(workNo);
		
		int result = service.workCancle(workNo);
		
		return result;
	}
	
	// 결재 상신 작성 (일반 결재)
	@PostMapping("/write")
	public String workWrite(@ModelAttribute("loginMember") Member loginMember,
			@RequestParam("file-uploads") MultipartFile uploadFile,
			@RequestParam Map<String, Object> map,
			@RequestParam("taskTitle") List<String> taskTitleList,
			HttpServletRequest req,
			RedirectAttributes ra) {
		
		map.put("memNo", loginMember.getMemNo());
		map.put("deptNo",loginMember.getDeptNo());
		
		logger.info("프로젝트/과제 부서입력용 로거 : " + (Integer)map.get("deptNo") );
		
		String workTypeWord = map.get("workTypeWord").toString();
		int typeNo = 0;
		

		if(workTypeWord.equals("normal-check")) typeNo = 1;
		else if(workTypeWord.equals("vacation")) typeNo = 2;
		else if(workTypeWord.equals("business-trip")) typeNo = 3;
		else if(workTypeWord.equals("project")) typeNo = 4;
		else if(workTypeWord.equals("project-task")) typeNo = 5;
		
		map.put("typeNo", typeNo);
	
		int result = service.workWrite(map, uploadFile, req, taskTitleList);
		
		String message = "";
		if(result != 0) message = "성공";
		else message = "실패";
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:workSend";
	}
	
	// 결재자 모달창
	@ResponseBody
	@GetMapping("/approvalMember")
	public String approvalMember() {
		
		List <ApprovalMember> approvalMemberList = service.approvalMember();
		
		Gson gson = new Gson();
		
		return gson.toJson(approvalMemberList);
	}
	
	
	// 결재 수신함 - 결재할 문서
	@GetMapping("/workInbox")
	public String workInbox(Model model,
			@ModelAttribute("loginMember") Member loginMember) {
			
		List <WorkGeneralList> list = service.workInbox(loginMember.getMemNo());
		
		model.addAttribute("list", list);
		
		return "/work/work-inbox(1)";
	}

	// 결재 수신함 - 결재 진행 중
	@GetMapping("/workInboxIng")
	public String workIng(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
		
		return "/work/work-inbox-ing(2)";
	}
	
	// 결재 수신함 - 결재 완료
	@GetMapping("/workInboxEnd")
	public String workEnd(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-inobx-end(3)";
	}
	
	// 결재 임시 보관함
	@GetMapping("/workTemp")
	public String workTemp(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-temp";
	}
	
	// 결재 템플렛
	@GetMapping("/workTemplate")
	public String workTemplate(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-template";
	}
	
	
	
	

	// ----------------------------------------------------------------------------------------------
	// ----------------------------------       �봽濡쒖젥�듃      -----------------------------------------------
	// ----------------------------------------------------------------------------------------------	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
