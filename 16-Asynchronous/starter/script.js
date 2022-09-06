'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imageContainer = document.querySelector('.images');
///////////////////////////////////////

// const wait = (seconds, arg) =>
// 	new Promise(resolve => setTimeout(() => resolve(arg), seconds * 1000));
// const createImage = imgPath =>
// 	new Promise((resolve, reject) => {
// 		const imgEl = document.createElement('img');
// 		imgEl.src = imgPath;
// 		imgEl.addEventListener('load', () => {
// 			imageContainer.append(imgEl);
// 			resolve(imgEl);
// 		});
// 		imgEl.addEventListener('error', () => reject('Image Not Found or Incorrect Path!'));
// 	});
// createImage('./img/img-1.jpg')
// 	.then(imgEl => wait(2, imgEl))
// 	.then(imgEl => {
// 		imgEl.style.display = 'none';
// 		return createImage('./img/img-2.jpg');
// 	})
// 	.then(imgEl => wait(2, imgEl))
// 	.then(imgEl => imgEl.style.display = 'none')
// 	.catch(err => console.log(err));

/// Challenge 3
const wait = (seconds, arg) =>
	new Promise(resolve => setTimeout(() => resolve(arg), seconds * 1000));
const createImage = imgPath =>
	new Promise((resolve, reject) => {
		const imgEl = document.createElement('img');
		imgEl.src = imgPath;
		imgEl.addEventListener('load', () => {
			imageContainer.append(imgEl);
			resolve(imgEl);
		});
		imgEl.addEventListener('error', () => reject('Image Not Found or Incorrect Path!'));
	});

const loadNPause = async () => {
	try {
		const img1 = await createImage('./img/img-1.jpg');
		await wait(2);
		img1.style.display = 'none';
		const img2 = await createImage('./img/img-2.jpg');
		await wait(2);
		img2.style.display = 'none';
	} catch (err) {
		console.err('Image Not Found!');
	}
}
loadNPause();
const loadAll = async (imgArr) => {
	const imgs = imgArr.map(async v => await createImage(v));
	const imgsEl = await Promise.all(imgs);
	imgsEl.map(v => v.classList.add('parallel'));
}
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);