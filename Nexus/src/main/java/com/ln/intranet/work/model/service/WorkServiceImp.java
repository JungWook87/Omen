package com.ln.intranet.work.model.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ln.intranet.common.Util;
import com.ln.intranet.common.model.vo.UploadFile;
import com.ln.intranet.work.model.dao.ProjectDAO;
import com.ln.intranet.work.model.dao.WorkDAO;
import com.ln.intranet.work.model.vo.ApprovalMember;
import com.ln.intranet.work.model.vo.ProjectTask;
import com.ln.intranet.work.model.vo.WorkDetail;
import com.ln.intranet.work.model.vo.WorkGeneralList;

@Service
public class WorkServiceImp implements WorkService {
	
	@Autowired
	WorkDAO dao;
	@Autowired
	ProjectDAO pDao;
	
	private Logger logger = LoggerFactory.getLogger(WorkServiceImp.class);
	
	// 결재 상신 리스트 조회
	@Override
	public List<WorkGeneralList> workSend(int memNo) {
		return dao.workSend(memNo);
	}

	// 결재 상신 날짜 지정
	@Override
	public List<WorkGeneralList> workSendSelectDate(Map<String, Object> map) {
		return dao.workSendSelectDate(map);
	}
	
	// 결재 디테일 조회
	@Override
	public WorkDetail detailSelect(int workNo) {
		
		WorkDetail detailSelect = dao.detailSelect(workNo);
		
		if(detailSelect.getContent() != null) {			
			detailSelect.setContent(Util.newLineClear(detailSelect.getContent()));
		}
		
		return detailSelect;
	}
	
	// 결재취소
	@Override
	public int workCancle(int workNo) {
		return dao.workCancle(workNo);
	}
	
	
	
	
	
	
	
	
	
	
	
	

	

	// 결재 상신 작성(일반결재)
	@Override
	@Transactional
	public int workWrite(Map<String, Object> map, 
			MultipartFile uploadFile, HttpServletRequest req,
			List<String> taskTitleList) {
		
		int result = 0;
		
		int typeNo = Integer.parseInt(map.get("typeNo").toString());
		
		// 프로젝트과제 객체 생성
		List<ProjectTask> taskList = new ArrayList<>();

		
		// 결재 타입에 따른 결재 테이블에 값 넣기
		if(typeNo == 1) {
			
			map.put("title", Util.XSSHandling(map.get("title").toString()));
			map.put("content", Util.XSSHandling(map.get("content").toString()));
			map.put("content", Util.newLineHandling(map.get("content").toString()));
			
		} else if(typeNo == 3) {
			
			map.put("content", Util.XSSHandling(map.get("content").toString()));
			map.put("content", Util.newLineHandling(map.get("content").toString()));
			
		} else if(typeNo == 4 ) {
			
			map.put("title", Util.XSSHandling(map.get("title").toString()));
			map.put("content", Util.XSSHandling(map.get("content").toString()));
			map.put("content", Util.newLineHandling(map.get("content").toString()));
			
	
			for(int i = 0; i < taskTitleList.size(); i++) {
				ProjectTask task = new ProjectTask();
				task.setTitle(taskTitleList.get(i));				
				taskList.add(task);
			}

		} else if(typeNo == 5 ) {

			map.put("title", Util.XSSHandling(map.get("title").toString()));
			map.put("content", Util.XSSHandling(map.get("content").toString()));
			map.put("content", Util.newLineHandling(map.get("content").toString()));
			
			int projectSelect = (Integer)map.get("projectNo");
			
		}
		
		// 결재타입 1 2 3 일 때 
		if (typeNo == 1 ||  typeNo == 2 || typeNo == 3) {

			// 파일 올리기
			int insertResult = dao.workWrite(map);
			int workNo = Integer.parseInt(map.get("workNo").toString());
			int memNo = Integer.parseInt(map.get("memNo").toString());
			
			if(insertResult != 0) {
				
				if(uploadFile.getSize() != 0) {

					UploadFile file = new UploadFile();
					String reName = "";
					
					String webPath = "/resources/file/";
					String folderPath = req.getSession().getServletContext().getRealPath(webPath);
					
					reName = Util.fileRename(uploadFile.getOriginalFilename());
					
					file.setWorkNo(workNo);
					file.setFileOrigin(uploadFile.getOriginalFilename());
					file.setFileReName(webPath + reName);
					
					result = dao.insertWorkFile(file);
						
					if(result != 0) {
						try {
							uploadFile.transferTo(new File(folderPath + reName));
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				} else {
					result = insertResult;
				}
				
			}


			// 프로젝트 생성 + 프로젝트 과제 생성
		} else if (typeNo == 4 ){
			
			// 파일 올리기
			int resultNo = pDao.createProject(map);
			int projectNo = Integer.parseInt(map.get("projectNo").toString());
			int memNo = Integer.parseInt(map.get("memNo").toString());
			int taskCount = 0;
			
			if(resultNo > 0 ) {
				for (ProjectTask task : taskList) {
				    task.setProjectNo(projectNo);
				    task.setDeptNo((Integer)map.get("deptNo"));
				    int successCount = pDao.createTask(task);
				    if(successCount > 0)  taskCount++;	    
				    logger.info("생성된 과제 수 : " + taskCount);
				}	
			}
			
			if(resultNo != 0) {
				
				if(uploadFile.getSize() != 0) {

					UploadFile file = new UploadFile();
					String reName = "";
					
					String webPath = "/resources/file/";
					String folderPath = req.getSession().getServletContext().getRealPath(webPath);
					
					reName = Util.fileRename(uploadFile.getOriginalFilename());
					
					file.setWorkNo(projectNo);
					file.setFileOrigin(uploadFile.getOriginalFilename());
					file.setFileReName(webPath + reName);
					
					result = pDao.insertProjectFile(file);
						
					if(result != 0) {
						try {
							uploadFile.transferTo(new File(folderPath + reName));
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				} else {
					result = resultNo;
				}
				
			}
		}
		
		return result;
		

	}
	
	// 결재자 모달창
	@Override
	public List<ApprovalMember> approvalMember() {
		return dao.approvalMember();
	}

	// 결재 수신함 - 결재할 문서
	@Override
	public List<WorkGeneralList> workInbox(int memNo) {
		return dao.workInbox(memNo);
	}
	
	// 프로젝트 상신함 - 프로젝트리스트
	@Override
	public List<WorkGeneralList> projectSendList(int memNo) {		
		return pDao.projectSendList(memNo);
	}

	// 프로젝트 상신함 - 과제리스트
	@Override
	public List<WorkGeneralList> taskSendList(int memNo) {
		return pDao.taskSendList(memNo);
	}




	
	
	
	
	
	
	
	
}
