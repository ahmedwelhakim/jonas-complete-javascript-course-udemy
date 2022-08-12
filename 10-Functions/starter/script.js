'use strict';
const poll = {
	question: "What is your favourite programming language?",
	options: ["0: JavaScript", "1: Python", "2: Rust", "3:C++"],
	// This generates [0, 0, 0, 0]. More in the next section!
	answers: new Array(4).fill(0),
	registerNewAnswer() {
		const option = prompt(`${this.question}\n${(function fun() { let optns = ''; for (const [i, opt] of this.options.entries()) { optns += opt + (i == this.options.length - 1 ? '' : '\n'); } return optns }).bind(poll)()}
write option number`);
		if (option.match(/^[0-3]$/)) {
			this.answers[option]++;
		}
		this.displayResult();
	},
	displayResult(type = 'array') {
		if (type === 'string') {
			let res = 'Poll results are ';
			for (const n of this.answers) {
				res += n + ', ';
			}
			console.log(res);
		}

		else if (type === 'array')
			console.log(this.answers);
	}
};
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));
const data1 = [5, 2, 3];
const obj1 = { answers: data1 };
const data2 = [1, 5, 3, 9, 6, 1];
const obj2 = { answers: data2 };
poll.displayResult.call(obj1);
poll.displayResult.call(obj2);