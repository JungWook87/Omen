package com.ln.intranet.chat.model.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoom {

	private int cmNo;
	private int memNo;
	private String title;
	private String status;
}
