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

 <c:if test="${ !empty message }">
  <script>
      Swal.fire("${message}");
      // EL 작성 시 scope를 지정하지 않으면
      // page -> request -> session -> application 순서로 검색하여
      // 일치하는 속성이 있으면 출력
      
  </script>
</c:if> 