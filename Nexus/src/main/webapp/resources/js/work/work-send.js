
// 상신 결재 목록 만드는 함수
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
    "startDate": new Date(),
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
        // const listBody = document.getElementById("listBody");
        // listBody.innerText = "";

        // for(let item of list){
        //   const tr = document.createElement("tr");
        //   tr.classList.add('listTr');
          
        //   const td1 = document.createElement("td");
        //   td1.innerText = item.typeNo;
        //   td1.classList.add('listTypeNo');
        //   td1.style.display = 'none';

        //   const td2 = document.createElement("td");
        //   td2.innerText = item.typeName;

        //   const td3 = document.createElement("td");
        //   td3.innerText = item.workNo;

        //   const td4 = document.createElement("td");
        //   td4.innerText = item.title;

        //   const td5 = document.createElement("td");
        //   td5.innerText += item.workState;
        //   if(item.workState == '진행중'){
        //     td5.style.color = "var(--primary400)";
        //   } else if(item.workState == '승인'){
        //     td5.style.color = "var(--green)";
        //   } else{
        //     td5.style.color = "red";
        //   }

        //   const td6 = document.createElement("td");
        //   if(item.fileRename == null){
        //     td6.innerText = "없음";
        //   } else{
        //     td6.innerText = "있음";
        //   }

        //   const td7 = document.createElement("td");
        //   item.sendDate = item.sendDate.substring(0, 11);
        //   td7.innerText = item.sendDate;

        //   tr.append(td1, td2, td3, td4, td5, td6, td7);

        //   listBody.append(tr);
        // }

        // const attnTypeSelect = document.getElementById("attnTypeSelect");
        // attnTypeSelect.value = 0;

        // let cntList = document.getElementsByClassName("content-all-top-text2");
        // cntList[0].innerText = "내가 작성한 결재(" + list.length + ")";

        workSendList(list);
      }
    });
  });
});

  // 모달창 스타일
  const btn = document.getElementById('popupBtn');
  const modal = document.getElementById('modalWrap');
  const approverModal = document.getElementById('approver-modal-wrap')
  const closeBtn = document.getElementById('closeBtn');
  const approverCloseBtn = document.getElementById('approver-closeBtn');
  const plusBtn = document.getElementById('pulsProject');
  const modalBody = document.querySelector('.work-modalBody');
  const approverModalBody = document.querySelector('.approver-modal-Body');
  const cancellBtn = document.getElementById('cancell-btn');
  const approverCancellBtn = document.getElementById('approver-cancell-btn');
  const workModaltitle = document.querySelector('.work-modal-title');
  const workStartDate = document.querySelector('.work-modal-startDate');
  const workEndDate = document.querySelector('.work-modal-endDate');
  const workTitle = document.querySelector('.work-modal-title > input');
  const workContent = document.querySelector('.work-modal-detail textarea');
  const workApprover = document.querySelector('.work-modal-approver > input');
  const workTemplateSelect = document.getElementById('work-template');
  const normalCheckSelect = document.getElementById('normal-checked');
  const projectCheckSelect = document.getElementById('project-checked');
  const assignmentCheckSelect = document.getElementById('assignment-checked');
  const workDetail = document.querySelector('.work-modal-detail');
  const workProjectbox = document.querySelector('.projectBox');
  const workBusinessDetail = document.querySelector('.work-modal-businessDetail');
  const modalProjectbox = document.querySelector('.work-modal-projectBox'); 



// 결제창 버튼 이벤트
btn.addEventListener("click", () => {
  workTitle.value = '';
  workContent.value = '';
  workApprover.value = '';
  workBusinessDetail.querySelector('textarea').value = '';
  workProjectbox.querySelectorAll('input').forEach(input => input.value = '');
  normalCheckSelect.value = 'userCustom';
  

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
    workBusinessDetail.querySelector('textarea').value = 
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

// 일반 결재의 세부사항 선택창 변경시 내용 변경
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

})


// 결재자 클릭 이벤트
workApprover.addEventListener("click",() => {
  approverModal.style.display = 'block';
  approverModalBody.classList.add('work-modal-open')
})

// 결재자 모달창 외부 영역 이벤트 (수정해야됨)
window.onclick = function(event) {
  if (event.target == approverModal) {
    approverModalClose();
  }
}

approverCloseBtn.addEventListener("click", () =>{
  approverModalClose();
})

// 결재자 모달창 취소버튼 이벤트
approverCancellBtn.addEventListener("click", () => {
  approverModalClose();
})


