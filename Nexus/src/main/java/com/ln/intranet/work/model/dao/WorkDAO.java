package com.ln.intranet.work.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.common.model.vo.UploadFile;
import com.ln.intranet.work.model.vo.ApprovalMember;
import com.ln.intranet.work.model.vo.WorkDetail;
import com.ln.intranet.work.model.vo.WorkGeneral;
import com.ln.intranet.work.model.vo.WorkGeneralList;

@Repository
public class WorkDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 결재 상신 리스트 조회
	public List<WorkGeneralList> workSend(int memNo) {
		return sqlSession.selectList("workMapper.workSendList", memNo);
	}

	// 결재 상신 일자 지정 조회
	public List<WorkGeneralList> workSendSelectDate(Map<String, Object> map) {
		return sqlSession.selectList("workMapper.workSendSelectDate", map);
	}
	
	// 결재 디테일 조회
	public WorkDetail detailSelect(int workNo) {
		return sqlSession.selectOne("workMapper.detailSelect", workNo);
	}

	// 결재 상신 작성(일반결재)
	public int workWrite(Map<String, Object> map) {
		System.out.println(map);
		return sqlSession.insert("workMapper.workWrite", map);
	}

	// 결재 파일 올리기
	public int insertWorkFile(UploadFile file) {
		return sqlSession.insert("workMapper.insertWorkFile", file);
	}

	// 결재 수신함 - 결재할 문서
	public List<WorkGeneralList> workInbox(int memNo) {
		return sqlSession.selectList("workMapper.workInbox", memNo);
	}

	// 결재자 모달창
	public List<ApprovalMember> approvalMember() {
		return sqlSession.selectList("workMapper.approvalMember");
	}




	
}
