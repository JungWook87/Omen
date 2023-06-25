// 직원 검색
const searchDept = document.getElementById('search-dept'),
  searchTeam = document.getElementById('search-team'),
  searchName = document.getElementById('search-name'),
  searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
  if(searchName.value === '') {
     Swal.fire("이름을 입력 해주세용");
  }

  $.ajax({
    url : "selectMem",
    data : { "memName" : searchName.value },
    type : "GET",
    dataType : "JSON",
    success : function(selectMem) {
      const tbody = document.querySelector('tbody');
      tbody.innerHTML = "";
      console.log(selectMem);
      if (selectMem.length === 0) {
        Swal.fire("검색 결과가 없습니다.");
      } else {
        for(let item of selectMem) {

          const tr = document.createElement('tr');
  
          const memNo = document.createElement('td');
          memNo.innerText = item.memNo;
  
          const memId = document.createElement('td');
          memId.innerText = item.memId;
          
          const memName = document.createElement('td');
          memName.innerText = item.memName;
          
          const jobName = document.createElement('td');
          jobName.innerText = item.jobName;
          
          const deptName = document.createElement('td');
          deptName.innerText = item.deptName;
          
          const teamName = document.createElement('td');
          teamName.innerText = item.teamName;
  
          const memSSN = document.createElement('td');
          memSSN.innerText = item.memRNo;
          
          const tel = document.createElement('td');
          tel.innerText = item.memTel;
          
          const address = document.createElement('td');
          address.innerText = item.memAddress;
          
          const email  = document.createElement('td');
          email.innerText = item.memEmail;
          
          const enrollDate = document.createElement('td');
          enrollDate.innerText = item.enrollDate;
          
          const departureDate = document.createElement('td');
          departureDate.innerText = item.departureDate;
  
          tr.append(memNo, memId, memName, jobName, deptName, teamName, memSSN, tel, address, email, enrollDate, departureDate)
  
          document.querySelector('tbody').append(tr);
        }
      }
      
    },
    error : function() {
      console.log("에러");
    }
  })
})


// 전체보기
const memAll = document.getElementById("memAll-btn");
memAll.addEventListener('click', selectAll);


// 직원 전제조회 AJAX
function selectAll() {
  $.ajax({
    url: "selectAll",
    dataType : "JSON",
    success : function(memList) {
      for(let item of memList) {

        const tr = document.createElement('tr');

        const memNo = document.createElement('td');
        memNo.innerText = item.memNo;

        const memId = document.createElement('td');
        memId.innerText = item.memId;
        
        const memName = document.createElement('td');
        memName.innerText = item.memName;
        
        const jobName = document.createElement('td');
        jobName.innerText = item.jobName;
        
        const deptName = document.createElement('td');
        deptName.innerText = item.deptName;
        
        const teamName = document.createElement('td');
        teamName.innerText = item.teamName;

        const memSSN = document.createElement('td');
        memSSN.innerText = item.memRNo;
        
        const tel = document.createElement('td');
        tel.innerText = item.memTel;
        
        const address = document.createElement('td');
        address.innerText = item.memAddress;
        
        const email  = document.createElement('td');
        email.innerText = item.memEmail;
        
        const enrollDate = document.createElement('td');
        enrollDate.innerText = item.enrollDate;
        
        const departureDate = document.createElement('td');
        departureDate.innerText = item.departureDate;

        tr.append(memNo, memId, memName, jobName, deptName, teamName, memSSN, tel, address, email, enrollDate, departureDate)

        document.querySelector('tbody').append(tr);
      }
    },
    error : function() {
      console.log("에러");
    }
  })
}

(function() {
  selectAll();
})();

