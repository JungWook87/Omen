

// 상신 결재 목록 만드는 함수 (kjw)
function workSendList(obj){
  const listBody = document.getElementById("listBody");
  listBody.innerText = "";

  for(let item of obj){
    const tr = document.createElement("tr");
    tr.classList.add('listTr');
    
    const td1 = document.createElement("td");
    td1.innerText = item.typeNo;
    td1.classList.add('listTypeNo');
    td1.style.display = 'none';

    const td2 = document.createElement("td");
    td2.innerText = item.typeName;

    const td3 = document.createElement("td");
    td3.innerText = item.workNo;

    const td4 = document.createElement("td");
    td4.innerText = item.title;

    const td5 = document.createElement("td");
    td5.innerText += item.workState;
    if(item.workState == '진행중'){
      td5.style.color = "var(--primary400)";
    } else if(item.workState == '승인'){
      td5.style.color = "var(--green)";
    } else{
      td5.style.color = "red";
    }

    const td6 = document.createElement("td");
    if(item.fileRename == null){
      td6.innerText = "없음";
    } else{
      td6.innerText = "있음";
    }

    const td7 = document.createElement("td");
    item.sendDate = item.sendDate.substring(0, 11);
    td7.innerText = item.sendDate;

    tr.append(td1, td2, td3, td4, td5, td6, td7);

    listBody.append(tr);
  }

  const attnTypeSelect = document.getElementById("attnTypeSelect");
  attnTypeSelect.value = 0;

  let cntList = document.getElementsByClassName("content-all-top-text2");
  cntList[0].innerText = "내가 작성한 결재(" + obj.length + ")";


}


// 날짜 조회 (kjw)
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
    "startDate":new Date(),
    "endDate": new Date(),
    "drops": "down"
  }, function(start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

    $.ajax({
      url : "workSendSelectDate",
      type : "GET",
      dataType : "JSON",
      data : {"start" : start.format('YYYY-MM-DD'),
              "end" : end.format('YYYY-MM-DD')
              },
      success : function(list){
        workSendList(list);
      }
    });
  });
})




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
  // workBusinessDetail.querySelector('textarea').value = '';
  workProjectbox.querySelectorAll('input').forEach(input => input.value = '');
  
  
  workTemplateSelect.value = 'normal-check';
  normalCheckSelect.value = 'userCustom';

  modal.style.display = 'block';
  workModaltitle.style.display = 'block';
  normalCheckSelect.style.display='block';
  workDetail.style.display = 'block';
  modalProjectbox.style.display ='none';
  workProjectbox.style.display = 'none';
  workStartDate.style.display = 'none'; 
  workEndDate.style.display = 'none';
  // workBusinessDetail.style.display = 'none' 
  projectCheckSelect.style.display = 'none';
  assignmentCheckSelect.style.display = 'none';
  modalBody.classList.add('modal-open');

}); 

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
});

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
  workDetail.querySelector('textarea').value = '';
  workProjectbox.querySelectorAll('input').forEach(input => input.value = '');


  normalCheckSelect.style.display='none';
  workModaltitle.style.display='none';
  workStartDate.style.display = 'none';
  workEndDate.style.display = 'none'; 
  workDetail.style.display = 'none';
  workProjectbox.style.display = 'none';
  modalProjectbox.style.display = 'none';
  projectCheckSelect.style.display = 'none';
  assignmentCheckSelect.style.display = 'none';

  if (selectedValue === 'normal-check') {
    normalCheckSelect.style.display = 'block';
    workModaltitle.style.display = 'block'; 
    workDetail.style.display = 'block';
    workContent.value = '';

  } 

  // kjw
  if(selectedValue === 'business-trip') {
    workStartDate.style.display = 'block'; 
    workEndDate.style.display = 'block'; 
    workDetail.style.display = 'block';
    workContent.value = 
    '\n***** 출장 신청서 *****\n\n\n' + 
    '1. 출장 인원(성명/소속/직급/사번) :  \n' + 
    '   1) \n\n\n' +
    '2. 출장지 : \n\n\n' +
    '3. 출장 내용 : \n\n\n' +
    '4. 비고 : ';
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
  
});

