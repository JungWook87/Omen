const chatMain = document.getElementById('chat-main'), 
  chat = document.getElementById('chat'),
  chatOpen = document.getElementById("chatting-function"),
  chatClose = document.getElementById("close"),
  chattingClose = document.getElementById('chat-close'),
  chatting = document.querySelector('.chat');
  
// 채팅창 오픈 이벤트
chatOpen.addEventListener('click', () => {
  openChatBox();
})

// 채팅창 닫기 이벤트
chatClose.addEventListener('click', () => {
  closeChatBox();
 
})

chattingClose.addEventListener('click', () => {
  closeChatBox();
  chattingHeaderChange();
  
})

// 채팅창 여는 함수
function openChatBox() {
  var chatBox = document.querySelector('.chat-box');
  chatBox.classList.toggle('open');
 
   
  // 채팅 버튼이 사라지는 애니메이션을 위해 클래스를 추가하고, 애니메이션이 완료된 후에 버튼을 제거합니다.
  chatOpen.classList.add('fade-out');
  setTimeout(function() {
    chatOpen.style.display = 'none';
  }, 100); 
}   

// 채팅창 끄는 함수
function closeChatBox() {
  var chatBox = document.querySelector('.chat-box');
  chatBox.classList.remove('open');
  
 
  
  // 버튼에 페이드 인 애니메이션 클래스를 추가합니다.
  chatOpen.classList.add('fade-in');
  setTimeout(function() {
    chatOpen.style.display = 'block';
  }, 200); 
  
}

// 바깥영역 클릭시 채팅창 사라짐
window.addEventListener('click', function(event) {
  var chatBox = document.querySelector('.chat-box');
  var chatButton = document.getElementById('chatting-function');

 

  if (!chatBox.contains(event.target) && !chatButton.contains(event.target)) {
    chatBox.classList.remove('open');
    chatOpen.classList.add('fade-in');
  setTimeout(function() {
    chatOpen.style.display = 'block';
  }, 200); 

  chattingHeaderChange();

  }
});




//직원목록 이벤트
const friendsList = document.getElementById("friends-list"),
  contactArea = document.getElementById("contact-area"),
  contactH2 = document.getElementById("contact-h2"),
  contactHeader = document.querySelector('.contact-header'),
  employeeList = document.getElementById('employee-list'),
  employeeArrow = document.querySelector('.employee-arrow');

friendsList.addEventListener('click', () => {
    contactArea.style.display = 'none';
    employeeArrow.style.display = 'flex';
    contactH2.innerText = '직원목록';
    friendsList.style.display = 'none';
    employeeList.style.display = 'block';
    contactHeader.style.padding = '0.1rem 0 1rem 0';
    
    chattingHeaderChange();
})

employeeList.addEventListener('click', () => {
  employeeListChange();
})

// 채팅화면으로 전환
function employeeListChange() {
  contactArea.style.display = 'block';
  employeeArrow.style.display = 'none';
  contactH2.innerText = '채팅'
  employeeList.style.display = 'none';
  friendsList.style.display = 'block';
  contactHeader.style.padding = '0.1rem 0 1rem 0';
}

// 화면전환 
function chattingHeaderChange() {
  if(
    chatMain.style.display === 'none' &&
    chatting.style.display === 'flex' ) {
      chatMain.style.display = 'flex';
      chatting.style.display = 'none';
    }
}






// 직원목록 드랍박스 
const employeeDropBox = document.querySelectorAll(".employee-dropBox"),
  employeeDropBoxUl = document.querySelectorAll(".employee-dropBox-ul"),
  employeeDropBoxI = document.querySelectorAll(".employee-dropBox-i");

