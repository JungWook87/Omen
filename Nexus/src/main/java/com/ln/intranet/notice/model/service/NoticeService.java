package com.ln.intranet.notice.model.service;

import java.util.List;

import com.ln.intranet.notice.model.vo.Notice;

public interface NoticeService {

	List<Notice> selectNoticeList(int deptCode);

	List<Notice> selectPublucNoticeList();

}
