var chat = document.getElementById('chat');

const chatOpen = document.getElementById("chatting-function"),
      chatClose = document.getElementById("close");

// 채팅창 오픈 이벤트
chatOpen.addEventListener('click', () => {
  openChatBox();
})

// 채팅창 닫기 이벤트
chatClose.addEventListener('click', () => {
  closeChatBox();
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
  }
});

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

// 인풋창에 글자를 입력하고 엔터를 눌렀을때 이벤트
chatVal.addEventListener('keydown', (event) => {
  if (event.keyCode === 13 && chatVal.value.trim() !== '') {
    const message = document.createElement('div');
    message.className = 'message parker';
    message.textContent = chatVal.value;
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

// 인풋창 옆에 종이비행기 버튼 이벤트
const chatSubmit = document.getElementById("chat-submit");

chatSubmit.addEventListener('click', () => {
    const message = document.createElement('div');
    message.className = 'message parker';
    message.textContent = chatVal.value;
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
  
});


// 스크롤 이벤트
function scrollToBottom() {
  chat.scrollTop = chat.scrollHeight;
}


// 직원목록 이벤트
const friendsList = document.getElementById("friends-list"),
  contactArea = document.getElementById("contact-area"),
  contactH2 = document.getElementById("contact-h2"),
  contactHeader = document.querySelector('.contact-header'),
  employeeList = document.getElementById('employee-list'),
  employeeArea = document.getElementById('employee-area');

friendsList.addEventListener('click', () => {
    contactArea.style.display = 'none';
    employeeArea.style.display = 'block';
    contactH2.innerText = '직원목록';
    friendsList.style.display = 'none';
    employeeList.style.display = 'block';
    contactHeader.style.padding = '0.1rem 0 1rem 0';
})

employeeList.addEventListener('click', () => {
  contactArea.style.display = 'block';
  employeeArea.style.display = 'none';
  contactH2.innerText = '채팅'
  employeeList.style.display = 'none';
  friendsList.style.display = 'block';
  contactHeader.style.padding = '0.1rem 0 1rem 0';
})

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





         











