<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
 
 
 <header>

   <div class="content-header-area">

     <div class="content-header-area-left">

       <!-- 로고 -->
       <div>
         <a href="main">
           <img src="${contextPath}/resources/images/logo-width.png" alt="">
         </a>
       </div>

       <!-- 네비바 -->
       <div>
         <ul class="content-header-ul">
           <li><a href="main">홈</a> </li>
           <li><a href="notice">공지사항</a> </li>
           <li><a href="dept">부서</a> </li>
           <li><a href="work">결재</a> </li>
           <li><a href="attendance">근무/휴가</a> </li>
           <li><a href="meeting">회의실</a> </li>
           <li><a href="survey">설문</a> </li>
           <li id="employee-rank-change"><a href="dashBoard">대시보드</a></li>
         </ul>
       </div>

     </div>

     <!-- 개인 정보 -->
     <div class="content-header-btn-area">
       <button id="content-header-btn">오가람 사원</button>
     </div>

   </div>

 </header>