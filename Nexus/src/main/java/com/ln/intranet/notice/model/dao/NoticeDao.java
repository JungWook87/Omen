package com.ln.intranet.notice.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.common.model.vo.Pagination;
import com.ln.intranet.common.model.vo.UploadFile;
import com.ln.intranet.notice.model.vo.Notice;
import com.ln.intranet.notice.model.vo.NoticeDetail;

@Repository
public class NoticeDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;


	public List<Notice> selectPublicNoticeList(Pagination pagination) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset,pagination.getLimit());
		
		return sqlSession.selectList("noticeMapper.selectPublicNoticeList",rowBounds);
	}

	// 공지사항 글 개수 조회
	public int totalCount() {
		return sqlSession.selectOne("noticeMapper.totalList");
	}

	// 공지사항 작성
	public int insertNotice(Map<String, Object> map) {
		
		int result = sqlSession.insert("noticeMapper.insertNotice", map);
		
		if(result > 0) result = (int) map.get("noticeNo");
		
		return result;
	}

	// 파일 업로드
	public int insertNoticeFile(UploadFile file) {
		
		return sqlSession.insert("noticeMapper.insertNoticeFile", file);
	}

	public NoticeDetail noticeDetail(int noticeNo) {
		return sqlSession.selectOne("noticeMapper.noticeDetail", noticeNo);
	}

	// 공지사항 수정
	public int updateNotice(Map<String, Object> paramMap) {

		return sqlSession.update("noticeMapper.updateNotice", paramMap);
	}


}
