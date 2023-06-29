<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

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
            <link rel="icon" type="image/x-icon" href="${contextPath}/resources/images/favicon.png" />
            <!-- Bootstrap icons-->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />



            <title>메인페이지</title>
        </head>

        <body>

            <!-- 메인 헤더 부분 시작 -->
            <header>
                <div class="main-header">
                    <div class="main-banner-top">

                        <!-- 로고 -->
                        <div>
                            <a href="main">
                                <img src="${contextPath}/resources/images/logo-width.png" alt="">
                            </a>
                        </div>

                        <!-- 네비바 -->
                        <div>
                            <ul class="main-header-ul">
                                <li><a href="${contextPath}/main">홈</a> </li>
                                <li><a href="${contextPath}/notice/list">공지사항</a> </li>
                                <li><a href="${contextPath}/dept/deptNotice">부서</a> </li>
                                <li><a href="${contextPath}/work/workSend">결재</a> </li>
                                <li><a href="${contextPath}/attendance/list">근무/휴가</a> </li>
                                <li><a href="${contextPath}/meetingRoom/reservation">회의실</a> </li>
                                <li><a href="${contextPath}/survey/surveyList">설문</a> </li>
                                <li><a href="${contextPath}/dashBoard/dashBoardMain">대시보드</a></li>
                            </ul>
                        </div>

                        <!-- 로그아웃 -->

                        <button class="log-out-btn">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            로그아웃
                        </button>

                    </div>

                    <!-- 배너 텍스트 부분 -->
                    <div class="main-banner-bottom">
                        <div class="main-banner-text1">
                            혁신을 밝히는 기업
                        </div>
                        <div class="main-banner-text2">
                            <div>
                                사람과 공간을 연결해 새로운 삶의 문화가 되다
                            </div>

                        </div>

                    </div>
                </div>

                <div class="Responsive-header">

                    <a href="">
                        <img src="${contextPath}/resources/images/logo-width.png" alt="">
                    </a>
                    <input type="checkbox" class="menu-btn" id="menu-btn" />
                    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
                    <ul class="menu">
                        <li><a href="${contextPath}/main">홈</a> </li>
                        <li><a href="${contextPath}/notice/list">공지사항</a> </li>
                        <li><a href="${contextPath}/dept/deptNotice">부서</a> </li>
                        <li><a href="${contextPath}/work/workSend">결재</a> </li>
                        <li><a href="${contextPath}/attendance/list">근무/휴가</a> </li>
                        <li><a href="${contextPath}/meetingRoom/reservation">회의실</a> </li>
                        <li><a href="${contextPath}/survey/surveyList">설문</a> </li>
                        <li><a class="log-out">로그아웃</a></li>
                    </ul>
                </div>




            </header>

            <!-- 메인 헤더 부분 끝 -->

            <section>
                <!-- 메인 섹션 왼쪽 부분 -->
                <div class="main-area-left">

                    <!-- 출퇴근 시간 -->
                    <c:choose>
                        <c:when test="${ empty todayAttn.attnStart }">
                            <div id="main-attn-check" class="main-box">
                                <div class="main-attn-area">
                                    <div id="main-attn-circle"></div>
                                    <span class="main-font-title">업무중 : --시간 --분</span>
                                </div>
                                <div>
                                    <table>
                                        <tr>
                                            <th>출근시간</th>
                                            <th>퇴근시간</th>
                                        </tr>
                                        <tr>
                                            <td id="attn-start">-- : --</td>
                                            <td id="attn-end">-- : --</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="main-attn-btns">
                                    <button class="main-attn-btn1">마이페이지</button>
                                    <button class="main-attn-btn2">업무시작</button>
                                </div>
                            </div>
                        </c:when>

                        <c:when test="${not empty todayAttn.attnStart and todayAttn.attnEnd eq '-- : --'}">
                            <div style="display: none;" id="todayAttnStart">${todayAttn.attnStart}</div>
                            <div id="main-attn-check" class="main-box">
                                <div class="main-attn-area">
                                    <div id="main-attn-circle" style="background-color: springgreen;"></div>
                                    <span class="main-font-title">업무중 : --시간 --분</span>
                                    <script>
                                        (function () {

                                            let todayAttnStart = document.getElementById("todayAttnStart").innerText;

                                            const now = new Date();

                                            let workingHour = now.getHours() - Number(todayAttnStart.split(" : ")[0]);
                                            let workingMinute = now.getMinutes() - Number(todayAttnStart.split(" : ")[1]);

                                            if (workingMinute < 0) {
                                                workingHour -= 1;
                                                workingMinute += 60;
                                            }

                                            document.getElementsByClassName("main-font-title")[0].innerText = "업무중 : " + workingHour + " 시간 " + workingMinute + " 분";
                                        })();
                                    </script>
                                </div>
                                <div>
                                    <table>
                                        <tr>
                                            <th>출근시간</th>
                                            <th>퇴근시간</th>
                                        </tr>
                                        <tr>
                                            <td id="attn-start">${todayAttn.attnStart}</td>
                                            <td id="attn-end">-- : --</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="main-attn-btns">
                                    <button class="main-attn-btn1">마이페이지</button>
                                    <button class="main-attn-btn2" style="background-color: #E6E8EC;">업무종료</button>
                                </div>
                            </div>
                        </c:when>

                        <c:otherwise>
                            <div style="display: none;" id="todayAttnStart">${todayAttn.attnStart}</div>
                            <div style="display: none;" id="todayAttnEnd">${todayAttn.attnEnd}</div>
                            <div id="main-attn-check" class="main-box">
                                <div class="main-attn-area">
                                    <div id="main-attn-circle"></div>
                                    <span class="main-font-title">업무중 : --시간 --분</span>
                                    <script>
                                        (function () {

                                            let todayAttnStart = document.getElementById("todayAttnStart").innerText;
                                            let todayAttnEnd = document.getElementById("todayAttnEnd").innerText;

                                            let workingHour = Number(todayAttnEnd.split(" : ")[0]) - Number(todayAttnStart.split(" : ")[0]);
                                            let workingMinute = Number(todayAttnEnd.split(" : ")[1]) - Number(todayAttnStart.split(" : ")[1]);

                                            if (workingMinute < 0) {
                                                workingHour -= 1;
                                                workingMinute += 60;
                                            }

                                            document.getElementsByClassName("main-font-title")[0].innerText = "업무종료 : " + workingHour + " 시간 " + workingMinute + " 분";
                                        })();
                                    </script>
                                </div>
                                <div>
                                    <table>
                                        <tr>
                                            <th>출근시간</th>
                                            <th>퇴근시간</th>
                                        </tr>
                                        <tr>
                                            <td id="attn-start">${todayAttn.attnStart}</td>
                                            <td id="attn-end">${todayAttn.attnEnd}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="main-attn-btns">
                                    <button class="main-attn-btn1">마이페이지</button>
                                    <button class="main-attn-btn2">업무시작</button>
                                </div>
                            </div>
                        </c:otherwise>
                    </c:choose>

                    <!-- 결재 진행 상황 -->
                    <div id="main-work-progress" class="main-box">
                        <div class="main-box-title">
                            <div class="main-box-title-left">
                                <img src="${contextPath}/resources/images/work-progress.png" alt="">
                                <span>결재 진행 상황</span>
                            </div>
                            <div class="main-box-title-right">
                                <a href="">전체보기</a>
                                <img src="${contextPath}/resources/images/right-arrow.png" alt="">
                            </div>
                        </div>
                        <div class="main-work-progress-box">
                            <p>결재할 항목이 없습니다.</p>
                        </div>
                    </div>

                    <!-- 요청된 승인 -->
                    <div id="main-approval-list" class="main-box">
                        <div class="main-box-title">
                            <div class="main-box-title-left">
                                <img src="${contextPath}/resources/images/approval.png" alt="">
                                <span>요청된 승인</span>
                            </div>
                            <div class="main-box-title-right">
                                <a href="">전체보기</a>
                                <img src="${contextPath}/resources/images/right-arrow.png" alt="">
                            </div>
                        </div>
                        <div class="main-approval-list-box">
                            <p>지출결의서 - 법인카드(예시)</p>
                            <p>2023.05.24.수 19:39</p>
                        </div>
                    </div>
                </div>

                <!-- 메인 섹션 오른쪽 부분 -->
                <div class="main-area-right">

                    <!-- 오늘의 알림 -->
                    <div id="main-today-alert" class="main-box">
                        <div class="main-box-title">
                            <div class="main-box-title-left">
                                <img src="${contextPath}/resources/images/PushPin.png" alt="">
                                <span>오늘의 알림</span>
                            </div>
                            <div class="main-box-title-right">
                                <button id="main-today-alert-btn">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        </div>

                        <div class="main-today-line-box">
                            <input type="text" id="main-today-input" maxlength="70" readonly>
                        </div>
                    </div>

                    <!-- 부서일정 -->
                    <div id="main-calender" class="main-box">

                    </div>

                    <!-- 공지사항 & 부서 공지사항 -->
                    <div class="main-notice-box">
                        <!-- 공지사항 -->
                        <div id="main-notice" class="main-box2">
                            <div class="main-box-title">
                                <div class="main-box-title-left">
                                    <img src="${contextPath}/resources/images/Megaphone.png" alt="">
                                    <span>공지사항</span>
                                </div>
                                <div class="main-box-title-right">
                                    <a href="">전체보기</a>
                                    <img src="${contextPath}/resources/images/right-arrow.png" alt="">
                                </div>
                            </div>
                            <div class="main-notice-box-in-box">
                                <p>지출결의서 - 법인카드(예시)</p>
                                <p>2023.05.24.수 19:39</p>
                            </div>
                        </div>

                        <!-- 부서 공지사항 -->
                        <div id="main-dept-notice" class="main-box2">
                            <div class="main-box-title">
                                <div class="main-box-title-left">
                                    <img src="${contextPath}/resources/images/MegaphoneSimple.png " alt="">
                                    <span>부서 공지사항</span>
                                </div>
                                <div class="main-box-title-right">
                                    <a href="">전체보기</a>
                                    <img src="${contextPath}/resources/images/right-arrow.png" alt="">
                                </div>
                            </div>
                            <div class="main-dept-notice-box">
                                <p>지출결의서 - 법인카드(예시)</p>
                                <p>2023.05.24.수 19:39</p>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- 채팅창 -->
                <jsp:include page="/WEB-INF/views/common/chat-modal.jsp" />
            </section>

            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1"></script>
            <script src="${contextPath}/resources/js/main.js"></script>

            <c:if test="${ !empty message }">
                <script>
                    Swal.fire("${message}");
	        // EL 작성 시 scope를 지정하지 않으면
	        // page -> request -> session -> application 순서로 검색하여
	        // 일치하는 속성이 있으면 출력

                </script>
            </c:if>

        </body>

        </html>