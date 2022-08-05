'use strict';
class Player {
	score = 0;
	current = 0;
	active = false;
	reset() {
		this.score = 0;
		this.current = 0;
	};
	roll() {
		let rand = Math.trunc(Math.random() * 6) + 1;
		if (rand == 1) {
			this.current = 0;
		}
		else {
			this.current += rand;
		}
		return rand;
	};
	hold() {
		this.score += this.current;
		this.current = 0;
	}
	won() {
		return this.score >= 100;
	}
}
class Game {
	player1 = new Player();
	player2 = new Player();
	constructor() {
		this.player1.active = true;
	}
	switch() {
		this.player1.active = !this.player1.active;
		this.player2.active = !this.player2.active;
	};
	roll() {
		let roll;
		if (this.player1.active) {
			roll = this.player1.roll();
		}
		else {
			roll = this.player2.roll();
		}
		if (roll == 1) this.switch();
		return roll;
	};
	hold() {
		this.player1.hold();
		this.player2.hold();
		if (this.player1.won())
			return 0;
		if (this.player2.won())
			return 1;
		this.switch();
		return NaN;
	};
	reset() {
		this.player1.reset();
		this.player2.reset();
		this.player1.active = true;
		this.player2.active = false;
	}
}

const game = new Game();
const update = (player1, player2, roll, hold = NaN) => {
	document.querySelector('#current--0').textContent = player1.current;
	document.querySelector('#current--1').textContent = player2.current;
	document.querySelector('#score--0').textContent = player1.score;
	document.querySelector('#score--1').textContent = player2.score;
	if (player1.active) {
		document.querySelector('.player--0').classList.add('player--active');
		document.querySelector('.player--1').classList.remove('player--active');
	}
	else {
		document.querySelector('.player--1').classList.add('player--active');
		document.querySelector('.player--0').classList.remove('player--active');
	}
	if (roll > 0 && roll <= 6) {
		document.querySelector('.dice').style.removeProperty('visibility');
		document.querySelector('.dice').src = 'dice-' + roll + '.png';
	}
	if (roll == -1 && hold == -1) {
		document.querySelector('.dice').style.visibility = 'hidden';
		document.querySelector('.btn--roll').style.removeProperty('visibility');
		document.querySelector('.btn--hold').style.removeProperty('visibility');
		document.querySelector(`.player--0`).classList.remove('player--winner')
		document.querySelector(`.player--1`).classList.remove('player--winner')
	}
	if (!isNaN(hold) && hold != -1) {
		document.querySelector('.btn--roll').style.visibility = 'hidden';
		document.querySelector('.btn--hold').style.visibility = 'hidden';
		document.querySelector('.dice').style.visibility = 'hidden';
		document.querySelector(`.player--${hold}`).classList.add('player--winner')
	}

}
const rollHandle = () => {
	const roll = game.roll();
	update(game.player1, game.player2, roll);
}
const holdHandle = () => {
	const hold = game.hold();
	update(game.player1, game.player2, NaN, hold);
}
const newGameHandle = () => {
	game.reset();
	update(game.player1, game.player2, -1, -1);
}
newGameHandle();
const rollBtn = document.querySelector('.btn--roll');
rollBtn.addEventListener('click', rollHandle);
const holdBtn = document.querySelector('.btn--hold');
holdBtn.addEventListener('click', holdHandle);
const newGameBtn = document.querySelector('.btn--new');
newGameBtn.addEventListener('click', newGameHandle);