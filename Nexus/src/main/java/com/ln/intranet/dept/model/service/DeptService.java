package com.ln.intranet.dept.model.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.dept.model.vo.BoardDetail;

public interface DeptService {

	Map<String, Object> boardList(int cp, int deptNo);

	int insertBoard(BoardDetail detail, MultipartFile uploadFile, String filePath, String folderPath) throws IOException;

	BoardDetail boardDetail(int boardNo);


}
