// sweetAlert 
const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
})



// // 이거는 임시용으로 db 넣기전에 테스트용으로 쓰는거라 db연결되면 지워야 함-----------
// // 페이지 로드될 때 주기적으로 LocalStorage 확인
// window.addEventListener('load', () => {
//   // LocalStorage에서 클릭 이벤트가 발생했는지 확인
//   const submitClicked = localStorage.getItem('submitClicked');
//   if (submitClicked === 'true') {
//     const surveyTitle = localStorage.getItem('surveyTitle');
//     const newRow = document.createElement('tr');

//     // 행에 들어갈 각 셀(td) 요소 생성
//     const statusCell = document.createElement('td');
//     statusCell.textContent = '진행중';
//     statusCell.id = 'status-color';

//     const titleCell = document.createElement('td');
//     titleCell.textContent = surveyTitle;

//     const dateCell = document.createElement('td');
//     const now = new Date();
//     const year = now.getFullYear();
//     let month = now.getMonth() + 1;
//     if(month < 10) {
//       month = "0" + month;
//     }
//     let date = now.getDate();
//     if(date < 10) {
//       date = "0" + date;
//     }
//     // const days = ["일","월","화","수","목","금","토"];
//     // const day = days[now.getDay()];

//     dateCell.textContent = year + '-' + month + '-' + date;

  

//     const clipCell = document.createElement('td');
//     clipCell.id = 'clip';

    

//     const progressCell = document.createElement('td');
//     progressCell.textContent = '1/4';

//     const resultBtnCell = document.createElement('td');
//     const resultBtn = document.createElement('button');
//     resultBtn.id = 'survey-result-btn';
//     resultBtn.textContent = '결과 보기';
//     resultBtnCell.appendChild(resultBtn);

//     const deleteCell = document.createElement('td');
//     deleteCell.textContent = '삭제';

//     // 행에 각 셀 추가
//     newRow.appendChild(statusCell);
//     newRow.appendChild(titleCell);
//     newRow.appendChild(dateCell);
//     newRow.appendChild(clipCell);
//     newRow.appendChild(progressCell);
//     newRow.appendChild(resultBtnCell);
//     newRow.appendChild(deleteCell);

//     document.querySelector("tbody").appendChild(newRow);

//     // 처리가 끝난 후 LocalStorage에서 해당 정보 제거
//     localStorage.removeItem('submitClicked');
//   }
// });
// // 여기까지---------------------------------------------------------------------




// url 복사 js
const clip = document.getElementById("clip");


// url 눌렀을때 이벤트

  clip.addEventListener("click", () => {

    // 이걸로 지정한 값이 복사댐
    const textToCopy = "https://www.naver.com";

    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
  
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
  
    try {
      document.execCommand('copy');
      Toast.fire({
        icon: 'success',
        title: '복사가 되었습니다'
      });
    } catch (err) {
      console.error('복사에 실패했습니다.', err);
    }
  
    document.body.removeChild(textarea);
    
})








