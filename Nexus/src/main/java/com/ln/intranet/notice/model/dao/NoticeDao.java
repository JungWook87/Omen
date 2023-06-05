package com.ln.intranet.notice.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.notice.model.vo.Notice;

@Repository
public class NoticeDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;

	public List<Notice> selectNoticeList(int deptCode) {
		
		return sqlSession.selectList("noticeMapper.selectNoticeList", deptCode);
	}

	public List<Notice> selectPublucNoticeList() {
		return sqlSession.selectList("noticeMapper.selectPublicNoticeList");
	}

}
