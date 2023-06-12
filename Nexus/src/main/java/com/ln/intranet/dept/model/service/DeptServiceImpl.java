package com.ln.intranet.dept.model.service;

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
import com.ln.intranet.dept.model.dao.DeptDAO;
import com.ln.intranet.dept.model.vo.Board;
import com.ln.intranet.dept.model.vo.BoardDetail;


@Service
public class DeptServiceImpl implements DeptService{
	
	@Autowired
	private DeptDAO dao;

	
	/** 부서 게시판 글목록 조회 서비스
	 *
	 */
	@Override
	public Map<String, Object> boardList(int cp, int deptNo) {
		
		int totalCount = dao.totalCount(deptNo);
		
		Pagination pagination = new Pagination(cp, totalCount);
		
		List<Board> boardList = dao.boardList(pagination,deptNo);
		
		Map<String,Object> map = new HashMap<String,Object>();
		
		map.put("pagination", pagination);
		map.put("boardList", boardList);
		
		return map;
	}


	/** 게시글 작성 서비스
	 * @throws IOException 
	 * @throws IllegalStateException 
	 *
	 */
	@Transactional(rollbackFor = {RuntimeException.class})
	@Override
	public int insertBoard(BoardDetail detail, MultipartFile uploadFile, String filePath, String folderPath) throws IOException {
		
		detail.setBoardTitle(Util.XSSHandling(detail.getBoardTitle()));
		detail.setBoardContent(Util.XSSHandling(detail.getBoardContent()));
		detail.setBoardContent(Util.newLineHandling(detail.getBoardContent()));

		int boardNo = dao.insertBoard(detail);

		UploadFile file = new UploadFile();
		String reName = null;
		
		if ( boardNo > 0 ) {

			if(uploadFile.getSize()>0) {
				
				reName = Util.fileRename(uploadFile.getOriginalFilename());
				
				file.setBoardNo(boardNo);
				file.setFileOrigin(uploadFile.getOriginalFilename());
				file.setFileReName(filePath+reName);

				int result = dao.insertBoardFile(file);
				
				if (result > 0) {
					uploadFile.transferTo(new File(folderPath+reName));
				} else {
					throw new InsertFailException();	
				}
			}
			
		}
		
		return boardNo;
	}


	@Override
	public BoardDetail boardDetail(int boardNo) {
	
		return dao.boardDetail(boardNo);
	}

	




}
