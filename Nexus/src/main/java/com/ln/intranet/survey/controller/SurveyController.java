package com.ln.intranet.survey.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ln.intranet.member.model.vo.Member;
import com.ln.intranet.survey.model.service.SurveyService;
import com.ln.intranet.survey.model.vo.Survey;
import com.ln.intranet.survey.model.vo.SurveyResult;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/survey")
public class SurveyController {
	
	@Autowired
	private SurveyService service;
	
	// 설문 목록 조회
	@GetMapping("surveyList")
	public String surveyList(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
		
		Member loginMember = (Member)session.getAttribute("loginMember");
		int memNo = loginMember.getMemNo();
		
		Map<String,Object> map = null;
		
		map = service.surveyList(cp,memNo);
		
		model.addAttribute("map",map);
		
		return "/survey/survey-list";
		
	}
	
	
	@GetMapping("surveyManage")
	public String surveyManage(
			@RequestParam(value="cp",required=false, defaultValue="1") int cp, 
			Model model,
			HttpSession session
			) {
		
		return "/survey/survey-manage";

	}
	
	@GetMapping("/surveyDetail/{surveyNo}")
	public String surveyDetail(@PathVariable("surveyNo") int surveyNo) {
		
		return "survey/survey-detail";
	}
	
	@GetMapping("/surveyCreate")
	public String surveyCreateEntry(

			) {

		return "/survey/survey-create";

	}
	
	// 설문 생성
	@PostMapping("/create")
	public String create(
			@RequestParam String surveyTopic,
			@RequestParam String surveyContent,
			@RequestParam String end,
			@RequestParam String question,
			@RequestParam("optionList") List<String> optionList,
			Model model
			) {

    	Survey survey = new Survey();
		survey.setSurveyTopic(surveyTopic);
		survey.setSurveyContent(surveyContent);
		survey.setEnd(end);
		
        List<SurveyResult> resultList = new ArrayList<>();

        for (int i = 0; i < optionList.size(); i++) {
       
            SurveyResult surveyResult = new SurveyResult();     
		    //관리자 넘버로 지문생성
		    surveyResult.setMemNo(0); 
		    surveyResult.setQuestion(question); 
            String option = optionList.get(i);
            surveyResult.setOptionNo(i + 1); 
            surveyResult.setOptionAnnotation(option); 
            
            resultList.add(surveyResult);
        }
        
        int result = service.createSurvey(survey,resultList);

		return "redirect:/survey/surveyList";
	}

}
