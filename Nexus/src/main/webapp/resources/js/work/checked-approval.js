
//------------------------------------------------------------------

// 내가 작성한 글모달창
const checkedModal = document.getElementById('checked-modalWrap');
const checkedCloseBtn = document.getElementById('checked-closeBtn');
const checkedModalBody = document.querySelector('.checked-modalBody');
const checkedCancellBtn = document.getElementById('checked-cancell-btn'); // 결재취소
const checkedModalTitle = document.querySelector('.checked-modal-title');
const checkedModalDetail = document.querySelector('.checked-modal-detail'); // 내용
const checkedPreview = document.querySelector('.checked-preview');
const checkedCopyBtn = document.querySelector('.copy-btn');
const checkedSuccessBtn = document.getElementById('checked-success-btn'); //확인
const checkedEditBtn = document.getElementById('checked-edit-btn'); // 결재내용 수정
const checkedModalApprover = document.querySelector('.checked-modal-approver'); // 결재자
const checkedStartDate = document.getElementsByClassName("checked-modal-startDate"); // 시작일
const checkedEndDate = document.getElementsByClassName("checked-modal-endDate"); // 종료일
const checkedModalTaskList = document.querySelector('.checked-modal-taskList'); 
const checkedModalTaskDiv = document.querySelector('.modal-task-div');
const checkedModalTableBody = document.querySelector('.modal-table-body');

