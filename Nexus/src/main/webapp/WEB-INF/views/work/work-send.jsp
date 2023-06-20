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
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

  <title>결재</title>
</head>

<body>
  <c:if test="${not empty messageFlag}">
    <c:if test="${messageFlag == '성공'}">
      <script>
        Swal.fire('결재 상신이 완료되었습니다.', '', 'success');
      </script>
    </c:if>
    <c:if test="${messageFlag == '실패'}">
      <script>
        Swal.fire('결재 상신이 실패하였습니다.', '다시 시도해주세요.', 'warning');
      </script> 
    </c:if>
  </c:if>

  <jsp:include page="/WEB-INF/views/common/header.jsp"/>
  <section>

<!--------------------------------------------------- 사이드 바 --------------------------------------------------->
    <div class="side-bar menu">

      <!------------------------------------------- 페이지마다 바뀌는 제목 ------------------------------------------->
      <h1>결재</h1>
      <!------------------------------------------ 페이지마다 바뀌는 제목 끝 ------------------------------------------>  
      <!----------------------------------------- 페이지마다 바뀌는 부제목 ----------------------------------------->
      <div class="desktop">

        <ul>
          <li><a href="workSend"><span>상신함</span> </a></li>
          <li><a href="workInbox"><span>수신함</span> </a></li>
          <li><a href="workTemp"><span>임시저장</span> </a></li>
          <li><a href="workTemplate"><span>템플릿</span> </a></li>
        </ul>

      </div>
      <!------------------------------------- 페이지마다 바뀌는 부제목 (데스크탑) 끝 ------------------------------------->
      <!-------------------------------- 페이지마다 바뀌는 부제목 (모바일)-------------------------------->
      <div class="mobile">

        <ul>
            <li><a href="#" class="item"><i class="fa-sharp fa-solid fa-file-export"></i></a></li>
            <li><a href="#" class="item"><div><i class="fa-solid fa-box"></i></div></a></li>
            <li><a href="#" class="item"><i class="fa-solid fa-floppy-disk"></i></a></li>
            <li><a href="#" class="item"><i class="fa-solid fa-download"></i></a></li>
        </ul>
      </div>
      <!--------------------------------- 페이지마다 바뀌는 부제목 (모바일) 끝--------------------------------->
    </div>
    <!-------------------------------------------------- 사이드바 영역 끝 -------------------------------------------------->
<!------------------------------------------------- 컨텐츠 내용 ------------------------------------------------->
  <div class="content-all-page">
<!--------------------------------------------------- 컨텐츠 내용 윗부분 --------------------------------------------------->
      <div class="content-all-top-area">
        <p class="content-all-top-text1">결재 / </p>
        <p class="content-all-top-text2">내가 작성한 결재(${fn:length(list)})</p>
        <!-------------------- 시작일 / 종료일 (DATE.API) 영역 -------------------->
        <div class="content-all-date">
          
          <div class="content-all-date-p">

            <p class="date-p">
              시작일
            </p>
            
            <p class="date-p">
              종료일
            </p>

          </div>
          <!-------------------------- 날짜 API (DATE.API) -------------------------->
          <div class="content-all-date-input">          
            <input type="text" id="dateClick" name="daterange" value="01/01/2023 - 01/15/2023" />
          </div>
          <!-------------------------- 날짜 API (DATE.API) 끝------------------------->
        </div>
        <!------------------------- 시작일 / 종료일 (DATE.API) 영역 끝------------------------->
      </div>
<!---------------------------------- 컨텐츠 내용 윗부분 영역 끝---------------------------------->
<!---------------------------------------- 컨텐츠 내용 아랫부분 ----------------------------------------------------------->
  <div class="content-all-bottom-area">
