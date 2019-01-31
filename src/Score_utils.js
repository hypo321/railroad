import { findEndPoints, longestRoad, longestRail } from "./Board_utils";

const checkMiddleTiles = gridData => {
  let filteredRows = gridData.filter(
    (row, rowIndex) => row && rowIndex > 2 && rowIndex < 6
  );

  let cells = filteredRows.map(row =>
    row.filter((cell, colIndex) =>
      cell && colIndex > 2 && colIndex < 6 ? 1 : 0
    )
  );

  let middleTileCount = cells[0].length + cells[1].length + cells[2].length;

  return middleTileCount;
};

const deadEndScore = endPoints => {
  let deadEnds = 0;
  if (endPoints) {
    const flattened = endPoints.reduce((total, amount) => {
      return total.concat(amount);
    }, []);
    const filtered = flattened.filter(cell => cell);

    const reduced = filtered.reduce((acc, cell) => {
      let ends = 0;
      for (const key in cell.match) {
        let value = cell.match[key];
        //optional check for properties from prototype chain
        if (value && value === "dead-end") {
          ends++;
        }
      }

      return ends + acc;
    }, 0);

    deadEnds = 0 - reduced;
  }
  return deadEnds;
};

const updateScores = (gridData, setState) => {
  if (gridData) {
    let scores = {};
    let endPoints = findEndPoints(gridData);
    scores.connections = 0;
    scores.road = 0;
    scores.rail = 0;
    scores.deadEnd = deadEndScore(endPoints);
    scores.middleTiles = checkMiddleTiles(gridData);
    scores.expansions = 0;

    console.log(
      gridData.map((row, rowIndex) => {
        if (rowIndex === 0 || rowIndex === 8) {
          return 0;
        } else {
          return row.map((cell, colIndex) => {
            if (colIndex === 0 || colIndex === 8) {
              return 0;
            } else {
              console.log(
                longestRoad(gridData, rowIndex, colIndex, "", 0, []) &&
                  longestRoad(gridData, rowIndex, colIndex, "", 0, []).list
              );
              return traverse(
                longestRoad(gridData, rowIndex, colIndex, "", 0, []) &&
                  longestRoad(gridData, rowIndex, colIndex, "", 0, []).path,
                0
              );
            }
          });
        }
      })
    );
    //debugger;
    let debug = longestRoad(gridData, 1, 3, "", 0, []);

    scores.road = gridData
      .map((row, rowIndex) => {
        if (rowIndex === 0 || rowIndex === 8) {
          return 0;
        } else {
          return row
            .map((cell, colIndex) => {
              if (colIndex === 0 || colIndex === 8) {
                return 0;
              } else {
                return traverse(
                  longestRoad(gridData, rowIndex, colIndex, "", 0, []) &&
                    longestRoad(gridData, rowIndex, colIndex, "", 0, []).path,
                  1
                );
              }
            })
            .reduce((acc, item) => Math.max(acc, item), 0);
        }
      })
      .reduce((acc, item) => Math.max(acc, item), 0);

    scores.rail = gridData
      .map((row, rowIndex) => {
        if (rowIndex === 0 || rowIndex === 8) {
          return 0;
        } else {
          return row
            .map((cell, colIndex) => {
              if (colIndex === 0 || colIndex === 8) {
                return 0;
              } else {
                return traverse(
                  longestRail(gridData, rowIndex, colIndex, "", 0),
                  1
                );
              }
            })
            .reduce((acc, item) => Math.max(acc, item), 0);
        }
      })
      .reduce((acc, item) => Math.max(acc, item), 0);

    scores.total = Object.keys(scores).reduce(function(previous, key) {
      return previous + scores[key];
    }, 0);

    setState({ scores, endPoints });
  } else {
    console.log("No grid data");
  }
};

const traverse = (obj, longest) => {
  let depth = 0;
  if (obj && typeof obj == "object") {
    Object.entries(obj).forEach(([key, value]) => {
      //debugger;
      if (typeof value === "object") {
        longest = Math.max(traverse(value, longest), longest);
      } else if (key === "depth") depth = value;
    });
    return Math.max(longest, depth);
  }
  return 0;
};

const resetScores = () => {
  let scores = {};

  scores.connections = 0;
  scores.road = 0;
  scores.rail = 0;
  scores.deadEnd = 0;
  scores.middleTiles = 0;
  scores.expansions = 0;

  scores.total = 0;

  return scores;

  //console.log(scores);
};

export { checkMiddleTiles, deadEndScore, updateScores, resetScores };
