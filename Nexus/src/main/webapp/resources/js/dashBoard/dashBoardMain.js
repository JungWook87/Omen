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
                attnCount.push(item.typeCount);
            });

            const centerText = {
                id : 'centerText',
            }


            var doughnut = document
                .getElementById('doughnut')
                .getContext('2d');
            var myChart = new Chart(doughnut, {
                type: 'doughnut', // 차트의 형태
                data: { // 차트에 들어갈 데이터
                    datasets: [
                        { //데이터
                            cutout: "50%", 
                            label: '근무시간', 
                            fill: false, 
                            data: attnCount,
                            backgroundColor: [
                                //색상
                                '#40128B',
                                '#9336B4',
                                '#DD58D6',
                                '#FFE79B',
                                '#2CD3E1',
                                'rgb(157, 193, 245)',
                            ],
                            borderColor: [
                                //경계선 색상
                                'white',
                                'white',
                                'white',
                                'white',
                                'white',
                                'white',
                                'white',
                            ],
                            borderWidth: 4 //경계선 굵기
                            
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
                                margin : 10, // 범례 패딩
                                font:{size: 15}, // 범례 폰트 사이즈
                                fontColor: 'black',
                            }
                            }
                        },
                },
                maintainAspectRatio :false
            });

        },
        error : function(error){
            console.log(error);
        }


    })

    $.ajax({
        url : 'projectPolar',
        type : 'GET',
        success : function(data){

            console.log("프로젝트 : " + data[1].typeName);

            var projectLabel = [];
            var projectCount = [];
            $.each(data, function(index, item) {
                projectLabel.push(item.title);
                projectCount.push(item.percent);
            });
            
            var polarArea = document
            .getElementById('polarArea')
            .getContext('2d');
            var polarChart = new Chart(polarArea, {
                type: 'polarArea', // 차트의 형태
                data: { // 차트에 들어갈 데이터
                    labels: projectLabel,
                    datasets: [
                        {
                            data: projectCount,
                            backgroundColor: [
                                //색상
                                '#F67280',
                                '#C06C84',
                                '#6C5B7B',
                                '#355C7D',
                                '#FFF3E2',
                                '#FFE5CA',
                                '#FA9884',
                                '#E74646',
                            ],
                            borderColor: [
                                //경계선 색상
                                'white',
                                'white',
                                'white',
                                'white',
                                'white',
                                'white',
                                'white',
                           ],
                            borderWidth: 2 //경계선 굵기
                            
                        }
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio :false,
                    plugins:{ 
                
                        legend: {
                            display: false, // 범례 유무
                            position: 'bottom', // 범례위치
                            align: 'center', // 범례 정렬
                            labels:{
                                margin : 10, // 범례 패딩
                                font:{size: 12}, // 범례 폰트 사이즈
                                fontColor: 'black',
                            }
                            }
                        },
                        scales: {
                            r: {
                                pointLabels: {
                                display: true,
                                centerPointLabels: true,
                                font: {
                                    size: 16
                                }
                                }
                            }
                        },    
                    },
                   

                });
        },
        error : function(error){
            console.log(error);
        }

    })

})




// 온로드 기능
window.onload = function() {

    // 프로그레스바 밸류값에의한 css 수정
    var progressBars = document.getElementsByClassName('progress');
    for (var i = 0; i < progressBars.length; i++) {
        var progressBar = progressBars[i];
        if (parseInt(progressBar.getAttribute('value')) > parseInt(progressBar.getAttribute('max'))) {
            progressBar.classList.add('overOrange');
        } else if(parseInt(progressBar.getAttribute('value')) < 120 ) {
            progressBar.classList.add('underBlue');
        }
    }

    // 생성된 라디오 버튼들
    var teamRadios = document.querySelectorAll('input[name="team"]');
 
    teamRadios[0].checked = true;
    document.querySelector('#team-' + teamRadios[0].value + '-data').style.display = 'block';
    

    // 에 대하여 이벤트 부여
    for (var i = 0; i < teamRadios.length; i++) {
        teamRadios[i].addEventListener('change', function() {
            // 클릭된 라디오의 밸류 (team.teamNo)
            var selectedTeamNo = this.value;
            console.log(selectedTeamNo);
            var hrDivs = document.querySelectorAll('.team-data');
            // 팀넘버에따라 부여된 id로 div 추적/동작
            for (var j = 0; j < hrDivs.length; j++) {
                if (hrDivs[j].id == 'team-' + selectedTeamNo + '-data') {
                    hrDivs[j].style.display = 'block';
                } else {
                    hrDivs[j].style.display = 'none';
                }
            }
        });
    }


    // // 프로그래스바 툴팁 호버 이벤트
    // var progressBars = document.querySelectorAll('progress');

    // for (var i = 0; i < progressBars.length; i++) {
    //     progressBars[i].addEventListener('mouseover', function() {
    //         var value = this.value;
    //         var tooltipText = this.parentNode.querySelector('.tooltiptext');
    //         tooltipText.innerHTML = value;
    //     });
    // }

}

