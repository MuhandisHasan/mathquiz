
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const firstChar = document.querySelector("#first");
const secondChar = document.querySelector("#second");
const operator = document.querySelector("#operator");
const answerChar = document.querySelector("#answer");

var answer;
var scoreNum = 0;
var click;

function generateQuestion(){

	var operators;
	var first = Math.floor(Math.random() * (99 - 1 + 1) + 1);
	var second = Math.floor(Math.random() * (99 - 1 + 1) + 1);

	switch (Math.floor(Math.random() * (3 - 1 + 1) + 1) - 1) {
	  case 0:
	    operators = '+';
	    answer = first + second;
	    break;
	  case 1:
	    operators = '-';
	    answer = first - second;
	    break;
	  case 2:
	    operators = 'x'
	    answer = first * second;
	   break;
	}

	firstChar.innerHTML = first;
	secondChar.innerHTML = second;
	operator.innerHTML = operators;

	return answer;

}


// Start count down
window.onload = function() {
	generateQuestion();
	var sec = 60;

	setInterval(function() {
	   sec--;
	   timeLeft.innerHTML = 'Time Left: '+sec;

	   if (sec == 0) {

	   		alert("You've done "+scoreNum+" questions!");
	   		window.location.href = 'index.html';

	   }

	}, 1000);

}

window.addEventListener("keydown",function(e){

	var key = e.key;

	if (localStorage.getItem("mode") == null || localStorage.getItem("mode") == "normal") {

		if (!isNaN(+key) || key == '-') {

			answerChar.innerHTML += key;

			if (+answerChar.innerHTML == answer) {

				generateQuestion();
				scoreNum++;
				score.innerHTML = "Score: " + scoreNum;
				answerChar.innerHTML = "";

			}

		}else if(key == 'Backspace'){

			var deleted = answerChar.innerHTML;

			deleted = deleted.slice(0,-1);

			answerChar.innerHTML = deleted;

		}
	}else if(localStorage.getItem("mode") == "cheater"){


		if (click == undefined) {

			click = 0;
			answerChar.innerHTML += String(answer).charAt(click);
			click++;

			if (+answerChar.innerHTML == answer) {

				generateQuestion();
				scoreNum++;
				score.innerHTML = "Score: " + scoreNum;
				answerChar.innerHTML = "";

				click = 0;

			}

		}else{

			answerChar.innerHTML += String(answer).charAt(click);
			click++;

			if (+answerChar.innerHTML == answer) {

				generateQuestion();
				scoreNum++;
				score.innerHTML = "Score: " + scoreNum;
				answerChar.innerHTML = "";

				click = 0;

			}

		}


	}
});