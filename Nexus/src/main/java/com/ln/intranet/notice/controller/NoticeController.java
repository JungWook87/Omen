package com.ln.intranet.notice.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.ln.intranet.member.model.vo.Member;
import com.ln.intranet.notice.model.service.NoticeService;
import com.ln.intranet.notice.model.vo.Notice;

import lombok.extern.slf4j.Slf4j;

@RequestMapping("/notice")
@Slf4j
@Controller
public class NoticeController {
	
	  @Autowired 
	  private NoticeService service;
	  
	  
		@GetMapping("")
		public String noticeforward() {
			
			return "notice/notice";
		
	}
	  
	
	
	  @GetMapping("/deptNoticeList") 
	 public String selectNoticeList(@ModelAttribute("loginMember") Member loginMember) {
		  
	  int deptCode = loginMember.getDeptNo();
	  
	  List<Notice> noticeList = service.selectNoticeList(deptCode);
	  
	  log.debug(noticeList + "");
	  
	 return "redirect:";
	 }
	  
	  @ResponseBody
	  @GetMapping("/noticeList")
	  public String selectPublucNoticeList() {
		  
		  List <Notice> publicNoticeList = service.selectPublucNoticeList();
		  
		  log.info("publicNoticeList" + "");
		  
		  return new Gson().toJson(publicNoticeList);
	  }
	  
	  @PostMapping("writeNotice")
	  public String writeNotice(@RequestParam(value="file-uploads", required = false)List<MultipartFile> imgList,
			  					@ModelAttribute("loginMember") Member loginMember,
			  					@RequestParam Map<String, Object> map,
			  					HttpServletRequest req,
			  					RedirectAttributes ra
			  					
			  ) {
		  
		  map.put("memberNo", loginMember.getMemNo());
		  
		  log.debug(map + "");

		  
		  String webPath = "resources/images/notice/";
		  String folderPath = req.getSession().getServletContext().getRealPath(webPath);
		  
		  int result = service.writeNotice(webPath, folderPath, imgList ,map);
		  
		  return "";
	  }
	  
	  
}
