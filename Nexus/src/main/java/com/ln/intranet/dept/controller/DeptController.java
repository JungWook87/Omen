package com.ln.intranet.dept.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.ln.intranet.dept.model.service.DeptService;
import com.ln.intranet.dept.model.vo.BoardDetail;
import com.ln.intranet.member.model.vo.Member;
import com.ln.intranet.notice.model.service.NoticeService;
import com.ln.intranet.notice.model.vo.NoticeDetail;

@Controller
@SessionAttributes({"loginMember"})
@RequestMapping("/dept")
public class DeptController {

	private Logger logger = LoggerFactory.getLogger(DeptController.class);
	
	@Autowired
	private DeptService service;
	
	
	// 부서 공지사항 페이지 조회
	@GetMapping("deptNotice")
	public String deptNotice(@RequestParam(value="cp",required=false, defaultValue="1") Integer cp,
				Model model,
				HttpSession session
			) {
		Member loginMember = (Member)session.getAttribute("loginMember");
		
		int deptNo = loginMember.getDeptNo();
		
		Map<String,Object> map = null;	
		
		
		map = service.selectDeptNoticeList(cp , deptNo);
		
		
		model.addAttribute("map", map);
		
		return "/dept/dept-notice";
	}
	
	  // 공지사항 추가
	  @PostMapping("writeNotice")
	  public String writeNotice(@RequestParam("uploadFile") MultipartFile uploadFile,
			  					@ModelAttribute("loginMember") Member loginMember,
			  					@RequestParam Map<String, Object> map,
			  					HttpServletRequest req,
			  					RedirectAttributes ra
			  					
			  )throws IOException {
		  	
		  
		  String webPath = "/resources/file/";
		  String folderPath = req.getSession().getServletContext().getRealPath(webPath);
		  
		  int deptNo = loginMember.getDeptNo();
		  
		  map.put("deptNo", deptNo);
		  
		  int result = service.writeNotice(webPath, folderPath, uploadFile ,map);
		  
		  String message = null;
		  
		  if(result > 0) {
			  
			  message = "공지사항 등록됨";
		  }else {
			  message = "공지사항 등록 실패";
		  }
		  ra.addFlashAttribute("message", message);
		  
		  return "redirect:/dept/deptNotice";
	  }
	
	
	// 부서 공지사항 디테일
	  @ResponseBody
	  @GetMapping("/deptNotice/noticeDetail")
	  public String noticeDetail(int noticeNo,
			  @ModelAttribute("loginMember") Member loginMember) {
		  
		  int deptNo = loginMember.getDeptNo();
		  
		  
		  Map<String,Object> map = new HashMap<>();
		  
		  map.put("deptNo", deptNo);
		  map.put("noticeNo", noticeNo);
		  
		  NoticeDetail detail = service.noticeDetail(map);
		  
		  detail.setNoticeNo(noticeNo);
		  
		  logger.debug(detail + "");
		  
		  return new Gson().toJson(detail);
				 
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
	
	
	// 부서 게시판 디테일
	@ResponseBody
	@GetMapping("/deptBoard/boardDetail")
	public String boardDetail(int boardNo) {
		
		BoardDetail detail = service.boardDetail(boardNo);
		
		detail.setBoardNo(boardNo);
		
		return new Gson().toJson(detail);
	}
	
	// 부서 일정 접속
	@GetMapping("deptSchedule")
	public String deptSchedule() {
		return "/dept/dept-schedule";
	}
	
	// 부서 게시판 작성
	@PostMapping("write")
	public String insertBoard(
			@RequestParam("noticeTitle") String boardTitle,
			@RequestParam("noticeContent") String boardContent,
			@RequestParam("uploadFile") MultipartFile uploadFile,
			@ModelAttribute("loginMember") Member loginMember,
			HttpServletRequest req,
			RedirectAttributes ra
			) throws IOException{
		BoardDetail detail = new BoardDetail();
		
		detail.setBoardTitle(boardTitle);
		detail.setBoardContent(boardContent);
		detail.setMemNo(loginMember.getMemNo());
		detail.setDeptNo(loginMember.getDeptNo());
		
		
		logger.info(detail.getBoardTitle());
		String filePath = "/resources/file/";
		String folderPath = req.getSession().getServletContext().getRealPath(filePath);
		
		int boardNo = service.insertBoard(detail,uploadFile,filePath,folderPath);
		
		String message = null;
		
		if(boardNo > 0) {

			message = "게시글이 등록되었습니다";
		} else {
			message = "게시글 등록 실패";
		}
		ra.addFlashAttribute("message",message);
		
		return "redirect:/dept/deptBoard";
	}
	
}
