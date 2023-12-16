const fs = require('fs');
const readline = require('readline');

async function main() {
  const data = await parseInput();
  const { instructions, nodeList } = data;
  console.log(parseInstructions(instructions, nodeList));
}

main();

async function parseInput() {
  const fileStream = fs.createReadStream('input-8.txt');
  const rl = readline.createInterface({ input: fileStream });

  const data = [];

  for await (const line of rl) {
    data.push(line);
  }

  const nodeList = {};

  const instructions = data[0];
  const nodes = data.slice(2).forEach((node) => {
    const element = node.substring(0, 3);
    const left = node.substring(7, 10);
    const right = node.substring(12, 15);

    nodeList[element] = { left, right };
  });

  return { instructions, nodeList };
}

const parseInstructions = (instructions, nodeList) => {
  let counter = 0;
  let steps = 0;
  let currentNode = 'AAA';
  while (currentNode !== 'ZZZ') {
    if (counter >= instructions.length) counter = 0;
    if (instructions[counter] === 'R') {
      currentNode = nodeList[currentNode].right;
    } else {
      currentNode = nodeList[currentNode].left;
    }
    counter++;
    steps++;
  }
  return steps;
};