// 일반 결재의 세부사항 선택창 변경시 내용 변경(kjw)
normalCheckSelect.addEventListener("change", function(){
  workContent.value = '';

  if(normalCheckSelect.value == 'normalEx1'){
    workContent.value = 
    '\n***** 경조금 지급 신청서 *****\n\n\n' + 
    '1. 경조금 수혜자\n' + 
    '   소속 :  \n' +
    '   성명 :  \n\n\n' + 
    '2. 지급사유\n' +
    '   경조 대상자 성명 :  \n' + 
    '   관계 :  \n' + 
    '   경조일(장례시 발인일 입력) :  \n' + 
    '   경조 내용 :  \n\n\n' + 
    '3. 지급 금액 : \n\n\n' +
    '4. 지급 계좌 : ';
  } else if(normalCheckSelect.value == 'normalEx2'){
    workContent.value = 
    '\n***** 구매 요청서 *****\n\n\n' + 
    '1. 구매 요청 부서 :  \n\n\n' + 
    '2. 구매 목적(필요성) :  \n\n\n' +
    '3. 희망 납기일 : \n\n\n' +
    '4. 구매 요청 품목 (품목명 / 모델명 / 수량 / 단가 / 금액 / 사용부서(사용자)) \n' +
    '   1) \n\n\n' +
    '5. 합계 금액 : \n\n\n' +
    '6. 관련 구매 링크 : '
  } else if(normalCheckSelect.value == 'normalEx3'){
    workContent.value = 
    '\n***** 자산 요청서 *****\n\n\n' + 
    '1. 자산 요청 부서 :  \n\n\n' + 
    '2. 자산 요청 목적(필요성) :  \n\n\n' +
    '4. 자산 요청 품목 (품목명 / 모델명 / 수량 / 사용부서(사용자)) \n' +
    '   1) \n\n\n';
  } else if(normalCheckSelect.value == 'normalEx4'){
    workContent.value = 
    '\n***** 지출 결의서 *****\n\n\n' + 
    '1. 지출 결의서 (거래일 / 거래처명 / 내용 / 금액 / 지급요청일 / 예금주 / 은행 / 계죄번호)  \n' + 
    '   1) \n';
  }

});







// 결재자 클릭 이벤트
pulsApproverBtn.addEventListener("click",() => {
  approverModal.style.display = 'block';
  approverModalBody.classList.add('approver-modal-open')
});

// 결재자 모달창 외부 영역 이벤트
window.onclick = function(event) {
  if (event.target == approverModal) {
    aproverModalClose();
  }
}

approverCloseBtn.addEventListener("click", () =>{
  aproverModalClose();
});

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
  }

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
  
});


// 글 추가시 나타나는 기능


function workWrite() {

  if(workTemplateSelect.value === 'normal-check'){

    if(workTitle.value === "") {
      Swal.fire('제목을 입력해 주세요');
      return false;
    } else if(workContent.value === "") {
      Swal.fire('내용을 입력해 주세요');
      return false;
    } else if(workApprover.value === '') {
      Swal.fire('결재자를 입력해 주세요');
      return false;
    } else{
      return true;
    }

  } else if(workTemplateSelect.value === 'business-trip'){
      if(workStartDateText.value === "") {
        Swal.fire('시작날짜를 입력해 주세요');
        return false;
      } else if(workEndDateText.value === "") {
        Swal.fire('종료날짜를 입력해 주세요');
        return false;
      } else if(workBusinessDetailText.value === "") {
        Swal.fire('출장내용을 입력해 주세요');
        return false;
      } else if(workApprover.value === '') {
        Swal.fire('결재자를 입력해 주세요');
        return false;
      } else{
        return true;
      }

    } else if(workTemplateSelect.value === 'vacation'){
      if(workStartDateText.value === "") {
        Swal.fire('시작날짜를 입력해 주세요');
        return false;
      } else if(workEndDateText.value === "") {
        Swal.fire('종료날짜를 입력해 주세요');
        return false;
      } else if(workApprover.value == '') {
        Swal.fire('결재자를 입력해 주세요');
        return false;
      } else{
        return true;
      }

    } else if(workTemplateSelect.value === 'project'){
      if(workTitle.value === "") {
        Swal.fire('제목을 입력해 주세요');
        return false;
      } else if(workContent.value === "") {
        Swal.fire('내용을 입력해 주세요');
        return false;
      } else if(workProjectboxText.value === "") {
        Swal.fire('프로젝트 내용을 입력해 주세요');
        return false;
      } else if(workApprover.value === '') {
        Swal.fire('결재자를 입력해 주세요');
        return false;
      } else { 
        return true;
      }
    
    } 

  };

  

