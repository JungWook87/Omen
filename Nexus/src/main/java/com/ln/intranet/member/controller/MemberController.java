package com.ln.intranet.member.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.weaver.BCException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
			return "redirect:/";
		}
		
	}
	
	
	
	
	// 마이페이지 화면 전환
	@GetMapping("myPageProfile")
	public String myPageProfile() {
		return "/member/myPage-profile";
	}
	

	// 마이페이지 비밀번호 변경 화면 전환
	@GetMapping("myPagePwChange")
	public String myPagePwChange() {
		return "/member/myPage-pwChange";
	}
	
	
	// 마이페이지 비밀번호 변경하는 컨트롤러
	@PostMapping("myPagePwChangeFunction")
	public String changePw(@RequestParam Map<String, Object> paramMap,
							@ModelAttribute("loginMember") Member loginMember,
							RedirectAttributes ra) {
		
		// 로그인된 회원의 번호를 paramMap에 추가
		paramMap.put("memNo", loginMember.getMemNo());
		
		int result = service.changePw(paramMap);
		
		String message = null;
		String path = null;
		
		if (result > 0) {
			message = "비밀번호가 변경되었습니다.";
			path = "myPageProfile";
		} else {
			message = "비밀번호가 일치하지 않습니다.";
			path = "myPagePwChangeFunction";
		}
		
		ra.addFlashAttribute("message", message);
		
		return  "redirect:" + path;
	}
}
