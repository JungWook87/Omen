var chat = document.getElementById('chat');
chat.scrollTop = chat.scrollHeight - chat.clientHeight;


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