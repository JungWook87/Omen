package com.ln.intranet.notice.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.common.model.vo.Pagination;
import com.ln.intranet.notice.model.vo.Notice;

@Repository
public class NoticeDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;


	public List<Notice> selectPublicNoticeList(Pagination pagination) {
		
		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset,pagination.getLimit());
		
		return sqlSession.selectList("noticeMapper.selectPublicNoticeList",rowBounds);
	}

	public int totalCount() {
		return sqlSession.selectOne("noticeMapper.totalList");
	}

	public int insertNotice(Map<String, Object> map) {
		return sqlSession.insert("noticeMapper.insertNotice", map);
	}

}
