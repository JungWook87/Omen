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
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
  <script src="https://kit.fontawesome.com/3cd0aae50a.js" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.3.0/chart.min.jsb"></script>
  
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

        <div id="hr-div">
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
                    <div class="team-selector">

                        <input type="radio" id="team1-radio" name="team" value="team1" checked>
                        <label for="team1-radio">팀 1</label><br>
                        <input type="radio" id="team2-radio" name="team" value="team2">
                        <label for="team2-radio">팀 2</label><br>
                    </div>
                
                    <div class="team-work-status">
                        <div id="attn-info-div" class="team-bar">
                            <div class="mem-info">
                                <span class="name">이재혁</span>
                                <span class="job">수석디자이너</span>
                            </div>
                            <div class="bar-info">
                                <div>
                                    <progress class="progress" id="progressBar" value="170" max="160"></progress>
                                </div>
                                <div class="progressTemp">
                                    <span>0H</span>
                                    <span>160H</span>
                                </div>
                            </div>
                            <div class="work-time">
                                <span class="week-total">41 시간 28 분</span>
                                <span class="extend">+1H 28M</span>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        <div class="project-div">

            <div class="project-head">
                <a class="managePageA" href="/dashBoard/projectManage">❐ 프로젝트 관리</a>
            </div>

            <div class="project-content">
                <div></div>
                <div></div>
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