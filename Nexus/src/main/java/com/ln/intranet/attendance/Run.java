package com.ln.intranet.attendance;

import com.ln.intranet.attendance.controller.AttendanceController;

public class Run {

	public static void main(String[] args) {
		
		AttendanceController run = new AttendanceController();
		
		run.selectAttendanceList();
		
	}

}
