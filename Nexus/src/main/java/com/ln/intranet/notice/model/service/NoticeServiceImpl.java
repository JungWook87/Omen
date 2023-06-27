package com.ln.intranet.notice.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.common.Util;
import com.ln.intranet.common.model.exception.InsertFailException;
import com.ln.intranet.common.model.vo.Pagination;
import com.ln.intranet.common.model.vo.UploadFile;
import com.ln.intranet.dept.model.vo.Board;
import com.ln.intranet.notice.model.dao.NoticeDao;
import com.ln.intranet.notice.model.vo.Notice;
import com.ln.intranet.notice.model.vo.NoticeDetail;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class NoticeServiceImpl implements NoticeService{
	
	@Autowired
	private NoticeDao dao;


	@Override
	public Map<String, Object> selectPublicNoticeList(int cp) {
	    int totalCount = dao.totalCount();
	    Pagination pagination = new Pagination(cp, totalCount);
	    
	    List<Notice> boardList = dao.selectPublicNoticeList(pagination);
	    
	    
	    Map<String, Object> map = new HashMap<String, Object>();
	    map.put("pagination", pagination);
	    map.put("boardList", boardList);
	    
	    return map;
	}


	/** 공지사항 작성 + 파일업로드
	 * 
	 */
	@Transactional(rollbackFor = {Exception.class})
	@Override
	public int writeNotice(String webPath, String folderPath, MultipartFile uploadFile, Map<String, Object> map)throws IOException {
		
		int noticeNo = dao.insertNotice(map);
		
		log.debug("noticeNo = " + noticeNo + "");
		
		UploadFile file = new UploadFile();
		String reName = null;
		
		if(noticeNo > 0) {
			
			if(uploadFile.getSize() > 0 ) {
				
				reName = Util.fileRename(uploadFile.getOriginalFilename());
				
				file.setNoticeNo(noticeNo);
				file.setFileOrigin(uploadFile.getOriginalFilename());
				file.setFileReName(webPath+reName);
				
				int result = dao.insertNoticeFile(file);
				
				log.debug("FILENO = " + result + "");
				
				
				if(result > 0) {
					uploadFile.transferTo(new File(folderPath + reName));
				}else {
					throw new InsertFailException();
				}
			}
		}
	
		
		return noticeNo;
	}


	@Override
	public NoticeDetail noticeDetail(int noticeNo) {
		
		return dao.noticeDetail(noticeNo);
	}


	// 공지사항 수정
	@Override
	public int updateNotice(NoticeDetail detail) {
		
		
		
		detail.setContent(Util.newLineHandling(detail.getContent()));
		
		System.out.println(detail);
	
		
		return dao.updateNotice(detail);
	}


	
	


}
