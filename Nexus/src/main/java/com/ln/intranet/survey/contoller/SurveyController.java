package com.ln.intranet.survey.contoller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SurveyController {
	
	@RequestMapping("/survey")
	public String mainforward() {
		
		return "/template/template";
	}
}
