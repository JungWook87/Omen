
const attn_btn2 = document.getElementsByClassName("main-attn-btn2");

let attn_start_hours = 0;
let attn_start_minutes = 0;

attn_btn2[0].addEventListener("click", function() {
    
    const now = new Date();

    let attn_time_hours = now.getHours();
    let attn_time_minutes = now.getMinutes();

    
    let working_time = document.getElementsByClassName("main-font-title");

    if(attn_time_hours < 10){
        attn_time_hours = "0" + attn_time_hours;
    }

    if(attn_time_minutes < 10){
        attn_time_minutes = "0" + attn_time_minutes;
    }
    
    const attn_start = document.getElementById("attn-start");
    attn_start_hours = attn_time_hours;
    attn_start_minutes = attn_time_minutes;

    const attn_end = document.getElementById("attn-end");
    
    
    if(attn_btn2[0].innerText == "업무시작"){
        attn_start.innerText = attn_start_hours + " : " + attn_start_minutes;
        attn_btn2[0].innerText = "업무종료";
        attn_btn2[0].style.backgroundColor = '#E6E8EC';

        document.getElementById("main-attn-circle").style.backgroundColor = 'springgreen';
        working_time[0].innerText = "업무중 : 0시간 0분";

        $.ajax({
            url : "attendance/attn_hours",
            type : "GET",
            dataType : "JSON",
            data : {"type" : "start",
                    "hours" : attn_start_hours,
                    "minute" : attn_start_minutes}

        })

    } else{
        attn_end.innerText = attn_time_hours + " : " + attn_time_minutes;
        attn_btn2[0].innerText = "업무시작";
        attn_btn2[0].style.backgroundColor = '#CEE0FA';

        document.getElementById("main-attn-circle").style.backgroundColor = '#B4BBC5';

        let temp_hours = attn_time_hours - attn_start_hours;
        let temp_minutes = attn_time_minutes - attn_start_minutes;

        working_time[0].innerText = "업무시간 : " + temp_hours + "시간 " + temp_minutes + "분";
    }

}); 

(function (){
    if(attn_start_hours != null){
        const now = new Date();

        let now_hours = now.getHours();
        let now_minutes = now.getMinutes();

        attn_start_hours = 10;
        attn_start_minutes = 5;

        let working_hours = now_hours - attn_start_hours;
        let working_minutes = now_minutes - attn_start_minutes;

    }
})();
