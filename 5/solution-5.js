const fs = require('fs');
const readline = require('readline');

async function main() {
  const data = await parseInput();
  const answer1 = await calcLowestLocation(data);
  // console.log(data);
  console.log('answer1', answer1);

  // const answer2 = await part2();
  // console.log('answer2', answer2);
}

main();

async function parseInput() {
  const fileStream = fs.createReadStream('input-5.txt');
  const rl = readline.createInterface({ input: fileStream });

  const data = {};
  // let idx = 0;

  let currentMapName = '';
  let currentMap = [];

  for await (const line of rl) {
    let chars = line.split(' ');
    if (chars[0] === 'seeds:') {
      data['seeds'] = chars.slice(1);
    } else if (line === '' && currentMap.length) {
      data[currentMapName] = currentMap;
      currentMap = [];
    } else if (/^[a-z]+$/.test(chars[0][0])) {
      currentMapName = chars[0];
    } else {
      let currentObj = {};
      currentObj['dest'] = parseInt(chars[0]);
      currentObj['source'] = parseInt(chars[1]);
      currentObj['range'] = parseInt(chars[2]);

      currentMap.push(currentObj);
    }
  }
  // maybe a better way to do this
  data[currentMapName] = currentMap;
  return data;
}

async function calcLowestLocation(data) {
  let locationNum = Infinity;
  // let seeds = getAllSeeds(data['seeds']);
  let seeds = data['seeds'];
  for (const seed of seeds) {
    let currentValue = seed;
    for (const map in data) {
      if (map !== 'seeds') {
        currentValue = convertValue(currentValue, data[map]);
      }
      // console.log(currentValue, map);
    }
    locationNum = Math.min(locationNum, currentValue);
  }
  return locationNum;
}

function convertValue(seed, map) {
  seed = parseInt(seed);
  for (const line of map) {
    const { source, dest, range } = line;

    if (seed >= source && seed <= source + range) {
      return seed + (dest - source);
    }
  }
  return seed;
}

function getAllSeeds(seeds) {
  const allSeeds = [];

  for (let i = 0; i < seeds.length - 1; i += 2) {
    let start = parseInt(seeds[i]);
    let range = parseInt(seeds[i + 1]);

    for (let j = start; j < start + range; j++) {
      allSeeds.push(j);
    }
  }

  return allSeeds;
}

/*
let testSeeds = [79, 14, 55, 13];

const test = {
  seeds: [79, 14, 55, 13],
  'seed-to-soil': [
    { dest: 50, source: 98, range: 2 },
    { dest: 52, source: 50, range: 48 },
  ],
  'soil-to-fertilizer': [
    { dest: 0, source: 15, range: 37 },
    { dest: 37, source: 52, range: 2 },
    { dest: 39, source: 0, range: 15 },
  ],
  'fertilizer-to-water': [
    { dest: 49, source: 53, range: 8 },
    { dest: 0, source: 11, range: 42 },
    { dest: 42, source: 0, range: 7 },
    { dest: 57, source: 7, range: 4 },
  ],
  'water-to-light': [
    { dest: 88, source: 18, range: 7 },
    { dest: 18, source: 25, range: 70 },
  ],
  'light-to-temperature': [
    { dest: 45, source: 77, range: 23 },
    { dest: 81, source: 45, range: 19 },
    { dest: 68, source: 64, range: 13 },
  ],
  'temperature-to-humidity': [
    { dest: 0, source: 69, range: 1 },
    { dest: 1, source: 0, range: 69 },
  ],
  'humidity-to-location': [
    { dest: 60, source: 56, range: 37 },
    { dest: 56, source: 93, range: 4 },
  ],
};

console.log(calcLowestLocation(test));

const map = [
  { dest: 49, source: 53, range: 8 },
  { dest: 0, source: 11, range: 42 },
  { dest: 42, source: 0, range: 7 },
  { dest: 57, source: 7, range: 4 },
];

// console.log(convertValue(53, map));
*/
