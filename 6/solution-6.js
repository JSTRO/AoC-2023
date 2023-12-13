const data = [
  { time: 53, distance: 333 },
  { time: 83, distance: 1635 },
  { time: 72, distance: 1289 },
  { time: 88, distance: 1532 },
];

const calcWaysToWin = (time, distance) => {
  let ways = 0;
  for (let i = 1; i < time; i++) {
    let curDistance = (time - i) * i;
    if (curDistance > distance) ways++;
  }
  return ways;
};

let totalWays = data.reduce((totalWays, race) => {
  return calcWaysToWin(race.time, race.distance) * totalWays;
}, 1);

console.log(totalWays);
