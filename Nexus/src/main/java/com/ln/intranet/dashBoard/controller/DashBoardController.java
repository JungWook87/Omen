package com.ln.intranet.dashBoard.controller;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ln.intranet.dashBoard.model.service.DashBoardService;
import com.ln.intranet.dashBoard.model.vo.AttnDoughnut;
import com.ln.intranet.dashBoard.model.vo.HumanResourceManage;
import com.ln.intranet.member.model.vo.Member;

import lombok.extern.slf4j.Slf4j;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/dashBoard")
@Slf4j
public class DashBoardController {
	
	@Autowired
	DashBoardService service;

	// 대쉬보드 진입 컨트롤러 
	// ++ 프로그래스 동작 정보 
	@GetMapping("/dashBoardMain")
	public String dashBoardViewer(
			@ModelAttribute("loginMember") Member loginMember,
			Model model
			) {
		
		int deptNo = loginMember.getDeptNo();
		
		List<HumanResourceManage> hrList = new ArrayList<HumanResourceManage>();
		
		hrList = service.hrList(deptNo);
		
		model.addAttribute("hrList", hrList);
		
		
			
		return "/dashBoard/dashBoard";
	}
	
	// 부서별 근태 도넛 리스트
	@ResponseBody
	@GetMapping("attnDoughnut")
	public List<AttnDoughnut> doughnutList(
			@ModelAttribute("loginMember") Member loginMember
			){
	
		List<AttnDoughnut> list = new ArrayList<AttnDoughnut>();
		

		log.info("조회한 부서 : " + loginMember.getDeptName());			
		list = service.doughnutList(loginMember.getDeptNo());
		
		return list;
	}
	

}
