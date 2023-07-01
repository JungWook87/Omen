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


            <!-- 프로젝트 생성 -->
            <div class="project-content">
                <div class="project-info-div">
                    <c:forEach var="projectTotal" items="${prList}" >
                        <div id="projectDiv-${projectTotal.projectNo}" class="projectDiv">
                                <table class="projects-table">
                                    <thead>
                                        <tr>
                                            <th>Project</th>
                                            <th>Deadline</th>
                                            <th>Leader + Team</th>
                                            <th class="text-right">Progress</th>
                                        </tr>
                                    </thead>
                                    <tr>
                                        <td>
                                            <P>${projectTotal.title}</P>
                                            <p></p>
                                        </td>
                                        <td>
                                            <P>${projectTotal.end}</P>
                                            <P>마감일</P>
                                        </td>
                                        <td>
                                            <P>${projectTotal.memName} ${projectTotal.jobName}</P>
                                            <P>${projectTotal.teamName}</P>
                                        <td class="project-progress">
                                            <div class="single-chart">
                                                <svg viewBox="0 0 36 36" class="circular-chart green">
                                                  <path class="circle-bg"
                                                    d="M18 2.0845
                                                      a 10 10 0 0 1 0 31.831
                                                      a 10 10 0 0 1 0 -31.831"
                                                  />
                                                  <path class="circle"
                                                    stroke-dasharray="${projectTotal.percent}, 100"
                                                    d="M18 2.0845
                                                    a 10 10 0 0 1 0 31.831
                                                    a 10 10 0 0 1 0 -31.831"
                                                  />
                                                  <text x="18" y="22" class="percentage">${projectTotal.percent}%</text>
                                                </svg>
                                              </div>
                                        </td>
                                        <td style="display: none;">
                                            <P>Project No: ${projectTotal.projectNo}</P>
                                        </td>
                                    </tr>
                                </table>
                            <table class="projects-table">
                                <thead>
                                    <tr>
                                        <th><p>Project Task</p></th>
                                        <th><p>SendDate</p></th>
                                        <th><p>Leader + Team</p></th>
                                        <th class="text-right">Work State</th>
                                    </tr>
                                </thead>
                                <c:forEach var="taskTotal" items="${projectTotal.taskList}">
                                    <tr>
                                        <td>
                                            <p>${taskTotal.title}</p>
                                            <p></p>
                                        </td>
                                        <td>
                                            <p>${taskTotal.approvalDate}</p>
                                            <p class="text-danger">제출일</p>
                                        </td>
                                        <td class="member">
                                            <div class="member-info">
                                                <p>${taskTotal.memName} ${taskTotal.jobName}</p>
                                                <p>${taskTotal.teamName}</p>
                                            </div>
                                        </td>
                                        <td class="status">
                                            <span class="status-text" 
                                            value="${taskTotal.workState}">
                                            ${taskTotal.workState}
                                            </span>
                                        </td>
                                    </tr>
                                </c:forEach>     
                            </table>
                        </div>
                    </c:forEach>
                </div>
            </div> 


        </div>

    </div>

    
</section>

 
<script src="${contextPath}/resources/js/dashBoard/dashBoardMain.js"></script>

</body>
</html>