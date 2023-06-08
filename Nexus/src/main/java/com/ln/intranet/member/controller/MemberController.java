package com.ln.intranet.member.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ln.intranet.member.model.service.MemberService;
import com.ln.intranet.member.model.vo.Member;

@Controller
@RequestMapping("/member")
@SessionAttributes({"loginMember"})
public class MemberController {
	
	private Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberService service;
	
	
	// 로그인 컨트롤러
	// 아이디 쿠키 or 자동로그인 쿠키 미구현
	@PostMapping("/login")
	public String login( @ModelAttribute Member inputMember,
			Model model,
			RedirectAttributes ra,
			HttpServletResponse resp,
			HttpServletRequest req
			) {
		
		logger.info("----로그인컨트롤러----");
		
		Member loginMember = service.login(inputMember);
		
		if(loginMember != null) {
			model.addAttribute("loginMember",loginMember);
			
			logger.info("로그인 회원 : " + inputMember.getMemId());
			
			return "redirect:/main";

		} else {
			ra.addFlashAttribute("message","아이디 또는 비밀번호가 일치하지 않습니다.");
			return "redirect:";
		}
		
	}
}
