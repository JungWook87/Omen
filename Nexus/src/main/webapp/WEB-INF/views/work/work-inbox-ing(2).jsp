<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/work-send.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/work-inbox(1).css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/checked-approval.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/write-approval.css">
  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

    <!-- 폰트어썸 -->
    <script src="https://kit.fontawesome.com/3cd0aae50a.js" crossorigin="anonymous"></script>

  <title>결재-수신함-결재 진행중</title>
</head>

<body>

  <jsp:include page="/WEB-INF/views/common/header.jsp"/>

  <section>
<!------------------------------------- 사이드 바 --------------------------------------------------->
    <div class="side-bar menu">

      <div class="side-barTitle">

        <a href="workSend" id="side-barTitle-a">
          <img src="${contextPath}/resources/images/leftArrow.png" alt="">
        </a>

      <h1>수신함</h1>

      </div>

        <ul>
          <li><a href="workInbox"><span>결재할문서</span> </a></li>
          <li><a href="workInboxIng"><span>결재진행중</span> </a></li>
          <li><a href="workInboxEnd"><span>결재완료</span> </a></li>
        </ul>
    
    </div>
<!------------------------------------- 사이드 바 끝 ------------------------------------------------->
<!------------------------------------- 컨텐츠 내용 -------------------------------------------------->
    <div class="content-all-page">

      <div class="content-all-top-area">
        <p class="content-all-top-text1">결재 / </p>
        <p class="content-all-top-text2">결재 진행중(${fn:length(list)})</p>
      </div>

      <!-- 컨텐츠 내용 아랫부분 -->
      <div class="content-all-bottom-area">

        <div class="content-all-bottom-area-header">

          <select placeholder="전체" id="attnTypeSelect">
            <option value="0">전체</option>
            <option value="1">일반</option>
            <option value="2">연차</option>
            <option value="3">출장</option>
          </select>

            <div class="button-box">

              <button type="button" class="omen-btn" id="popupBtn">결재 작성하기</button>
              
            </div>    

        </div>

        <div class="content-all-bottom-area-content">

          <table>
            
            <thead>
              
              <tr>
                <th>종류</th>
                <th>결재 번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>첨부파일</th>
                <th>결재의견</th>
                <th>작성일</th>
              </tr>
              
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>1234</td>
                <td>테스트입니다</td>
                <td>테스터</td>
                <td>없음</td>
                <td>없음</td>
                <td>2023.5.10</td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>

    </div>
    <!------------------------------------------------ 컨텐츠 내용 끝 ------------------------------------------------>

    <jsp:include page="/WEB-INF/views/work/write-approval.jsp"/>
    <jsp:include page="/WEB-INF/views/work/checked-approval.jsp"/>

    <!-- 채팅창 -->
    <div id="chatting-function" class="chatting-box">
      <a href="#">
        <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
      </a>
    </div>

  </section>
  
</body>

<script src="${contextPath}/resources/js/work/work-inbox(1).js"></script>
<script src="${contextPath}/resources/js/work/write-approval.js"></script>
<script src="${contextPath}/resources/js/work/checked-approval.js"></script>

</html>