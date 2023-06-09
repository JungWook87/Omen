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
    <title>메인페이지</title>
</head>

<body>

    <!-- 메인 헤더 부분 시작 -->
    <header>
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
                    <li><a href="${contextPath}/work">결재</a> </li>
                    <li><a href="${contextPath}/attendance/list">근무/휴가</a> </li>
                    <li><a href="${contextPath}/meeting">회의실</a> </li>
                    <li><a href="${contextPath}/survey">설문</a> </li>
                </ul>
            </div>
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


    </header>

    <!-- 메인 헤더 부분 끝 -->

    <section>
        <!-- 메인 섹션 왼쪽 부분 -->
        <div class="main-area-left">

            <!-- 출퇴근 시간 -->
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
                            <td id="attn-start">00 : 00</td>
                            <td id="attn-end">00 : 00</td>
                        </tr>
                    </table>
                </div>
                <div class="main-attn-btns">
                    <button class="main-attn-btn1">마이페이지</button>
                    <button class="main-attn-btn2">업무시작</button>
                </div>
            </div>

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
                        <img class="main-today-alert-pencil" src="${contextPath}/resources/images/PencilSimple.png" alt="">
                    </div>
                </div>

                <div class="main-today-line-box">
                    <p>집에가고싶다  ~~ 세션 테스트 "${loginMember.memName}"" 의 접속 ~~</p>

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
        <div id="chatting-function" class="chatting-box">
            <a href="#">
                <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
            </a>
        </div>
    </section>
    
    <script src="${contextPath}/resources/js/main.js"></script> 

</body>

</html>