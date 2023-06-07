const deleteBtn = document.getElementById("delete-btn");
const deleteName = document.getElementById("delete-name");
const deleteNo = document.getElementById("delete-no");

deleteBtn.addEventListener("click", () => {
  if(deleteName.value == '') {
    Swal.fire(
      '이름을 입력해주세요',
      '',
      'error'
    )
  } else if(deleteNo.value == '') {
    Swal.fire(
      '사원번호를 입력해주세요',
      '',
      'warning'
    )
  } else {

    Swal.fire({
      title: '정말 삭제 하시겠습니까?',
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
      
         Swal.fire('삭제 되었습니다', '', 'success');
      }
    });

  }

  
})

