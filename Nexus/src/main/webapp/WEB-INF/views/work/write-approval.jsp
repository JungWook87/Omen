<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>결재 작성하기</title>
</head>
<body>
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
            <div class ="work-modal-approverBox">
              <span id="pulsApprover">
                <img src="../images/plus.png" alt="">
                결재자 추가
              </span>  
            </div>
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
<!------------------------------------------------ 결재 작성하기 모달창 영역 끝------------------------------------------------>        
<!------------------------------------------------ 결재 작성하기 결재자 추가 모달창 영역 ------------------------------------------------>
        <div id="approver-modal-wrap">
          <div class="approver-modal-Body">
            <span id="approver-closeBtn">
              <img src="../images/Xbtn.png" alt="">
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
            <!-- </form> -->
          </div>
        </div>
<!-------------------------------------------------- 결재 작성하기 결재자 추가 모달창 영역 끝------------------------------------------------>
</body>
