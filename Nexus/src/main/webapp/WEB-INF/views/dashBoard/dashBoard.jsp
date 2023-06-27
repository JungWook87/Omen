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
  <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script src="https://kit.fontawesome.com/3cd0aae50a.js" crossorigin="anonymous"></script>
  
  <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
  <link rel="stylesheet" href="${contextPath}/resources/css/dashBoard/dashBoard.css">
</head>
<body>

    
<jsp:include page="/WEB-INF/views/common/header.jsp"/>
<section>

    <div class="container">

        <div id="head_bottom">

            <div class="Head">

            <div class="HeadHr">
                <h2>❐ 인사 관리</h2>
            </div>
            <div class="Doughnut-Bar">

            
                <div class="Doughnut">
                    <canvas id="doughnut"></canvas>
                </div>
                <div class="Bar">
                    
                    <div class="tab_content">

                        <!-- 버튼요소 -->
                        <input type="radio" name="tabmenu" id="tab01" checked>
                        <label for="tab01">근무 시간 현황</label>
                        <input type="radio" name="tabmenu" id="tab02">
                        <label for="tab02">연장 근무 시간</label>
                        <input type="radio" name="tabmenu" id="tab03">
                        <label for="tab03">야간 근무 시간</label>
                    
                        <!-- 컨텐츠 요소 -->
                        <div class="conbox con1"> <canvas id="bar1"></canvas></div>
                        <div class="conbox con2"><canvas id="bar2" width="800px" height="200px"></canvas></div>
                        <div class="conbox con3"><canvas id="bar3"></canvas> </div>
                    
                    </div>
                    
                </div>

            </div>
            
        </div>

        <div class="Bottom">

            <div class="ProjectHeader">
                <h2>❐ 프로젝트 관리</h2>

                    <!-- 버튼요소 -->
                <input type="radio" name="tabmenu2" id="tab04" checked>
                <label for="tab04">1팀</label>
                <input type="radio" name="tabmenu2" id="tab05">
                <label for="tab05">2팀</label>
                <input type="radio" name="tabmenu2" id="tab06">
                <label for="tab06">3팀</label>
            </div>

            <div class="ProjectBox">

                <p>
                    총 프로젝트<br>13 건
                </p>
                
                완료 20건
                진행중 11건
                요청건 3건
        
                <div class="ProjectBar">
                    <canvas id="projectBar"></canvas>
                </div>
            </div>

        </div>

    </div>

    
</section>

<!-- 근태 도넛그래프 -->
<script>
    $(document).ready(function(){
        $.ajax({
            url : 'attnDoughnut',
            type : 'GET',
            success : function(data){

                console.log("타입넘버 : " + data[1].typeName);

                var attnLabel = [];
                var attnCount = [];
                $.each(data, function(index, item) {
                    attnLabel.push(item.typeName);
                    attnCount.push(item.attnCount);
                });


                var context = document
                    .getElementById('doughnut')
                    .getContext('2d');
                var myChart = new Chart(context, {
                    type: 'doughnut', // 차트의 형태
                    data: { // 차트에 들어갈 데이터
                        datasets: [
                            { //데이터
                                cutout: "0", 
                                label: '근무시간', 
                                fill: false, 
                                data: attnCount,
                                backgroundColor: [
                                    //색상
                                    'rgb(7, 59, 137)',
                                    'rgb(9, 79, 183)',
                                    'rgb(11, 99, 229)',
                                    'rgb(60, 130, 234)',
                                    'rgb(109, 161, 239)',
                                    'rgb(157, 193, 245)',
                                ],
                                borderColor: [
                                    //경계선 색상
                                    'rgba(0, 0, 0, 0)',
                                    'rgba(0, 0, 0, 0)',
                                    'rgba(0, 0, 0, 0)',
                                    'rgba(0, 0, 0, 0)',
                                    'rgba(0, 0, 0, 0)',
                                    'rgba(0, 0, 0, 0)',
                                ],
                                borderWidth: 10 //경계선 굵기
                            }
                        ],
                        labels: attnLabel,
                    },
                    options: {
                        
                        responsive: true,

                        plugins:{ 
                    
                            legend: {
                                display: true, // 범례 유무
                                position: 'right', // 범례위치
                                align: 'center', // 범례 정렬
                                
                                labels:{
                                    padding: 10, // 범례 패딩
                                    font:{size: 20}, // 범례 폰트 사이즈
                                }
                            },
                        },
                        
                        maintainAspectRatio :false

                    }
                });

            },
            error : function(error){
                console.log(error);
            }


        })

    })

</script>
 


</body>
</html>