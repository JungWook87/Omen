package com.ln.intranet.chat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ln.intranet.chat.model.service.ChatService;
import com.ln.intranet.chat.model.vo.ChatRoom;
import com.ln.intranet.chat.model.vo.Message;
import com.ln.intranet.member.model.vo.Member;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@SessionAttributes({"loginMember", "chatRoomNo"})
@RequestMapping("/chat")
@RestController
public class ChattingController {
	
	@Autowired
	private ChatService service;
	
	@GetMapping("/chatRoomList")
	public String chatRoomList(@ModelAttribute("loginMember") Member loginMember, 
			Model model
			) {
		
		log.info("loginMember's memNo : " + loginMember.getMemNo());
		// memberNo와 projectNo로 pmNo확인
		int memberNo = loginMember.getMemNo();
		Map<String, Object> map = new HashMap<>();
		map.put("memberNo", memberNo);
		int pmNo = service.selectPmNo(map);
		
		// 받아온 pmNo로 채팅방 리스트 조회
		map.put("pmNo", pmNo);

		List<ChatRoom> chatRoomList = service.selectChatRoomList(map);
		
		model.addAttribute("chatRoomList", chatRoomList);
		
		//워크스페이스 채팅방 리스트 조회		
		//개인 채팅방용 프로젝트 멤버 조회
		
		return "chat/chatRoomList";
	}
	
	//채팅방 입장
		@GetMapping("/chatRoom/{projectNo}/{chatRoomNo}")
		public String joinChatRoom(@ModelAttribute("loginMember") Member loginMember,
									Model model,
									@PathVariable("chatRoomNo") int chatRoomNo) {
			
			// 채팅방 내 채팅 메세지 목록 조회
			List<Message> chatMessageList = service.selectChatMessageList(chatRoomNo);
			model.addAttribute("chatMessageList", chatMessageList);
			
			int memberNo = loginMember.getMemNo();
			Map<String, Object> map = new HashMap<>();
			map.put("memberNo", memberNo);
			int pmNo = pmService.selectPmNo(map);
			
			System.out.println("pmNo찾기 : " + pmNo);
			
			model.addAttribute("pmNo", pmNo);
			model.addAttribute("chatRoomNo", chatRoomNo); // session에 올림
			
			return "chat/chatRoom";
		}
	
	
	

}
