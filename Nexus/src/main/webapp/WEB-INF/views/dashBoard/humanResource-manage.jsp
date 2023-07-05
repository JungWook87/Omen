<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
    <script src="https://code.jquery.com/jquery-3.7.0.js"
        integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="${contextPath}/resources/images/favicon.png" />

    <link rel="stylesheet" href="${contextPath}/resources/css/common/component.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/common/variable.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/common/header.css">
    <link rel="stylesheet" href="${contextPath}/resources/css/dashBoard/hrManage.css">

</head>

<body>


    <jsp:include page="/WEB-INF/views/common/header.jsp" />
    

    <section>
        <div class="container">
            <div class="hr-header">
                <div>
                    <span class="dept-info-span">${hrList[0].deptName} / 전체보기</span> 
                    <span class="dept-size-span">${hrList.size()}명</span>
                </div>
                <div class="btn-div">
                    <div class="monthBtn">
                        <button type="button" id="decreaseBtn" class="monthBtn"><img src="${contextPath}/resources/images/LtAngle.png"></button>
                        <p id="attnDate">20${hrList[0].targetDate}</p>
                        <input id="targetDate" style="display:none" value="${hrList[0].targetDate}">
                        <button type="button" id="increaseBtn" class="monthBtn"><img src="${contextPath}/resources/images/RtAngle.png"></button>
                    </div>
                    <form action="${contextPath}/dashBoard/excelDownload" method="POST">
                        <div class="excel-div">
                            <button type="submit" class="excelBtn">엑셀 다운로드</button>
                            <input type="hidden" id="excelDate" name="excelDate" value="${hrList[0].targetDate}">                        
                        </div>
                    </form>
                </div>

            </div>
            <div class="hr-div">
                <table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>부서</th>
                            <th>근로일</th>
                            <th>근무결과</th>
                            <th>근무시간</th>
                            <th>연장근무</th>
                        </tr>
                    </thead>
                    <c:forEach var="hrList" items="${hrList}">
                        <tr>
                            <td>
                                <p>${hrList.memName}</p>
                                <p>${hrList.teamName} ${hrList.jobName}</p>
                            </td>
                            <td>
                                <p>${hrList.deptName}</p>
                            </td>
                            <td>
                                <p>${hrList.workDay}일</p>
                            </td>
                            <td>
                                적정근무
                            </td>
                            <td>
                                <div class="work-time-info">
                                    <div class="progress-box">
                                        <div class="bar-box">
                                            <progress name="progress" class="progress"
                                                id="progressBar" value="${hrList.workTime}"
                                                max="160"></progress>
                                            <span class="tooltiptext" id="tooltipText"></span>
                                        </div>
                                        <div class="progressTemp">
                                            <span>0H</span>
                                            <span>160H</span>
                                        </div>
                                    </div>
                                    <div class="work-time-box">
                                        <span class="week-total">${hrList.workTime}시간
                                            ${hrList.workMin}분</span>
                                        <span class="extend">+${hrList.exTime}H
                                            ${hrList.exMin}M</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <c:choose>
                                  <c:when test="${hrList.exTime == 0 and hrList.exMin == 0}">
                                      <p style="color: gray">0 : 00</p>
                                  </c:when>
                                  <c:otherwise>
                                    <p style="color: rgb(235, 118, 8)">${hrList.exTime} : ${hrList.exMin}</p>
                                  </c:otherwise>
                                </c:choose>
                            </td>
                              
                        </tr>
                    </c:forEach>
                </table>
            </div>

        </div>
    </section>





    <script src="${contextPath}/resources/js/dashBoard/hrManage.js"></script>

</body>

</html>