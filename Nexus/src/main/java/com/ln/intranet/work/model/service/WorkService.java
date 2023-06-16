package com.ln.intranet.work.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ln.intranet.work.model.vo.WorkGeneralList;


public interface WorkService {

	// 결재 상신 리스트 조회
	List<WorkGeneralList> workSend(int memNo);

	// 결재 상신 날짜 지정
	List<WorkGeneralList> workSendSelectDate(Map<String, Object> map);

}