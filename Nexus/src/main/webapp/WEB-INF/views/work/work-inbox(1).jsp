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

  <!-- 날짜조회api-->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css">

  <title>결재-수신함-결재할것</title>
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

      <!-- 데스크 탑 -->
      <div class="desktop">

        <ul>
          <li><a href="workInbox"><span>결재할문서</span> </a></li>
          <li><a href="workInbox"><span>결재진행중</span> </a></li>
          <li><a href="workInboxEnd"><span>결재완료</span> </a></li>
        </ul>

      </div>
      
      <!-- 모바일 -->
      <div class="mobile">
        
        <ul>
            <li><a href="#" class="item"><i class="fa-sharp fa-solid fa-file-export"></i></a></li>
            <li><a href="#" class="item"><div><i class="fa-solid fa-box"></i></div></a></li>
            <li><a href="#" class="item"><i class="fa-solid fa-floppy-disk"></i></a></li>
            <li><a href="#" class="item"><i class="fa-solid fa-download"></i></i></a></li>
        </ul>

      </div>

    </div>
<!------------------------------------- 사이드 바 끝 ------------------------------------------------->

<!-------------------------------- 컨텐츠 내용 --------------------------------------------------------------------->
    <div class="content-all-page">

      <div class="content-all-top-area">
        <p class="content-all-top-text1">결재 / </p>
        <p class="content-all-top-text2">결재할 문서(${fn:length(list)})</p>
      </div>

      <div class="content-all-bottom-area">

        <div class="content-all-bottom-area-header">

            <select placeholder="전체" id="attnTypeSelect">
              <option value="0">전체</option>
              <option value="1">일반</option>
              <option value="2">연차</option>
              <option value="3">출장</option>
            </select>

            <div class="button-box">

              <button type="button" class="search-btn" >검색하기</button>
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
                <th>작성일</th>
              </tr>
              
            </thead>

            <tbody>
              <c:forEach var="list" items="${list}">
                <tr class="listTr" onclick="detailModal(${list.workNo})">
                  <td class="listTypeNo" style="display: none;">${list.typeNo}</td>
                  <td>${list.typeName}</td>
                  <td>${list.workNo}</td>
                  <td>${list.title}</td>
                  <td>${list.memName}</td>
                  <c:if test="${empty list.fileRename}">
                    <td>없음</td>
                  </c:if>
                  <c:if test="${not empty list.fileRename}">
                    <td>있음</td>
                  </c:if>
                  <td>${fn:substring(list.sendDate, 0, 11)}</td>
                </tr>
              </c:forEach>
            </tbody>
            
          </table>

        </div>
        
      </div>
     
    </div>  
<!-------------------------------- 컨텐츠 내용 영역 끝 --------------------------------------------------------------------->

<jsp:include page="/WEB-INF/views/work/write-approval.jsp"/>

<!-- 페이지 정의 -->
<c:set var = "flag" value= "1" scope="request"/>
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