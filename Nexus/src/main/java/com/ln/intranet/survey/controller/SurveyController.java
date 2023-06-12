package com.ln.intranet.survey.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ln.intranet.member.model.vo.Member;
import com.ln.intranet.survey.model.service.SurveyService;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/survey")
public class SurveyController {
	
	private SurveyService service;
	
	@GetMapping("/surveyList")
	public String surveyList(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
		
		Member loginMember = (Member)session.getAttribute("loginMember");
		
		Map<String,Object> map = null;
		
		int memNo = loginMember.getMemNo();
		
		map = service.surveyList(cp, memNo);
		
		model.addAttribute("map",map);
		
		
		return "/survey/survey-list";
		
	}

}
