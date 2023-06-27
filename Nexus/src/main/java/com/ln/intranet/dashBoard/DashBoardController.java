package com.ln.intranet.dashBoard;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ln.intranet.dashBoard.model.service.DashBoardService;
import com.ln.intranet.dashBoard.model.vo.AttnDoughnut;
import com.ln.intranet.member.model.vo.Member;

import lombok.extern.slf4j.Slf4j;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/dashBoard")
@Slf4j
public class DashBoardController {
	
	@Autowired
	DashBoardService service;

	
	@GetMapping("/dashBoardMain")
	public String dashBoardViewer() {
			
		return "/dashBoard/dashBoard";
	}
	
	// 부서별 근태 도넛 리스트
	@ResponseBody
	@GetMapping("attnDoughnut")
	public List<AttnDoughnut> doughnutList(
			@ModelAttribute("loginMember") Member loginMember
			){
	
		List<AttnDoughnut> list = new ArrayList<AttnDoughnut>();
		
		log.info("AJAX 통신확인");
			
		list = service.doughnutList(loginMember.getDeptNo());
		
		return list;
	}
	

}
