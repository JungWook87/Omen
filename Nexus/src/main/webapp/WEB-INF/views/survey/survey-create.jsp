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
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/survey/survey.css ">
  <link rel="stylesheet" href="${contextPath}/resources/css/survey/survey-create.css ">
  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
  <!-- jquery cdn -->
  <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
    crossorigin="anonymous"></script>
  <title>설문</title>
</head>

<body>

  <jsp:include page="/WEB-INF/views/common/header.jsp"/>

  <section>

    <!-- 사이드 바 -->
    <div class="side-bar menu">
      <!-- 페이지마다 바뀌는 제목 -->
      <h1>설문생성/관리</h1>

      <!-- 페이지마다 바뀌는 부제목 -->
      <ul>
        <li><a href="surveyList"><span>설문 리스트</span> </a></li>
        <li><a href="surveyManage"><span>설문 생성/관리</span> </a></li>
      </ul>
    </div>

    <!-- 컨텐츠 내용 -->
    <div class="content-all-page">

      <!-- 컨텐츠 내용 윗부분 -->
      <div class="content-all-top-area">

        <div class="content-all-top-area-detail">

          <!-- 컨텐츠 제목 부분 -->
          <div class="content-all-top-texts">
            <input id="surveyTitle" class="surveyTitle" type="text" placeholder=" 제목 없는 설문 ">
            <input id="surveyContent" class="surveyContent" type="text" placeholder=" 설문에 대한 설명을 적어주세요(선택사항)">
          </div>
        </div>

        <div>
          <input id="surveyOption" class="surveyOption" name="surveyOption" type="text" placeholder="옵션을 입력해주세요"> 
          <button>지우기</button>
        </div>
        
        <button onclick="return optionAdd()"> + 옵션추가 </button>

      </div>

    </div>


    <!-- 채팅창 -->
    <div id="chatting-function" class="chatting-box">
      <a href="#">
        <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
      </a>
    </div>
  </section>

  <script src="${contextPath}/resources/js/survey/survey-create.js"></script>


</body>

</html>