const fs = require('fs');
const readline = require('readline');

async function main() {
  const data = await parseInput();
  console.log(data);
}

main();

async function parseInput() {
  const fileStream = fs.createReadStream('input-7.txt');
  const rl = readline.createInterface({ input: fileStream });

  const data = [[], [], [], [], [], [], []];

  for await (const line of rl) {
    const split = line.split(' ');
    const cur = {};

    cur.hand = split[0];
    cur.bet = split[1];
    // cur.strength = findPrimaryHandStrengthPart1(cur.hand);
    // cur.value = findHandPointValuePart1(cur.hand);
    cur.strength = findPrimaryHandStrengthPart2(cur.hand);
    cur.value = findHandPointValuePart2(cur.hand);

    data[cur.strength].push(cur);
  }

  const sorted = data.map((bucket) =>
    bucket.sort((a, b) => a.value.localeCompare(b.value))
  );
  const flat = sorted.flat();

  let total = 0;

  flat.forEach((hand, i) => {
    total += (i + 1) * parseInt(hand.bet, 10);
  });

  return total;
}

const findPrimaryHandStrengthPart1 = (hand) => {
  const freqs = {};
  for (let i = 0; i < hand.length; i++) {
    freqs[hand[i]] = freqs[hand[i]] ? freqs[hand[i]] + 1 : 1;
  }
  let pairs = 0;
  let triple = 0;
  for (const card in freqs) {
    let freq = freqs[card];
    // five of a kind
    if (freq === 5) return 6;
    // four of a kind
    if (freq === 4) return 5;
    if (freq === 3) triple++;
    if (freq === 2) pairs++;
  }
  if (triple) {
    // triple + pair = full house
    if (pairs) return 4;
    // only triple = three of a kind
    else return 3;
  }
  // two pair
  if (pairs === 2) return 2;
  // one pair
  if (pairs === 1) return 1;
  // high card
  return 0;
};

const findHandPointValuePart1 = (hand) => {
  // assign a point value to each card
  const cards = {
    A: 'm',
    K: 'l',
    Q: 'k',
    J: 'j',
    T: 'i',
    9: 'h',
    8: 'g',
    7: 'f',
    6: 'e',
    5: 'd',
    4: 'c',
    3: 'b',
    2: 'a',
  };
  let sum = '';
  for (let i = 0; i < hand.length; i++) {
    // sum = value of card + multiplier for which number card in hand
    sum += cards[hand[i]];
  }
  return sum;
};

const findPrimaryHandStrengthPart2 = (hand) => {
  let strength = 0;
  let jokers = 0;
  const freqs = {};

  for (let i = 0; i < hand.length; i++) {
    // if joker encountered, count separate from frequencies
    if (hand[i] === 'J') {
      jokers++;
      continue;
    }
    freqs[hand[i]] = freqs[hand[i]] ? freqs[hand[i]] + 1 : 1;
  }
  if (jokers === 5 || jokers === 4) return 6;
  let pairs = 0;
  let triple = 0;
  for (const card in freqs) {
    let freq = freqs[card];
    // five of a kind
    if (freq === 5) strength = 6;
    // four of a kind with no joker, five with
    if (freq === 4) strength = 5 + jokers;
    if (freq === 3) triple++;
    if (freq === 2) pairs++;
  }
  if (strength >= 5) return strength;
  if (triple) {
    // triple + pair = full house
    if (pairs) strength = 4;
    // only triple = three of a kind
    else {
      if (jokers === 2) strength = 6;
      else if (jokers === 1) strength = 5;
      else strength = 3;
    }
  }
  // two pair
  else if (pairs === 2) {
    // joker can make a full house
    if (jokers === 1) strength = 4;
    else strength = 2;
  }
  // one pair
  else if (pairs === 1) {
    // five of a kind
    if (jokers === 3) strength = 6;
    // four of a kind
    if (jokers === 2) strength = 5;
    // three of a kind
    if (jokers === 1) strength = 3;
    if (jokers === 0) strength = 1;
  }
  // high card
  else if (pairs === 0) {
    if (jokers === 3) strength = 5;
    else if (jokers === 2) strength = 3;
    else if (jokers === 1) strength = 1;
    else strength = 0;
  }

  return strength;
};

const findHandPointValuePart2 = (hand) => {
  // assign a point value to each card
  const cards = {
    A: 'm',
    K: 'l',
    Q: 'k',
    T: 'j',
    9: 'i',
    8: 'h',
    7: 'g',
    6: 'f',
    5: 'e',
    4: 'd',
    3: 'c',
    2: 'b',
    J: 'a',
  };
  let sum = '';
  for (let i = 0; i < hand.length; i++) {
    // sum = value of card + multiplier for which number card in hand
    sum += cards[hand[i]];
  }
  return sum;
};

// console.log(findPrimaryHandStrengthPart2('T2JJJ'));
