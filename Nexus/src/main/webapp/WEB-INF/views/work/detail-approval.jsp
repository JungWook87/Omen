<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../component/component.css">
  <link rel="stylesheet" href="../component/variable.css">
  <link rel="stylesheet" href="../css/work-send.css">
  <!-- <link rel="stylesheet" href="../css/work-inbox(1).css"> -->
  <link rel="stylesheet" href="../css/work-temp.css">
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

  <title>결재 작성하기</title>
</head>
<body>
<!---------------------------------------- 체크 모달창 열기 ---------------------------------------->	
	<div id="checked-modalWrap">
        <div class="checked-modalBody">
          <span id="checked-closeBtn">
            <img src="../images/Xbtn.png" alt="">
          </span>
          <!-- <form action="#" method="post" enctype="multipart/form-data"> -->
            
            <!-- 모달창 시작 -->
            <div class="checked-modal-header">
              <!-- 제목 -->
              <div class="checked-modal-title">
                <h1>결재 예시</h1>
              </div>
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
          <p>내용</p>
          <div class="checked-modal-detail">
          </div>
          <!-- 선택된 파일 -->
          <p>첨부파일</p>
          <div class="checked-preview"></div>
          <!-- 의견 -->
          <p>의견</p>
          <div class="checked-modal-coment"></div>
          <!-- 결재자 -->
          <p>결재자</p>
          <div class="checked-modal-approver"></div>
        
          <!-- 선2 -->
          <div class="checked-modal-line"></div>
          
          <!-- 버튼 -->
          <div class="checked-submit-reset-btns">
            <button type="submit" id="checked-edit-btn">수정</button>
            <button type="reset" id="checked-cancell-btn">결재취소</button>
            <button id="checked-success-btn">확인</button>
          </div>
          <!-- </form> -->
        </div>
      </div>     
 </body>