// 결재자 모달창 닫는 함수
function approverModalClose() {
  approverModalBody.classList.add('approver-modal-close');
  
  setTimeout(() => {
    approverModal.style.display = 'none';
    approverModalBody.classList.remove("approver-modal-close");
  }, 350);

  // workContent.style.overflow = 'hidden';

  // workContent.style.height = 'inherit';
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

  // if(workTitle.value == "") {
  //   Swal.fire('제목을 입력해 주세요');
  // } else if(workContent.value == '') {
  //   Swal.fire('내용을 입력해 주세요')
  // }  else 
  if(workApprover.value == '') {
    Swal.fire('결재자를 입력해 주세요')
  } else {

    let insertdata = '';

    if(workTemplateSelect.value == 'normal-check'){
      insertdata = {
        typeNo : 1,
        title : workTitle.value,
        content : workContent.value,
        next : workApprover.value,
        uploadsFile : fileUpload.value
      };
    } else if(workTemplateSelect.value == 'business-trip'){
      insertdata = {
        typeNo : 3,
        start : workStartDateText.value,
        end : workEndDateText.value,
        content : workBusinessDetailText.value,
        next : workApprover.value
      };
    } else if(workTemplateSelect.value == 'vacation'){
      insertdata = {
        typeNo : 2,
        start : workStartDateText.value,
        end : workEndDateText.value,
        next : workApprover.value
      };
    }
    
    $.ajax({
      // 여기 작성
      url : "workSend/write",
      type : "POST",
      dataType : "JSON",
      data : insertdata,
      success : function(resultMap){
        if(resultMap.message == 1){
          console.log("추가 성공");

          workSendList(resultMap.list);

          Swal.fire('결재 상신 완료', '', 'success');

        } else{
          console.log("추가 실패");

          Swal.fire( '결재 상신 실패', '다시 시도해주세요.', 'warning');
        }
      },
      error : function(){

      }

    });


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
const checkModalBody = document.querySelector('.check-modalBody');
const checkCancellBtn = document.getElementById('check-cancell-btn');
const checkCloseBtn = document.getElementById('check-closeBtn');
const checkSuccessBtn = document.getElementById('check-success-btn');
const checkModalTitle = document.querySelector('.check-modal-title');
const checkModalTitleText = document.querySelector('.check-modal-title > input');
const checkBusinessArea = document.querySelector('.check-modal-businessArea');
const checkBusinessAreaText = document.querySelector('.check-modal-businessArea > input');
const checkStartDate = document.querySelector('.check-modal-startDate');
const checkStartDateText = document.querySelector('.check-modal-startDate > input');
const checkEndDate = document.querySelector('.check-modal-endDate');

const checkEndDateText = document.querySelector('.check-modal-endDate > input');
const checkTemplate = document.querySelector('check-modal-template');
// const normalCheckSelect = document.getElementById('normal-checked');
// const projectCheckSelect = document.getElementById('project-checked');
// const assignmentCheckSelect = document.getElementById('assignment-checked');



const checkModalDetail = document.querySelector('.check-modal-detail');
const checkModalDetailText = document.querySelector('.check-modal-detail textarea');
// const plusBtn = document.getElementById('pulsProject');
// const workProjectbox = document.querySelector('.projectBox');
// const modalProjectbox = document.querySelector('.work-modal-projectBox');



//올릴꺼
const workStartDateText = document.querySelector('.work-modal-startDate > input');
//올릴꺼
const workEndDateText = document.querySelector('.work-modal-endDate > input');
//올릴꺼
const workBusinessDetailText = document.querySelector('.work-modal-businessDetail > textarea');

const checkBusinessDetail = document.querySelector('.check-modal-businessDetail');
const checkBusinessDetailText = document.querySelector('.check-modal-businessDetail > textarea');

const checkApprover = document.querySelector('.check-modal-approver');
const checkApproverText = document.querySelector('.check-modal-approver > input');

const checkPreview = document.querySelector('.check-preview');


// 수정 모달창 오픈
function modifyModal() {
  
  // // 템플릿 밸류값 들고오기
  // checkTemplate.value = workTemplateSelect.value

  // 제목 밸류값 들고오기
  checkModalTitleText.value = workTitle.value;

  // 시작날짜 밸류값 들고오기
  checkStartDateText.value = workStartDateText.value;
  // 종료날짜 밸류값 들고오기
  checkEndDateText.value= workEndDateText.value;

  // textarea 밸류값 들고오기
  checkModalDetailText.value = workContent.value;
 
  // 출장내용 밸류값 들고오기
    checkBusinessDetailText.value = workBusinessDetailText.value



  // 결재자 밸류값 들고오기
   checkApproverText.value = workApprover.value

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

// 수정버튼 이벤트
let isEditMode = false; // 초기 상태는 편집 모드가 아님

checkSuccessBtn.addEventListener('click', function() {
  if (!isEditMode) {
    // 제목
    const titleInput = document.querySelector('.check-modal-title input');
    titleInput.readOnly = false;

    // 출장지
    const businessAreaInput = document.querySelector('.check-modal-businessArea input');
    businessAreaInput.readOnly = false;

    // 시작날짜
    const startDateInput = document.querySelector('.check-modal-startDate input');
    startDateInput.readOnly = false;

    // 종료날짜
    const endDateInput = document.querySelector('.check-modal-endDate input');
    endDateInput.readOnly = false;

    // 출장 내용
    const businessDetailTextarea = document.querySelector('.check-modal-businessDetail textarea');
    businessDetailTextarea.readOnly = false;

    // 결재자
    const approverInput = document.querySelector('.check-modal-approver input');
    approverInput.readOnly = false;

    isEditMode = true; // 편집 모드로 변경
    checkSuccessBtn.textContent = '저장'; // 버튼 텍스트 변경
  } else {
    // 수정된 내용을 저장하는 로직 추가
    // ...

    // 제목
    const titleInput = document.querySelector('.check-modal-title input');
    titleInput.readOnly = true;

    // 출장지
    const businessAreaInput = document.querySelector('.check-modal-businessArea input');
    businessAreaInput.readOnly = true;

    // 시작날짜
    const startDateInput = document.querySelector('.check-modal-startDate input');
    startDateInput.readOnly = true;

    // 종료날짜
    const endDateInput = document.querySelector('.check-modal-endDate input');
    endDateInput.readOnly = true;

    // 출장 내용
    const businessDetailTextarea = document.querySelector('.check-modal-businessDetail textarea');
    businessDetailTextarea.readOnly = true;

    // 결재자
    const approverInput = document.querySelector('.check-modal-approver input');
    approverInput.readOnly = true;

    isEditMode = false; // 편집 모드 비활성화
    checkSuccessBtn.textContent = '수정'; // 버튼 텍스트 변경
  }
});

 // 결재자 클릭 이벤트 핸들러
 function handleClick() {
  // 새로운 div 요소 생성
  const newDiv = document.createElement('div');
  newDiv.classList.add('employee'); // line 클래스 추가
  document.querySelector('.approver-modal-container').appendChild(newDiv);
}

// div 요소에 클릭 이벤트 리스너 추가
const box = document.querySelector('.boss');
box.addEventListener('click', handleClick);


//  // 클릭 이벤트 핸들러
//  function handleClick() {
//   // 새로운 div 요소 생성
//   const newDiv = document.createElement('div');
//   newDiv.classList.add('div'); // line 클래스 추가
//   document.getElementById('container').appendChild(newDiv);
// }

// // div 요소에 클릭 이벤트 리스너 추가
// const box = document.querySelector('.box');
// box.addEventListener('click', handleClick);

// 근무 타입 select (KJW)
const attnTypeSelect = document.getElementById("attnTypeSelect");

attnTypeSelect.addEventListener("change", function(){
  
  let attnTypeSelectValue = attnTypeSelect.value;
  let tbody = document.getElementById("listBody");
  let trCount = tbody.getElementsByTagName("tr").length;
  let listTr = document.getElementsByClassName("listTr");
  const listTypeNo = document.getElementsByClassName("listTypeNo");

  console.log("trCount : " + trCount);

  for(let i = 0; i < trCount; i++){
    listTr[i].removeAttribute("style", "display:none");
  }

  let cntListNum = 0;
  
  if(attnTypeSelectValue == 1){ 
    for(let i = 0; i < trCount; i++){
      if(listTypeNo[i].innerText != 1){
        listTr[i].setAttribute("style", "display:none");
      }
      if(listTypeNo[i].innerText == 1) cntListNum++;
    }
  } else if(attnTypeSelectValue == 2){
    for(let i = 0; i < trCount; i++){
      if(listTypeNo[i].innerText != 2){
        listTr[i].setAttribute("style", "display:none");
      }
      if(listTypeNo[i].innerText == 2) cntListNum++;
    }
  } else if(attnTypeSelectValue == 3){
    for(let i = 0; i < trCount; i++){
      if(listTypeNo[i].innerText != 3){
        listTr[i].setAttribute("style", "display:none");
      }
      if(listTypeNo[i].innerText == 3) cntListNum++;
    }
  } else{
    for(let i = 0; i < trCount; i++){
      listTr[i].removeAttribute("style", "display:none");
    }
    cntListNum = trCount;
  }

  let cntList = document.getElementsByClassName("content-all-top-text2");
  cntList[0].innerText = "내가 작성한 결재(" + cntListNum + ")";

})



  // 결재 상신 팝업창에서 확인 누르기
