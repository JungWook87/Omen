// 모달창 스타일
const btn = document.getElementById('popupBtn');
const modal = document.getElementById('modalWrap');
const closeBtn = document.getElementById('closeBtn');
const modalBody = document.querySelector('.modalBody');
const cancellBtn = document.getElementById('cancell-btn');
const noticeTitle = document.querySelector('.modal-title > input');
const noticeContent = document.querySelector('.modal-detail > textarea');

// 공지사항 버튼 이벤트
btn.addEventListener("click", () => {
  // 초기화
  noticeTitle.value = '';
  noticeContent.value = '';
  if(preview.firstChild != null) {
    preview.firstChild.remove();
  }

  modal.style.display = 'block';
  modalBody.classList.add('modal-open');

}) 

// 모달창 엑스 버튼
closeBtn.addEventListener("click", () => {
  modalClose();
});

// 모달창 외부 영역 이벤트
window.onclick = function(event) {
  if (event.target == modal) {
    modalClose();
  }
}

// 취소버튼 이벤트
cancellBtn.addEventListener("click", () => {
  modalClose();
})

// 모달창 닫는 함수
function modalClose() {
  modalBody.classList.add('modal-close');
  
  setTimeout(() => {
    modal.style.display = 'none';
    modalBody.classList.remove("modal-close");
  }, 350);

  noticeContent.style.overflow = 'hidden';

  noticeContent.style.height = 'inherit';
}



// 자동 높이 조정 textarea

function handleResizeHeight(obj) {
  obj.style.height = 'auto';
  obj.style.height = obj.scrollHeight + 'px';
 
  
  const computedStyles = window.getComputedStyle(obj);
  if (obj.scrollHeight >= parseInt(computedStyles.maxHeight)) {
    obj.style.overflow = "scroll";
    obj.style.overflowX = "hidden";
  } else {
    obj.style.overflow = "hidden";
  }
}


// 파일 업로드 스타일
const fileUpload = document.getElementById('file-uploads');
const preview = document.querySelector('.preview');

fileUpload.style.opacity = 0;

fileUpload.addEventListener('change', updateImageDisplay);

