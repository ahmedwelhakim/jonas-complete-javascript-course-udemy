'strict mode';

// class Budget {
//   #budget
//   constructor(budget) {
//     this.#budget = budget;
//   }
//   get budget() {
//     // The slice here to ensure that even if we mutate anything inside the
//     // inside the budget array it won't affect the original budget
//     return this.#budget.slice(0);
//   }
//   addExpense(limits, value, description, user = 'jonas') {
//     const cleanUser = user.toLowerCase();

//     return value <= getLimit(limits, cleanUser)
//       ? new Budget([...this.#budget, { value: -value, description, user: cleanUser }])
//       : this;
//   }
// }
// const budget = Object.freeze([
//   { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
//   { value: -45, description: 'Groceries 🥑', user: 'jonas' },
//   { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
//   { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
//   { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
//   { value: -20, description: 'Candy 🍭', user: 'matilda' },
//   { value: -125, description: 'Toys 🚂', user: 'matilda' },
//   { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
// ]);


// const spendingLimits = Object.freeze({
//   jonas: 1500,
//   matilda: 100,
// });

// const getLimit = (limits, user) => limits?.[user] ?? 0;

// const budgetObj = new Budget(budget);
// console.log(budgetObj);

// const newBudgetObj =
//   budgetObj
//     .addExpense(spendingLimits, 10, 'Pizza 🍕')
//     .addExpense(spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
// console.log(newBudgetObj);
// console.log(newBudgetObj.addExpense(spendingLimits, 0, 'Stuff', 'Jay'));

// const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
// const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
// const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

class State {
  #state
  constructor(state) {
    this.#state = Array.isArray(state) ? state : [state];
  }
  get state() {
    return this.#state.slice(0);
  }
  do(callBackFn, ...args) {
    return new State(callBackFn(this.state, ...args));
  }
}

const getLimitOf = (user, limits) => limits?.[user.toLowerCase()] ?? 0;

// we have here the normal Pure Function
// BUT The first argument must be the state
const addExpenseWith = function (state, value, userLimit, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();

  return value <= userLimit
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const budgetArr = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = { jonas: 1500, matilda: 100 };
const jonasLimit = getLimitOf('Jonas', spendingLimits);
const matildaLimit = getLimitOf('Matilda', spendingLimits);

const budgetState = new State(budgetArr);

const newBudgetState =
  budgetState
    .do(addExpenseWith, 10, jonasLimit, 'Pizza 🍕')
    .do(addExpenseWith, 100, matildaLimit, 'Going to movies 🍿', 'Matilda');

console.log(newBudgetState);