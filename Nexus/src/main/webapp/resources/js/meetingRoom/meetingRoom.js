const calendar = document.querySelector(".calendar"),
      date = document.querySelector(".date"),
      daysContainer = document.querySelector(".days"),
      prev = document.querySelector(".prev"),
      next = document.querySelector(".next"),
      todayBtn = document.querySelector(".today-btn"),
      gotoBtn = document.querySelector(".goto-btn"),
      dateInput = document.querySelector(".date-input"),
      eventDay = document.querySelector(".event-day"),
      eventDate = document.querySelector(".event-date"),
      eventsContainer = document.querySelector(".events"),
      addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];



let eventsArr = [];

// getEvents();

// 날짜 함수
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = year + "년 " + months[month] + " ";

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date" > ${prevDays - x + 1}</div>`;
  }

  for(let i = 1; i <= lastDate; i++) {

    let event = false;
    eventsArr.forEach((eventObj) => {
      if(
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    })


    if(
      i === new Date().getDate() && 
      year === new Date().getFullYear() && 
      month === new Date().getMonth()
    ) {

      activeDay = i;
      getActiveDay(i);
      updateEvents(i);

      if(event) {
        days += `<div class="day today active event" > ${i}</div>`;
      } else {
        days += `<div class="day today active" > ${i}</div>`;
      }
    } 
    else if (new Date(year, month, i).getDay() === 0) {
      days += `<div class="day sun" > ${i}</div>`; 
    }
     else {
      if(event) {
        days += `<div class="day event" > ${i}</div>`;
      } else {
        days += `<div class="day" > ${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date" > ${j}</div>`;
  }

 
  daysContainer.innerHTML = days;
  addListner();
}



initCalendar();


// 이전 달
function prevMonth() {
  month--;
  if(month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

// 다음 달
function nextMonth() {
  month++;
  if(month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth)

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if(dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  
  if(dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }

  if(e.inputType === "deleteContentBackward") {
    if(dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  
  const dateArr = dateInput.value.split("/");

  if(dateArr.length === 2) {
    if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      dateInput.value = '';
      return;
    }
  }

  Swal.fire("잘못된 날짜입니다.")
}


// 이벤트 추가
const addEventBtn = document.querySelector(".add-event"),
      addEventContainer = document.querySelector(".add-event-wrapper"),
      addEventCloseBtn = document.querySelector(".close");
      

addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if(e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
})



function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);

      days.forEach((day) => {
        day.classList.remove("active");
      })

      if(e.target.classList.contains("prev-date")) {
        prevMonth();

        setTimeout(() => {
          const days = document.querySelectorAll(".day");

          days.forEach((day) => {
            if(
              !day.classList.contains("prev-date") && 
              day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
          });
        }, 100);
      } else if(e.target.classList.contains("next-date")) {
        nextMonth();

        setTimeout(() => {
          const days = document.querySelectorAll(".day");

          days.forEach((day) => {
            if(
              !day.classList.contains("next-date") && 
              day.innerHTML === e.target.innerHTML
              ) {
                day.classList.add("active");
              }
          });
        }, 100);
      }
      else {
        e.target.classList.add("active");
      }

    })
  })
}



function getActiveDay(date) {
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const day = new Date(year, month, date);
  const dayName = dayNames[day.getDay()];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = year + "년" + " " + months[month] + " " + date + "일";
}

