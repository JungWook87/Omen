package com.ln.intranet.dept.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.common.model.vo.Pagination;
import com.ln.intranet.common.model.vo.UploadFile;
import com.ln.intranet.dept.model.vo.Board;
import com.ln.intranet.dept.model.vo.BoardDetail;
import com.ln.intranet.notice.model.vo.Notice;
import com.ln.intranet.notice.model.vo.NoticeDetail;


@Repository
public class DeptDAO {

	private Logger logger = LoggerFactory.getLogger(DeptDAO.class);
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	
	// 부서 게시판 글 개수 총합
	public int totalCount(int deptNo) {
		return sqlSession.selectOne("deptMapper.totalCount",deptNo);
	}
	
	// 부서 게시판 목록 조회
	public List<Board> boardList(Pagination pagination, int deptNo) {

		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset,pagination.getLimit());
		
		return sqlSession.selectList("deptMapper.boardList",deptNo,rowBounds);
	}
	
	// 부서게시판 글작성 DAO (파일업로드 전)
	public int insertBoard(BoardDetail detail) {
		
		int result =  sqlSession.insert("deptMapper.insertBoard",detail);
		
		if(result > 0) result = detail.getBoardNo();
		
		return result;
	}
	
	// 부서게시판 파일 업로드
	public int insertBoardFile(UploadFile file) {

		return sqlSession.insert("deptMapper.insertBoardFile",file);
	}
	
	// 부서게시판 게시글 상세조회
	public BoardDetail boardDetail(int boardNo) {
		
		return sqlSession.selectOne("deptMapper.boardDetail",boardNo);
	}

	// 부서 공지사항 카운트
	public int totalList(int deptNo) {
		
		return sqlSession.selectOne("noticeMapper.totalCount", deptNo);
	}

	// 부서 공지사항 목록 조회
	public List<Notice> selectDeptNoticeList(Pagination pagination, int deptNo) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset,pagination.getLimit());
		
		return sqlSession.selectList("noticeMapper.selectDeptNoticeList",deptNo , rowBounds);
		
	}



	public NoticeDetail noticeDetail(Map<String, Object> map) {
		return sqlSession.selectOne("noticeMapper.deptNoticeDetail",map);
	}

	public int insertNotice(Map<String, Object> map) {
		int result = sqlSession.insert("noticeMapper.insertDeptNotice", map);
		
		if(result > 0) result = (int) map.get("noticeNo");
		
		return result;
	}

	public int insertNoticeFile(UploadFile file) {
		
		return sqlSession.insert("noticeMapper.insertDeptNoticeFile", file);
	}

	
	
}
