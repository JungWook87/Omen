
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

// ajax 성공 후 결재 디테일 모달창 내용 입력(kjw)
function successDetailModal(obj){

  const workNo = document.getElementById("workNo");
  const memName = document.getElementById("memName");
  const sendDate = document.getElementById("sendDate");
  const content = document.getElementById("content");
  const opinion = document.getElementById("opinion");
  const next = document.getElementById("next");
  const start = document.getElementById("start");
  const end = document.getElementById("end");

  checkedModalDetail.style.display = 'none';
  checkedStartDate[0].style.display = 'none';
  checkedEndDate[0].style.display = 'none';

  checkedModalTitle.innerHTML = "";
  workNo.innerText = "";
  memName.innerText = "";
  sendDate.innerText = "";
  opinion.innerText = "";
  next.innerText = "";
  content.value = "";
  start.value = "";
  end.value = "";

  checkedModalTitle.innerHTML = "<h1>" + obj.title;
  workNo.innerText = obj.workNo;
  memName.innerText = obj.memName + " (" + obj.email +")";
  sendDate.innerText = obj.sendDate;
  
  if(obj.typeNo == 1){
    content.value = obj.content;
    opinion.innerText = obj.opinion;
    next.innerText = obj.nextMemName + " (" + obj.nextMemEmail + ")";

    checkedModalDetail.style.display = 'block';

  } else if(obj.typeNo == 2){
    start.value = obj.start.substr(0,10);
    end.value = obj.end.substr(0,10);
    opinion.innerText = obj.opinion;
    next.innerText = obj.nextMemName + " (" + obj.nextMemEmail + ")";

    checkedStartDate[0].style.display = 'block';
    checkedEndDate[0].style.display = 'block';

  } else if(obj.typeNo == 3){
    content.value = obj.content;
    start.value = obj.start.substr(0,10);
    end.value = obj.end.substr(0,10);
    opinion.innerText = obj.opinion;
    next.innerText = obj.nextMemName + " (" + obj.nextMemEmail + ")";

    checkedModalDetail.style.display = 'block';
    checkedStartDate[0].style.display = 'block';
    checkedEndDate[0].style.display = 'block';

  }

  console.log(obj);
  
  // 디테일 모달창 열기
  checkedModalOpen();

  const tempObj = obj;

  // 취소버튼 이벤트(kjw)
  checkedCancellBtn.addEventListener("click", function(tempObj) {
    console.log("then obj1 : " + tempObj);
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
    console.log("then obj : " + tempObj);
    workDelete(obj);
   })

  });
}


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
$(window).click(function(event) {
  if (event.target == checkedModal) {
    checkedModalClose();
  }
});



// 취소버튼 작동(kjw)
function workDelete(obj){
  
  console.log(obj.workNo);
  console.log(obj.approvalList);

  if(obj.approvalList != null){

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
          Swal.fire(
            '결재취소를 완료했습니다',
            '',
            'success'
          );
          
          checkedModalClose();
          
          setTimeout(function(){
            location.reload();
          }, 3000);
          
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

// 수정버튼 이벤트
checkedEditBtn.addEventListener("click", () => {
  writeModalOpen();
});

//복사버튼 이벤트
checkedCopyBtn.addEventListener("click", () => {
  writeModalOpen();
});

//체크박스 체크
function is_checked() {
  // 체크박스 상태 확인
  var checkbox = document.getElementById('checked-modal-checkbox');
  var is_checked = checkbox.checked;

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