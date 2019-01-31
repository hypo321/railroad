const diceMap = [
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 7, 8, 9]
];

const roll = setState => {
  const dice = [rollOne(), rollOne(), rollOne(), rollOne()];

  //return dice;
  setState({ dice });
};

const shake = (currentRound, setState) => {
  const dice = [0, 0, 0, 0];
  const diceState = ["rolled", "rolled", "rolled", "rolled"];
  let round = Number(currentRound) + 1;
  let roundMsg = "Round " + round;
  if (round > 6) {
    roundMsg = "Last round!";
  }
  setTimeout(() => {
    roll(setState);
  }, 1000);
  setState({
    dice,
    selectedTile: 18,
    diceState,
    round: round,
    roundMsg
  });
};

const rollOne = () => {
  return Math.floor(Math.random() * 6) + 1;
};

export { diceMap, roll, shake, rollOne };
