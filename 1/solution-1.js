const fs = require('fs');
const readline = require('readline');

async function main() {
  const answer = await processLines();
  console.log(answer);
}

main();

async function processLines() {
  const fileStream = fs.createReadStream('input-1.txt');
  const rl = readline.createInterface({ input: fileStream });

  let calibrationSum = 0;

  for await (const line of rl) {
    let calibrationValue = findTrueCalibrationValue(line);
    calibrationSum += parseInt(calibrationValue);
  }

  return calibrationSum;
}

function findTrueCalibrationValue(line) {
  let calibrationValue = '';
  let stringStart = '';
  let stringEnd = '';

  for (let start = 0; start < line.length; start++) {
    // keep track of string at beginning of line
    stringStart += line[start];
    // if start char is number, break out of loop and add to calibration value
    if (!isNaN(parseInt(line[start]))) {
      calibrationValue += line[start];
      break;
      // if not a number, check if stringStart includes written integer
    } else {
      let lastWrittenInt = findLastWrittenInteger(stringStart);
      if (lastWrittenInt) {
        calibrationValue += lastWrittenInt;
        break;
      }
    }
  }

  for (let end = line.length - 1; end >= 0; end--) {
    // keep track of string at end of line
    stringEnd = `${line[end]}${stringEnd}`;
    // if end char is number, break out of loop and add to calibration value
    if (!isNaN(parseInt(line[end]))) {
      calibrationValue += line[end];
      break;
      // if not a number, check if stringEnd includes written integer
    } else {
      let lastWrittenInt = findLastWrittenInteger(stringEnd);
      if (lastWrittenInt) {
        calibrationValue += lastWrittenInt;
        break;
      }
    }
  }

  return calibrationValue;
}

function findLastWrittenInteger(string) {
  const integers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  for (const key in integers) {
    if (string.includes(key)) {
      return integers[key];
    }
  }
}
