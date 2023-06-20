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

  <title>결재-임시저장</title>
</head>

<body>

  <header style="height: 90px;"></header>
  <section>

   <!-- 사이드 바 -->
   <div class="side-bar menu">

    <div class="desktop">
      <!-- 페이지마다 바뀌는 제목 -->
      <h1>결재</h1>
      
      <!-- 페이지마다 바뀌는 부제목 -->
      <ul>
        <li><a href="work-send.html"><span>상신함</span> </a></li>
        <li><a href="work-inbox(1).html"><span>수신함</span> </a></li>
        <li><a href="work-temp.html"><span>임시저장</span> </a></li>
        <li><a href="work- template.html"><span>템플릿</span> </a></li>
      </ul>
    </div>
    
    <div class="mobile">
      
      <ul>
          <li><a href="#" class="item"><i class="fa-sharp fa-solid fa-file-export"></i></a></li>
          <li><a href="#" class="item"><div><i class="fa-solid fa-box"></i></div></a></li>
          <li><a href="#" class="item"><i class="fa-solid fa-floppy-disk"></i></a></li>
          <li><a href="#" class="item"><i class="fa-solid fa-download"></i></i></a></li>
      </ul>
    </div>

  </div>

    <!-- 컨텐츠 내용 -->
    <div class="content-all-page">

      <!-- 컨텐츠 내용 윗부분 -->
      <div class="content-all-top-area">
        <p class="content-all-top-text1">결재 / </p>
        <p class="content-all-top-text2">임시 저장(2)</p>
      </div>

      <!-- 컨텐츠 내용 아랫부분 -->
      <div class="content-all-bottom-area">
        
        <div class="content-all-bottom-area-header">

            <div class="button-box">

              <button type="button" class="search-btn" >검색하기</button>
              <button type="button" class="omen-btn" id="popupBtn">결재 작성하기</button>
              
            </div>    

        </div>

        <div id="modalWrap">
          <div class="work-modalBody">
            <span id="closeBtn">
              <img src="../images/Xbtn.png" alt="">
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
                    <option value="business-trip">출장</option>
                    <option value="vacation">연차</option>
                    <option value="project">프로젝트</option>
                    <option value="assignment">과제</option>
                  </select>
                  
                  <select name="" id="normal-checked">
                    <option value="">경조금신청서(예시)</option>
                    <option value="">구매요청서(예시)</option>
                    <option value="">자산요청서(예시)</option>
                    <option value="">지출결의서(예시)</option>
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
            <!-- 프로젝트박스 -->
            <div class="work-modal-projectBox">
              <span id="pulsProject">
                <img src="../images/plus.png" alt="">
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
                <th>제목</th>
                <th>작성일</th>
                <th>삭제</th>
              </tr>
              
            </thead>

            <tbody>
              <tr class="row">
                <td>임시저장</td>
                <td>2023.05.22 15:16</td>
                <td> </td>
              </tr>
              <tr class="row">
                <td>호반 저감 시설 견적서</td>
                <td>2023.05.22 15:11</td>
                <td> </td>
              </tr>
            </tbody>


            
          </table>


        </div>

      

      </div>

      <div id="check-modalWrap">
        <div class="check-modalBody">
          <span id="check-closeBtn">
            <img src="../images/Xbtn.png" alt="">
          </span>
          <!-- <form action="#" method="post" enctype="multipart/form-data"> -->
            
            <!-- 모달창 시작 -->
            <div class="check-modal-header">
              <!-- 제목 -->
              <h1 class="check-modal-title">결재 예시</h1>
              <!-- 결재항목박스 -->
              <div class="check-modal-modal-headerbox">
                <!-- 결재항목 내용 -->
                <div class="check-modal-headerbox-content">
                  <!-- 문서번호 -->
                  <span class="check-modal-modal-headerbox-content-a">문서번호 :</span>  
                  <span class="check-modal-modal-headerbox-content-b">2023-05-26-20001990</span>
                </div>
                
                <div class="check-modal-headerbox-content">
                  <!-- 작성자 -->
                  <span class="check-modal-headerbox-content-a">작성자 :</span>  
                  <span class="check-modal-headerbox-content-b">이재혁 ( abcde@gmail.com )</span>
                </div>
                <div class="check-modal-headerbox-content">
                  <!-- 작성일 -->
                  <span class="check-modal-modal-headerbox-content-a">작성일 :</span>  
                  <span class="check-modal-modal-headerbox-content-b">2023-05-26 14:19</span>
                </div>

                <div class="check-modal-headerbox-footer">
                    <button class="modal-headerbox-footer-btn">
                      <span>꓋ 문서복사</span>
                    </button>
                    <button class="check-modal-headerbox-footer-btn">
                      <span> ✁  문서출력</span>
                    </button>
                </div>
            
              </div>
              
            </div>
            
            <div class="check-modal-table-body">
              
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
          <div class="check-modal-detail">
            <p>내용</p>
            <textarea name="" id="" onkeydown="handleResizeHeight(this)"
              onkeyup="handleResizeHeight(this)"></textarea>
          </div>
          <!-- 의견 -->
          <div class="check-modal-coment">
            <p>의견</p>
            <input type="text">
          </div>
           <!-- 결재자 -->
           <div class="check-modal-approver">
            <p>결재자</p>
            <input type="text">
          </div>
         
          <!-- 선2 -->
          <div class="work-modal-line"></div>
           <!-- 최종승인 버튼 -->
           <div class="check-modal-checkbox">
            <label for="">
              <input type="checkbox" id='check-modal-checkbox' onclick='is_checked()'> 
              최종 승인
            </label>
          </div>
          

          <!-- 버튼 -->
          <div class="work-submit-reset-btns">
            <button type="submit" id="companion-btn">반려</button>
            <button type="reset" id="check-cancell-btn">취소</button>
            <button id="check-success-btn">승인</button>
          </div>
          <!-- </form> -->
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
</body>

<script src="../js/work-inbox(1).js"></script>
</html>