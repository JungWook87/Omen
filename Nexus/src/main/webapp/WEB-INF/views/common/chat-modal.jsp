<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
 

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
    <!-- sweetAlert2 cdn -->
    <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
    <!-- jquery cdn -->
    <script src="https://code.jquery.com/jquery-3.7.0.js"
        integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>

    <!-- font-awesome cdn -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="${contextPath}/assets/favicon.ico" />
    <!-- Bootstrap icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />


    <title>메인페이지</title>
</head>

<body>
    <!-- 채팅창 영역 -->
        <!-- 채팅 버튼 -->
        <div id="chatting-function" class="chatting-box">
            <a href="#">
                <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
            </a>
        </div>

        <!-- 채팅창 ui -->
        <div class="chat-box">
            <div class="center">
                <div class="contacts">
                    <div class="contact-header">
                        <h2 id="contact-h2">
                            채팅
                        </h2>
                        <i class="fa-solid fa-user fa-2x" id="friends-list"></i>
                        <i class="fa-solid fa-comment fa-2x" id="employee-list"></i>
                    </div>
                    <div id="contact-area">

                    </div>

                    <div class="employee-arrow">
                        <i class="fa-solid fa-caret-right fa-beat-fade fa-lg"></i>
                        <span>오른쪽 화면에 나타납니다</span>
                    </div>


                </div>


                <div id="chat-main">
                    <div class="chat-main-bar">
                        <div class="chat-header">
                            <h2>직원목록</h2>
                            <i class="fas fa-times" id="close"></i>
                        </div>
                    </div>

                    <div id="employee-area">
                        <div class="employee-group ">
                            <div class="employee-dropBox">
                                <span>CEO</span>
                                <i class="fa-solid fa-angle-down fa-lg employee-dropBox-i "></i>
                            </div>
                            <ul class="employee-dropBox-ul employee-ceo">
                            </ul>
                        </div>
                        <div class="employee-group ">
                            <div class="employee-dropBox">
                                <span>Director</span>
                                <i class="fa-solid fa-angle-down fa-lg employee-dropBox-i "></i>
                            </div>
                            <ul class="employee-dropBox-ul employee-director">
                            </ul>
                        </div>
                        
                        <div class="employee-group ">
                            <div class="employee-dropBox">
                                <span>Senior</span>
                                <i class="fa-solid fa-angle-down fa-lg employee-dropBox-i "></i>
                            </div>
                            <ul class="employee-dropBox-ul employee-senior">
                            </ul>
                        </div>
                        <div class="employee-group ">
                            <div class="employee-dropBox">
                                <span>Junior</span>
                                <i class="fa-solid fa-angle-down fa-lg employee-dropBox-i "></i>
                            </div>
                            <ul class="employee-dropBox-ul employee-junior">
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="chat">
                    <div class="bar">
                        <div class="chat-header">
                            <div class="chat-name">

                            </div>
                            <i class="fas fa-times" id="chat-close"></i>

                        </div>

                    </div>


                    <div class="messages" id="chat">
                        <div class="time">
                        </div>

                        <div class="message stark">
                            <div class="typing typing-1"></div>
                            <div class="typing typing-2"></div>
                            <div class="typing typing-3"></div>
                        </div>
                    </div>
                    <div class="input">
                        <form action="#" class="chat-form">
                            <input id="chat-input" autocomplete="off" placeholder="메시지를 입력해주세요!" type="text">
                            <i class="fa-solid fa-paper-plane" id="chat-submit"></i>
                        </form>
                    </div>
                </div>

            </div>
        </div>
        
        
	<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	
	<!-- https://github.com/sockjs/sockjs-client -->
	<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
	<script>
		
		const cmNo = "${cmNo}";
		const contextPath = "${contextPath}";
		let memName = '${memName}';
		
		console.log(memName);


		// 로그인이 되어 있을 경우에만
		// /chat 이라는 요청 주소로 통신할 수 있는  WebSocket 객체 생성
		const chattingSock = new SockJS(contextPath+"/chat");
			// -> websocket 프로토콜을 이용해서 해당 주소로 데이터를 송/수신 할 수 있다.


		/*  WebSocket
		
		- 브라우저와 웹 서버간의 전이중 통신을 지원하는 프로토콜

		* 전이중 통신(Full Duplex) : 두대의 단말기가 데이터를 동시에 송/수신 하기 위해
		  각각 독립된 회선을 사용하는 통신 방식(ex. 전화 )

		- HTML5 부터 지원
		- Java 7 부터 지원 (8 버전 이상 사용 권장)
		- Spring Framework 4 이상 부터 지원
		*/


	</script>
	<script src='${contextPath}/resources/js/chat.js'></script>
	<!-- <script src="${contextPath}/resources/js/bootstrapjs/rightsidebar.js"></script> -->
	<script>
		// 페이지 로딩 완료 시 채팅창을 제일 밑으로 내리기





	</script>

        <script src="${contextPath}/resources/js/chat/chatting.js"></script>
</body>