// 내가 작성한 글모달창
const inboxModal = document.getElementById('inbox-modalWrap');
const inboxCloseBtn = document.getElementById('inbox-closeBtn');
const inboxModalBody = document.querySelector('.inbox-modalBody');
const inboxCancellBtn = document.getElementById('inbox-cancell-btn');
const inboxModalTitle = document.querySelector('.inbox-modal-title > input');
const inboxModalDetail = document.querySelector('.inbox-modal-detail');
const inboxPreview = document.querySelector('.inbox-preview');
const inboxCopyBtn = document.querySelector('.copy-btn');
const inboxSuccessBtn = document.getElementById('inbox-success-btn');
const inboxEditBtn = document.getElementById('edit-btn');
const inboxModalApprover = document.querySelector('.inbox-modal-approver > input');


// 내가 작성한 글 모달창 오픈
function inboxModalOpen() {
  
  // 모달창 열기
  inboxModal.style.display = 'block';
  inboxModalBody.classList.add('.inbox-modal-open');


}

// 내가 작성한 글 모달창 닫기
// 내가 작성한 글 모달창 닫는 함수
function inboxModalClose() {
  inboxModalBody.classList.add('.inbox-modal-close');
  
  setTimeout(() => {
    inboxModal.style.display = 'none';
    inboxModalBody.classList.remove(".inbox-modal-close");
  }, 350);

  workContent.style.overflow = 'hidden';

  workContent.style.height = 'inherit';
}

// 모달창 엑스 버튼
inboxCloseBtn.addEventListener("click", () => {
  inboxModalClose();
});

// 모달창 외부 영역 이벤트
$(window).click(function(event) {
  if (event.target == inboxModal) {
    inboxModalClose();
  }
});

// 취소버튼 이벤트
inboxCancellBtn.addEventListener("click", () => {
  inboxModalClose();
});
// 수정버튼 이벤트
inboxEditBtn.addEventListener("click", () => {
  writeModalOpen();
});

//복사버튼 이벤트
inboxCopyBtn.addEventListener("click", () => {
  writeModalOpen();
});

//체크박스 체크
function is_checked() {
  // 체크박스 상태 확인
  var checkbox = document.getElementById('inbox-modal-checkbox');
  var is_checked = checkbox.checked;

}  

// 수정 모달창
const writeModal = document.getElementById('write-modalWrap');
const writeModalBody = document.querySelector('.write-modalBody');
const writeCancellBtn = document.getElementById('write-cancell-btn');
const writeCloseBtn = document.getElementById('write-closeBtn');
const writeSuccessBtn = document.getElementById('write-success-btn');
const writeModalTitle = document.querySelector('.write-modal-title');
const writeModalTitleText = document.querySelector('.write-modal-title > input');
const writeBusinessArea = document.querySelector('.write-modal-businessArea');
const writeBusinessAreaText = document.querySelector('.write-modal-businessArea > input');
const writeStartDate = document.querySelector('.write-modal-startDate');
const writeStartDateText = document.querySelector('.write-modal-startDate > input');
const writeEndDate = document.querySelector('.write-modal-endDate');
const writeEndDateText = document.querySelector('.write-modal-endDate > input');
const writeTemplate = document.querySelector('write-modal-template');
const writeModalDetail = document.querySelector('.write-modal-detail');
const writeModalDetailText = document.querySelector('.write-modal-detail textarea');



