package com.ln.intranet.notice.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.notice.model.vo.Notice;

public interface NoticeService {

	List<Notice> selectNoticeList(int deptCode);

	List<Notice> selectPublucNoticeList();

	int writeNotice(String webPath, String folderPath, List<MultipartFile> imgList, Map<String, Object> map);

}
