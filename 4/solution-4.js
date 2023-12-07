const fs = require('fs');
const readline = require('readline');

async function main() {
  const answer = await processLines();
  console.log(answer);
}

main();

async function processLines() {
  const fileStream = fs.createReadStream('input-4.txt');
  const rl = readline.createInterface({ input: fileStream });

  let pointTotal = 0;

  for await (const line of rl) {
    let split = line.split(/\s+/);
    let myNums = split.slice(2, 12);
    let winningNums = split.slice(13);

    let currentTotal = 0;

    for (const winningNum of winningNums) {
      if (myNums.includes(winningNum)) {
        if (currentTotal === 0) currentTotal++;
        else currentTotal += currentTotal;
      }
    }

    pointTotal += currentTotal;
  }

  return pointTotal;
}
