package com.ln.intranet.main.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ln.intranet.attendance.model.service.AttendanceService;
import com.ln.intranet.attendance.model.vo.Attendance;
import com.ln.intranet.member.model.vo.Member;

@Controller
@SessionAttributes({"loginMember"})
public class MainController {
	
	@Autowired
	AttendanceService attnService;

	@RequestMapping("/main")
	public String mainforward(Model model,
			@ModelAttribute("loginMember") Member loginMember
			) {
		
		// 오늘 날짜 DB 검색
		LocalDate now = LocalDate.now();
		
		String year = (now.getYear() + "").substring(2);
		String month = (now.getMonthValue() < 10)? "0" + now.getMonthValue() : now.getMonthValue() + "";
		String day = (now.getDayOfMonth() < 10)? "0" + now.getDayOfMonth() : now.getDayOfMonth() + ""; 
		
		String today = year + "/" + month + "/" + day;
		
		Map<String, Object> map = new HashMap<String, Object>();  
		
		map.put("today", today);
		map.put("memNo", loginMember.getMemNo());
		
		Attendance todayAttn = attnService.selectOne(map);
		
		System.out.println(todayAttn);
		
		model.addAttribute("todayAttn" , todayAttn);
		
		return "/main";
	}
	

}
