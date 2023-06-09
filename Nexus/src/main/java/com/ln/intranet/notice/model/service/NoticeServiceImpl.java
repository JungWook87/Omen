package com.ln.intranet.notice.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.common.Util;
import com.ln.intranet.common.model.vo.Pagination;
import com.ln.intranet.dept.model.vo.Board;
import com.ln.intranet.notice.model.dao.NoticeDao;
import com.ln.intranet.notice.model.vo.Notice;
import com.ln.intranet.notice.model.vo.NoticeImage;

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


	@Transactional(rollbackFor = {Exception.class})
	@Override
	public int writeNotice(String webPath, String folderPath, List<MultipartFile> imgList, Map<String, Object> map) {
		
		log.debug(map + "");
		
		int noticeNo = dao.insertNotice(map);
		
		
		List<NoticeImage> boardImageList = new ArrayList();
		List<String>reNameList = new ArrayList();
		
		for(int i = 0; i < imgList.size(); i++) {
			String reName = Util.fileRename(imgList.get(i).getOriginalFilename());
			reNameList.add(reName);
			
			NoticeImage img = new NoticeImage();
			
			
		}
		
		
		
		return 0;
	}


}
