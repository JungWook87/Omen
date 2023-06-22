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
import com.ln.intranet.work.model.vo.ApprovalMember;
import com.ln.intranet.work.model.vo.WorkDetail;
import com.ln.intranet.work.model.vo.WorkGeneral;
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
	
	// 결재 디테일 조회
	@Override
	public WorkDetail detailSelect(int workNo) {
		
		WorkDetail detailSelect = dao.detailSelect(workNo);
		
		if(detailSelect.getContent() != null) {			
			detailSelect.setContent(Util.newLineClear(detailSelect.getContent()));
		}
		
		return detailSelect;
	}
	
	// 결재취소
	@Override
	public int workCancle(int workNo) {
		return dao.workCancle(workNo);
	}
	
	
	
	
	
	
	
	
	
	
	
	

	

	// 결재 상신 작성(일반결재)
	@Override
	@Transactional
	public int workWrite(Map<String, Object> map, MultipartFile uploadFile, HttpServletRequest req) {
		
		int result = 0;
		
		int typeNo = Integer.parseInt(map.get("typeNo").toString());
		
		// 결재 타입에 따른 결재 테이블에 값 넣기
		if(typeNo == 1) {
			
			map.put("title", Util.XSSHandling(map.get("title").toString()));
			map.put("content", Util.XSSHandling(map.get("content").toString()));
			map.put("content", Util.newLineHandling(map.get("content").toString()));
			
		} else if(typeNo == 3) {
			
			map.put("content", Util.XSSHandling(map.get("content").toString()));
			map.put("content", Util.newLineHandling(map.get("content").toString()));
		}
		
		
		// 파일 올리기
		int insertResult = dao.workWrite(map);
		int workNo = Integer.parseInt(map.get("workNo").toString());
		int memNo = Integer.parseInt(map.get("memNo").toString());
		
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
				
				result = dao.insertWorkFile(file);
					
				if(result != 0) {
					try {
						uploadFile.transferTo(new File(folderPath + reName));
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			} else {
				result = insertResult;
			}
			
		}
		
		return result;
	}
	
	// 결재자 모달창
	@Override
	public List<ApprovalMember> approvalMember() {
		return dao.approvalMember();
	}

	// 결재 수신함 - 결재할 문서
	@Override
	public List<WorkGeneralList> workInbox(int memNo) {
		return dao.workInbox(memNo);
	}




	
	
	
	
	
	
	
	
}
