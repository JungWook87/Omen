package com.ln.intranet.work.model.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.common.Util;
import com.ln.intranet.common.model.vo.UploadFile;
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

	// 결재 상신 작성(날짜 없음)
	@Override
	@Transactional
	public Map<String, Object> workWrite(Map<String, Object> map, MultipartFile uploadFile, HttpServletRequest req) {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		map.put("title", Util.XSSHandling(map.get("title").toString()));
		map.put("content", Util.XSSHandling(map.get("content").toString()));
		map.put("content", Util.newLineHandling(map.get("content").toString()));
		
		
		int insertResult = dao.workWrite(map);
		int workNo = Integer.parseInt(map.get("workNo").toString());
		
		if(insertResult != 0) {
			
			if(uploadFile.getSize() != 0) {

				UploadFile file = new UploadFile();
				String reName = "";
				
				String webPath = "/resources/file/";
				String folderPath = req.getSession().getServletContext().getRealPath(webPath);
				
				reName = Util.fileRename(uploadFile.getOriginalFilename());
				
				file.setWorkNo(workNo);
				file.setFileOrigin(uploadFile.getOriginalFilename());
				file.setFileReName(webPath + reName);
				
				int result = dao.insertWorkFile(file);
					
				if(result != 0) {
					try {
						uploadFile.transferTo(new File(folderPath + reName));
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				
			}
			
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
