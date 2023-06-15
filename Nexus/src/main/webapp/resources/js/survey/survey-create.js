const optionAdd = document.getElementById("survey-option-add"),
    optionAddBox = document.querySelector(".servey-option-add-area"),
    cancleBtn = document.getElementById("survey-create-bottom-cancle"),
    submitBtn = document.getElementById("survey-create-bottom-submit"),
    surveyTitle = document.getElementById("survey-create-top-title"),
    surveyQuestion = document.getElementById("survey-create-content-question");




// 옵션 추가 이벤트
optionAdd.addEventListener("click", () => {
    const optionLi = document.createElement("li");
    optionLi.classList.add("survey-create-content-option");
    
    const optionCheck = document.createElement("i");
    optionCheck.classList.add("fa-solid","fa-check","survey-check");
    
    const optionInput = document.createElement("input");
    optionInput.placeholder = "옵션을 입력해 주세요"
    optionInput.name = "optionList";
    
    const optionDelete = document.createElement("button");
    optionDelete.id = "survey-option-delete";
    optionDelete.setAttribute("type", "button");

    const optionDeleteI = document.createElement("i");
    optionDeleteI.classList.add("fa-solid","fa-xmark","fa-xl");

    optionDelete.appendChild(optionDeleteI);

    optionLi.appendChild(optionCheck);
    optionLi.appendChild(optionInput);
    optionLi.appendChild(optionDelete);

    const surveyCreateContent = document.querySelector(".survey-create-content");
    surveyCreateContent.insertBefore(optionLi, surveyCreateContent.lastChild);

    surveyCreateContent.appendChild(optionAddBox);

    // 엑스 버튼 클릭 이벤트
    optionDelete.addEventListener("click", () => {
        optionLi.remove();
    });

})


// 취소 버튼 
cancleBtn.addEventListener('click', () => {
    window.history.back();
})

// 저장 버튼
submitBtn.addEventListener('click', () => { 

    // const newRow = document.createElement('tr');

    // const statusCell = document.createElement('td');
    // statusCell.textContent = '진행중';
    // statusCell.id = 'status-color';

    // const titleCell = document.createElement('td');
    // titleCell.textContent = surveyTitle.value;

    // const dateCell = document.createElement('td');
    // const now = new Date();
    // const year = now.getFullYear();
    // const month = now.getMonth() + 1;
    // if(month < 10) {
    //  month = "0" + month;    
    // }
    // const date = now.getDate();
    // if(date < 10) {
    //  date = "0" + date;
    // }
    // dateCell.textContent = year + '. ' + month + '. ' + date + '. ' + day;

    // const clipCell = document.createElement('td');
    // clipCell.id = 'clip';

    // const progressCell = document.createElement('td');
    // progressCell.textContent = '1/4';

    // const resultBtnCell = document.createElement('td');
    // const resultBtn = document.createElement('button');
    // resultBtn.id = 'survey-result-btn';
    // resultBtn.textContent = '결과 보기';
    // resultBtnCell.appendChild(resultBtn);

    // const deleteCell = document.createElement('td');
    // deleteCell.textContent = '삭제';

    // newRow.appendChild(statusCell);
    // newRow.appendChild(titleCell);
    // newRow.appendChild(dateCell);
    // newRow.appendChild(clipCell);
    // newRow.appendChild(progressCell);
    // newRow.appendChild(resultBtnCell);
    // newRow.appendChild(deleteCell);

    // document.querySelector("tbody").appendChild(newRow);

    // 클릭 이벤트가 발생했음을 다른 페이지에서 확인할 수 있도록 LocalStorage에 정보 저장
    localStorage.setItem('submitClicked', 'true');
    localStorage.setItem('surveyTitle', surveyTitle.value);

    // 페이지 이동
    window.location.href = './survey-manage.html';
})


