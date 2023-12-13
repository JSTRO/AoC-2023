const dataPart1 = [
  { time: 53, distance: 333 },
  { time: 83, distance: 1635 },
  { time: 72, distance: 1289 },
  { time: 88, distance: 1532 },
];

const dataPart2 = { time: 53837288, distance: 333163512891532 };

const calcWaysToWin = (time, distance) => {
  let ways = 0;
  for (let i = 1; i < time; i++) {
    let curDistance = (time - i) * i;
    if (curDistance > distance) ways++;
  }
  return ways;
};

let totalWaysPart1 = dataPart1.reduce((totalWays, race) => {
  return calcWaysToWin(race.time, race.distance) * totalWays;
}, 1);

console.log(totalWaysPart1);
console.log(calcWaysToWin(dataPart2.time, dataPart2.distance));
