<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/work-Inbox.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/work/work-inbox(1).css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">>
  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>

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
      <!-- 페이지마다 바뀌는 제목 -->
      <div class="side-barTitle">
        <a href="payment-Inbox.html" id="side-barTitle-a">
          <img src="../images/leftArrow.png" alt="">
        </a>
      <h1>수신함</h1>
      </div>

      <!-- 페이지마다 바뀌는 부제목 -->
      <ul>
        <li><a href="payment-Inbox.html"><span>상신함</span> </a></li>
        <li><a href="payment-inbox(1).html"><span>수신함</span> </a></li>
        <li><a href="payment-temporaryStorage.html"><span>임시저장</span> </a></li>
        <li><a href=""><span>템플릿</span> </a></li>
      </ul>
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
          <div class="payment-modalBody">
            <span id="closeBtn">
              <img src="../images/Xbtn.png" alt="">
            </span>
            <h1>결제상신</h1>
            <!-- 선1 -->
            <div class="payment-modal-line"></div>

            <!-- <form action="#" method="post" enctype="multipart/form-data"> -->
              <!-- 템플릿 -->
              <div class="payment-modal-template">
                <p>템플릿</p>
                <select name="" id="">
                  <option value="">경조금신청서(예시)</option>
                  <option value="">구매요청서(예시)</option>
                  <option value="">자산요청서(예시)</option>
                </select>
              </div>   
            <!-- 제목 -->
            <div class="payment-modal-title">
              <p>제목</p>
              <input type="text" placeholder="제목을 입력해주세요" required>
            </div>
            <!-- 내용 -->
            <div class="payment-modal-detail">
              <p>내용</p>
              <textarea name="" id="" onkeydown="handleResizeHeight(this)"
                onkeyup="handleResizeHeight(this)"></textarea>
            </div>
            <!-- 결재자 -->
            <div class="payment-modal-approver">
              <p>결재자</p>
              <input type="text">
            </div>
            <!-- 파일 업로드 -->
            <div class="payment-file-box">
              <button type="button" id="file-remove">파일 지우기</button>
              <label for="file-uploads">파일 올리기</label>
              <input type="file" id="file-uploads" name="file-uploads" accept="" multiple>
            </div>
            <!-- 선택된 파일 -->
            <div class="payment-preview"></div>
            <!-- 선2 -->
            <div class="payment-modal-line"></div>
            <!-- 임시저장 버튼 -->
            <div class="payment-modal-save">
              <button type="button" id="save-draft">임시 저장</button>
            </div>
            <!-- 버튼 -->
            <div class="payment-submit-reset-btns">
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
              <tr class="row">
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
          <div class="payment-modal-line"></div>
           <!-- 최종승인 버튼 -->
           <div class="check-modal-checkbox">
            <label for="">
              <input type="checkbox" id='check-modal-checkbox' onclick='is_checked()'> 
              최종 승인
            </label>
          </div>
          

          <!-- 버튼 -->
          <div class="payment-submit-reset-btns">
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

<script src="../js/payment-inbox(1).js"></script>
</html>