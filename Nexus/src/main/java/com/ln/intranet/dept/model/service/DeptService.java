package com.ln.intranet.dept.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.dept.model.vo.BoardDetail;
import com.ln.intranet.member.model.vo.Member;
import com.ln.intranet.notice.model.vo.NoticeDetail;
import com.ln.intranet.work.model.vo.Project;

public interface DeptService {

	Map<String, Object> boardList(int cp, int deptNo);

	int insertBoard(BoardDetail detail, MultipartFile uploadFile, String filePath, String folderPath) throws IOException;

	BoardDetail boardDetail(int boardNo);

	Map<String, Object> selectDeptNoticeList(Integer cp, int deptNo);


	NoticeDetail noticeDetail(Map<String, Object> map);

	int writeNotice(String webPath, String folderPath, MultipartFile uploadFile, Map<String, Object> map) throws IOException;

	int boardDelete(int boardNo);

	// 본인 부서 프로젝트 조회하기(kjw)
	List projectList(Member loginMember);


}
