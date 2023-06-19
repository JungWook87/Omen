// 날짜 조회
$(function() {
  $('input[name="daterange"]').daterangepicker({
    "locale": {
        "format": "YYYY-MM-DD",
        "separator": " ~ ",
        "applyLabel": "확인",
        "cancelLabel": "취소",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": ["월", "화", "수", "목", "금", "토", "일"],
        "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],   
    },
    "firstDayOfWeek": 1,
    "startDate": "2023-06-5",
    "endDate": "2023-06-30",
    "drops": "down"
}, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
});

// 모달창 스타일
const btn = document.getElementById('popupBtn');
const modal = document.getElementById('modalWrap'); // 모달창
const approverModal = document.getElementById('approver-modal-wrap') // 결재 모달창
const closeBtn = document.getElementById('closeBtn'); // X 버튼 (span)
const approverCloseBtn = document.getElementById('approver-closeBtn'); // X 버튼 (span)
const plusBtn = document.getElementById('pulsProject'); // 프로젝트 추가 버튼
const pulsApproverBtn = document.getElementById('pulsApprover'); // 결재자 추가 버튼
const modalBody = document.querySelector('.work-modalBody'); // 모달창 내부
const approverModalBody = document.querySelector('.approver-modal-Body'); // 결재 모달창 내부
const cancellBtn = document.getElementById('cancell-btn'); // 취소 버튼
const approverCancellBtn = document.getElementById('approver-cancell-btn'); // 결재자 취소 버튼
const workModaltitle = document.querySelector('.work-modal-title'); // 모달창 제목
const workStartDate = document.querySelector('.work-modal-startDate'); // 모달창 시작날짜
const workEndDate = document.querySelector('.work-modal-endDate'); // 모달창 종료 날짜
const workTitle = document.querySelector('.work-modal-title > input'); // 모달창 제목 (input)
const workContent = document.querySelector('.work-modal-detail textarea'); // 모달창 내용 (textarea)
const workApprover = document.querySelector('.work-modal-approver > input'); // 모달창 결재자 (input)
const workTemplateSelect = document.getElementById('work-template'); // 모달창 템플릿
const normalCheckSelect = document.getElementById('normal-checked'); // 일반 선택
const projectCheckSelect = document.getElementById('project-checked'); // 프로젝트 선택
const assignmentCheckSelect = document.getElementById('assignment-checked'); // 과제 선택
const workDetail = document.querySelector('.work-modal-detail'); // 모달창 내용
const workProjectbox = document.querySelector('.projectBox'); // 과제명, 과제 내용
const workBusinessDetail = document.querySelector('.work-modal-businessDetail'); // 출장 내용
const workBusinessDetailText = document.querySelector('.work-modal-businessDetail > textarea'); // 출장 내용 (textarea)
const modalProjectbox = document.querySelector('.work-modal-projectBox'); // 과제추가 버튼
const workStartDateText = document.querySelector('.work-modal-startDate > input');
const workEndDateText = document.querySelector('.work-modal-endDate > input');
const workProjectboxText = workProjectbox.querySelectorAll('input');


// 결제창 버튼 이벤트
btn.addEventListener("click", () => {
  workTitle.value = '';
  workContent.value = '';
  workApprover.value = '';
  workBusinessDetail.querySelector('textarea').value = '';
  workProjectbox.querySelectorAll('input').forEach(input => input.value = '');
  

  workTemplateSelect.value = 'normal-check';

  modal.style.display = 'block';
  workModaltitle.style.display = 'block';
  normalCheckSelect.style.display='block';
  modalProjectbox.style.display ='none';
  workProjectbox.style.display = 'none';
  workStartDate.style.display = 'none'; 
  workEndDate.style.display = 'none';
  workBusinessDetail.style.display = 'none' 
  projectCheckSelect.style.display = 'none';
  assignmentCheckSelect.style.display = 'none';
  modalBody.classList.add('modal-open');

}) 

// 모달창 엑스 버튼
closeBtn.addEventListener("click", () => {
  modalClose();
});

// 모달창 플러스 버튼
plusBtn.addEventListener("click", () => {

  const div = document.createElement('div');
  div.style.borderTop = '1px solid var(--gray400)';
  div.style.marginBlockStart = '20px';
  div.style.padding = '10px';
  const projectName = document.createElement('p');
  projectName.innerText = "과제명"
  const projectcontentName = document.createElement('p');
  projectcontentName.innerText = "과제내용"
  const projectcontent1 = document.createElement('input');
  const projectcontent2 = document.createElement('input');
  const buttonDiv = document.createElement('div'); // 취소 버튼을 감싸는 div 요소
  buttonDiv.style.display = 'flex';
  buttonDiv.style.justifyContent = 'end';
  const xbutton = document.createElement('button');
  xbutton.innerText = "취소";

  buttonDiv.appendChild(xbutton); // 취소 버튼을 buttonDiv에 추가
  div.append(projectName, projectcontent1, projectcontentName, projectcontent2, buttonDiv);
  workProjectbox.append(div);

  xbutton.addEventListener("click", () => {
    workProjectbox.removeChild(div);
  })

  btn.addEventListener("click", () =>{
     workProjectbox.removeChild(div);
  })

  workTemplateSelect.addEventListener('change', () => {
     workProjectbox.removeChild(div);
  })

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

  workContent.style.overflow = 'hidden';

  workContent.style.height = 'inherit';
}

// work-template 선택란의 값이 변경될 때마다 이벤트 핸들러 실행
workTemplateSelect.addEventListener('change', () => {
  // 선택된 옵션의 값 가져오기
  const selectedValue = workTemplateSelect.value;

  console.log("selectedValue",selectedValue);
  workTitle.value = '';
  workContent.value = '';
  workApprover.value = '';
  workBusinessDetail.querySelector('textarea').value = '';
  workProjectbox.querySelectorAll('input').forEach(input => input.value = '');


  normalCheckSelect.style.display='none';
  workModaltitle.style.display='none';
  workStartDate.style.display = 'none';
  workEndDate.style.display = 'none'; 
  workBusinessDetail.style.display = 'none';
  workDetail.style.display = 'none';
  workProjectbox.style.display = 'none';
  modalProjectbox.style.display = 'none';
  projectCheckSelect.style.display = 'none';
  assignmentCheckSelect.style.display = 'none';

  if (selectedValue === 'normal-check') {
    normalCheckSelect.style.display = 'block';
    workModaltitle.style.display = 'block'; 
    workDetail.style.display = 'block';

  } 

  if(selectedValue === 'business-trip') {
    workStartDate.style.display = 'block'; 
    workEndDate.style.display = 'block'; 
    workBusinessDetail.style.display = 'block'; 
  }

  if(selectedValue === 'vacation') {
    workStartDate.style.display = 'block'; 
    workEndDate.style.display = 'block'; 

  }

  if(selectedValue === 'project') {
    workModaltitle.style.display = 'block'; 
    workDetail.style.display = 'block'
    workProjectbox.style.display = 'block';
    modalProjectbox.style.display = 'block';
  }

  if(selectedValue === 'assignment') {
    projectCheckSelect.style.display = 'block';
    assignmentCheckSelect.style.display = 'block';
    workDetail.style.display = 'block'
  }
  
})


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

// 결재자 클릭 이벤트
pulsApproverBtn.addEventListener("click",() => {
  approverModal.style.display = 'block';
  approverModalBody.classList.add('approver-modal-open')
})

// 결재자 모달창 외부 영역 이벤트
window.onclick = function(event) {
  if (event.target == approverModal) {
    aproverModalClose();
  }
}

approverCloseBtn.addEventListener("click", () =>{
  aproverModalClose();
})

// 결재자 모달창 취소버튼 이벤트
approverCancellBtn.addEventListener("click", () => {
  aproverModalClose();
})


// 결재자 모달창 닫는 함수
function aproverModalClose() {
  approverModalBody.classList.add('approver-modal-close');
  
  setTimeout(() => {
    approverModal.style.display = 'none';
    approverModalBody.classList.remove("approver-modal-close");
  }, 350);

}

 // 결재자 클릭 이벤트 핸들러

const approverSuccessBtn = document.getElementById('approver-success-btn');
const approverCheckBtn = document.querySelectorAll('.approver-checkBox');


approverSuccessBtn.addEventListener("click", () => {

  for (let i = 0; i < approverCheckBtn.length; i++) {
    let radio = approverCheckBtn[i]; // <input[=ridio]> 태그 내부의 라디오 버튼 선택
    if (radio.checked) {
      workApprover.value = radio.value; // 체크된 라디오 버튼의 값 가져오기
      aproverModalClose();
    }
  } 

});

// 파일 업로드 스타일
const fileUpload = document.getElementById('file-uploads');
const preview = document.querySelector('.work-preview');

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

// 글 추가시 나타나는 기능
const successBtn = document.getElementById('success-btn');


successBtn.addEventListener("click", () => {

  if(workTitle.value == "") {
    Swal.fire('제목을 입력해 주세요');
  } else if(workContent.value == '') {
    Swal.fire('내용을 입력해 주세요')
  }  else if(workApprover.value == '') {
      Swal.fire('결재자를 입력해 주세요')
  } else {
    
    const tr = document.createElement('tr');
    const tdType = document.createElement('td');
    const tdNum = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdSituation = document.createElement('td');
    const tdNode = document.createTextNode(workTitle.value);
    const tdFile = document.createElement('td');
    const tdDate = document.createElement('td');
  
    tdTitle.append(tdNode);
    tr.append(tdType,tdNum, tdTitle, tdSituation, tdFile, tdDate);
  
    document.querySelector('tbody').append(tr);
    
    // 수정 모달창 열기
    tr.addEventListener("click", function() {
      modifyModal();
    })
    
    // 모달 닫기
    modalClose();
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
const checkSuccessBtn = document.getElementById('check-success-btn');


// 수정 모달창 오픈
function modifyModal() {
  
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

  workContent.style.overflow = 'hidden';

  workContent.style.height = 'inherit';
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

// 최종승인 이벤트
checkSuccessBtn.addEventListener("click", () => {

  const checkbox = document.getElementById('check-modal-checkbox');
  const is_checked = checkbox.checked;

  if(is_checked) {
    checkModalClose();
  } else{
    
    Swal.fire({
      title: '최종 승인하시겠습니까?',
      text: '',
      icon: 'warning',
      
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '확인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정
      
      reverseButtons: true, // 버튼 순서 거꾸로
      
   }).then(result => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
      
         Swal.fire('최종 승인 되었습니다.');
         checkModalClose();
      } else {
        Swal.fire('승인 되었습니다.');
        checkModalClose();
      }
   });

  }

})