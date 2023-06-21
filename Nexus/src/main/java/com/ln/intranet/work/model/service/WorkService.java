package com.ln.intranet.work.model.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.work.model.vo.ApprovalMember;
import com.ln.intranet.work.model.vo.WorkDetail;
import com.ln.intranet.work.model.vo.WorkGeneral;
import com.ln.intranet.work.model.vo.WorkGeneralList;


public interface WorkService {

	// 결재 상신 리스트 조회
	List<WorkGeneralList> workSend(int memNo);

	// 결재 상신 날짜 지정
	List<WorkGeneralList> workSendSelectDate(Map<String, Object> map);
	
	// 결재 디테일 조회
	WorkDetail detailSelect(int workNo);

	// 결재 상신 작성(일반결재)
	int workWrite(Map<String, Object> map, MultipartFile uploadFile, HttpServletRequest req);

	// 결재자 모달창
	List<ApprovalMember> approvalMember();
	
	// 결재 수신함 - 결재할 문서
	List<WorkGeneralList> workInbox(int memNo);




}
