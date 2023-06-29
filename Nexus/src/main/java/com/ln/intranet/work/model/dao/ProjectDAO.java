package com.ln.intranet.work.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ln.intranet.common.model.vo.UploadFile;
import com.ln.intranet.work.model.vo.ProjectList;
import com.ln.intranet.work.model.vo.ProjectTask;
import com.ln.intranet.work.model.vo.ProjectTaskList;
import com.ln.intranet.work.model.vo.WorkGeneralList;

@Repository
public class ProjectDAO {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 프로젝트 리스트
	public List<ProjectList> pList(int deptNo) {
		return sqlSession.selectList("projectMapper.pList",deptNo);
	}

	// 프로젝트/과제 리스트
	public List<ProjectTaskList> ptList(int deptNo) {
		return sqlSession.selectList("projectMapper.ptList",deptNo);
	}
	
	// 프로젝트 작성
	public int createProject(Map<String, Object> map) {
		return sqlSession.insert("projectMapper.createProject",map);
	}

	// 프로젝트 하위 과제 생성
	public int createTask(ProjectTask task) {
		return sqlSession.insert("projectMapper.createTask",task);
	}
	
	
	// 프로젝트 파일 업로드
	public int insertProjectFile(UploadFile file) {
		return sqlSession.insert("projectMapper.insertProjectFile",file);
	}
	
	// 프로젝트 파일 업로드
	public int insertTaskFile(UploadFile file) {
		return sqlSession.insert("projectMapper.insertTaskFile",file);
	}

	// 상신함 프로젝트 리스트
	public List<WorkGeneralList> projectSendList(int memNo) {
		return sqlSession.selectList("projectMapper.projectSendList",memNo);
	}
	
	// 상신함 과제 리스트
	public List<WorkGeneralList> taskSendList(int memNo) {
		return sqlSession.selectList("projectMapper.taskSendList",memNo);
	}

	// 과제 업로드
	public int updateTask(Map<String, Object> map) {
		
		return sqlSession.update("projectMapper.updateTask",map);
	}

	
}
