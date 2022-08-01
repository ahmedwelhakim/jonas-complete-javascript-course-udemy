'use strict';

const input = document.querySelector('.guess');
const checkBtn = document.querySelector('.btn.check');
const message = document.querySelector('.message');
const scoreOutput = document.querySelector('.score');
const rand = Math.trunc(Math.random() * 20) + 1;
let score = 20;
checkBtn.addEventListener('click', () => {
	const number = Number(input.value);
	if (number > rand) {
		message.textContent = 'Too High';
		scoreOutput.textContent = --score;
	}
	else if (number < rand) {
		message.textContent = 'Too Low';
		scoreOutput.textContent = --score;
	}
	else {
		message.textContent = 'Correct';
		scoreOutput.textContent = score;
	}
})
