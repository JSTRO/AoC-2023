const fs = require('fs');
const readline = require('readline');

async function main() {
  const answer1 = await part1();
  console.log('answer1', answer1);

  const answer2 = await part2();
  console.log('answer2', answer2);
}

main();

async function part1() {
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

async function part2() {
  const fileStream = fs.createReadStream('input-4.txt');
  const rl = readline.createInterface({ input: fileStream });

  let arr = [];

  for await (const line of rl) {
    arr.push(line);
  }

  return processCopies(arr);
}

function processCopies(arr) {
  const counts = new Array(arr.length).fill(1);

  arr.forEach((card, i) => {
    let split = card.split('|');
    let myNums = split[0].trim().split(/\s+/).slice(2);
    let winningNums = split[1].trim().split(/\s+/);

    const count = myNums.filter((num) => winningNums.includes(num)).length;

    for (let j = i + 1; j <= i + count; j++) {
      counts[j] += counts[i];
    }
  });
  // console.log(counts);
  return counts.reduce((acc, count) => acc + count);
}
