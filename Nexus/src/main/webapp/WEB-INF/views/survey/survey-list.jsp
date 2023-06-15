<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<c:set var="pagination" value="${map.pagination}" />
<c:set var="surveyList" value="${map.surveyList}" />

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/survey/survey-list.css ">
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
      <h1>설문</h1>

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
            <a href="" class="content-all-top-text">전체(1)</a>
            <a href="" class="content-all-top-text2">미참여(0)</a>
            <a href="" class="content-all-top-text3">참여(1)</a>
          </div>
          

        </div>

      </div>

      <!-- 컨텐츠 내용 아랫부분 -->
      <div class="content-all-bottom-area">
        <div class="survey-table">
          <table>

            <thead>
              <tr>
                <th>상태</th>
                <th>제목</th>
                <th>기간</th>
                <th>참여여부</th>
              </tr>
            </thead>

            <tbody>
            
              <c:choose>
                <c:when test="${empty surveyList}">
                    <tr>
                        <th colspan="4">설문이 존재하지 않습니다.</th>
                    </tr>
                </c:when>
                
                <c:otherwise>
                    <c:forEach var="survey" items="${surveyList}">
                        <tr onclick="surveyDetail(${survey.surveyNo})">
                            <td id="status-color">${survey.end}</td>
                            <td>${survey.surveyTopic}</td>
                            <td>${survey.start}~${survey.end}</td>
                            <td id="participation-color">${survey.participation}</td>
                        </tr>
                    </c:forEach>
                </c:otherwise>
              </c:choose>
              
            </tbody>
          </table>
        </div>
        
        <div class="pagination-area">

          <!-- 페이지네이션 a태그에 사용될 공통 주소를 저장한 변수 선언 -->
          <c:set var="url" value="${boardCode}?cp="/>

          <ul class="pagination">
              <!-- 첫 페이지로 이동 -->
              <li><a href="${url}1${sURL}">&lt;&lt;</a></li>

              <!-- 이전 목록 마지막 번호로 이동 -->
              <li><a href="${url}${pagination.prevPage}${sURL}">&lt;</a></li>

              <!-- 범위가 정해진 일반 for문 사용 -->
              <c:forEach var="i" begin="${pagination.startPage}" end="${pagination.endPage}" step="1">

                  <c:choose>
                      <c:when test="${i == pagination.currentPage}">
                          <li><a class="current">${i}</a></li>
                      </c:when>

                      <c:otherwise>
                          <li><a href="${url}${i}${sURL}">${i}</a></li>        
                      </c:otherwise>
                  </c:choose>

              </c:forEach>
              
              <!-- 다음 목록 시작 번호로 이동 -->
              <li><a href="${url}${pagination.nextPage}${sURL}">&gt;</a></li>

              <!-- 끝 페이지로 이동 -->
              <li><a href="${url}${pagination.maxPage}${sURL}">&gt;&gt;</a></li>

          </ul>
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

   <script src="${contextPath}/resources/js/survey/survey-list.js"></script>
</body>

</html>