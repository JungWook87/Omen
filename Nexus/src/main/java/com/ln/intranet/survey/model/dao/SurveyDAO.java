package com.ln.intranet.survey.model.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.common.model.vo.Pagination;
import com.ln.intranet.survey.model.vo.Survey;
import com.ln.intranet.survey.model.vo.SurveyPreview;
import com.ln.intranet.survey.model.vo.SurveyResult;

@Repository
public class SurveyDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	// 설문 생성후 surveyNo를 받아온다	
	public int createSurvey(Survey survey) {

		return sqlSession.insert("surveyMapper.createSurvey",survey);
	}
	
	// 지문 생성 DAO
	public int createResult(SurveyResult surveyResult) {
		
		int result = sqlSession.insert("surveyMapper.createResult",surveyResult);
		
		return result; 
		
	}
	
	// 페이지네이션 생성용 전체 설문 수 조회
	public int totalCount() {
		return sqlSession.selectOne("surveyMapper.totalCount");
	}
	
	// 전체 설문 리스트 조회
	public List<SurveyPreview> surveyList(Pagination pagination, int memNo) {

		int offset = (pagination.getCurrentPage()-1)*pagination.getLimit();
		RowBounds rowBounds = new RowBounds(offset,pagination.getLimit());
		
		return sqlSession.selectList("surveyMapper.surveyList",memNo,rowBounds);
	}

}
