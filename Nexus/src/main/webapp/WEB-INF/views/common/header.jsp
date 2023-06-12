<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
 
 <header>

   <div class="content-header-area">

     <div class="content-header-area-left">

       <!-- 로고 -->
       <div>
         <a href="${contextPath}/main">
           <img src="${contextPath}/resources/images/logo-width.png" alt="">
         </a>
       </div>

       <!-- 네비바 -->
       <div>
         <ul class="content-header-ul">
           <li><a href="${contextPath}/main">홈</a> </li>
           <li><a href="${contextPath}/notice">공지사항</a> </li>
           <li><a href="${contextPath}/dept/deptNotice">부서</a> </li>
           <li><a href="${contextPath}/work/workSend">결재</a> </li>
           <li><a href="${contextPath}/attendance/list">근무/휴가</a> </li>
           <li><a href="${contextPath}/meeting">회의실</a> </li>
           <li><a href="${contextPath}/survey/surveyList">설문</a> </li>
           <li id="employee-rank-change"><a href="dashBoard">대시보드</a></li>
         </ul>
       </div>

     </div>

     <!-- 개인 정보 -->
     <div class="content-header-btn-area">
       <button id="content-header-btn">${loginMember.memName} ${loginMember.jobName}</button>
     </div>

   </div>

 </header>