function updateEvents(date) {
  let events = "";
  let availableRooms = 8; // Total available rooms

  eventsArr.forEach((event) => {
    if(
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {

      event.events.forEach((event) => {
        events += `
        <div class = "event">
          <div class = "title">
            <i class = "fas fa-circle"></i>
            <h3 class = "event-title">${event.title}</h3>
          </div>
          <div class = "event-time">
            <span class = "event-time">${event.time}</span>
          </div>
        </div>`
        if (event.title !== "회의실 선택") {
          availableRooms--; // Decrease available rooms count for each reserved room
        }
      })

    }
  })

  if(events === "") {
    events = `<div class = "no-event">
                <h3>예약된 회의실이 없습니다.</h3>
              </div>`
  }

  eventsContainer.innerHTML = events;

  const availableRoomsText = document.querySelector(".available-rooms");
  if (availableRoomsText) {
    availableRoomsText.remove(); // Remove existing text if it exists
  }

  if (availableRooms >= 0) {
    const roomsText = document.createElement("div");
    roomsText.className = "available-rooms";
    roomsText.innerHTML = `예약 가능한 회의실: ${availableRooms}`;
    daysContainer.appendChild(roomsText);
  }

  const eventWindow = document.querySelector(".event-window");
  if (eventWindow) {
    eventWindow.style.display = "none"; // Hide the event window
  }


  // saveEvents();

}

addEventSubmit.addEventListener("click", () => {
  // 드롭다운 요소 선택
  const dropdown = document.querySelector(".drop .option.active");
  // 라디오 버튼 선택
  const morningRadio = document.getElementById("morning");
  const afternoonRadio = document.getElementById("afternoon");


  // 선택된 값 가져오기
  const selectedValue = dropdown.dataset.value;
  const selectedText = dropdown.textContent.trim();
  const morningChecked = morningRadio.checked;
  const afternoonChecked = afternoonRadio.checked;

  // 값 출력
  console.log("Selected value:", selectedValue);
  console.log("Selected text:", selectedText);
  console.log("Morning radio checked:", morningChecked);
  console.log("Afternoon radio checked:", afternoonChecked);

  if(selectedValue === "placeholder") {
    Swal.fire("회의실을 선택해 주세요");
  } else if(morningChecked === false && afternoonChecked === false) {
    Swal.fire("오전과 오후중 선택해 주세요");
  }


 // 중복 체크
 const isDuplicate = eventsArr.some((item) => {
  return (
    item.day === activeDay &&
    item.month === month + 1 &&
    item.year === year &&
    item.events.some((event) => {
      return (
        event.title === selectedText &&
        event.time === (morningChecked ? "오전" : "오후")
      );
    })
  );
});

if (isDuplicate) {
  Swal.fire("이미 해당 시간에 예약이 있습니다");
  return;
}

// 회의실 중복 체크
const roomEvents = eventsArr.flatMap((item) => item.events);
const roomDuplicateCount = roomEvents.reduce((count, event) => {
  if (event.title !== "회의실 선택" && event.time === (morningChecked ? "오전" : "오후")) {
    return count + 1;
  }
  return count;
}, 0);

if (roomDuplicateCount >= 8) {
  Swal.fire("더 이상 예약할 수 없습니다");
  return;
}

 


  const newEvent = {
    title : selectedText,
    time: morningChecked ? "오전" : afternoonChecked ? "오후" : "",
  };

  let eventAdded = false;

  if(eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if(
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    })
  }

  if(!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month:month + 1,
      year: year,
      events : [newEvent],
    })
  }

  addEventContainer.classList.remove("active");

  // 선택한 회의실 번호 유지
  dropdown.textContent = selectedText;

 // 기존 내용 초기화
  // dropdown.dataset.value = "placeholder";
  // dropdown.textContent = "회의실 선택";
  morningRadio.checked = false;
  afternoonRadio.checked = false;


  updateEvents(activeDay);

  const activeDayElem = document.querySelector(".day.active");
  if(!activeDayElem.classList.contains("event")) {
    activeDayElem.classList.add("event");
  }


})




eventsContainer.addEventListener("click", (e) => {
  if(e.target.classList.contains("event")) {
    const eventTitle = e.target.children[0].children[1].innerHTML;

    eventsArr.forEach((event) => {
      if(
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
      ) {
        event.events.forEach((item, index) => {
          if(item.title === eventTitle) {
            event.events.splice(index, 1);
          }
        })

        if(event.events.length === 0) {
          eventsArr.splice(eventsArr.indexOf(event), 1);

          const activeDayElem = document.querySelector(".day.active");
          if(activeDayElem.classList.contains("event")) {
            activeDayElem.classList.remove("event");
          }
        }
      }
    })

    updateEvents(activeDay);
  }
 
})



// 회의실 예약 스타일
$(document).ready(function() {
  $(".drop .option").click(function() {
    var val = $(this).attr("data-value"),
        $drop = $(".drop"),
        prevActive = $(".drop .option.active").attr("data-value"),
        options = $(".drop .option").length;
    $drop.find(".option.active").addClass("mini-hack");
    $drop.toggleClass("visible");
    $drop.removeClass("withBG");
    $(this).css("top");
    $drop.toggleClass("opacity");
    $(".mini-hack").removeClass("mini-hack");
    if ($drop.hasClass("visible")) {
      setTimeout(function() {
        $drop.addClass("withBG");
      }, 400 + options*100); 
    }
    triggerAnimation();
    if (val !== "placeholder" || prevActive === "placeholder") {
      $(".drop .option").removeClass("active");
      $(this).addClass("active");
    };
  });
  
  function triggerAnimation() {
    var finalWidth = $(".drop").hasClass("visible") ? 100 : 100;
    $(".drop").css("width", "100%");
    setTimeout(function() {
      $(".drop").css("width", finalWidth + "%");
    }, 400);
  }
});


$(".option").click(function() {
  var selectedRoom = $(this).attr("data-value");
  var selectedTime = $("input[name='day-time']:checked").val();
  $.ajax({
    url: "/reservationRoom",
    type: "GET",
    data: { room: selectedRoom, time: selectedTime }, 
    success: function(response) {
 
    },
    error: function(int) {
 
    }
  });
});