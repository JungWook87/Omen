package com.ln.intranet.work.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.work.model.dao.WorkDAO;
import com.ln.intranet.work.model.vo.WorkGeneralList;

@Service
public class WorkServiceImp implements WorkService {
	
	@Autowired
	WorkDAO dao;

	// 결재 상신 리스트 조회
	@Override
	public List<WorkGeneralList> workSend(int memNo) {
		return dao.workSend(memNo);
	}

	// 결재 상신 날짜 지정
	@Override
	public List<WorkGeneralList> workSendSelectDate(Map<String, Object> map) {
		return dao.workSendSelectDate(map);
	}

	// 결재 상신 작성
	@Override
	public Map<String, Object> workWrite(Map<String, Object> map) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		int result = dao.workWrite(map);
		
		if(result != 0) {
			
			int memNo = Integer.parseInt(map.get("memNo").toString());
					
			List<WorkGeneralList> list = dao.workSend(memNo);
			
			resultMap.put("message", 1);
			resultMap.put("list", list);
			
		} else {
			
			resultMap.put("message", 0);
			
		}
		
		
		return resultMap;
	}
	
	
	
	
	
}
