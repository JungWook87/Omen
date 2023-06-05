package com.ln.intranet.notice.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.notice.model.dao.NoticeDao;
import com.ln.intranet.notice.model.vo.Notice;

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

}
