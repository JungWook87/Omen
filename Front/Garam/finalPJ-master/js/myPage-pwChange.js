// 비밀번호 유효성 검사
const regPw = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

// 변경할 비밀번호
$("#new-pw").on("input", function() {
  if (regPw.test($(this).val())) {
      $('#new-pw-inspection').text('사용가능한 비밀번호 형식입니다');
      $('#new-pw-inspection').css('color', 'var(--green)');
  } else if($(this).val() == '') {
      $("#new-pw-inspection").text('영문, 숫자, 특수기호(!@#$%^*+=-) 조합으로 8-15자리 이내로 입력해주세요');
      $('#new-pw-inspection').css('color', 'var(--gray400)');
  } else {
      $('#new-pw-inspection').text('비밀번호 형식이 맞지 않습니다');
      $('#new-pw-inspection').css('color', 'red');
  }
});

// 변경할 비밀번호 확인
$("#new-pw-check").on("input", function() {
  if ($("#new-pw-check").val() != $("#new-pw").val()) {
    $("#new-pw-check-inspection").text("비밀번호가 일치하지 않습니다");
    $("#new-pw-check-inspection").css('color', 'red');
  } else if($(this).val() == '') {
    $("#new-pw-check-inspection").text("");
  } else {
    $("#new-pw-check-inspection").text("비밀번호가 일치합니다");
    $("#new-pw-check-inspection").css('color', 'var(--green)');
  }
})