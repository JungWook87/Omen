// 프로그레스바 밸류값 css
var progressBar = document.getElementById('progressBar');
if (progressBar.value > progressBar.max) {
    progressBar.classList.add('exceeds-max');
}

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
                                margin : 10, // 범례 패딩
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


var horizontalBar = document
.getElementById('horizontalBar')
.getContext('2d');
var myBarChart = new Chart(horizontalBar, {
    type: 'horizontalBar',
    data: {
        datasets: [{
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [10, 20, 30, 40, 50, 60, 70]
        }]
    },
    options:{
        scales: {
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                }
            }]
        }
    }
});