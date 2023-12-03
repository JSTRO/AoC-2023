const fs = require('fs');
const readline = require('readline');

async function main() {
  const answer = await processLines();
  console.log(answer);
}

main();

async function processLines() {
  const fileStream = fs.createReadStream('input-2.txt');
  const rl = readline.createInterface({ input: fileStream });

  // Part 1:
  let sumImpossibleGames = 0;
  let sumAllGames = sumOfRange(1, 100);

  // Part 2:
  let sumPowers = 0;

  gameLoop: for await (const line of rl) {
    let gameId = line.split(':')[0].split(' ')[1];
    let game = line.split(':')[1].split([';']);

    const obj = { red: 0, green: 0, blue: 0 };

    for (const reveal of game) {
      let value = 0;
      let color = '';

      let lineSplit = reveal.split(',');

      for (const el of lineSplit) {
        value = el.split(' ')[1];
        color = el.split(' ')[2];

        /*
        // Part 1: find sum of games which could be played with at max 12 red, 13, green, 14 blue cubes
        if (
          (color === 'red' && value > 12) ||
          (color === 'green' && value > 13) ||
          (color === 'blue' && value > 14)
        ) {
          sumImpossibleGames += parseInt(gameId);
          continue gameLoop;
        }
        */

        // Part 2:
        obj[color] = Math.max(value, obj[color]);
      }
    }
    let power = 1;
    for (const key in obj) {
      power *= parseInt(obj[key]);
    }
    sumPowers += power;
  }
  // Part 1:
  // return sumAllGames - sumImpossibleGames;

  // Part 2:
  return sumPowers;
}

function sumOfRange(min, max) {
  let sum = 0;

  for (let i = min; i <= max; i++) {
    sum += i;
  }

  return sum;
}
