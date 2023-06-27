package com.ln.intranet.dashBoard.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ln.intranet.dashBoard.model.dao.DashBoardDAO;
import com.ln.intranet.dashBoard.model.vo.AttnDoughnut;

@Service
public class DashBoardServiceImpl implements DashBoardService {

	@Autowired
	DashBoardDAO dao;

	// 근태 도넛 리스트 서비스
	@Override
	public List<AttnDoughnut> doughnutList(int deptNo) {

		return dao.doughnutList(deptNo);
	}
}
