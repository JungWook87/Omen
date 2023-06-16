package com.ln.intranet.chat.model.vo;

import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Message {

	private int mNo;
	private int cmNo;
	private int memNo;
	private String mContent;
	private Date mDate;
	private String memberNick;
	
}