<!------------------------------------------ 컨텐츠 내용 아랫부분 헤더------------------------------------------>
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
<!------------------------------------------ 컨텐츠 내용 아랫부분 헤더 끝------------------------------------------>
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

            <tbody id="listBody">

              <c:forEach var="list" items="${list}">
                <tr class="listTr">
                  <td class="listTypeNo" style="display: none;">${list.typeNo}</td>
                  <td>${list.typeName}</td>
                  <td>${list.workNo}</td>
                  <td>${list.title}</td>
                  <c:choose>
                    <c:when test="${list.workState == '진행중'}">
                      <td style="color: var(--primary400);">${list.workState}</td>
                    </c:when>
                    <c:when test="${list.workState == '승인'}">
                      <td style="color: var(--green);">${list.workState}</td>
                    </c:when>
                    <c:otherwise>
                      <td style="color: red;">${list.workState}</td>
                    </c:otherwise>
                  </c:choose>
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
<!---------------------------------------- 수신함 모달창 열기 ---------------------------------------->

      <div id="checked-modalWrap">
        <div class="checked-modalBody">
          <span id="checked-closeBtn">
            <img src="${contextPath}/resources/images/Xbtn.png" alt="">
          </span>
          <form action="#" method="post" enctype="multipart/form-data">
            
            <!-- 모달창 시작 -->
            <div class="checked-modal-header">
              <!-- 제목 -->
              <h1 class="checked-modal-title">결재 예시</h1>
              <!-- 결재항목박스 -->
              <div class="checked-modal-modal-headerbox">
                <!-- 결재항목 내용 -->
                <div class="checked-modal-headerbox-content">
                  <!-- 문서번호 -->
                  <span class="checked-modal-modal-headerbox-content-a">문서번호 :</span>  
                  <span class="checked-modal-modal-headerbox-content-b">2023-05-26-20001990</span>
                </div>
                
                <div class="checked-modal-headerbox-content">
                  <!-- 작성자 -->
                  <span class="checked-modal-headerbox-content-a">작성자 :</span>  
                  <span class="checked-modal-headerbox-content-b">이재혁 ( abcde@gmail.com )</span>
                </div>
                <div class="checked-modal-headerbox-content">
                  <!-- 작성일 -->
                  <span class="checked-modal-modal-headerbox-content-a">작성일 :</span>  
                  <span class="checked-modal-modal-headerbox-content-b">2023-05-26 14:19</span>
                </div>

                <div class="checked-modal-headerbox-footer">
                    <button class="copy-btn">
                      <span>꓋ 문서복사</span>
                    </button>
                    <button class="print-btn">
                      <span> ✁  문서출력</span>
                    </button>
                </div>
            
              </div>
              
            </div>
            
            <div class="checked-modal-table-body">
              
              <h2>결재경로</h2>

              <table>
          
                <thead>
                  
                  <tr>
                    <th>순서</th>
                    <th>이름</th>
                    <th>결재상태</th>
                    <th>구분</th>
                  </tr>
                  
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>
                    <td>류정훈</td>
                    <td>승인</td>
                    <td>결재자 / 팀(전체)</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>이동준</td>
                    <td>승인</td>
                    <td>결재자 / 팀(전체)</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>김정욱</td>
                    <td>승인</td>
                    <td>결재자 / 팀(전체)</td>
                  </tr>
                </tbody>
              </table>
            

            </div>

          <!-- 내용 -->
          <div class="checked-modal-detail">
            <p>내용</p>
            <textarea name="" id="" onkeydown="handleResizeHeight(this)"
              onkeyup="handleResizeHeight(this)"></textarea>
          </div>
          <!-- 의견 -->
          <div class="checked-modal-coment">
            <p>의견</p>
            <input type="text">
          </div>
          <!-- 결재자 -->
          <div class="checked-modal-approver">
            <p>결재자</p>
            <input type="text">
          </div>
        
          <!-- 선2 -->
          <div class="work-modal-line"></div>
          <!-- 최종승인 버튼 -->
          <div class="checked-modal-checkbox">
            <label for="">
              <input type="checkbox" id='checked-modal-checkbox' onclick='is_checkeded()'> 
              최종 승인
            </label>
          </div>
          

          <!-- 버튼 -->
          <div class="work-submit-reset-btns">
            <button type="submit" id="checked-edit-btn">수정</button>
            <button type="reset" id="checked-cancell-btn">결재취소</button>
            <button id="checked-success-btn">확인</button>
          </div>
          </form>
        </div>
      </div>
<!---------------------------------------- 수신함 모달창 닫기 ---------------------------------------->

<!---------------------------------------- 컨텐츠 내용 아랫부분 끝 ----------------------------------------------------------->
  </div>
  
  
  <jsp:include page="/WEB-INF/views/work/write-approval.jsp"/>
  
<!-------------------------------- 컨텐츠 내용 끝 --------------------------------------------------------------------->
    <!-- 채팅창 -->
    <div id="chatting-function" class="chatting-box">
      <a href="#">
        <img class="chatting-img" src="${contextPath}/resources/images/chattImg.png" alt="">
      </a>
    </div>
  </section>
</body>

<script src="${contextPath}/resources/js/work/work-send.js"></script>
<script src="${contextPath}/resources/js/work/write-approval.js"></script>
</html>

