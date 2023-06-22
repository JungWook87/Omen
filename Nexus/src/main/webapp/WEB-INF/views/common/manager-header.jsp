<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
 
 <header>

   <div class="content-header-area">

     <div class="content-header-area-left">

       <!-- 로고 -->
       <div>
         <a>
           <img src="${contextPath}/resources/images/logo-width.png" alt="">
         </a>
       </div>
     </div>

     <!-- 개인 정보 -->
     <div class="content-header-btn-area">
       <button id="content-header-btn">${loginMember.memName}</button>
     </div>

   </div>

 </header>
