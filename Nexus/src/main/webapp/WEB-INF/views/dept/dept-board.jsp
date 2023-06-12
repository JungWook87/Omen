<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>

<c:set var="pagination" value="${map.pagination}" />
<c:set var="boardList" value="${map.boardList}" />

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/dept/dept-board.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
  <!-- jquery cdn -->
  <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
    crossorigin="anonymous"></script>
  <title>부서 게시판</title>
</head>

<body>

   <jsp:include page="/WEB-INF/views/common/header.jsp"/>
    
  <section>

    <!-- 사이드 바 -->
    <div class="side-bar menu">
      <!-- 페이지마다 바뀌는 제목 -->
      <h1>부서</h1>

      <!-- 페이지마다 바뀌는 부제목 -->
      <ul>
        <li><a href="deptNotice"><span>부서 공지사항</span> </a></li>
        <li><a href="deptBoard"><span>부서 게시판</span> </a></li>
        <li><a href="deptSchedule"><span>부서 일정</span> </a></li>
      </ul>
    </div>

    <!-- 컨텐츠 내용 -->
    <div class="content-all-page">

      <!-- 컨텐츠 내용 윗부분 -->
      <div class="content-all-top-area">

        <div class="content-all-top-area-detail">

          <!-- 컨텐츠 제목 부분 -->
          <div>
            <p class="content-all-top-text1">부서 / </p>
            <p class="content-all-top-text2">부서 게시판</p>
          </div>
          
           <div>
            <button class="omen-btn" id="popupBtn">글쓰기</button>
          </div>

          <!-- 글쓰기 모달 창 -->
          
          <div id="modalWrap">
            <div class="modalBody">
              <span id="closeBtn">
                <img src="${contextPath}/resources/images/Xbtn.png" alt="">
              </span>
              <h1>부서 게시판</h1>
              <!-- 선1 -->
              <div class="modal-line"></div>

              <form action="write" method="post" enctype="multipart/form-data" onsubmit="return writeValidate()">
                <!-- 제목 -->
                <div class="modal-title">
                  <p>제목</p>
                  <input name="noticeTitle" type="text" placeholder="제목을 입력해주세요" value="${detail.boardTitle}">
                </div>
                <!-- 내용 -->
                <div class="modal-detail">
                  <p>내용</p>
                  <textarea name="noticeContent" id="noticeContent" onkeydown="handleResizeHeight(this)"
                    onkeyup="handleResizeHeight(this)" value="${detail.boardContent}"></textarea>
                </div>
                <!-- 파일 업로드 -->
                <div class="file-box">
                  <button type="button" id="file-remove">파일 지우기</button>
                  <label for="file-uploads">파일 올리기</label>
                  <input type="file" id="file-uploads" name="uploadFile" accept="" multiple>
                </div>
                <!-- 선택된 파일 -->
                <div class="preview"></div>
                <!-- 선2 -->
                <div class="modal-line"></div>
                <!-- 버튼 -->
                <div class="notice-submit-reset-btns">
                  <button type="reset" id="cancell-btn">취소</button>
                  <button type="submit" id="success-btn">확인</button>
                </div>
              </form>
            </div>
          </div>


        </div>




      </div>

      <!-- 컨텐츠 내용 아랫부분 -->
      <div class="content-all-bottom-area">
        <div class="dept-notice-table">
          <table>

            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>

            <tbody>
              <c:choose>
                <c:when test="${empty boardList}">
                    <tr>
                        <th colspan="4">게시글이 존재하지 않습니다.</th>
                    </tr>
                </c:when>

                <c:otherwise>
                    <c:forEach var="board" items="${boardList}">
                        <tr onclick="modifyModal()">
                            <td>${board.boardNo}</td>
                            <td>
                           		 <a href="../detail/${board.boardNo}"> ${board.boardTitle}</a>
                            </td>
                            <td>${board.memName}</td>
                            <td>${board.boardDate}</td>
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

      <!-- 사용자가 작성한 공지사항 열기 -->
      <div id="check-modalWrap">
        <div class="check-modalBody">
          <span id="check-closeBtn">
            <img src="${contextPath}/resources/images/Xbtn.png" alt="">
          </span>
          <h1>부서 게시판</h1>
          <!-- 선1 -->
          <div class="modal-line"></div>
			
			
		 
          <!-- 제목 -->
          <div class="check-modal-title">
            <p>제목</p>
            <span></span>
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
        <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
      </a>
    </div>
  </section>


  <script src="${contextPath}/resources/js/dept/dept-board.js"></script>

</body>

</html>