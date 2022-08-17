'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


/////////////////////////////////////////////////
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
  return loggedUser;
}
const logout = function (accounts, username) {
  accounts.splice(getUserAccountIndex(accounts, username), 1);
  labelWelcome.textContent = `Log in to get started`;
  hideUI();
}

const displayMovements = function (acc) {
  containerMovements.innerHTML = '';
  acc.movements.forEach((v, i) => {
    const type = v > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${v}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}
const calcAndDisplayBalance = function (acc) {
  labelBalance.textContent = acc.movements.reduce((prev, curr) => (prev + curr), 0) + '€';
}
const calcAndDisplaySummary = function (acc) {
  labelSumIn.textContent = acc.movements.filter(v => v > 0).reduce((prev, curr) => (prev + curr), 0) + '€';
  labelSumOut.textContent = acc.movements.filter(v => v < 0).reduce((prev, curr) => (prev + Math.abs(curr)), 0) + '€';
  labelSumInterest.textContent = acc.movements.
    filter(v => v > 0).
    map(v => (v * +acc.interestRate) / 100).
    filter(v => v >= 1).
    reduce((p, v) => p + v, 0) + '€';
}
const updateUI = function (loggedAcc) {
  displayMovements(loggedAcc);
  calcAndDisplayBalance(loggedAcc);
  calcAndDisplaySummary(loggedAcc);
}
const transfer = function (userAcc, receiverAcc, amount) {
  if (Number.parseInt(labelSumIn.textContent) >= amount) {
    userAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(userAcc);
  }
}
const loan = function (userAcc, amount) {
  if (userAcc.movements.some(v => v >= amount * 0.1)) {
    userAcc.movements.push(amount);
    updateUI(userAcc);
  }
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
    logout(accounts, inputCloseUsername.value);
  }
})
