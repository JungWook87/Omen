<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<c:set var="survey" value="${map.survey}" />
<c:set var="surveyResultList" value="${map.surveyResultList}" />
<c:set var="optionMemberCount" value="${map.optionMemberCount}" />
<c:set var="respMember" value="${map.respMember}" />

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/survey/survey-result.css ">
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

    <title>설문 - 설문 결과</title>
</head>

<body>

    <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    <section>

        <!-- 사이드 바 -->
        <div class="side-bar menu">
            <!-- 페이지마다 바뀌는 제목 -->
            <h1>설문</h1>
	
	      <!-- 페이지마다 바뀌는 부제목 -->
	      <ul>
	        <li><a href="surveyList"><span>설문 리스트</span> </a></li>
	        <li><a href="surveyManage"><span>설문 생성/관리</span> </a></li>
	      </ul>
	    </div>

		
        <!-- 컨텐츠 내용 -->
        <div class="content-all-page">

            <!-- 윗부분 -->
           <div class="survey-result-top">
                <h1>${survey.surveyTopic}</h1>
                <span>${survey.surveyContent}</span>
                <br>
                <br>
            </div>

            <!-- 가운데 -->
            <div class="survey-result-content">
            	<span>질문 : ${surveyResultList[0].question}</span> <br> <br>
                <c:forEach var="surveyResult" items="${surveyResultList}">
					<input id="${surveyResult.optionNo}" type="hidden" value="${surveyResult.optionAnnotation}">
                </c:forEach>
                <div id="survey-result-content-detail">
		            <c:forEach var="optionMemberCount" items="${optionMemberCount}">
		                <span></span>
		                <span>${optionMemberCount} 명 참여</span>
						<progress value="${optionMemberCount}" max="${respMember}"></progress>
		            </c:forEach>                
                </div>
            </div>

            <!-- 아래 취소 저장 부분 -->
            <div class="survey-result-bottom">
                <button type=button id="survey-result-bottom-cancle">목록으로</button>
            </div>


        </div>



        <!-- 채팅창
        <div id="chatting-function" class="chatting-box">
            <a href="#">
                <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
            </a>
        </div> -->
    </section>


    <script src="${contextPath}/resources/js/survey/survey-result.js"></script>

</body>

</html>