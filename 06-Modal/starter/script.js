'use strict';
const showModalBtns = document.querySelectorAll('.show-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const showModal = () => {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
}
const closeModal = () => {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
}

for (const btn of showModalBtns) {
	btn.addEventListener('click', showModal);
}
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
	console.log(e.key);
	if (e.key === 'Escape') closeModal();
});
