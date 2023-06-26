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
import com.ln.intranet.work.model.vo.ApprovalMember;
import com.ln.intranet.work.model.vo.WorkDetail;
import com.ln.intranet.work.model.vo.WorkGeneralList;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/work")
public class WorkController {
	
	@Autowired
	WorkService service;
	
	
	// 寃곗옱 �긽�떊�븿 �럹�씠吏� 吏꾩엯
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
	
	
	// 寃곗옱 �긽�떊�븿 �럹�씠吏� �씪�젙 吏��젙
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
	
	// 寃곗옱 �뵒�뀒�씪 議고쉶
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
		return "";
	}
	
	// 寃곗옱 痍⑥냼
	@ResponseBody
	@GetMapping("/workCancle")
	public int workCancle(@RequestParam("workNo") int workNo) {
		System.out.println(workNo);
		
		int result = service.workCancle(workNo);
		
		return result;
	}
	
	
	
	
	
	// 寃곗옱 �긽�떊 �옉�꽦(�씪諛섍껐�옱)
	@PostMapping("/write")
	public String workWrite(@ModelAttribute("loginMember") Member loginMember,
			@RequestParam("file-uploads") MultipartFile uploadFile,
			@RequestParam Map<String, Object> map,
			HttpServletRequest req,
			RedirectAttributes ra) {
		
		map.put("memNo", loginMember.getMemNo());
		
		String workTypeWord = map.get("workTypeWord").toString();
		int typeNo = 0;
		
		// type == 寃곗옱 ���엯(�씪諛�, �뿰李�, 異쒖옣 ..)
		// �뿰李� attnType = 4 // workType = 2
		// 異쒖옣 attnType = 5 // workType = 3 
		if(workTypeWord.equals("normal-check")) typeNo = 1;
		else if(workTypeWord.equals("vacation")) typeNo = 2;
		else if(workTypeWord.equals("business-trip")) typeNo = 3;
		else if(workTypeWord.equals("project")) typeNo = 4;
		else if(workTypeWord.equals("project-task")) typeNo = 5;
		
		map.put("typeNo", typeNo);
	
		int result = service.workWrite(map, uploadFile, req);
		
		String message = "";
		if(result != 0) message = "�꽦怨�";
		else message = "�떎�뙣";
		
		ra.addFlashAttribute("message", message);
		
		return "redirect:workSend";
	}
	
	// 寃곗옱�옄 紐⑤떖李�
	@ResponseBody
	@GetMapping("/approvalMember")
	public String approvalMember() {
		
		List <ApprovalMember> approvalMemberList = service.approvalMember();
		
		Gson gson = new Gson();
		
		return gson.toJson(approvalMemberList);
	}
	
	
	// 寃곗옱 �닔�떊�븿 (寃곗옱�븷寃�) �럹�씠吏� 吏꾩엯
	@GetMapping("/workInbox")
	public String workInbox(Model model,
			@ModelAttribute("loginMember") Member loginMember) {
			
		List <WorkGeneralList> list = service.workInbox(loginMember.getMemNo());
		
		model.addAttribute("list", list);
		
		return "/work/work-inbox(1)";
	}

	// 寃곗옱 �닔�떊�븿 (寃곗옱吏꾪뻾以�) �럹�씠吏� 吏꾩엯
	@GetMapping("/workInboxIng")
	public String workIng(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
		
		
		
		return "/work/work-inbox-ing(2)";
	}
	
	// 寃곗옱 �닔�떊�븿 (寃곗옱�셿猷�) �럹�씠吏� 吏꾩엯
	@GetMapping("/workInboxEnd")
	public String workEnd(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-inobx-end(3)";
	}
	
	// 寃곗옱 �엫�떆���옣 �럹�씠吏� 吏꾩엯
	@GetMapping("/workTemp")
	public String workTemp(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
			
		
		return "/work/work-temp";
	}
	
	// 寃곗옱 �뀥�뵆由� �럹�씠吏� 吏꾩엯
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
