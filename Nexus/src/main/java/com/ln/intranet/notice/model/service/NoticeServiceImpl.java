package com.ln.intranet.notice.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.common.Util;
import com.ln.intranet.notice.model.dao.NoticeDao;
import com.ln.intranet.notice.model.vo.Notice;
import com.ln.intranet.notice.model.vo.NoticeImage;

@Service
public class NoticeServiceImpl implements NoticeService{
	
	@Autowired
	private NoticeDao dao;

	@Override
	public List<Notice> selectNoticeList(int deptCode) {
		return dao.selectNoticeList(deptCode);
	}

	@Override
	public List<Notice> selectPublucNoticeList() {
		return dao.selectPublucNoticeList();
	}

	@Transactional(rollbackFor = {Exception.class})
	@Override
	public int writeNotice(String webPath, String folderPath, List<MultipartFile> imgList, Map<String, Object> map) {
		
		List<NoticeImage> boardImageList = new ArrayList();
		List<String>reNameList = new ArrayList();
		
		
		return 0;
	}

}
