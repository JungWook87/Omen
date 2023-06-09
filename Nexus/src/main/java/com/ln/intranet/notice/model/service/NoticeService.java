package com.ln.intranet.notice.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.notice.model.vo.Notice;

public interface NoticeService {


	Map<String, Object> selectPublicNoticeList(int cp);

	int writeNotice(String webPath, String folderPath, MultipartFile uploadFile, Map<String, Object> map) throws IOException;

}
