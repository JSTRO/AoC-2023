const fs = require('fs');
const readline = require('readline');

async function main() {
  const answer = await part1();
  console.log(answer);
}

main();

async function part1() {
  const fileStream = fs.createReadStream('input-2.txt');
  const rl = readline.createInterface({ input: fileStream });

  let sumImpossibleGames = 0;
  let sumAllGames = sumOfRange(1, 100);

  gameLoop: for await (const line of rl) {
    let gameId = line.split(':')[0].split(' ')[1];
    let game = line.split(':')[1].split([';']);

    for (const reveal of game) {
      let value = 0;
      let color = '';

      let lineSplit = reveal.split(',');

      for (const el of lineSplit) {
        value = el.split(' ')[1];
        color = el.split(' ')[2];

        if (
          (color === 'red' && value > 12) ||
          (color === 'green' && value > 13) ||
          (color === 'blue' && value > 14)
        ) {
          sumImpossibleGames += parseInt(gameId);
          continue gameLoop;
        }
      }
    }
  }

  return sumAllGames - sumImpossibleGames;
}

function sumOfRange(min, max) {
  let sum = 0;

  for (let i = min; i <= max; i++) {
    sum += i;
  }

  return sum;
}
