const todayBtn = document.getElementById("main-today-alert-btn");
const todayInput = document.getElementById("main-today-input");

// 페이지가 로드될 때 저장된 값 설정
window.addEventListener('load', () => {
    const savedTodayText = localStorage.getItem('TODAY_TEXT');
    if (savedTodayText) {
        todayInput.value = savedTodayText;
    }
});

// 오늘의 알림 연필 눌렀을때 이벤트
todayBtn.addEventListener('click', () => {
    todayInput.readOnly = false;
    todayInput.focus();
    // 인풋창에 글을 쓰고 엔터 눌렀을때 이벤트
    todayInput.addEventListener('keyup', () => {
        if(window.event.keyCode == '13') {
            todayInput.readOnly = true;
            const todayText = todayInput.value;
            localStorage.setItem('TODAY_TEXT', todayText);
            const savedTodayText = localStorage.getItem('TODAY_TEXT');
            
            todayInput.value = savedTodayText;

            todayInputUpdate();
           
        }

    })
});


// 밤12시가 지나면 로컬스토리지 내용 삭제 되는 함수
const day = new Date();
const hour = day.getHours();
const s = day.getSeconds();

function todayInputUpdate() {
    if(hour > 24) {
        
        
            localStorage.removeItem('TODAY_TEXT');
            todayInput.value = '';
        
    }

}
