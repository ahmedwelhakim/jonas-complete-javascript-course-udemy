'use strict';

const input = document.querySelector('.guess');
const checkBtn = document.querySelector('.btn.check');
const message = document.querySelector('.message');
const scoreOutput = document.querySelector('.score');
const body = document.querySelector('body');
let rand = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
checkBtn.addEventListener('click', gameLogic);
const numberDisplay = document.querySelector('.number');
const again = document.querySelector('.again');
again.addEventListener('click', reset);
function reset() {
	message.textContent = 'Start guessing...';
	body.classList.remove('success-body');
	body.classList.remove('fail-body');
	score = 20;
	input.value = '';
	scoreOutput.textContent = score;
	numberDisplay.style.width = '15rem';
	rand = Math.trunc(Math.random() * 20) + 1;
};
function gameLogic() {
	const number = Number(input.value);
	if (!number) {
		message.textContent = '⛔️ No number!';
	}
	else if (score > 0) {
		if (number > rand) {
			message.textContent = '📈 Too High';
			scoreOutput.textContent = --score;

		}
		else if (number < rand) {
			message.textContent = '📉 Too Low';
			scoreOutput.textContent = --score;

		}
		else {
			message.textContent = '🎉 Correct Number!';
			scoreOutput.textContent = score;
			if (score > highScore) {
				highScore = score;
			}
			document.querySelector('.highscore').textContent = highScore;
			numberDisplay.style.width = '30rem';
			numberDisplay.textContent = number;
			body.classList.add('success-body');
		}
		if (score == 0) {
			body.classList.add('fail-body');
			message.textContent = '💥 You lost the game!';
		}
	}
	else {
		body.classList.add('fail-body');
		message.textContent = '💥 You lost the game!';
	}

};
