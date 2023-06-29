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
const modalProjectbox = document.querySelector('.work-modal-projectBox'); // 과제추가 버튼
const workStartDateText = document.querySelector('.work-modal-startDate > input'); // 시작 날짜 
const workEndDateText = document.querySelector('.work-modal-endDate > input'); // 종료 날짜 
const workProjectboxText = workProjectbox.querySelectorAll('input'); // 과제명, 과제내용 

// 결제창 버튼 이벤트
btn.addEventListener("click", () => {
  workTitle.value = '';
  workContent.value = '';
  workApprover.value = '';
  workProjectbox.querySelectorAll('input').forEach(input => input.value = '');

  workTemplateSelect.value = 'normal-check';

  modal.style.display = 'block';
  workModaltitle.style.display = 'block';
  normalCheckSelect.style.display='block';
  modalProjectbox.style.display ='none';
  workProjectbox.style.display = 'none';
  workStartDate.style.display = 'none'; 
  workEndDate.style.display = 'none';
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

  const containerDiv = document.createElement('div'); // 전체를 감싸는 div 요소
  containerDiv.style.marginTop = '10px'; 

  const div = document.createElement('div');
  div.style.marginBottom = '10px'; 
  const projectName = document.createElement('span');
  projectName.innerText = "과제명";
  projectName.style.color = 'var(--gray400)'; 
  projectName.style.marginTop = 'auto'; 
  const taskTitle = document.createElement('input');
  taskTitle.name = "taskTitle";
  const buttonDiv = document.createElement('div');
  buttonDiv.style.display = 'flex';
  buttonDiv.style.justifyContent = 'space-between';

  const xbutton = document.createElement('button');
  xbutton.innerText = "x";
  xbutton.style.width = '30px';
  xbutton.style.height = '30px';
  xbutton.style.border = 'none';
  xbutton.style.color = 'var(--gray600)'; 
  xbutton.style.cursor = 'pointer';
  xbutton.style.backgroundColor = "white";

  buttonDiv.append(projectName, xbutton);

  div.append(buttonDiv, taskTitle);
  containerDiv.appendChild(div); 
  workProjectbox.append(containerDiv);


  xbutton.addEventListener("click", () => {
    workProjectbox.removeChild(containerDiv);
  })

  btn.addEventListener("click", () =>{
     workProjectbox.removeChild(containerDiv);
  })

  workTemplateSelect.addEventListener('change', () => {
     workProjectbox.removeChild(containerDiv);
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
    workStartDate.style.display = 'block'; 
    workEndDate.style.display = 'block'; 
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
  approverModalBody.classList.add('approver-modal-open');

  $.ajax({
    url : "approvalMember",
    type : "GET",
    dataType : "JSON",
    // 동준작성
    success : function(list) {
      console.log(list);

      const approvalList = list;
      const team = document.querySelectorAll(".approval-team");
      
      for(let i=0; i < team.length; i++){
        team[i].innerText = "";
      }
  
          for (let value of approvalList) {
            let div = document.createElement("div");
            div.className = "divBox"

            let label = document.createElement("label");
            label.setAttribute("for", "mem" + value.memNo);
            label.innerText = value.memName;
            
            let input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("name", "approver-check");
            input.setAttribute("id", "mem" + value.memNo);
            input.classList.add("approver-checkBox");
            input.value = value.memNo;

              if (value.teamNo == 11) {
                div.append(input);
                div.append(label);

                team[0].append(div);
              } else if (value.teamNo == 12) {
                div.append(input);
                div.append(label);

                team[1].append(div);
              } else if (value.teamNo == 21) {
                div.append(input);
                div.append(label);

                team[2].append(div);
              } else if (value.teamNo == 22) {
                div.append(input);
                div.append(label);

                team[3].append(div);
              } else if (value.teamNo == 31) {
                div.append(input);
                div.append(label);

                team[4].append(div);
              } else if (value.teamNo == 32) {
                div.append(input);
                div.append(label);

                team[5].append(div);
              } else if (value.teamNo == 33) {
                div.append(input);
                div.append(label);

                team[6].append(div);
              } else if (value.teamNo == 34) {
                div.append(input);
                div.append(label);

                team[7].append(div);
              } else if (value.teamNo == 41) {
                div.append(input);
                div.append(label);

                team[8].append(div);
              } else if (value.teamNo == 42) {
                div.append(input);
                div.append(label);

                team[9].append(div);
              } else if (value.teamNo == 43) {
                div.append(input);
                div.append(label);

                team[10].append(div);
              } else if (value.teamNo == 51) {
                div.append(input);
                div.append(label);

                team[11].append(div);
              } else if (value.teamNo == 52) {
                div.append(input);
                div.append(label);

                team[12].append(div);
              }

            }
            
          //  // 결재자 클릭 이벤트 핸들러
          const approverSuccessBtn = document.getElementById('approver-success-btn');
          const approverCheckBtn = document.getElementsByClassName('approver-checkBox');
          
          approverSuccessBtn.addEventListener("click", () => {
            for (let i = 0; i < approverCheckBtn.length; i++) {
              let radio = approverCheckBtn[i]; // <input[=radio]> 태그 내부의 라디오 버튼 선택
              if (radio.checked) {  
                workApprover.value = radio.value; // 체크된 라디오 버튼의 값을 가져옵니다.
                const showMember = document.getElementById("showMemName");
                showMember.innerText = radio.nextElementSibling.innerText; 
                aproverModalClose();
              }
            } 
          });
    
    }

  });

})

// 결재자 부서 클릭 이벤트
const dept = document.querySelector(".dept");
const deptList = document.querySelectorAll(".dept-list");
const teamList = document.querySelectorAll(".team-list");

dept.querySelector("p").addEventListener("click", ()=> {
  for(let a of deptList){
    a.classList.toggle('show');
  }
})

// 팀 조회 이벤트
for(let i= 0; i < deptList.length; i++ ){

  deptList[i].addEventListener("click", () => {

    for(let x = 0; x < teamList.length; x++) {
      teamList[x].classList.remove('show');
    }

    if(i === 0){

      teamList[0].classList.toggle('show');
      teamList[1].classList.toggle('show');

    } else if(i === 1){

      teamList[2].classList.toggle('show');
      teamList[3].classList.toggle('show');

    } else if(i === 2){

      teamList[4].classList.toggle('show');
      teamList[5].classList.toggle('show');
      teamList[6].classList.toggle('show');
      teamList[7].classList.toggle('show');

    } else if(i === 3){

      teamList[8].classList.toggle('show');
      teamList[9].classList.toggle('show');
      teamList[10].classList.toggle('show');
    } else if(i === 4){

      teamList[11].classList.toggle('show');
      teamList[12].classList.toggle('show');
    } 

  }
  
  )

}

// 팀원 조회 이벤트
for (let i = 0; i < teamList.length; i++) {
  teamList[i].addEventListener('click', () => {
    // 해당 deptList 내부의 팀 요소들을 선택합니다.
    const approvalTeam = document.querySelectorAll('.approval-team');
    
    for(let x = 0; x < approvalTeam.length; x++) {
      approvalTeam[x].classList.remove('show');
    }

    // 선택한 deptList 내부의 팀 요소들을 보여주거나 숨깁니다.
    switch(i){
      case 0 : approvalTeam[0].classList.toggle('show');break;
      case 1 : approvalTeam[1].classList.toggle('show');break;
      case 2 : approvalTeam[2].classList.toggle('show');break; 
      case 3 : approvalTeam[3].classList.toggle('show');break;
      case 4 : approvalTeam[4].classList.toggle('show');break;
      case 5 : approvalTeam[5].classList.toggle('show');break;
      case 6 : approvalTeam[6].classList.toggle('show');break;
      case 7 : approvalTeam[7].classList.toggle('show');break;
      case 8 : approvalTeam[8].classList.toggle('show');break;
      case 9 : approvalTeam[9].classList.toggle('show');break;
      case 10 : approvalTeam[10].classList.toggle('show');break;
      case 11 : approvalTeam[11].classList.toggle('show');break;
      case 12 : approvalTeam[12].classList.toggle('show');break;
      default : return;
    }   

  })

}





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
    checkedPreview.innerText = fileInfo;
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

// 제출전 조건 확인
function workWrite(){
  if(workTemplateSelect.value === 'normal-check'){

    if(workTitle.value === "") {
      Swal.fire('제목을 입력해 주세요');
      return false;
    } else if(workContent.value === "") {
      Swal.fire('내용을 입력해 주세요');
      return false;
    } else if(workApprover.value === '') {
      Swal.fire('결재자를 입력해 주세요')
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
      } else if(workContent.value === "") {
        Swal.fire('출장내용을 입력해 주세요');
        return false;
      } else if(workApprover.value === '') {
        Swal.fire('결재자를 입력해 주세요')
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
        Swal.fire('결재자를 입력해 주세요')
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
        Swal.fire('결재자를 입력해 주세요')
        return false;
      } else { 
        return true;
      }
    
    }
}



  // --------------------------------------------------------------------------------

  // const team = document.querySelectorAll(".approval-team");

  // (function(){

  //   console.log("123 :: "+JSON.parse(approvalList));

  //   console.log(approvalList.length);

  //   console.log(approvalList[0]);
  //   console.log(approvalList[1]);

  //   for(let value of approvalList){

  //   //  let div = document.createElement("div");
  //   //  let p1 = document.createElement("p");
  //   //  let p2 = document.createElement("p");
  //   //  let p3 = document.createElement("p");

  //   //  p1.innerText = value.memName;
    

  //   //  div.append(p1);
  //   // //  div.append(p2);
  //   // //  div.append(p3);

  //   // if(value.deptNo ==1 ){
  //   //   team[0].append(div);
  //   // }
   
  //   //   if(value.detpNo === 1 ){

  //   //     if(value.teamNo === 11){

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[0].append(p1,p2);

  //   //       div.appendChild(team[0]);

  //   //       console.log(p1);
  //   //       console.log(p2);
   

  //   //     }
  //   //     if(value.teamNo === 12){ 

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[1].append(p1,p2);

  //   //       div.appendChild(team[1]);

  //   //     }

  //   //   } else if(value.detpNo === 2){

  //   //     if(value.teamNo === 21){

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[3].append(p1,p2);

  //   //       div.appendChild(team[3]);

  //   //     }
  //   //     if(value.teamNo === 22){ 

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[4].append(p1,p2);

  //   //       div.appendChild(team[4]);

  //   //     }

  //   //   } else if(value.detpNo === 3){


  //   //     if(value.teamNo === 31){

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[5].append(p1,p2);

  //   //       div.appendChild(team[5]);

  //   //     }
  //   //     if(value.teamNo === 32){ 

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[6].append(p1,p2);

  //   //       div.appendChild(team[6]);

  //   //     }
  //   //     if(value.teamNo === 33){

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[7].append(p1,p2);

  //   //       div.appendChild(team[7]);

  //   //     }
  //   //     if(value.teamNo === 34){ 

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[8].append(p1,p2);

  //   //       div.appendChild(team[8]);

  //   //     }
        
  //   //   } else if(value.detpNo === 4){


  //   //     if(value.teamNo === 41){

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[9].append(p1,p2);

  //   //       div.appendChild(team[9]);

  //   //     }
  //   //     if(value.teamNo === 42){ 

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[9].append(p1,p2);

  //   //       div.appendChild(team[9]);

  //   //     }
  //   //     if(value.teamNo === 43){ 

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[10].append(p1,p2);

  //   //       div.appendChild(team[10]);

  //   //     }
        
  //   //   } else if(value.detpNo === 5){


  //   //     if(value.teamNo === 51){

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[11].append(p1,p2);

  //   //       div.appendChild(team[11]);

  //   //     }
  //   //     if(value.teamNo === 12){ 

  //   //       p1.innerText = value.memName;
          
  //   //       p2.innerText = value.memNo;
          
  //   //       team[12].append(p1,p2);

  //   //       div.appendChild(team[12]);

  //   //     }

  //   //   }

      
  //   }

  // })();