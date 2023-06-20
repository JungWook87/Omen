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
  <jsp:include page="/WEB-INF/views/work/write-approval.jsp"/>
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
<!------------------------------------------------ 결재 작성하기 모달창 영역------------------------------------------------>        
        <div id="modalWrap">
          <div class="work-modalBody">
            <span id="closeBtn">
              <img src="${contextPath}/resources/images/Xbtn.png" alt="">
            </span>
            <h1>결제상신</h1>
            <!-- 선1 -->
            <div class="work-modal-line"></div>

            <form action="write" method="post" enctype="multipart/form-data" onsubmit="return workWrite()">
              <!-- 템플릿 -->
              <div class="work-modal-template">
                <p>결재 타입</p>

                <div class="work-modal-template-select">

                  <select name="workTypeWord" id="work-template">
                    <option value="normal-check">일반</option>
                    <option value="business-trip">출장</option>
                    <option value="vacation">연차</option>
                    <option value="project">프로젝트</option>
                    <option value="assignment">과제</option>
                  </select>
                  
                  <select name="" id="normal-checked">
                  	<option value="userCustom">직접작성</option>
                    <option value="normalEx1">경조금신청서(예시)</option>
                    <option value="normalEx2">구매요청서(예시)</option>
                    <option value="normalEx3">자산요청서(예시)</option>
                    <option value="normalEx4">지출결의서(예시)</option>
                  </select>

                  <select name="" id="project-checked">
                    <option value="">프로젝트1(예시)</option>
                    <option value="">프로젝트2(예시)</option>
                    <option value="">프로젝트3(예시)</option>
                    <option value="">프로젝트4(예시)</option>
                  </select>

                  <select name="" id="assignment-checked">
                    <option value="">과제1(예시)</option>
                    <option value="">과제2(예시)</option>
                    <option value="">과제3(예시)</option>
                    <option value="">과제4(예시)</option>
                  </select>

                </div>
              </div>   
            <!-- 제목 -->
            <div class="work-modal-title">
              <p>제목</p>
              <input type="text" placeholder="제목을 입력해주세요" name="title">
            </div>
            <!-- 시작날짜 -->
            <div class="work-modal-startDate">
              <p>시작날짜</p>
              <input type="date" name="start">
            </div>
            <!-- 종료날짜 -->
            <div class="work-modal-endDate">
              <p>종료날짜</p>
              <input type="date" name="end">
            </div>
            <!-- 내용 -->
            <div class="work-modal-detail">
              <p>내용</p>
              <textarea name="content" id="" onkeydown="handleResizeHeight(this)"
                onkeyup="handleResizeHeight(this)"></textarea>
            </div>
            <!-- 프로젝트박스 -->
            <div class="work-modal-projectBox">
              <span id="pulsProject">
                <img src="${contextPath}/resources/images/plus.png" alt="">
                과제 추가
              </span>
            </div>
              <div class="projectBox"> 
                <p>과제명</p>
                <input type="text">
                <p>과제내용</p>
                <input type="text">
              </div>
            <!-- 결재자 -->
            <div class ="work-modal-approverBox">
              <span id="pulsApprover">
                <img src="${contextPath}/resources/images/plus.png" alt="">
                결재자 추가
              </span>  
            </div>
            <div class="work-modal-approver">
              <p>결재자</p>
              <input type="text" name="next">
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

            
          </div>
        </div>
<!------------------------------------------------ 결재 작성하기 모달창 영역 끝------------------------------------------------>        
<!------------------------------------------------ 결재 작성하기 결재자 추가 모달창 영역 ------------------------------------------------>
        <div id="approver-modal-wrap">
          <div class="approver-modal-Body">
            <span id="approver-closeBtn">
              <img src="${contextPath}/resources/images/Xbtn.png" alt="">
            </span>
            <h1>결재 라인 설정</h1>
            <!-- 선1 -->
            <div class="approver-modal-line1"></div>

            <div class="approver-modal-container">


              <div id="approver-box">

                <ul class="M01">
            
                    <li><p href="#">임원</p>
            
                        <ul class="M02">
            
                            <li><p href="#">대표이사<input type="radio" name="appprover-check" class="approver-checkBox" value="대표이사"></p></li>
            
                            <li><p href="#">전무이사<input type="radio" name="appprover-check" class="approver-checkBox" value="전무이사"></p></li>
            
                        </ul>
            
                    </li>
            
                    <li><p href="#">부서</p>
            
                        <ul class="M02 dept">
            
                            <li><p href="#">관리기획부</p>
            
                                <ul class="M03">
            
                                    <li><p href="#">A직원<input type="radio" name="appprover-check" class="approver-checkBox" value="A직원"></p></li>
            
                                    <li><p href="#">B직원<input type="radio" name="appprover-check" class="approver-checkBox" value="B직원"></p></li>
            
                                    <li><p href="#">C직원<input type="radio" name="appprover-check" class="approver-checkBox" value="C직원"></p></li>
            
                                </ul>
            
                            </li>
            
                            <li><p href="#">인사총무팀</p>
            
                                <ul class="M03">
            
                                    <li><p href="#">A직원<input type="radio" name="appprover-check" class="approver-checkBox" value="A직원"></p></li>
            
                                    <li><p href="#">B직원<input type="radio" name="appprover-check" class="approver-checkBox" value="B직원"></p></li>
            
                                    <li><p href="#">C직원<input type="radio" name="appprover-check" class="approver-checkBox" value="C직원"></p></li>
            
                                </ul>
            
                            </li>
            
                            <li><p href="#">기술영업팀</p>
            
                                <ul class="M03">
            
                                    <li><p href="#">A직원<input type="radio" name="appprover-check" class="approver-checkBox" value="A직원"></p></li>
            
                                    <li><p href="#">B직원<input type="radio" name="appprover-check" class="approver-checkBox" value="B직원"></p></li>
            
                                    <li><p href="#">C직원<input type="radio" name="appprover-check" class="approver-checkBox" value="C직원"></p></li>
            
                                </ul>
            
                            </li>
            
                        </ul>
            
                    </li>
            
            
                </ul>
            
              </div>

            </div>


            <!-- 선2 -->
            <div class="approver-modal-line2"></div>
            <!-- 버튼 -->
            <div class="approver-submit-reset-btns">
              <button type="reset" id="approver-cancell-btn">취소</button>
              <button type="button" id="approver-success-btn">확인</button>
            </div>
            </form>
          </div>
        </div>