employeeDropBox.forEach((dropBox, index) => {
  dropBox.addEventListener('click', () => {
    if (employeeDropBoxUl[index].style.display === 'block') {
      employeeDropBoxUl[index].style.display = 'none';
      employeeDropBoxI[index].classList.remove("fa-bounce");
    } else {
      employeeDropBoxUl[index].style.display = 'block';
      employeeDropBoxI[index].classList.add("fa-bounce");
    }


    // 채팅창 끌때 이벤트
    chatClose.addEventListener('click', () => {
      closeChatBox();
      
      if (employeeDropBoxUl[index].style.display === 'block') {
        employeeDropBoxUl[index].style.display = 'none';
        employeeDropBoxI[index].classList.remove("fa-bounce");

      }
    })
    
    chattingClose.addEventListener('click', () => {
      closeChatBox();
      chattingHeaderChange();
     
      if (employeeDropBoxUl[index].style.display === 'block') {
        employeeDropBoxUl[index].style.display = 'none';
        employeeDropBoxI[index].classList.remove("fa-bounce");

      }
    })


    window.addEventListener('click', function(event) {
      var chatBox = document.querySelector('.chat-box');
      var chatButton = document.getElementById('chatting-function');
    
     
    
      if (!chatBox.contains(event.target) && !chatButton.contains(event.target)) {
        chatBox.classList.remove('open');
        chatOpen.classList.add('fade-in');
      setTimeout(function() {
        chatOpen.style.display = 'block';
      }, 200); 
    
      chattingHeaderChange();
    
      if (employeeDropBoxUl[index].style.display === 'block') {
        employeeDropBoxUl[index].style.display = 'none';
        employeeDropBoxI[index].classList.remove("fa-bounce");

      }
      
      }
    })


  });

});

// 라디오 버튼 생기고 사라지는 이벤트
const employeeNameBoxes = document.querySelectorAll(".employee-name-box");

employeeNameBoxes.forEach((nameBox) => {
  const radioInput = nameBox.querySelector("input[type='radio']"),
    inviteButton = nameBox.querySelector(".invite-button"),
    label = nameBox.querySelector("span");

  radioInput.addEventListener("change", () => {
    if (radioInput.checked) {
      // 현재 라디오 버튼 체크 시
      employeeNameBoxes.forEach((box) => {
        const boxRadioInput = box.querySelector("input[type='radio']");
        const boxLabel = box.querySelector("span");
        const boxInviteButton = box.querySelector(".invite-button");
        
        if (box === nameBox) {
          // 선택된 라디오 버튼인 경우
          boxLabel.style.display = "none";
          boxInviteButton.style.display = "inline-block";
        } else {
          // 선택되지 않은 라디오 버튼인 경우
          boxLabel.style.display = "inline-block";
          boxInviteButton.style.display = "none";
          boxRadioInput.checked = false;
        }
      });
    }
  });
});

// 채팅방이 비어있을 때 문구를 추가하는 함수
function showEmptyChatMessage() {
  const emptyChatMessage = document.createElement('p');
  emptyChatMessage.textContent = '채팅방이 비어있습니다.';
  emptyChatMessage.classList.add('empty-chat-message');
  contactArea.appendChild(emptyChatMessage);
}

// 채팅방이 비어있을 때 문구를 제거하는 함수
function hideEmptyChatMessage() {
  const emptyChatMessage = contactArea.querySelector('.empty-chat-message');
  if (emptyChatMessage) {
    emptyChatMessage.remove();
  }
}


// 현재 날짜 가져오기
const currentDate = new Date();
const chatYear = currentDate.getFullYear();
const chatMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
const chatDay = String(currentDate.getDate()).padStart(2, '0');



// 현재 시간 가져오기
function getTimeString() {
  const chatNow = new Date();
  let chatHours = chatNow.getHours();
  const chatMinutes = String(chatNow.getMinutes()).padStart(2, '0');
  let timeString = '';
  
  if (chatHours >= 12) {
    timeString = '오후 ';
    if (chatHours > 12) {
      chatHours -= 12;
    }
  } else {
    timeString = '오전 ';
  }

  timeString += `${chatHours}:${chatMinutes}`;

  return timeString;
}


const chatVal = document.getElementById("chat-input");

let isTyping = false;
let typingIndicator = null;