const writeBusinessDetail = document.querySelector('.write-modal-businessDetail');
const writeBusinessDetailText = document.querySelector('.write-modal-businessDetail > textarea');

const writeApprover = document.querySelector('.write-modal-approver');
const writeApproverText = document.querySelector('.write-modal-approver > input');

const writePreview = document.querySelector('.write-preview');




// 수정 모달창 오픈
function writeModalOpen() {
  
  // // 템플릿 밸류값 들고오기
  // writeTemplate.value = workTemplateSelect.value

  // 제목 밸류값 들고오기
  writeModalTitleText.value = workTitle.value;

  // 시작날짜 밸류값 들고오기
  writeStartDateText.value = workStartDateText.value;
  // 종료날짜 밸류값 들고오기
  writeEndDateText.value= workEndDateText.value;

  // textarea 밸류값 들고오기
  writeModalDetailText.value = workContent.value;
 
  // 출장내용 밸류값 들고오기
    writeBusinessDetailText.value = workBusinessDetailText.value



  // 결재자 밸류값 들고오기
   writeApproverText.value = workApprover.value

  // 모달창 열기
  writeModal.style.display = 'block';
  writeModalBody.classList.add('write-modal-open');

}

// 수정 모달창 닫기
// 수정 모달창 닫는 함수
function writeModalClose() {
  writeModalBody.classList.add('write-modal-close');
  
  setTimeout(() => {
    writeModal.style.display = 'none';
    writeModalBody.classList.remove("write-modal-close");
  }, 350);

  workContent.style.overflow = 'hidden';

  workContent.style.height = 'inherit';
}

// 모달창 엑스 버튼
writeCloseBtn.addEventListener("click", () => {
  writeModalClose();
});

// 모달창 외부 영역 이벤트
$(window).click(function(event) {
  if (event.target == writeModal) {
    writeModalClose();
  }
});

// 취소버튼 이벤트
writeCancellBtn.addEventListener("click", () => {
  writeModalClose();
});



// 수정버튼 이벤트
let isEditMode = false; // 초기 상태는 편집 모드가 아님

writeSuccessBtn.addEventListener('click', function() {
  if (!isEditMode) {
    // 제목
    const titleInput = document.querySelector('.write-modal-title input');
    titleInput.readOnly = false;

    // 출장지
    const businessAreaInput = document.querySelector('.write-modal-businessArea input');
    businessAreaInput.readOnly = false;

    // 시작날짜
    const startDateInput = document.querySelector('.write-modal-startDate input');
    startDateInput.readOnly = false;

    // 종료날짜
    const endDateInput = document.querySelector('.write-modal-endDate input');
    endDateInput.readOnly = false;

    // 출장 내용
    const businessDetailTextarea = document.querySelector('.write-modal-businessDetail textarea');
    businessDetailTextarea.readOnly = false;

    // 결재자
    const approverInput = document.querySelector('.write-modal-approver input');
    approverInput.readOnly = false;

    isEditMode = true; // 편집 모드로 변경
    writeSuccessBtn.textContent = '저장'; // 버튼 텍스트 변경
  } else {
    // 수정된 내용을 저장하는 로직 추가
    // ...

    // 제목
    const titleInput = document.querySelector('.write-modal-title input');
    titleInput.readOnly = true;

    // 출장지
    const businessAreaInput = document.querySelector('.write-modal-businessArea input');
    businessAreaInput.readOnly = true;

    // 시작날짜
    const startDateInput = document.querySelector('.write-modal-startDate input');
    startDateInput.readOnly = true;

    // 종료날짜
    const endDateInput = document.querySelector('.write-modal-endDate input');
    endDateInput.readOnly = true;

    // 출장 내용
    const businessDetailTextarea = document.querySelector('.write-modal-businessDetail textarea');
    businessDetailTextarea.readOnly = true;

    // 결재자
    const approverInput = document.querySelector('.write-modal-approver input');
    approverInput.readOnly = true;

    isEditMode = false; // 편집 모드 비활성화
    writeSuccessBtn.textContent = '수정'; // 버튼 텍스트 변경
  }
})