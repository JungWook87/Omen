(function(){
  var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      // editable: true, // 수정가능여부
      // selectable: true, // 달력 일자 드래그 설정가능
      // businessHours: true,
      dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
      expandRows: true, // 화면에 맞게 높이 재설정
      locale: 'ko', // 한국어 설정
      events: [
        {
          title : 'TestTest',
          start : '2023-06-01',
          end : null
        },
        {
          groupID : 999,
          title : 'vacation',
          start : '2023-06-01',
        },
        {
          groupID : 999
        }
      ]
    });

    calendar.render();
})();