function updateImageDisplay(event) {
  while(preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = fileUpload.files;
  if(curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = '선택된 파일이 없습니다.';
    preview.appendChild(para);
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);

    for(const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if(validFileType(file)) {
        para.innerHTML = `파일 이름 - ${file.name}<br> 파일 크기 - ${returnFileSize(file.size)}.`;
  
        listItem.appendChild(para);
      } else {
        para.textContent = `파일 이름 - ${file.name}: 해당파일은 불러올수 없습니다.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }

  // 올린파일 들고오기
  const upFile = event.target.files[0];
  const reader = new FileReader();
  const fileInfo = `${upFile.name}`;

  reader.onload = function(e) {
    checkPreview.innerText = fileInfo;
  };

  reader.readAsDataURL(upFile);


  // 다운로드
  

}

// const fileTypes = [
//   "image/apng",
//   "image/bmp",
//   "image/gif",
//   "image/jpeg",
//   "image/pjpeg",
//   "image/png",
//   "image/svg+xml",
//   "image/tiff",
//   "image/webp",
//   "image/x-icon"
// ];

const fileTypes = [
  // 이미지 파일
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
  
  // 텍스트 파일
  "text/plain",
  "text/html",
  "text/css",
  "text/javascript",
  
  // 음악 파일
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  
  // 비디오 파일
  "video/mpeg",
  "video/mp4",
  "video/quicktime",
  
  // 문서 파일
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  
  // 압축 파일
  "application/zip",
  "application/x-rar-compressed",
  "application/x-tar",
  
  // 기타 파일 유형
  "application/octet-stream"
];


function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if(number < 1024) {
    return number + 'bytes';
  } else if(number >= 1024 && number < 1048576) {
    return (number/1024).toFixed(1) + 'KB';
  } else if(number >= 1048576) {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

// 파일 지우기
const fileRemove = document.getElementById("file-remove");

fileRemove.addEventListener("click", () => {
  preview.firstChild.remove();
  
})


// 글 추가시 나타나는 기능
const successBtn = document.getElementById('success-btn');


successBtn.addEventListener("click", () => {

  if(noticeTitle.value == "") {
    Swal.fire('제목을 입력해 주세요');
  } else if(noticeContent.value == '') {
    Swal.fire('내용을 입력해 주세요')
  } else {
    
    const tr = document.createElement('tr');
    const tdNum = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdNode = document.createTextNode(noticeTitle.value);
    const tdDate = document.createElement('td');
  
    tdTitle.append(tdNode);
    tr.append(tdNum, tdTitle, tdDate);
  
    document.querySelector('tbody').append(tr);
    
    // 수정 모달창 열기
    tr.addEventListener("click", function() {
      modifyModal();
    })
    
    // 모달 닫기
    modalClose();
  }

})

// 글쓰기 유효성 검사 
function writeValidate(){
  const noticeTitle = document.getElementsByName("noticeTitle")[0];
  const noticeContent = document.querySelector("[name='noticeContent']");

  if(noticeTitle.value.trim().length == 0){
      alert("제목을 입력해주세요!!!");
      noticeTitle.value = "";
      noticeTitle.focus();
      return false;
  }

  if(noticeContent.value.trim().length == 0){
      alert("내용을 입력해주세요!!!");
      noticeContent.value = "";
      noticeContent.focus();
      return false;
  }

  deleteList.value = Array.from(deleteSet);

  return true;
}

// 수정모달창
const checkModal = document.getElementById('check-modalWrap');
const checkCloseBtn = document.getElementById('check-closeBtn');
const checkModalBody = document.querySelector('.check-modalBody');
const checkCancellBtn = document.getElementById('check-cancell-btn');
const checkModalTitle = document.querySelector('.check-modal-title > input');
const checkModalDetail = document.querySelector('.check-modal-detail');
const checkPreview = document.querySelector('.check-preview');


// 수정 모달창 오픈
function modifyModal() {
  
  // 제목 밸류값 들고오기
  checkModalTitle.value = noticeTitle.value;

  // textarea 밸류값 들고오기
  checkModalDetail.innerHTML = "";
  const checkModalDetailLines = noticeContent.value.split("\n");
  let resultString = "<p>";
  
  for (let i = 0; i < checkModalDetailLines.length; i++) {
    resultString += checkModalDetailLines[i] + "<br>";
  }

  resultString += "</p>";

  checkModalDetail.innerHTML = resultString;


  // 모달창 열기
  checkModal.style.display = 'block';
  checkModalBody.classList.add('check-modal-open');

}

// 수정 모달창 닫기
// 수정 모달창 닫는 함수
function checkModalClose() {
  checkModalBody.classList.add('check-modal-close');
  
  setTimeout(() => {
    checkModal.style.display = 'none';
    checkModalBody.classList.remove("check-modal-close");
  }, 350);

  noticeContent.style.overflow = 'hidden';

  noticeContent.style.height = 'inherit';
}

// 모달창 엑스 버튼
checkCloseBtn.addEventListener("click", () => {
  checkModalClose();
});

// 모달창 외부 영역 이벤트
$(window).click(function(event) {
  if (event.target == checkModal) {
    checkModalClose();
  }
});

// 취소버튼 이벤트
checkCancellBtn.addEventListener("click", () => {
  checkModalClose();
});



// 댓글 추가 버튼 클릭 이벤트 리스너 등록
const addCommentBtn = document.getElementById('add-comment-btn');
addCommentBtn.addEventListener('click', () => {
  const commentInput = document.querySelector('.comment-input input');
  const commentText = commentInput.value.trim();

  if (commentText !== '') {
    commentInput.value = '';
    addComment(commentText);
    updateTimestamps(); // 댓글 추가 후 타임스탬프 업데이트
  }
});

// 인풋창 엔터 키 이벤트 리스너 등록
const commentInput = document.querySelector('.comment-input input');
commentInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
      commentInput.value = '';
      addComment(commentText);
      updateTimestamps(); // 댓글 추가 후 타임스탬프 업데이트
    }
  }
});

// 댓글 추가 함수
function addComment(commentText) {
  const commentsContainer = document.querySelector('.comment-content');
  const newComment = document.createElement('div');
  newComment.classList.add('comment-list');

  const commentName = document.createElement('div');
  commentName.classList.add('comment-name');
  
  const commentContent = document.createElement('span');
  commentContent.innerText = commentText;
  
  const commentTimestamp = document.createElement('span');
  commentTimestamp.innerText = formatTimestamp(new Date());
  commentTimestamp.setAttribute('data-timestamp', new Date().toISOString()); // 타임스탬프 설정

  commentName.innerHTML = '<p>오가람</p>';
  commentName.appendChild(commentTimestamp);

  newComment.appendChild(commentName);
  newComment.appendChild(commentContent);

  commentsContainer.appendChild(newComment);
}



// 타임스탬프 형식을 변환하여 표시하는 함수
function formatTimestamp(timestamp) {
  const commentTime = new Date(timestamp);
  const currentTime = new Date();
  const timeDiff = Math.abs(currentTime - commentTime);

  const minutesDiff = Math.floor(timeDiff / (1000 * 60));
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  if (minutesDiff < 1) {
    return "방금 전";
  } else if (minutesDiff < 60) {
    return `${minutesDiff}분 전`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}시간 전`;
  } else if (hoursDiff < 48) {
    return "1일 전";
  } else {
    return `${daysDiff}일 전`;
  }
}

function updateTimestamps() {
  const commentTimestamps = document.querySelectorAll('.comment-name span');
  commentTimestamps.forEach((timestampElement) => {
    const timestamp = timestampElement.getAttribute('data-timestamp');
    if (timestamp) {
      const formattedTimestamp = formatTimestamp(timestamp);
      timestampElement.innerText = formattedTimestamp;
    }
  });
}

// 일정 간격으로 타임스탬프 업데이트
setInterval(updateTimestamps, 60000); // 1분마다 업데이트

updateTimestamps();