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
  <link rel="stylesheet" href="${contextPath}/resources/css/manager/manager-employeeDelete.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">

  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
  <!-- jquery cdn -->
  <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
    crossorigin="anonymous"></script>
  <!-- 우편번호 api -->
  <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
  <!-- Favicon-->
  <link rel="icon" type="image/x-icon" href="${contextPath}/resources/images/favicon.png" />


  <title>관리자-직원삭제</title>
</head>

<body>

  <jsp:include page="/WEB-INF/views/common/manager-header.jsp"/>
  <section>

    <!-- 사이드 바 -->
    <div class="side-bar menu">
      <!-- 페이지마다 바뀌는 제목 -->
      <h1>직원</h1>
      <ul class="employee-ul">
        <li><a href="${contextPath}/member/memberAdd"><span>추가</span> </a></li>
        <li><a href="${contextPath}/member/memberUpdate"><span>정보 수정</span> </a></li>
        <li><a href="${contextPath}/member/memberDelete"><span>삭제</span> </a></li>
      </ul>
      <h1>공지사항</h1>
      <ul class="notice-ul">
        <li><a href="${contextPath}/member/notice"><span>공지사항 등록</span> </a></li>
      </ul>
    </div>

    <!-- 컨텐츠 내용 -->
    <div class="content-all-page">
      <a href="#" id="sidebar-toggle"></a>

      <!-- 컨텐츠 내용 윗부분 -->
      <div class="content-all-top-area">
        <p class="content-all-top-text1">직원 / </p>
        <p class="content-all-top-text2">삭제</p>
        <!-- 선 -->
        <div class="content-all-top-line"></div>
      </div>

      <!-- 컨텐츠 내용 아랫부분 -->
      <div class="content-all-bottom-area">

        <!-- <form action="" method="post"> -->
        <!-- 이름 -->

        <div class="employee-delete-input">
          <input type="text" id="delete-name" maxlength="15" autocomplete="off" required>
          <label>이름</label>
          <span></span>
        </div>

        <!-- 사원 번호 -->
        <div class="employee-delete-input">
          <input type="text" id="delete-no" maxlength="30" autocomplete="off" required>
          <label>사원 번호</label>
          <span></span>
        </div>

        <button id="delete-btn" class="employee-delete-btn">직원 삭제</button>

        <!-- </form> -->
      </div>

    </div>

    <!-- 채팅창 -->
    <div id="chatting-function" class="chatting-box">
      <a href="#">
        <img class="chatting-img" src="../images/chattImg.png" alt="">
      </a>
    </div>
  </section>

  <script src="../js/manager-employeeDelete.js"></script>
  <script src="../component/component.js"></script>
</body>

</html>