package com.ln.intranet.dashBoard.controller;

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
import com.ln.intranet.dashBoard.model.vo.DeptTeam;
import com.ln.intranet.dashBoard.model.vo.HumanResourceManage;
import com.ln.intranet.dashBoard.model.vo.ProjectPolar;
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
		
		for(int i = 0; i < hrList.size(); i++) {
			HumanResourceManage hr = hrList.get(i);
			
			if(hr.getWorkMin() > 60) {
				int plusTime = hr.getWorkMin()/60;
				int newMin = hr.getWorkMin()%60;
				
				hr.setWorkMin(newMin);
				hr.setWorkTime(hr.getWorkTime()+plusTime);
				log.info("워크타임 : " + hr.getWorkTime() + "시/" + hr.getWorkMin() + "분");
			}
			
			if(hr.getExMin() > 60) {
				int plusTime = hr.getExMin()/60;
				int newMin = hr.getExMin()%60;
				
				hr.setExMin(newMin);
				hr.setExTime(hr.getExTime()+plusTime);
				log.info("연장근무 : " + hr.getExTime() + "시/" + hr.getExMin() + "분");
			}
		}
		
		List<DeptTeam> dtList = new ArrayList<DeptTeam>();
		
		dtList = service.dtList(deptNo);
		
		model.addAttribute("hrList", hrList);
		model.addAttribute("dtList", dtList);
		
			
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
	
	@ResponseBody
	@GetMapping("projectPolar")
	public List<ProjectPolar> polarList(
			@ModelAttribute("loginMember") Member loginMember
			){
		
		List<ProjectPolar> list = new ArrayList<ProjectPolar>();
		
		list = service.polarList(loginMember.getDeptNo());
		
		return list;
	}
	

}
