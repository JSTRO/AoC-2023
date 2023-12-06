const fs = require('fs');
const readline = require('readline');

async function main() {
  const answer = await processLines();
  console.log(answer);
}

main();

async function processLines() {
  const fileStream = fs.createReadStream('input-3.txt');
  const rl = readline.createInterface({ input: fileStream });

  let obj = {};
  let lineNum = 0;

  let symbols = new Set();

  // populate obj with {lineNo: {index: non-period char}}
  for await (const line of rl) {
    obj[lineNum] = {};
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== '.') {
        obj[lineNum][i] = line[i];
        // populate symbols with unique symbols
        if (isNaN(line[i])) {
          symbols.add(line[i]);
        }
      }
    }
    lineNum++;
  }

  return getSumPartNums(obj, symbols);
  // return getSumGearRatios(obj, symbols);
}

function getSumPartNums(data, symbols) {
  let sumPartNums = 0;
  let sumGearRatios = 0;
  // all gearIndices that curNum touches
  let allGearParts = {};

  for (let row in data) {
    let numArr = [];
    // part 2:
    let gearIndices = [];
    let currentNum = '';
    let line = data[row];
    let validPart = false;

    for (let index in line) {
      let value = line[index];

      index = parseInt(index);
      row = parseInt(row);

      // if number, push to currentNum
      if (!isNaN(parseInt(value))) {
        currentNum += value;

        // do index checks here
        let rowAbove = data[row - 1];
        let rowBelow = data[row + 1];

        let above = rowAbove && symbols.has(rowAbove[index]);
        let below = rowBelow && symbols.has(rowBelow[index]);

        // if there's a gear above, add index of gear to gearIndices (for that num's index) {gearIdx1: [num], gearIdx2, [num, num] }
        if (above || below) validPart = true;

        // part 2:
        if (rowAbove && rowAbove[index] === '*') {
          gearIndices.push(`r${row - 1}l${index}`);
        }
        if (rowBelow && rowBelow[index] === '*') {
          gearIndices.push(`r${row + 1}l${index}`);
        }

        // if first num, check prev, diagonal above prev, diagonal below prev
        if (currentNum.length === 1) {
          let left = line[index - 1] && symbols.has(line[index - 1]);
          let aboveLeft = rowAbove && symbols.has(rowAbove[index - 1]);
          let belowLeft = rowBelow && symbols.has(rowBelow[index - 1]);
          if (left || aboveLeft || belowLeft) {
            validPart = true;
          }

          // part 2:
          if (line[index - 1] === '*') {
            gearIndices.push(`r${row}l${index - 1}`);
          }
          if (rowAbove && rowAbove[index - 1] === '*') {
            gearIndices.push(`r${row - 1}l${index - 1}`);
          }
          if (rowBelow && rowBelow[index - 1] === '*') {
            gearIndices.push(`r${row + 1}l${index - 1}`);
          }
        }

        // if last num, check next, diagonal above next, diagonal below next
        if (isNaN(line[index + 1])) {
          let right = line[index + 1] && symbols.has(line[index + 1]);
          let aboveRight = rowAbove && symbols.has(rowAbove[index + 1]);
          let belowRight = rowBelow && symbols.has(rowBelow[index + 1]);
          if (right || aboveRight || belowRight) {
            validPart = true;
          }

          // part 2:
          if (line[index + 1] === '*') {
            gearIndices.push(`r${row}l${index + 1}`);
          }
          if (rowAbove && rowAbove[index + 1] === '*') {
            gearIndices.push(`r${row - 1}l${index + 1}`);
          }
          if (rowBelow && rowBelow[index + 1] === '*') {
            gearIndices.push(`r${row + 1}l${index + 1}`);
          }
        }
      }
      //  check if currentNum is finished: 1) current value is a symbol OR 2) next index doesn't exist
      if (symbols.has(value) || !line.hasOwnProperty(index + 1)) {
        if (currentNum !== '' && validPart) numArr.push(parseInt(currentNum));
        // reset currentNum and validPart

        // for each adjacent gear, populate numbers at the gear's index in allGearParts
        for (const gear of gearIndices) {
          allGearParts[gear] = allGearParts[gear]
            ? [...allGearParts[gear], currentNum]
            : [currentNum];
        }

        currentNum = '';
        validPart = false;
        gearIndices = [];
      }
    }
    // console.log(numArr);
    let arrTotal = numArr.reduce((a, b) => a + b, 0);
    sumPartNums += arrTotal;
  }

  // console.log(allGearParts);

  for (const gearPart in allGearParts) {
    let parts = allGearParts[gearPart];
    let product = parts[0] * parts[1];
    if (parts.length === 2) {
      sumGearRatios += product;
    }
  }

  console.log('sumGearRatios', sumGearRatios);
  return sumPartNums;
}
