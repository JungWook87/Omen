package com.ln.intranet.chat.model.vo;

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
	private String mDate;
	
}