<!-------------------------------------------------- 결재 작성하기 결재자 추가 모달창 영역 끝------------------------------------------------>
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
<!---------------------------------------- 사용자가 작성한 모달창 열기 ---------------------------------------->
      <div id="write-modalWrap">
        <div class="write-modalBody">
          <span id="write-closeBtn">
            <img src="${contextPath}/resources/images/Xbtn.png" alt="">
          </span>
          <h1>결재상신</h1>
          <!-- 선1 -->
          <div class="modal-line"></div>
  
          <!-- 템플릿 -->
          <div class="write-modal-template">
            <p>템플릿</p>
  
            <div class="write-modal-template-select">
  
              <select name="" id="write-work-template">
                <option value="normal-check">일반</option>
                <option value="business-trip">출장</option>
                <option value="vacation">연차</option>
                <option value="project">프로젝트</option>
                <option value="assignment">과제</option>
              </select>
                    
              <select name="" id="write-normal-checked">
                <option value="">경조금신청서(예시)</option>
                <option value="">구매요청서(예시)</option>
                <option value="">자산요청서(예시)</option>
                <option value="">지출결의서(예시)</option>
              </select>
  
               <select name="" id="write-project-checked">
                <option value="">프로젝트1(예시)</option>
                <option value="">프로젝트2(예시)</option>
                <option value="">프로젝트3(예시)</option>
                <option value="">프로젝트4(예시)</option>
              </select>
  
              <select name="" id="write-assignment-checked">
                <option value="">과제1(예시)</option>
                <option value="">과제2(예시)</option>
                <option value="">과제3(예시)</option>
                <option value="">과제4(예시)</option>
              </select>
            </div>
          </div>
          <!-- 제목 -->
          <div class="write-modal-title">
            <p>제목</p>
            <input type="text" readonly>
          </div>
          <!-- 출장지 -->
          <div class="write-modal-businessArea">
            <p>출장지</p>
            <input type="text" readonly>
          </div>
          <!-- 시작날짜 -->
          <div class="write-modal-startDate">
            <p>시작날짜</p>
            <input type="date" readonly>
          </div>
          <!-- 종료날짜 -->
          <div class="write-modal-endDate">        
            <p>종료날짜</p>
            <input type="date" readonly>
          </div>        
          <!-- 내용 -->
          <div class="write-modal-detail">
            <p>내용</p>
            <textarea name="" id="" onkeydown="handleResizeHeight(this)"
            onkeyup="handleResizeHeight(this)" readonly></textarea>
          </div>
  
          <!-- 출장내용 -->
          
            <div class="write-modal-businessDetail">
              <p>출장 내용</p>
              <textarea name="" id="" onkeydown="handleResizeHeight(this)"
              onkeyup="handleResizeHeight(this)" readonly></textarea>
            </div>
          <!-- 프로젝트박스 -->
          <div class="work-modal-projectBox">
              <span id="pulsProject">
                <img src="${contextPath}/resources/images/plus.png" alt="">
                과제 추가
              </span>
            </div>
           <div class="projectBox"> 
            <p>과제명</p>
            <input type="text">
            <p>과제내용</p>
            <input type="text">
          </div>        
  
          <!-- 결재자 -->
          <div class="write-modal-approver">
            <p>결재자</p>
            <input type="text" readonly>
          </div>
          <!-- 선택된 파일 -->
          <p>첨부파일</p>
          <div class="write-preview"></div>
          <!-- 선2 -->
          <div class="modal-line"></div>
          <!-- 버튼 -->
          <div class="write-submit-reset-btns">
            <button id="write-remove-btn">삭제</button>
            <button type="reset" id="write-cancell-btn">닫기</button>
            <button id="write-success-btn">수정</button>
          </div>
  
        </div>
      </div>
<!----------------------------------------- 사용자가 작성한 모달창 끝----------------------------------------->
<!---------------------------------------- 컨텐츠 내용 아랫부분 끝 ----------------------------------------------------------->
  </div>
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

