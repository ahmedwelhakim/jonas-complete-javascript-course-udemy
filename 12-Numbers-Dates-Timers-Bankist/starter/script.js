'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-08-18T17:01:17.194Z',
    '2022-08-17T23:36:17.929Z',
    '2022-08-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const createUserNames = function (accs) {
  for (const acc of accs) {
    acc.username = acc.owner.toLowerCase().split(' ').reduce((acc, curr) => acc + curr[0], '');
  }
}
// Functions Implementation
const isValidAuth = function (accs, username, pin) {
  return accs.map(v => v.username).includes(username) ? accs.map(v => v.pin).includes(+pin) : false;
}

const getUserAccountIndex = function (accs, username) {
  return accs.map(v => v.username).indexOf(username);
}
const showUI = function () {
  containerApp.style.opacity = 1;
}
const hideUI = function () {
  containerApp.style.opacity = 0;
}
const login = function (accounts, username) {
  const loggedUser = accounts[getUserAccountIndex(accounts, username)];
  labelWelcome.textContent = `Welcome, ${loggedUser.owner.split(' ')[0]}`;
  updateUI(loggedUser);
  showUI();
  if (loginTimer) clearInterval(loginTimer);
  startloginTimer(1);
  return loggedUser;
}
const logout = function () {
  labelWelcome.textContent = `Log in to get started`;
  loggedUser = null;
  clearInterval(loginTimer);
  hideUI();
}
const deleteAccount = function (accounts, username) {
  accounts.splice(getUserAccountIndex(accounts, username), 1);
  logout();
}
const getFormatedCurrency = function (acc, amount) {
  return Intl.NumberFormat(acc.locale, {
    currency: acc.currency,
    style: 'currency'
  }).format(amount).toString();
}
const getFormatedDate = function (acc, date) {
  return Intl.DateTimeFormat(acc.locale).format(new Date(date));
}
const calcPassedDay = function (date) {
  return Math.round(Math.abs(new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
}
const getMovementDate = function (acc, indx) {
  const days = calcPassedDay(acc.movementsDates[indx]);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days <= 7) return ` ${days} days ago`;
  else return getFormatedDate(acc, acc.movementsDates[indx]);
}
const displayMovements = function (acc, sorted = false) {
  containerMovements.innerHTML = '';
  const movs = sorted ? acc.movements.slice().sort() : acc.movements;
  movs.forEach((v, i) => {
    const type = v > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${getMovementDate(acc, i)}</div>
          <div class="movements__value">${getFormatedCurrency(acc, v)}</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}
const calcAndDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((prev, curr) => (prev + curr), 0).toFixed(2);
  labelBalance.textContent = getFormatedCurrency(acc, balance);
}
const calcAndDisplaySummary = function (acc) {
  const sumIn = acc.movements.filter(v => v > 0).reduce((prev, curr) => (prev + curr), 0).toFixed(2);
  labelSumIn.textContent = getFormatedCurrency(acc, sumIn);
  const sumOut = acc.movements.filter(v => v < 0).reduce((prev, curr) => (prev + Math.abs(curr)), 0);
  labelSumOut.textContent = getFormatedCurrency(acc, sumOut);
  const sumInterest = acc.movements.
    filter(v => v > 0).
    map(v => (v * +acc.interestRate) / 100).
    filter(v => v >= 1).
    reduce((p, v) => p + v, 0).toFixed(2);
  labelSumInterest.textContent = getFormatedCurrency(acc, sumInterest);
}
let sorted = false;
const updateUI = function (loggedAcc) {
  displayMovements(loggedAcc, sorted);
  calcAndDisplayBalance(loggedAcc);
  calcAndDisplaySummary(loggedAcc);
}
const transfer = function (userAcc, receiverAcc, amount) {
  if (userAcc.movements.reduce((p, c) => p + c, 0) >= amount) {
    userAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);
    userAcc.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(userAcc);
  }
}
const loan = function (userAcc, amount) {
  if (userAcc.movements.some(v => v >= amount * 0.1)) {
    userAcc.movements.push(amount);
    userAcc.movementsDates.push(new Date().toISOString());
    updateUI(userAcc);
  }
}
let loginTimer;
const startloginTimer = function (timeLimit_min) {
  let min = timeLimit_min;
  let sec = 0;
  labelTimer.textContent = '';
  labelTimer.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  loginTimer = setInterval(() => {
    sec--;
    if (sec < 0) {
      sec = 59;
      min--;
    }
    if (min <= 0 && sec <= 0) {
      clearInterval(loginTimer);
      logout();
    }
    labelTimer.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }, 1000);

}

// Create userName with first initials
createUserNames(accounts);

// Authentication
let loggedUser = null;
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  if (isValidAuth(accounts, inputLoginUsername.value, inputLoginPin.value)) {
    loggedUser = login(accounts, inputLoginUsername.value);
  }
  inputLoginPin.value = '';
  inputLoginUsername.value = '';
  inputLoginPin.blur();
})
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  transfer(loggedUser, accounts[getUserAccountIndex(accounts, inputTransferTo.value)], +inputTransferAmount.value);
})
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  loan(loggedUser, +inputLoanAmount.value);
})
btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (isValidAuth(accounts, inputCloseUsername.value, +inputClosePin.value)) {
    deleteAccount(accounts, inputCloseUsername.value);
  }
})
btnSort.addEventListener('click', e => {
  e.preventDefault();
  sorted = !sorted;
  updateUI(loggedUser);
})
