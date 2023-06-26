package com.ln.intranet.notice.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.notice.model.vo.Notice;
import com.ln.intranet.notice.model.vo.NoticeDetail;

public interface NoticeService {


	Map<String, Object> selectPublicNoticeList(int cp);

	int writeNotice(String webPath, String folderPath, MultipartFile uploadFile, Map<String, Object> map) throws IOException;

	NoticeDetail noticeDetail(int noticeNo);

	/** 공지사항 수정
	 * @param noticeNo
	 * @param paramMap
	 * @return result
	 */
	int updateNotice(Map<String, Object> paramMap);

}
