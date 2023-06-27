<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<body>
  
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

          <!-- 제목 -->
          <div class="work-modal-title">
            <p>제목</p>
            <input type="text" placeholder="제목을 입력해주세요" name="title">
          </div>

          <!-- 시작날짜 -->
          <div class="work-modal-startDate">
            <p>시작날짜</p>
            <input type="date" name="start" >
          </div>

          <!-- 종료날짜 -->
          <div class="work-modal-endDate">
            <p>종료날짜</p>
            <input type="date" name="end" >
          </div>

          <!-- 내용 -->
          <div class="work-modal-detail">
            <p>내용</p>
            <textarea name="content" id="" onkeydown="handleResizeHeight(this)"
              onkeyup="handleResizeHeight(this)" ></textarea>
          </div>

          <!-- 프로젝트박스 -->
          <div class="work-modal-projectBox">
            <span id="pulsProject">
              <img src="${contextPath}/resources/images/plus.png" alt="">
              과제 추가
            </span>
          </div>
        
          <div class="projectBox"> 
            <p class="taskTitleSpan" style="margin-top: 10px;">과제명</p>
            <input name="taskTitle" type="text">
          </div>
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
                  <ul>
                    <li class="Executives"><p>임원</p>
                    </li>
                    <li class="dept"><p>부서</p>
                      <ul >
                        <li class="dept-list"><p>관리기획부</p>
                          <ul>
                            <li class="approval-team"><p>재무팀</p></li>
                            <li class="approval-team"><p>인시총무팀</p></li>
                          </ul>
                        </li>
                        <li class="dept-list"><p>업무기획부</p>
                          <ul>
                            <li class="approval-team"><p>영업팀</p></li>
                            <li class="approval-team"><p>기술개발팀</p></li>
                          </ul>
                        </li>
                        <li class="dept-list"><p>공무기획부</p>
                          <ul>
                            <li class="approval-team"><p>공사팀</p></li>
                            <li class="approval-team"><p>공무팀</p></li>
                            <li class="approval-team"><p>견적팀</p></li>
                            <li class="approval-team"><p>자재팀</p></li>
                          </ul>
                        </li>
                        <li class="dept-list"><p>개발사업부</p>
                          <ul>
                            <li class="approval-team"><p>개발기획팀</p></li>
                            <li class="approval-team"><p>분양홍보팀</p></li>
                            <li class="approval-team"><p>설계기획팀</p></li>
                          </ul>
                        </li>
                        <li class="dept-list"><p>전략기획실</p>
                          <ul>
                            <li class="approval-team"><p>경영팀</p></li>
                            <li class="approval-team"><p>전략팀</p></li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>

        
      </form>

    </div>

  </div>

</body>
