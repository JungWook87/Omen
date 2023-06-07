// 모달창 스타일
const detailClick = document.querySelectorAll('.row');
const modal = document.getElementById('modalWrap');
const closeBtn = document.getElementById('closeBtn');
const modalBody = document.querySelector('.payment-inbox-modalBody');
const cancellBtn = document.getElementById('cancell-btn');
const paymentTitle = document.querySelector('.payment-modal-title > input');
const paymentContent = document.querySelector('.payment-modal-detail > textarea');


// 디테일 창 버튼 이벤트
detailClick.forEach(function(row) {
  row.addEventListener("click", function() {
    modal.style.display = 'block';
    modalBody.classList.add('modal-open');
  });
});


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

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon"
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

// 최종승인 checkbox
function is_checked() {


  let resultText = "";

  if (is_checked) {
    resultText = "최종승인 되었습니다";
  } else {
    resultText = "최종승인 되지 않았습니다";
  }

  document.getElementById('payment-inbox-modal-checkbox-result').innerText = resultText;
}


// 승인버튼 
const successBtn = document.getElementById('success-btn');


successBtn.addEventListener("click", () => {

  const checkbox = document.getElementById('modal-checkbox');
  const is_checked = checkbox.checked;

  if(is_checked) {
    modalClose();
  } else {
    
    // const tr = document.createElement('tr');
    // const tdNum = document.createElement('td');
    // const tdTitle = document.createElement('td');
    // const tdNode = document.createTextNode(noticeTitle.value);
    // const tdDate = document.createElement('td');
  
    // tdTitle.append(tdNode);
    // tr.append(tdNum, tdTitle, tdDate);
  
    // document.querySelector('tbody').append(tr);
    
    // // 수정 모달창 열기
    // tr.addEventListener("click", function() {
    //   modifyModal();
    // })
    
    window.confirm('최종승인 하시겠습니까?');

    // 모달 닫기
    // modalClose();
  }

})

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





  