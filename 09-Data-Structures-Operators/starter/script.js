'use strict';
/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
    'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
}
const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

const { odds: { team1: team1, team2: team2, x: draw } } = game;
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
};
printGoals(...game.scored);
team1 < team2 && console.log('team 1 is likely to win');
team2 < team1 && console.log('team 1 is likely to win');

for (const [i, pl] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${pl}`)
}
let sum = 0;
const oddValues = Object.values(game.odds);
for (const odd of oddValues) {
  sum += odd;
}
console.log(`Average odd: ${sum / oddValues.length}`);
for (const [key, odd] of Object.entries(game.odds)) {
  key !== 'x' && console.log(`Odd of victory ${game[key]}: ${odd}`);
  key === 'x' && console.log(`Odd of draw: ${odd}`);
}
const scorers = {}
for (const scorer of game.scored) {
  scorers[scorer] = scorers[scorer] + 1 || 1;
}
console.log(scorers);

// Challenge 3
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);
const eventsSet = new Set();
for (const event of gameEvents.values()) {
  eventsSet.add(event);
}
const events = [...eventsSet];
gameEvents.delete(64);
console.log(`An event happened, on
average, every ${90 / gameEvents.size} minutes`);
for (const [i, event] of gameEvents.entries()) {
  const str = i > 45 ? `[SECOND HALF]` : '[FIRST HALF]';
  console.log(str + `${i}: ${event}`);
}