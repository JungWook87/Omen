// 설문 디테일창 리다이렉트
function surveyDetail(surveyNo,participation) {
	if(participation == 0) {
    var url = "../survey/surveyDetail/" + surveyNo; 
    window.location.href = url; 
    } else {
    alert("이미 설문에 참여하셨습니다.");
    url = "../survey/surveyList"
    window.loaction.href =url;

    }
}