// 인풋창에 글자를 입력하고 있을때 ... 표시나는 이벤트
chatVal.addEventListener('input', () => {
  if (chatVal.value.trim() !== '') {
    if (!isTyping) {
      isTyping = true;
      typingIndicator = document.createElement('div');
      typingIndicator.className = 'message parker typing';
      typingIndicator.innerHTML = `
        <div class="typing typing-1"></div>
        <div class="typing typing-2"></div>
        <div class="typing typing-3"></div>
      `;
      chat.appendChild(typingIndicator);
      scrollToBottom();
    }
  } else {
    if (isTyping) {
      isTyping = false;
      if (typingIndicator && typingIndicator.parentNode === chat) {
        chat.removeChild(typingIndicator);
        typingIndicator = null;
      }
    }
  }
});

//인풋창에 글자를 입력하고 엔터를 눌렀을때 이벤트
chatVal.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && chatVal.value.trim() !== '') {
    const message = document.createElement('div');
    message.className = 'message parker';
    const time = getTimeString();
    const content = document.createElement('div');
    content.className = 'content';
    content.textContent = chatVal.value;
    message.appendChild(content);
    chat.appendChild(message);
    chatVal.value = '';

    // 글자 수에 따라 .long-message 클래스 추가
    if (content.offsetHeight < content.scrollHeight) {
      content.classList.add('long-message');
    }

    const timeSub = document.createElement('div');
    timeSub.className = 'time-sub';
    timeSub.textContent = time;
    message.insertBefore(timeSub, content);

    if (isTyping) {
      isTyping = false;
      if (typingIndicator && typingIndicator.parentNode === chat) {
        chat.removeChild(typingIndicator);
        typingIndicator = null;
      }
    }

    scrollToBottom();
  }
});

// 인풋창 옆에 종이비행기 버튼 이벤트
const chatSubmit = document.getElementById("chat-submit");

chatSubmit.addEventListener('click', () => {
  if (chatVal.value.trim() !== '') {
    const message = document.createElement('div');
    message.className = 'message parker';
    const time = getTimeString(); // 현재 시간 가져오기
    message.innerHTML = `
      <div class="time">${time}</div>
      <div class="content">${chatVal.value}</div>
    `;
    chat.appendChild(message);
    chatVal.value = '';

    if (isTyping) {
      isTyping = false;
      if (typingIndicator && typingIndicator.parentNode === chat) {
        chat.removeChild(typingIndicator);
        typingIndicator = null;
      }
    }

    scrollToBottom();
  }
});


// 스크롤 이벤트
function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}



// 초대 버튼 눌렀을때
const inviteButton = document.querySelectorAll(".invite-button"),
  inviteName = document.querySelector('.chat-name');

