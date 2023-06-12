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
  <link rel="stylesheet" href="${contextPath}/resources/css/work/work-send.css">

  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

  <!-- 날짜조회api-->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/jquery/latest/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

  <title>결재</title>
</head>

<body>

  <jsp:include page="/WEB-INF/views/common/header.jsp"/>
  <section>

    <!-- 사이드 바 -->
    <div class="side-bar menu">
      <!-- 페이지마다 바뀌는 제목 -->
      <h1>결재</h1>

      <!-- 페이지마다 바뀌는 부제목 -->
      <ul>
        <li><a href="workSend"><span>상신함</span> </a></li>
        <li><a href="workInbox"><span>수신함</span> </a></li>
        <li><a href="workTemp"><span>임시저장</span> </a></li>
        <li><a href="workTemplate"><span>템플릿</span> </a></li>
      </ul>
    </div>

    <!-- 컨텐츠 내용 -->
    <div class="content-all-page">

      <!-- 컨텐츠 내용 윗부분 -->
      <div class="content-all-top-area">
        <p class="content-all-top-text1">결재 / </p>
        <p class="content-all-top-text2">내가 작성한 결재(0)</p>
        <!-- 시작일 / 종료일 -->
        <div class="content-all-date">
          
          <div class="content-all-date-p">

            <p class="date-p">
              시작일
            </p>
            
            <p class="date-p">
              종료일
            </p>

          </div>

          <div class="content-all-date-input">
            
            <input type="text" id="dateClick" name="daterange" value="01/01/2023 - 01/15/2023" />
            <label for="dateClick">⌵</label>
            <button type="button" class="omen-btn" id="dateBtn">조회</button>
          </div>
          
        </div>
        
      </div>

      <!-- 컨텐츠 내용 아랫부분 -->
      <div class="content-all-bottom-area">
        
        <div class="content-all-bottom-area-header">

            <select placeholder="전체">
              <option value="전체">전체</option>
              <option value="진행중">근태</option>
              <option value="근무">근무</option>
              <option value="비용">비용</option>
              <option value="일반">일반</option>
            </select>

            <div class="button-box">

              <button type="button" class="search-btn" >검색하기</button>
              <button type="button" class="omen-btn" id="popupBtn">결재 작성하기</button>
              
            </div>    

        </div>

        <div id="modalWrap">
          <div class="work-modalBody">
            <span id="closeBtn">
              <img src="${contextPath}/resources/images/Xbtn.png" alt="">
            </span>
            <h1>결제상신</h1>
            <!-- 선1 -->
            <div class="work-modal-line"></div>

            <!-- <form action="#" method="post" enctype="multipart/form-data"> -->
              <!-- 템플릿 -->
              <div class="work-modal-template">
                <p>결재 타입</p>

                <div class="work-modal-template-select">

                  <select name="" id="work-template">
                    <option value="normal-check">일반</option>
                    <option value="business trip">출장</option>
                    <option value="vacation">연차</option>
                    <option value="project">프로젝트</option>
                  </select>
                  
                  <select name="" id="normal-check">
                    <option value="">경조금신청서(예시)</option>
                    <option value="">구매요청서(예시)</option>
                    <option value="">자산요청서(예시)</option>
                    <option value="">지출결의서(예시)</option>
                  </select>

                </div>
              </div>   
            <!-- 제목 -->
            <div class="work-modal-title">
              <p>제목</p>
              <input type="text" placeholder="제목을 입력해주세요" required>
            </div>
            <!-- 출장지 -->
            <div class="work-modal-businessArea">
              <p>출장지</p>
              <input type="text">
            </div>
            <!-- 시작날짜 -->
            <div class="work-modal-startDate">
              <p>시작날짜</p>
              <input type="date">
            </div>
            <!-- 종료날짜 -->
            <div class="work-modal-endDate">
              <p>종료날짜</p>
              <input type="date">
            </div>
            <!-- 내용 -->
            <div class="work-modal-detail">
              <p>내용</p>
              <textarea name="" id="" onkeydown="handleResizeHeight(this)"
                onkeyup="handleResizeHeight(this)"></textarea>
            </div>
            <!-- 출장내용 -->
            <div class="work-modal-businessDetail">
              <p>출장 내용</p>
              <textarea name="" id="" onkeydown="handleResizeHeight(this)"
                onkeyup="handleResizeHeight(this)"></textarea>
            </div>
            <!-- 결재자 -->
            <div class="work-modal-approver">
              <p>결재자</p>
              <input type="text">
            </div>
            <!-- 파일 업로드 -->
            <div class="work-file-box">
              <button type="button" id="file-remove">파일 지우기</button>
              <label for="file-uploads">파일 올리기</label>
              <input type="file" id="file-uploads" name="file-uploads" accept="" multiple>
            </div>
            <!-- 선택된 파일 -->
            <div class="work-preview"></div>
            <!-- 선2 -->
            <div class="work-modal-line"></div>
            <!-- 임시저장 버튼 -->
            <div class="work-modal-save">
              <button type="button" id="save-draft">임시 저장</button>
            </div>
            <!-- 버튼 -->
            <div class="work-submit-reset-btns">
              <button type="reset" id="cancell-btn">취소</button>
              <button id="success-btn">확인</button>
            </div>
            <!-- </form> -->
          </div>
        </div>

        <div class="content-all-bottom-area-content">

          <table>
            
            <thead>
              
              <tr>
                <th>종류</th>
                <th>결재 번호</th>
                <th>제목</th>
                <th>상태</th>
                <th>첨부파일</th>
                <th>작성일</th>
              </tr>
              
            </thead>

            <tbody>
              <tr>
                <td>1</td>
                <td>1234</td>
                <td>테스트입니다</td>
                <td>결재완료</td>
                <td>없음</td>
                <td>2023.5.10</td>
              </tr>
            </tbody>


            
          </table>

        </div>

      </div>

    </div>

    <!-- 사용자가 작성한 공지사항 열기 -->
    <div id="check-modalWrap">
      <div class="check-modalBody">
        <span id="check-closeBtn">
          <img src="${contextPath}/resources/images/Xbtn.png" alt="">
        </span>
        <h1>결재상신</h1>
        <!-- 선1 -->
        <div class="modal-line"></div>

        <!-- 템플릿 -->
        <div class="check-modal-template">
          <p>템플릿</p>
          <select name="" id="">
            <option value="">경조금신청서(예시)</option>
            <option value="">구매요청서(예시)</option>
            <option value="">자산요청서(예시)</option>
          </select>
        </div>
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
        <!-- 결재자 -->
        <div class="check-modal-approver">
          <p>결재자</p>
          <input type="text">
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


    <!-- 채팅창 -->
    <div id="chatting-function" class="chatting-box">
      <a href="#">
        <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
      </a>
    </div>
  </section>
</body>

<script src="${contextPath}/resources/js/work/work-send.js"></script>
</html>