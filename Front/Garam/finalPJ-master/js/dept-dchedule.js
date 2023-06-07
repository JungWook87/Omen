(function(){
    $(function(){
      // calendar element 취득
      var calendarEl = $('#calendar')[0];
      // full-calendar 생성하기
      var calendar = new FullCalendar.Calendar(calendarEl, {
        height: '700px', // calendar 높이 설정
        expandRows: true, // 화면에 맞게 높이 재설정
        slotMinTime: '08:00', // Day 캘린더에서 시작 시간
        slotMaxTime: '20:00', // Day 캘린더에서 종료 시간
        // 해더에 표시할 툴바
        headerToolbar: {
          left: 'prev next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        // 버튼 스타일
        buttonText: {
            today: "오늘",
            month: "월별",
            week: "주별",
            day: "일별",
            list: "리스트",
        },
        initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
        //initialDate: '2023-06-07', // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
        navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
        editable: true, // 수정 가능?
        selectable: true, // 달력 일자 드래그 설정가능
        nowIndicator: true, // 현재 시간 마크
        dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
        locale: 'ko', // 한국어 설정
        eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
          console.log(obj);
        },
        eventChange: function(obj) { // 이벤트가 수정되면 발생하는 이벤트
          // GMT 시간은 9시간 빨라서 9시간 빼줘야됨
				var start = obj.event._instance.range.start;
				if(start.getHours() == 9) {
					start = moment(start).format('YYYY-MM-DD') + " 00:00";
				}
				else {
					start = start.setHours(start.getHours() - 9);
					start = moment(start).format('YYYY-MM-DD hh:mm');
				}
				
				
				var end = obj.event._instance.range.end;
				if(end.getHours() == 9) {
					end = moment(end).format('YYYY-MM-DD') + " 00:00";
				}
				else {
					end = end.setHours(end.getHours() - 9);
					end = moment(end).format('YYYY-MM-DD hh:mm');
				}
				
				
				// $.ajax({
				// 		  url: "/~team2/admin/ajax_calendar_edit",
				// 		  type: "POST",
				// 		  data : {
				// 				title : obj.event._def.title,
				// 				start: start,
				// 				end: end
				// 		  },
				// 		  traditional: true,
				// 		  async: false, //동기
				// 		  success : function(data){
							  
				// 		  },
				// 		  error : function(request,status,error){
				// 			alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
				// 			console.log("code = "+ request.status + " message = " + request.responseText + " error = " + error);
				// 		  }
				// 	});
        },
        eventRemove: function(obj){ // 이벤트가 삭제되면 발생하는 이벤트
            console.log('remove');
        },
        select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
          var title = (async () => {
            const { value: title } = await Swal.fire({
                title: '일정을 입력하세요.',
                text: '',
                input: 'text',
                inputPlaceholder: ''
            })
        
            // 이후 처리되는 내용.
            if (title) {
                if (title) {
                    calendar.addEvent({
                      title: title,
                      start: arg.start,
                      end: arg.end,
                      allDay: arg.allDay
                    })
                  }
                  calendar.unselect()
            }
        })();
         
        },
        eventClick: function(arg) { 
            // 있는 일정 클릭시
            if (confirm('일정을 삭제하시겠습니까?')) 
             { 
            //     $.ajax({
            //           url: "/~team2/admin/ajax_calendar_delete",
            //           type: "POST",
            //           data : {
            //                 title : arg.event._def.title
            //           },
            //           traditional: true,
            //           async: false, //동기
            //           success : function(data){
                         
            //           },
            //           error : function(request,status,error){
            //             alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
            //             console.log("code = "+ request.status + " message = " + request.responseText + " error = " + error);
            //           }
            //     });
                arg.event.remove();
            } 
        },
        eventBorderColor : 'var(--primary300)', // 이벤트 테두리색
		eventBackgroundColor : 'var(--primary300)' , // 이벤트 배경색
       
         // 이벤트 
         events: [
            {
                id: 'a',
                title: 'christmas',
                start: '2022-12-25'
            }
         ]
        
      })
      // 캘린더 랜더링
      calendar.render();
    });
  })();