const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const year = document.getElementById("year");
const month = document.getElementById("month");

console.log(year.value);
console.log(month.value);

leftBtn.addEventListener("click", function(){
	let yearNum = Number(year.value);
	let monthNum = Number(month.value);
	
	if(month.value != 1){
		monthNum -= 1;
	} else {
		yearNum -= 1;
		monthNum = 12; 
	}
	
	$.ajax({
            url : "attendance/list",
            type : "GET",
            dataType : "JSON",
            data : {
   				"year" : yearNum,  
            	"month" : monthNum }

	});
})