const regEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;


// 변경할 비밀번호
$("#new-pw").on("input", function() {
  if (regEx.test($(this).val())) {
      $('#new-pw-inspection').text('사용가능한 비밀번호 형식입니다');
      $('#new-pw-inspection').css('color', 'var(--green)');
      $('#new-pw-inspection').css('marginLeft', '19rem');
  } else if($(this).val() == '') {
      $("#new-pw-inspection").text('영문, 숫자, 특수기호(!@#$%^*+=-) 조합으로 8-15자리 이내로 입력해주세요');
      $('#new-pw-inspection').css('color', 'var(--gray400)');
      $('#new-pw-inspection').css('marginLeft', '2rem');
  } else {
      $('#new-pw-inspection').text('비밀번호 형식이 맞지 않습니다');
      $('#new-pw-inspection').css('color', 'red');
      $('#new-pw-inspection').css('marginLeft', '19rem');
  }
});

// 변경할 비밀번호 확인
$("#new-pw-check").on("input", function() {
  if ($("#new-pw-check").val() != $("#new-pw").val()) {
    $("#new-pw-check-inspection").text("비밀번호가 일치하지 않습니다");
    $("#new-pw-check-inspection").css('color', 'red');
    $("#new-pw-check-inspection").css('marginLeft', '19rem');
  } else if($(this).val() == '') {
    $("#new-pw-check-inspection").text("");
  } else {
    $("#new-pw-check-inspection").text("비밀번호가 일치합니다");
    $("#new-pw-check-inspection").css('color', 'var(--green)');
    $("#new-pw-check-inspection").css('marginLeft', '22rem');
  }
})


function printAlert(el, message) {
  Swal.fire(message)
  el.focus();
  return false;
}

// 비밀번호 변경 버튼
function  changePwValidate() {

  const currentPw = document.getElementById("current-pw"),
    newPw = document.getElementById("new-pw"),
    newPwConfirm = document.getElementById("new-pw-check");
  
  
  
  if(currentPw.value .trim().length == 0) {
    return printAlert(currentPw, "현재 비밀번호를 입력해주세요.")
  }

  if(newPw.value.trim().length == 0) {
    Swal.fire("새 비밀번호를 입력해주세요.")
    newPw.focus();
    return false;
  }  

  if(!regEx.test(newPw.value)) {
    Swal.fire(
      "영문, 숫자, 특수기호(!@#$%^*+=-) 조합으로 8-15자리 이내로 입력해주세요",
       "",
       "warning");
    return false;
  }

  if(newPwConfirm.value.trim().length == 0) {
    return printAlert(newPwConfirm, "새 비밀번호 확인을 입력해주세요.");
  }

  if(newPw.value != newPwConfirm.value) {
    return printAlert(newPwConfirm, "새 비밀번호가 일치하지 않습니다.");
  }

  return true;
    

}