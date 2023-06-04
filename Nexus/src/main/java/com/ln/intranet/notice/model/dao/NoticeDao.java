package com.ln.intranet.notice.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;

import com.ln.intranet.notice.model.vo.Notice;

public class NoticeDao {
	
	private SqlSessionTemplate sqlSession;

	public List<Notice> selectNoticeList(int deptCode) {
		
		return sqlSession.selectList("noticeMapper.selectNoticeList", deptCode);
	}

	public List<Notice> selectNoticeList2() {
		
		return sqlSession.selectList("noticeMapper.selectNoticeList2");
	}

}
