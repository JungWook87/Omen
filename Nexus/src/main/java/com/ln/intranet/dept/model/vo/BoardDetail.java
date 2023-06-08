package com.ln.intranet.dept.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BoardDetail {

	private int boardNo;
	private int memberNo;
	private String memName;
	private String boardTitle;
	private String boardContent;
	private String boardFile;
	private String boardDate;
	private String boardSt;
	private int deptNo;
}
