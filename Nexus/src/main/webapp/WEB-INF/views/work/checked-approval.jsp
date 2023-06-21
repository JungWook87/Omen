<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<body>

  <div id="checked-modalWrap">

    <div class="checked-modalBody">

      <span id="checked-closeBtn">
        <img src="${contextPath}/resources/images/Xbtn.png" alt="">
      </span>

      <form action="#" method="post" enctype="multipart/form-data">
        
        <!-- 모달창 시작 -->
        <div class="checked-modal-header">

          <!-- 제목 -->
          <h1 class="checked-modal-title"></h1>
          
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
              <span class="checked-modal-headerbox-content-b" id="memName">이재혁 ( abcde@gmail.com )</span>
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

</body>