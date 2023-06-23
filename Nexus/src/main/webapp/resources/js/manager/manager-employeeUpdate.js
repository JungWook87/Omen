// 이름 유효성 검사
const regName =  /^[가-힣]{2,10}$|^[a-zA-Z]{2,10}$/;

$("#employee-name").on("input", function() {
  if (regName.test($(this).val())) {
      $('#name-check').text('유효한 형식입니다');
      $('#name-check').css('color', 'var(--green');
      $('#name-check').css('marginLeft', '230px');
  } else if($(this).val() == '') {
      $("#name-check").text('한글 또는 영문으로 2-10글자 이내로 작성해 주세요');
      $('#name-check').css('color', 'var(--gray400)');
      $('#name-check').css('marginLeft', '30px');

  } else {
      $('#name-check').text('잘못된 형식입니다');
      $('#name-check').css('color', 'red');
      $('#name-check').css('marginLeft', '230px');

  }
});

// 주민번호 유효성 검사
const regSsn = /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])[-][1-6]\d{6}/;
// 하이픈 있든 없든 둘다 받을려면  
//const regSsn = /\d{2}([0]\d|[1][0-2])([0][1-9]|[1-2]\d|[3][0-1])[-]*[1-6]\d{6}/;

$("#employee-ssn").on("input", function() {
    if (regSsn.test($(this).val())) {
        $('#ssn-check').text('유효한 형식입니다');
        $('#ssn-check').css('color', 'var(--green');
        $('#ssn-check').css('marginLeft', '170px');
    } else if($(this).val() == '') {
        $("#ssn-check").text('하이픈(-)포함 14자 이내로 작성해주세요');
        $('#ssn-check').css('color', 'var(--gray400)');
        $('#ssn-check').css('marginLeft', '30px');
    } else {
        $('#ssn-check').text('잘못된 형식입니다');
        $('#ssn-check').css('color', 'red');
        $('#ssn-check').css('marginLeft', '170px');
    }
  });


  // 전화번호 유효성 검사
  const regTel = /\b010-\d{3,4}-\d{4}\b/;

  $("#employee-tel").on("input", function() {
    if (regTel.test($(this).val())) {
        $('#tel-check').text('유효한 형식입니다');
        $('#tel-check').css('color', 'var(--green');
        $('#tel-check').css('marginLeft', '160px');
    } else if($(this).val() == '') {
        $("#tel-check").text('하이픈(-)포함 010- 으로 시작해 주세요');
        $('#tel-check').css('color', 'var(--gray400)');
        $('#tel-check').css('marginLeft', '30px');
    } else {
        $('#tel-check').text('잘못된 형식입니다');
        $('#tel-check').css('color', 'red');
        $('#tel-check').css('marginLeft', '160px');
    }
  });


  // 이메일 유효성 검사
  const regEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  $("#employee-email").on("input", function() {
    if (regEmail.test($(this).val())) {
        $('#email-check').text('유효한 형식입니다');
        $('#email-check').css('color', 'var(--green');
        $('#email-check').css('marginLeft', '148px');
    } else if($(this).val() == '') {
        $("#email-check").text('@포함 이메일 형식으로 작성해 주세요');
        $('#email-check').css('color', 'var(--gray400)');
        $('#email-check').css('marginLeft', '30px');
    } else {
        $('#email-check').text('잘못된 형식입니다');
        $('#email-check').css('color', 'red');
        $('#email-check').css('marginLeft', '148px');
    }
  });



  // 카카오 api
   // 우편번호 찾기 찾기 화면을 넣을 element
   var element_wrap = document.getElementById('wrap');

   function foldDaumPostcode() {
       // iframe을 넣은 element를 안보이게 한다.
       element_wrap.style.display = 'none';
   }

   function sample3_execDaumPostcode() {
       // 현재 scroll 위치를 저장해놓는다.
       var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
       new daum.Postcode({
           oncomplete: function(data) {
               // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

               // 각 주소의 노출 규칙에 따라 주소를 조합한다.
               // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
               var addr = ''; // 주소 변수
               

               //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
               if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                   addr = data.roadAddress;
               } else { // 사용자가 지번 주소를 선택했을 경우(J)
                   addr = data.jibunAddress;
               }

               

               // 우편번호와 주소 정보를 해당 필드에 넣는다.
               
               document.getElementById("sample3_address").value = addr;
               // 커서를 상세주소 필드로 이동한다.
               document.getElementById("sample3_detailAddress").focus();

               // iframe을 넣은 element를 안보이게 한다.
               // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
               element_wrap.style.display = 'none';

               // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
               document.body.scrollTop = currentScroll;
           },
           // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
           onresize : function(size) {
               element_wrap.style.height = size.height+'px';
           },
           width : '100%',
           height : '100%'
       }).embed(element_wrap);

       // iframe을 넣은 element를 보이게 한다.
       element_wrap.style.display = 'block';
   }



// 직원 검색
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");

searchBtn.addEventListener('click', () => {
    $.ajax({
        url: "searchMember",
        data: {"search" : searchInput.value},
        type: "GET",
        dataType : "JSON",
        success : function(searchedMem) {
            const name = document.getElementById("employee-name"),
            ssn = document.getElementById("employee-ssn"),
            tel = document.getElementById("employee-tel"),
            email = document.getElementById("employee-email"),
            address = document.getElementById("sample3_address"),
            detailAddress = document.getElementById("sample3_detailAddress"),
            jobRadios = document.querySelectorAll("input[name='jobNo']"),
            deptSelect = document.getElementById("dept"),
            teamSelect = document.getElementById("dept-option");
        

        // 모든 input 요소의 readOnly 해제
        const inputElements = document.querySelectorAll('input');
        inputElements.forEach((input) => {
            input.readOnly = false;
            input.disabled = false;
        });

        // 모든 select 요소의 disabled 해제
        const selectElements = document.querySelectorAll('select');
        selectElements.forEach((select) => {
            select.disabled = false;
        });  
        

        name.value = searchedMem.memName;
        ssn.value = searchedMem.memRNo;
        tel.value = searchedMem.memTel;
        email.value = searchedMem.memEmail;
        address.value = searchedMem.memAddress;
        detailAddress.value = searchedMem.memDetailAddress;


        
        // 직책 선택
        for (let i = 0; i < jobRadios.length; i++) {
            if (jobRadios[i].value === searchedMem.jobNo.toString()) {
                jobRadios[i].checked = true;
                break;
            }
        }
        
        // 부서 선택
        deptSelect.value = searchedMem.deptNo.toString();
        
        teamSelect.value = searchedMem.teamNo.toString();

        },
        error : function() {
            console.log("에러");
        }

    })
})


