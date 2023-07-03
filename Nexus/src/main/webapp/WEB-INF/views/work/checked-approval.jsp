<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<body>

  <div id="checked-modalWrap">

    <div class="checked-modalBody">

      <span id="checked-closeBtn">
        <img src="${contextPath}/resources/images/Xbtn.png" alt="">
      </span>
        
      <!-- 모달창 시작 -->
      <div class="checked-modal-header">

        <!-- 제목 -->
        <div class="checked-modal-title"></div>
        
        <!-- 결재항목박스 -->
        <div class="checked-modal-modal-headerbox">
          <!-- 결재항목 내용 -->
          <div class="checked-modal-headerbox-content">
            <!-- 문서번호 -->
            <span class="checked-modal-modal-headerbox-content-a">문서번호 :</span>  
            <span class="checked-modal-modal-headerbox-content-b" id="workNo"></span>
          </div>
          
          <div class="checked-modal-headerbox-content">
            <!-- 작성자 -->
            <span class="checked-modal-headerbox-content-a">작성자 :</span>  
            <span class="checked-modal-headerbox-content-b" id="memName"></span>
          </div>

          <div class="checked-modal-headerbox-content">
            <!-- 작성일 -->
            <span class="checked-modal-modal-headerbox-content-a">작성일 :</span>  
            <span class="checked-modal-modal-headerbox-content-b" id="sendDate"></span>
          </div>

          <div class="checked-modal-headerbox-footer">
              <button class="print-btn">
                <img src="${contextPath}/resources/images/print-solid.svg" alt="">
                <span>문서출력</span>
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

          <tbody id="app_list">
          </tbody>
        </table>

      </div>

      <div id="container">
        <!-- 시작날짜 -->
        <div class="checked-modal-startDate">
          <p>시작날짜</p>
          <input type="date" id="start" readonly>
        </div>

        <!-- 종료날짜-->
        <div class="checked-modal-endDate">
          <p>종료날짜</p>
          <input type="date" id="end" readonly>
        </div>

        <!-- 내용 -->
        <div class="checked-modal-detail">
          <p>내용</p>
          <textarea name="" id="content" onkeydown="handleResizeHeight(this)"
            onkeyup="handleResizeHeight(this)" readonly></textarea>
        </div>

        <!-- 의견 -->
        <div class="checked-modal-coment">
          <p>의견</p>
          <c:choose>
            <c:when test="${flag == 1}">
              <input type="text" id="opinion" placeholder="반려 시 사유를 적어주세요.">
            </c:when>
            <c:otherwise>
              <input type="text" id="opinion" readonly>
            </c:otherwise>
          </c:choose>
        </div>

        <!-- 결재자 -->
        <c:if test="${flag == 1}">
          <div class ="check-modal-approverBox">
            <span id="pulsApprover">
              <img src="${contextPath}/resources/images/plus.png" alt="">
              결재자 추가
            </span>  
          </div>
        </c:if>


        <div class="checked-modal-approver">
          <p>결재자</p>
          <c:choose>
            <c:when test="${flag == 1}">
              <div id="showMemName">-</div>
              <input style="display: none;" type="text" id="next1">
              <input style="display: none;" type="text" id="next2" readonly>
            </c:when>
            <c:otherwise>
              <input type="text" id="next2" readonly>
            </c:otherwise>
          </c:choose>
        </div>

        <div class="checked-modal-taskList">
          <p>과제 목록</p>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>과제명</th>
              </tr>
            </thead>
            <tbody>
              <c:forEach var="" items="">
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </c:forEach>
            </tbody>
          </table>

        </div>

        <!-- 업로드 파일(kjw) -->
        <div class="file_div">
          <p>첨부파일</p>
          <div class="upload_file" id="upload_file"></div>
        </div>
      
        <!-- 선2 -->
        <div class="work-modal-line"></div>
        
        <!-- 최종승인 버튼 -->
        <c:if test="${flag == 1}">
          <div class="checked-modal-checkbox">
            <input type="checkbox" id='checked-modal-checkbox'> 
            <label for="checked-modal-checkbox">최종 승인</label>
          </div>
        </c:if>

      </div>
      

      <!-- 버튼 (kjw) -->
      <c:choose>
        <c:when test="${flag == 1}">
          <div class="work-inbox-submit-btn">
            <button type="button" id="checked-cancle-btn" onclick="checkedModalClose()" >취소</button>
            <button type="submit" id="checked-reject-btn" name="reject">반려</button>
            <button type="submit" id="checked-approve-btn" name="approve">승인</button>
          </div>
        </c:when>
        <c:otherwise>
        <div class="work-send-submit-btn">
          <button type="button" id="checked-edit-btn">수정</button>
          <button type="button" id="checked-cancell-btn">결재취소</button>
          <button id="checked-success-btn" type="button" onclick="checkedModalClose()">확인</button>
        </div>
        </c:otherwise>
      </c:choose>  

    </div>

    <!-- 결재자 리스트 -->
    <div id="check-approver-modal-wrap">
      <div class="check-approver-modal-Body">
        <span id="check-approver-closeBtn">
          <img src="${contextPath}/resources/images/Xbtn.png" alt="">
        </span>
        <h1>결재 라인 설정</h1>
        <!-- 선1 -->
        <div class="check-approver-modal-line1"></div>

        <div class="approver-modal-container">

            <div class="check-dept-Box">
              <ul class="executives"><p>임원</p>

              </ul>

              <ul class="chDept"><p>부서</p>
                <li class="ch-dept-list"><p>관리기획부</p></li>
                <li class="ch-dept-list"><p>업무기획부</p></li>
                <li class="ch-dept-list"><p>공무기획부</p></li>
                <li class="ch-dept-list"><p>개발사업부</p></li>
                <li class="ch-dept-list"><p>전략기획실</p></li>
              </ul>
            </div>

            <div class="team-Box">
              <ul class="team">
                <li class="ch-team-list"><p>재무팀</p></li>
                <li class="ch-team-list"><p>인사총무팀</p></li>

                <li class="ch-team-list"><p>영업팀</p></li>
                <li class="ch-team-list"><p>기술개발팀</p></li>

                <li class="ch-team-list"><p>공사팀</p></li>                     
                <li class="ch-team-list"><p>공무팀</p></li>
                <li class="ch-team-list"><p>견적팀</p></li>
                <li class="ch-team-list"><p>자재팀</p></li>

                <li class="ch-team-list"><p>개발기획팀</p></li>
                <li class="ch-team-list"><p>분양홍보팀</p></li>
                <li class="ch-team-list"><p>설계기획팀</p></li>

                <li class="ch-team-list"><p>경영팀</p></li>
                <li class="ch-team-list"><p>전략팀</p></li>
              </ul>
            </div>

            <div class="teamone-Box">

              <ul style="display: flex; flex-direction: column;">

                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                <li class="ch-approval-team"></li>
                  
              </ul>
            </div>

        </div>

        <div class="approver-modal-line2"></div>
        <!-- 버튼 -->
        <div class="approver-submit-reset-btns">
          <button type="button" id="ch-approver-cancell-btn">취소</button>
          <button type="button" id="ch-approver-success-btn">확인</button>
        </div>
      
      </div>

    
    </div>


    
  </div>

</body>