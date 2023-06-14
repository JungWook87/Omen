

// 이거는 임시용으로 db 넣기전에 테스트용으로 쓰는거라 db연결되면 지워야 함-----------
// 페이지 로드될 때 주기적으로 LocalStorage 확인
window.addEventListener('load', () => {
    // LocalStorage에서 클릭 이벤트가 발생했는지 확인
    const submitClicked = localStorage.getItem('submitClicked');
    if (submitClicked === 'true') {
    const surveyTitle = localStorage.getItem('surveyTitle');
    const row = document.createElement("tr");

    const statusCell = document.createElement("td");
    statusCell.id = "status-color";
    statusCell.textContent = "진행중";
    row.appendChild(statusCell);


    const surveyCell = document.createElement("td");
    surveyCell.textContent = surveyTitle;
    row.appendChild(surveyCell);

    surveyCell.addEventListener('click', () => {
        window.location.href = './survey-result.html';
    })

    const dateCell = document.createElement("td");
    dateCell.textContent = "23.05.25 ~ 23.05.25";
    row.appendChild(dateCell);

    const participationCell = document.createElement("td");
    participationCell.id = "participation-color";
    participationCell.textContent = "미참여";
    row.appendChild(participationCell);

    document.querySelector("tbody").appendChild(row);

    
  
      // 처리가 끝난 후 LocalStorage에서 해당 정보 제거
      localStorage.removeItem('submitClicked');
    }
  });
  // 여기까지---------------------------------------------------------------------
  