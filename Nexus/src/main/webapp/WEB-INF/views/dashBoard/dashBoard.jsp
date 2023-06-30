<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://kit.fontawesome.com/3cd0aae50a.js" crossorigin="anonymous"></script>
  
  
  <!-- sweetAlert2 cdn -->
  <link href="https://cdn.jsdelivr.net/npm/@sweetalert2/theme-dark@4/dark.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.js"></script>
  <!-- jquery cdn -->
  <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM="
    crossorigin="anonymous"></script>
  <!-- Favicon-->
  <link rel="icon" type="image/x-icon" href="${contextPath}/resources/images/favicon.png" />

  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/dashBoard/dashBoard.css">
  
</head>
<body>

    
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
<section>

    <div class="container">

        <div id="hr-div" class="mainDiv">
            <div class="left">
                <div class="hr-head">
                    <a class="managePageA" href="/dashBoard/humanResourceManage">❐ 인사 관리</a>
                </div>
                <div class="doughnut-div">
                    <canvas id="doughnut"></canvas>
                </div>
            </div>

            <div class="hr-content">            
                <div class="info-div">
                    <!-- 팀라디오 선택 -->
                    <div class="team-selector">
                        <c:forEach var="team" items="${dtList}">
                            <input type="radio" id="team${team.teamNo}-radio" name="team" value="${team.teamNo}">
                            <label for="team${team.teamNo}-radio">${team.teamName}</label><br>
                        </c:forEach>
                    </div>
                    <!-- 팀별 조회용 기본적으로 display : none -->
                    <c:forEach var="team" items="${dtList}" >
                        <div id="team-${team.teamNo}-data" class="team-data" style="display: none">
                            <c:forEach var="hrList" items="${hrList}">
                                <c:if test="${hrList.teamNo == team.teamNo}">
                                    <div id="attn-info-div" class="team-bar">
                                        <div class="mem-info">
                                            <span class="name">${hrList.memName}</span>
                                            <span class="job">${hrList.jobName}</span>
                                        </div>
                                        <div class="bar-info">
                                            <div>
                                                <progress name="progress" class="progress" id="progressBar" value="${hrList.workTime}" max="160"></progress>
                                                <span class="tooltiptext" id="tooltipText"></span>
                                            </div>
                                            <div class="progressTemp">
                                                <span>0H</span>
                                                <span>160H</span>
                                            </div>
                                        </div>
                                        <div class="work-time">
                                            <span class="week-total">${hrList.workTime} 시간 ${hrList.workMin} 분</span>
                                            <span class="extend">+${hrList.exTime}H ${hrList.exMin}M</span>
                                        </div>  
                                    </div>                  
                                </c:if>
                            </c:forEach>
                        </div>
                    </c:forEach>
                </div>
            </div>
            
        </div>

        <div class="project-div mainDiv">
            <div class="left">
                <div class="project-head">
                    <a class="managePageA" href="/dashBoard/projectManage">❐ 프로젝트 관리</a>
                </div>
                <div class="polar-div">
                    <canvas id="polarArea" aria-label="Hello ARIA World" role="img"></canvas>
                </div>
            </div>

            <div class="project-content">
                <div class="project-info-div">
                    <c:forEach var="projectTotal" items="${prList}" >
                        <div id="projectDiv-${projectTotal.projectNo}" class="projectDiv">
                            <div class="selectedProject">
                                <span style="display: none;">Project No: ${projectTotal.projectNo}</span>
                                <span>${projectTotal.title}</span>
                                <span>${projectTotal.memName} ${projectTotal.teamName} ${projectTotal.jobName}</span>
                                <span>${projectTotal.start} - ${projectTotal.end}</span>
                                <span>진행도 : ${projectTotal.percent} %</span>
                            </div>
                            <c:forEach var="taskTotal" items="${projectTotal.taskList}">
                                <div class="selectedTask">
                                    <span>과제명 : ${taskTotal.title}</span>
                                    <span>작성자 : ${taskTotal.memName} ${taskTotal.jobName}</span>
                                    <span>결재상태 : ${taskTotal.workState}</span>
                                </div>
                            </c:forEach>
                        </div>
                    </c:forEach>
                </div>
            </div> 


        </div>

    </div>

    
</section>

<!-- 근태 도넛그래프 -->
<script>

</script>
 
<script src="${contextPath}/resources/js/dashBoard/dashBoardMain.js"></script>

</body>
</html>