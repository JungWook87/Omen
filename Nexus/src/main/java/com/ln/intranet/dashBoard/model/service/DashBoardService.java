package com.ln.intranet.dashBoard.model.service;

import java.util.List;

import com.ln.intranet.dashBoard.model.vo.AttnDoughnut;

public interface DashBoardService {

	List<AttnDoughnut> doughnutList(int deptNo);

}