// ajax 성공 후 결재 디테일 모달창 내용 입력(kjw)
function successDetailModal(obj){

  console.log(obj);

  const workNo = document.getElementById("workNo");
  const memName = document.getElementById("memName");
  const sendDate = document.getElementById("sendDate");
  const content = document.getElementById("content");
  const opinion = document.getElementById("opinion");
  const next1 = document.getElementById("next1");
  const next2 = document.getElementById("next2");
  const checkStart = document.querySelector('.checked-modal-startDate > input')
  const checkEnd = document.querySelector('.checked-modal-endDate > input')

  const uploadFile = document.getElementById("upload_file");


  checkedModalDetail.style.display = 'none';
  checkedStartDate[0].style.display = 'none';
  checkedEndDate[0].style.display = 'none';
  checkedModalTaskList.style.display = 'none';

  checkedModalTitle.innerHTML = "";
  workNo.innerText = "";
  memName.innerText = "";
  sendDate.innerText = "";
  opinion.value = "";
  next2.value = "";
  content.value = "";
  checkStart.value = "";
  checkEnd.value = "";
  app_list.innerText = "";
  uploadFile.innerText = "";

  if(obj.opinion == null){
    obj.opinion = "";
  }
  
  // 결재자 경로 
  let app_list_mem = obj.approvalList.split(",,");
  let cnt = 0;

  for(let i = 0; i < app_list_mem.length - 1; i++){
    let memArr = app_list_mem[i].split(",");

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    td1.innerText = ++cnt;
    tr.append(td1);

    let td2 = document.createElement("td");
    td2.innerText = memArr[0];
    tr.append(td2);  

    let td3 = document.createElement("td");
    td3.innerText = memArr[1];
    if(td3.innerText == '진행중') td3.style.color = "var(--primary400)";
    else if(td3.innerText == '승인') td3.style.color = "var(--green)";
    else td3.style.color = "red";
    tr.append(td3);   

    let td4 = document.createElement("td");
    td4.innerText = memArr[2];
    tr.append(td4);  

    app_list.append(tr);
  }


  // 첨부파일
  if(obj.fileOrigin != null){
    const fileNameA = document.createElement("a");
    fileNameA.innerText = obj.fileOrigin;
    fileNameA.href = +"${contextPath}" +  obj.fileRename;
    fileNameA.download = obj.fileOrigin;
    uploadFile.append(fileNameA);
  }


  // 결재 타입에 따른 화면구성
  checkedModalTitle.innerHTML = "<h1>" + obj.title;
  workNo.innerText = obj.workNo;
  memName.innerText = obj.memName + " (" + obj.email +")";
  sendDate.innerText = obj.sendDate;
  
  if(obj.typeNo == 1){
    content.value = obj.content;
    opinion.value = obj.opinion;
    next2.value = obj.nextMemName + " (" + obj.nextMemEmail + ")";

    checkedModalDetail.style.display = 'block';

  } else if(obj.typeNo == 2){
    checkStart.value = obj.start.substr(0,10);
    checkEnd.value = obj.end.substr(0,10);
    opinion.value = obj.opinion;
    next2.value = obj.nextMemName + " (" + obj.nextMemEmail + ")";

    checkedStartDate[0].style.display = 'block';
    checkedEndDate[0].style.display = 'block';

  } else if(obj.typeNo == 3){
    content.value = obj.content;
    checkStart.value = obj.start.substr(0,10);
    checkEnd.value = obj.end.substr(0,10);
    opinion.value = obj.opinion;
    next2.value = obj.nextMemName + " (" + obj.nextMemEmail + ")";

    checkedModalDetail.style.display = 'block';
    checkedStartDate[0].style.display = 'block';
    checkedEndDate[0].style.display = 'block';

  } else if(obj.typeNo == 4){
    content.value = obj.content;
    checkStart.value = obj.start.substr(0,10);
    checkEnd.value = obj.end.substr(0,10);
    opinion.value = obj.opinion;
    next2.value = obj.nextMemName + " (" + obj.nextMemEmail + ")";

    checkedModalDetail.style.display = 'block';
    checkedModalTaskList.style.display = 'block';
    checkedStartDate[0].style.display = 'block';
    checkedEndDate[0].style.display = 'block';
    checkedModalTaskDiv.innerHTML ="";

    for (var i = 0; i < obj.taskList.length; i++) {
      var task = obj.taskList[i];
      
      var div = document.createElement('div');
      var span1 = document.createElement('span');
      var span2 = document.createElement('span');
      span1.textContent = i+1 + ".";
      span2.textContent = task.taskTitle;
      
      div.appendChild(span1);
      div.appendChild(span2);
      
      checkedModalTaskDiv.appendChild(div);
    }

 
  } else if(obj.typeNo == 5){
    content.value = obj.content;
    opinion.value = obj.opinion;
    next2.value = obj.nextMemName + " (" + obj.nextMemEmail + ")";

    checkedModalDetail.style.display = 'block';


  }


  
  // 디테일 모달창 열기
  checkedModalOpen();

  const tempObj = obj;

  const sendBtn = document.getElementsByClassName("work-send-submit-btn");
  const inboxBtn = document.getElementsByClassName("work-inbox-submit-btn");

  // 상신 페이지 : 취소버튼 이벤트(kjw)
  if(sendBtn.length == 1){
    checkedCancellBtn.addEventListener("click", function(tempObj) {
      Swal.fire({
        title: '결재를 취소하시겠습니까?',
        text: '',
        icon: 'warning',
        
        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정     
     }).then(result => {
        if(result.isConfirmed){
          workDelete(obj);
        }
     })
  
    });

    // 수정버튼 이벤트
    checkedEditBtn.addEventListener("click", () => {
      writeModalOpen();
    });
  }

  // 반려 또는 승인 버튼 클릭(kjw)
  // 작업 필요 : 반려의 경우 - 버튼 클릭시 의견창 띄우고 입력된 의견 가져오기
  //            둘다 - 결재자, 문서번호, 받아오기
  const rejectBtn = document.getElementById("checked-reject-btn");
  const approveBtn = document.getElementById("checked-approve-btn");
  const checkbox = document.getElementById('checked-modal-checkbox');

  // 수신함 : 버튼 활성화
  if(inboxBtn.length == 1){

    // 반려
    rejectBtn.addEventListener("click", function(){
      let btnName = "reject"
      obj.opinion = opinion.value;
      obj.checkbox_flag = true;
      obj.next = next1.value;
      app_btn_click(btnName, obj);
    })
    // 승인
    approveBtn.addEventListener("click", function(){
      let btnName = "approve"
      checkbox_flag = checkbox.checked;
      obj.checkbox_flag = checkbox_flag;
      obj.next = next1.value;

      if(checkbox_flag == false && next1.value == ''){
        Swal.fire(
          '결재자 혹은 최종승인을 체크해 주세요.',
          '',
          'warning'
        );
      } else if(checkbox_flag == true && next1.value != ''){
        Swal.fire(
          '결재자 혹은 최종승인 중 \n 하나만 체크해 주세요.',
          '',
          'warning'
        );
      } else{
        app_btn_click(btnName, obj);
      }

    })
  }
}
////////////////

// 내가 작성한 글 모달창 오픈
function checkedModalOpen() {
  
  // 모달창 열기
  checkedModal.style.display = 'block';
  checkedModalBody.classList.add('.checked-modal-open');

}

