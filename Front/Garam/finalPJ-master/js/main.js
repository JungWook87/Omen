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
    if(hour >= 24) {
        
        
            localStorage.removeItem('TODAY_TEXT');
            todayInput.value = '';
        
    }

}


// 부서일정
const calendar = document.querySelector(".calendar"),
      date = document.querySelector(".date"),
      daysContainer = document.querySelector(".days"),
      prev = document.querySelector(".prev"),
      next = document.querySelector(".next"),
      todayBtn2 = document.querySelector(".today-btn"),
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

// const eventsArr = [
//   {
//     day: 16,
//     month: 6,
//     year: 2023,
//     events: [
//       {
//         title: "여친사귄날",
//         time: "10:00 AM"
//       },
//       {
//         title: "헤어진날",
//         time: "11:00 AM"
//       },
//     ],
//   },
// ]

let eventsArr = [];

getEvents();

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
      addEventCloseBtn = document.querySelector(".close"),
      addEventTitle = document.querySelector(".event-name"),
      addEventFrom = document.querySelector(".event-time-from"),
      addEventTo = document.querySelector(".event-time-to");





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
      })

    }
  })

  if(events === "") {
    events = `<div class = "no-event">
                <h3>이벤트가 없습니다.</h3>
              </div>`
  }

  eventsContainer.innerHTML = events;

  saveEvents();

}


function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

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


function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr)); 
}

function getEvents() {
  if(localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}






