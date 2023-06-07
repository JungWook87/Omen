
const attn_btn2 = document.getElementsByClassName("main-attn-btn2");

attn_btn2[0].addEventListener("click", function() {
    
    const now = new Date();

    let attn_time_hours = now.getHours();
    let attn_time_minutes = now.getMinutes();

    

    if(attn_time_hours < 10){
        attn_time_hours = "0" + attn_time_hours;
    }

    if(attn_time_minutes < 10){
        attn_time_minutes = "0" + attn_time_minutes;
    }
    
    const attn_start = document.getElementById("attn-start");
    const attn_start_hours = attn_time_hours;
    const attn_start_minutes = attn_time_minutes;





    const attn_end = document.getElementById("attn-end");
    
    
    if(attn_btn2[0].innerText == "업무시작"){
        attn_start.innerText = attn_time_hours + " : " + attn_time_minutes;
        attn_btn2[0].innerText = "업무종료";
        attn_btn2[0].style.backgroundColor = '#E6E8EC';

        document.getElementById("main-attn-circle").style.backgroundColor = 'springgreen';
    } else{
        attn_end.innerText = attn_time_hours + " : " + attn_time_minutes;
        attn_btn2[0].innerText = "업무시작";
        attn_btn2[0].style.backgroundColor = '#CEE0FA';

        document.getElementById("main-attn-circle").style.backgroundColor = '#B4BBC5';
    }

})