// 내가 작성한 글 모달창 닫기
// 내가 작성한 글 모달창 닫는 함수
function checkedModalClose() {

  checkedModalBody.classList.add('.checked-modal-close');
  
  setTimeout(() => {
    checkedModal.style.display = 'none';
    checkedModalBody.classList.remove(".checked-modal-close");
  }, 350);

}

// 모달창 엑스 버튼
checkedCloseBtn.addEventListener("click", () => {
  checkedModalClose();
});

// 모달창 외부 영역 이벤트
window.onclick = function(event) {
  if (event.target == modal) {
    checkedModalClose();
  }
}


// 취소버튼 작동(kjw)
function workDelete(obj){
  
  console.log(obj.workNo);
  console.log(obj.approvalList);
  console.log(obj);

  let cancleFlag = obj.approvalList.split(",,");
  let cancleFlag2 = cancleFlag[cancleFlag.length-2].split(",");

  console.log(cancleFlag2[1]);
  if(cancleFlag.length > 2 || cancleFlag2[1] != '진행중'){

    Swal.fire(
      '결재가 이미 진행중입니다.',
      '취소가 불가능 합니다.',
      'warning'
    );

  } else{

    $.ajax({
      url : "workCancle",
      type : "GET",
      dataType : "JSON",
      data : {
        "workNo" : obj.workNo
      },
      success : function(result){
        if(result != 0){
          Swal.fire({
            title: '결재취소를 완료했습니다.',
            text: '',
            icon: 'success',
            
            showCancelButton: false, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            confirmButtonText: '확인', // confirm 버튼 텍스트 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정     
         }).then(result => {
            if(result.isConfirmed){
              window.location.reload();
            }
          }) 
        } else{
          Swal.fire(
            '결재취소를 실패했습니다',
            '다시 시도해주세요.',
            'warning'
          );

          checkedModalClose();

        }
      },
      error : function(){
        console.log("결재취소 서버 접속 실패");
      }

    });

  }
}


// 반려, 승인 버튼 클릭 작동 (kjw)
function app_btn_click(btnName, obj, checkbox_flag){

  // 반려
  if(btnName == 'reject'){
    Swal.fire({
      title: '결재를 반려하시겠습니까?',
      text: '',
      icon: 'warning',
      
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '확인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정     
   }).then(result => {
    if(result.isConfirmed){
      $.ajax({
        url : "clickApproval",
        type : "GET",
        dataType : "JSON",
        data : {
          "workNo" : obj.workNo,
          "approvalList" : obj.approvalList,
          "opinion" : obj.opinion,
          "btnName" : btnName,
          "checkbox_flag" : obj.checkbox_flag,
          "typeNo" : obj.typeNo
        },
        success : function(){
          Swal.fire({
            title: '결재를 완료했습니다.',
            text: '',
            icon: 'success',
            
            showCancelButton: false, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            confirmButtonText: '확인', // confirm 버튼 텍스트 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정     
         }).then(result => {
            if(result.isConfirmed){
              window.location.reload();
            }
          }) 
        },
        error : function(){
          console.log("반려 하다가 에러 발생");
        }
      });
    }
   })
  } else{ // 승인
    Swal.fire({
      title: '결재를 승인하시겠습니까?',
      text: '',
      icon: 'warning',
      
      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '확인', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정     
   }).then(result => {
    if(result.isConfirmed){
      $.ajax({
        url : "clickApproval",
        type : "GET",
        dataType : "JSON",
        data : {
          "workNo" : obj.workNo,
          "approvalList" : obj.approvalList,
          "btnName" : btnName,
          "checkbox_flag" : obj.checkbox_flag,
          "next" : obj.next,
          "typeNo" : obj.typeNo,
          "start" : obj.start,
          "end" : obj.end,
          "memNo" : obj.memNo
        },
        success : function(){
          Swal.fire({
            title: '결재를 완료했습니다.',
            text: '',
            icon: 'success',
            
            showCancelButton: false, // cancel버튼 보이기. 기본은 원래 없음
            confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
            cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
            confirmButtonText: '확인', // confirm 버튼 텍스트 지정
            cancelButtonText: '취소', // cancel 버튼 텍스트 지정     
         }).then(result => {
            if(result.isConfirmed){
              window.location.reload();
            }
          }) 
        },
        error : function(){
          console.log("승인 하다가 에러 발생");
        }
      });
    }
   })
  }
}






//--------------------  
/*
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
*/