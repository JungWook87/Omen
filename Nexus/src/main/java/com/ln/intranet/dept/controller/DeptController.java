package com.ln.intranet.dept.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ln.intranet.dept.model.service.DeptService;
import com.ln.intranet.member.model.vo.Member;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/dept")
public class DeptController {
	
	@Autowired
	private DeptService service;
	
	// 부서 공지사항 페이지 조회
	@GetMapping("deptNotice")
	public String deptNotice(
			
			) {
		
		
		
		return "/dept/dept-notice";
	}
	
	// 부서 게시판 접속
	@GetMapping("deptBoard")
	public String deptBoard(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
		
		Member loginMember = (Member)session.getAttribute("loginMember");
		
		Map<String,Object> map = null;
		
		int deptNo = loginMember.getDeptNo();
		
		map = service.boardList(cp,deptNo);
		
		model.addAttribute("map",map);
		
		return "/dept/dept-board";
	}
	
	// 부서 일정 접속
	@GetMapping("deptSchedule")
	public String deptSchedule() {
		return "/dept/dept-schedule";
	}
}
