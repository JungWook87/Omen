// 설문 디테일창 리다이렉트
function surveyDetail(surveyNo,participation) {
	if(participation == 0) {
        var url = "../survey/surveyDetail/" + surveyNo; 
        window.location.href = url; 
    } else {
        var url = "../survey/surveyResult/" + surveyNo; 
        window.location.href = url; 
    }
}



// 날짜 => 글자 변경 로직
function getCurrentDate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var currentDateStr = year + '.' + month + '.' + day;
    return currentDateStr;
  }
  
  
  function addStatusLabel() {
    var endDateElements = document.querySelectorAll('#status-color');
    var currentDate = getCurrentDate();
  
    endDateElements.forEach(function (element) {
        var endDate = element.textContent.trim();
        console.log(endDate + ">=" + currentDate );
        if (endDate >= currentDate) {
            element.textContent = '진행중';
        } else {
            element.textContent = '종료';
            element.style.color = 'gray'; 
        }
      });   
}

function addParticipationLabel() {
    var participationElements = document.querySelectorAll("#participation-color");
    
    participationElements.forEach(function (element){
        var participation = element.textContent.trim();
        if (participation >= 1){
            element.style.color = 'grey';
            element.textContent = '참여';
        } else {
            element.textContent = '미참여';
        }       
    });
}

window.addEventListener('DOMContentLoaded', function () {
    addStatusLabel();
    addParticipationLabel();

    var surveyList = surveyList;
    var surveyListLength = surveyList.length;
    var participationCount = 0;
    
    for (var i = 0; i < surveyListLength; i++) {
      if (surveyList[i].participation >= 1) {
        participationCount++;
      }
    }
    
    console.log('surveyList 개수:', surveyListLength);
    console.log('participation 개수:', participationCount);
});

