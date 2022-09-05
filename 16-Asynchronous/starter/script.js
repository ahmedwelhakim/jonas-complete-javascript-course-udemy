'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const wait = (seconds, msg) => { return new Promise((resolve) => setTimeout(() => resolve(msg), seconds * 1000)) };
//let imgEl;
const createImage = (imgPath) => new Promise((resolve, reject) => {
	const imgEl = document.createElement('img');
	imgEl.src = imgPath;
	imgEl.addEventListener('load', () => {
		document.querySelector('.images').insertAdjacentElement('afterend', imgEl);
		resolve(imgEl);
	});
	imgEl.addEventListener('error', (ev) => reject(ev));

});
createImage('./img/img-1.jpg')
	.then((imgEl) => wait(2, imgEl))
	.then(imgEl => {
		imgEl.style.display = 'none';
		return createImage('./img/img-2.jpg');
	})
	.then((imgEl) => wait(2, imgEl))
	.then(imgEl => {
		imgEl.style.display = 'none';
		return createImage('./img/img-3.jpg');
	})
	.then((imgEl) => wait(2, imgEl))
	.then(imgEl =>
		imgEl.style.display = 'none'
	)
	.catch(err => console.log(err));