inviteButton.forEach((button) => {
  button.addEventListener("click", async () => {
    $.ajax({
      url : "inviteMember",
      data : { "name" : pName},
      type : "POST",
      dataType : "JSON",
      success : function(response){

         console.log(response);

         const listItem = button.closest("li");
         const nameElement = listItem.querySelector("p");
         const pName = nameElement.textContent;
         console.log(name);
         inviteName.textContent = pName;

      },error : function(req, status, error){
        console.log("에러 발생");
        console.log(req.responseText);
    
      }

    })

    

    // 중복 추가 방지 로직
    const existingContacts = contactArea.querySelectorAll('.contact .name');
    const duplicateContact = Array.from(existingContacts).find(contact => contact.textContent.trim() === name);
    if (duplicateContact) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-right',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
      })
      await Toast.fire({
        icon: 'error',
        title: '이미 추가된 이름입니다.'
      })
      return;
    }

    // 채팅창 화면 로직
    chat.innerHTML = "";
    const todayTime = document.createElement('div');
    todayTime.className = 'time';
    chat.appendChild(todayTime);

    // 현재 날짜와 비교하여 "오늘" 표시 업데이트
    const timeElement = document.querySelector('.time');
    const chatToday = new Date();
    const messageDate = currentDate.getDate();

    if (messageDate === chatToday.getDate()) {
      timeElement.textContent = '오늘';
    } else {
      timeElement.textContent = `${chatYear}년 ${chatMonth}월 ${chatDay}일`;
    }

    const newContact = document.createElement('div');
    newContact.classList.add('contact', 'contact-hover');
    newContact.innerHTML = `
      <div>
        <div class="name">${name}</div>
        <div class="contact-message">${chatVal.value}</div>
      </div>
      <div class="delete-btn-set">
        <div class="arrow-button">
          <i class="fa-solid fa-angles-left fa-beat-fade"></i>
        </div>
        <div class="flex-btn">
          <div class="cancle-button">취소</div>
          <div class="delete-button">나가기</div>
        </div>
      </div>
    `;

  

    // 글이 길어지면 ... 표시
    const message = newContact.querySelector('.contact-message');
    message.style.overflow = 'hidden';
    message.style.whiteSpace = 'nowrap';
    message.style.textOverflow = 'ellipsis';
    
    // 화살표 버튼을 클릭하여 삭제 버튼 표시
    const arrowButton = newContact.querySelector('.arrow-button');
    arrowButton.addEventListener('click', () => {
      hideArrowButton();
      showDeleteButton();
    });

    // 삭제 버튼과 취소버튼 초기 상태는 숨김으로 설정
    const deleteButton = newContact.querySelector('.delete-button');
    const cancleButton = newContact.querySelector('.cancle-button');
    cancleButton.style.display = 'none';
    deleteButton.style.display = 'none';

    // 삭제 버튼과 취소버튼 보여주는 함수
    const showDeleteButton = () => {
      deleteButton.style.display = 'block';
      cancleButton.style.display = 'block';
    };

    // 삭제 버튼과 취소버튼 숨기는 함수
    const hideDeleteButton = () => {
      deleteButton.style.display = 'none';
      cancleButton.style.display = 'none';
    };
    
    // 화살표 버튼을 보여주는 함수
    const showArrowButton = () => {
      arrowButton.style.display = 'block';
    };

    // 화살표 버튼을 숨기는 함수
    const hideArrowButton = () => {
      arrowButton.style.display = 'none';
    };

    // 삭제 버튼의 이벤트 리스너 추가
    deleteButton.addEventListener('click', () => {

      Swal.fire({
        title: '채팅방을 나가시겠습니까?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        cancelButtonColor: 'var(--primary400)',
        confirmButtonText: '나가기'
      }).then((result) => {
        if (result.isConfirmed) {
            newContact.remove();
            if (contactArea.innerHTML.trim() === '') {
              showEmptyChatMessage();
            }
        } else {
          hideDeleteButton();
          showArrowButton();
        }
      })
    });

    // 취소 버튼의 이벤트 리스너
    cancleButton.addEventListener('click', () => {
      hideDeleteButton();
      showArrowButton();
    })

    

    contactArea.appendChild(newContact);
    

    // 채팅방에서 클릭 이벤트
    if (contactArea.innerHTML.trim() === '') {
      showEmptyChatMessage();
    } else {
      hideEmptyChatMessage();
      newContact.addEventListener('click', () => {
        console.log('존나 힘들다 시발');

      
      })

    }

   





    chatMain.style.display = 'none';
    chatting.style.display = 'flex';

    if (contactArea.style.display === 'none') {
      employeeListChange();
    }

    // 채팅방이 비어있을 때 문구 표시
    hideEmptyChatMessage();


    // 채팅창 끌때 이벤트
    chatClose.addEventListener('click', () => {
      closeChatBox();
      if(deleteButton.style.display === 'block') {
        hideDeleteButton();
        showArrowButton();
      }
    })
    
    chattingClose.addEventListener('click', () => {
      closeChatBox();
      chattingHeaderChange();
      if(deleteButton.style.display === 'block') {
        hideDeleteButton();
        showArrowButton();
      }
    })


    window.addEventListener('click', function(event) {
      var chatBox = document.querySelector('.chat-box');
      var chatButton = document.getElementById('chatting-function');
    
     
    
      if (!chatBox.contains(event.target) && !chatButton.contains(event.target)) {
        chatBox.classList.remove('open');
        chatOpen.classList.add('fade-in');
      setTimeout(function() {
        chatOpen.style.display = 'block';
      }, 200); 
    
      chattingHeaderChange();
    
      if(deleteButton.style.display === 'block') {
        hideDeleteButton();
        showArrowButton();
      }

      }
    });



  });
});

if (contactArea.innerHTML.trim() === '') {
  showEmptyChatMessage();
}


      











