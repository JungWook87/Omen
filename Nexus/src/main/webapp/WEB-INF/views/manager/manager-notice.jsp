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
  <link rel="stylesheet" href="${contextPath}/resources/css/manager/manager-notice.css">
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


  <title>관리자-공지사항등록</title>
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

        <div class="content-all-top-area-detail">

          <!-- 컨텐츠 제목 부분 -->
          <div>
            <p class="content-all-top-text1">공지사항 / </p>
            <p class="content-all-top-text2">공지사항 등록</p>
          </div>

          <!-- 오른쪽 버튼 부분 -->

          <!-- 공지사항 모달창 -->
          <div>
            <button type="button" class="omen-btn" id="popupBtn">공지사항 추가</button>
          </div>

          <div id="modalWrap">
            <div class="modalBody">
              <span id="closeBtn">
                <img src="../images/Xbtn.png" alt="">
              </span>
              <h1>공지사항</h1>
              <!-- 선1 -->
              <div class="modal-line"></div>

              <!-- <form action="#" method="post" enctype="multipart/form-data"> -->
              <!-- 제목 -->
              <div class="modal-title">
                <p>제목</p>
                <input type="text" placeholder="제목을 입력해주세요" required>
              </div>
              <!-- 내용 -->
              <div class="modal-detail">
                <p>내용</p>
                <textarea name="" id="" onkeydown="handleResizeHeight(this)"
                  onkeyup="handleResizeHeight(this)"></textarea>
              </div>
              <!-- 파일 업로드 -->
              <div class="file-box">
                <button type="button" id="file-remove">파일 지우기</button>
                <label for="file-uploads">파일 올리기</label>
                <input type="file" id="file-uploads" name="file-uploads" accept="" multiple>
              </div>
              <!-- 선택된 파일 -->
              <div class="preview"></div>
              <!-- 선2 -->
              <div class="modal-line"></div>
              <!-- 버튼 -->
              <div class="notice-submit-reset-btns">
                <button type="reset" id="cancell-btn">취소</button>
                <button id="success-btn">확인</button>
              </div>
              <!-- </form> -->
            </div>
          </div>

        </div>




      </div>

      <!-- 컨텐츠 내용 아랫부분 -->
      <div class="content-all-bottom-area">
        <div class="notice-table">
          <table>

            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성일</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>공지사항입니다</td>
                <td>2023년 6월 4일(일)</td>
              </tr>


            </tbody>
          </table>
        </div>
      </div>

      <!-- 사용자가 작성한 공지사항 열기 -->
      <div id="check-modalWrap">
        <div class="check-modalBody">
          <span id="check-closeBtn">
            <img src="../images/Xbtn.png" alt="">
          </span>
          <h1>공지사항</h1>
          <!-- 선1 -->
          <div class="modal-line"></div>

          <!-- 제목 -->
          <div class="check-modal-title">
            <p>제목</p>
            <input type="text" readonly>
          </div>
          <!-- 내용 -->
          <div>
            <p>내용</p>
            <div class="check-modal-detail"></div>
          </div>

          <!-- 선택된 파일 -->
          <p>첨부파일</p>
          <div class="check-preview"></div>
          <!-- 선2 -->
          <div class="modal-line"></div>
          <!-- 버튼 -->
          <div class="notice-submit-reset-btns">
            <button id="check-remove-btn">삭제</button>
            <button type="reset" id="check-cancell-btn">닫기</button>
            <button id="check-success-btn">수정</button>
          </div>

        </div>
      </div>

    </div>

    <!-- 채팅창 -->
    <div id="chatting-function" class="chatting-box">
      <a href="#">
        <img class="chatting-img" src="../images/chattImg.png" alt="">
      </a>
    </div>
  </section>


  <script src="../js/manager-notice.js"></script>
  <script src="../component/component.js"></script>
</body>

</html>