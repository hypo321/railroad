import {
  findEndPoints,
  // longestRoad,
  // longestRail,
  longestPath,
  completePath
} from "./Board_utils";

import { connectingExits } from "./data/game_grid";

const scoreLookup = [0, 0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 45];

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

    // console.log(
    //   gridData.map((row, rowIndex) => {
    //     if (rowIndex === 0 || rowIndex === 8) {
    //       return 0;
    //     } else {
    //       return row.map((cell, colIndex) => {
    //         if (colIndex === 0 || colIndex === 8) {
    //           return 0;
    //         } else {
    //           // if (colIndex === 4 && rowIndex === 7) debugger;
    //           console.log(longestPath(gridData, rowIndex, colIndex));
    //           return traverse(
    //             longestPath(gridData, rowIndex, colIndex) &&
    //               longestPath(gridData, rowIndex, colIndex).path,
    //             0
    //           );
    //         }
    //       });
    //     }
    //   })
    // );
    // debugger;
    // let debug = completePath(gridData, 4, 7, "", 0, []);

    // console.log(debug);
    let exitPaths =
      gridData &&
      connectingExits
        .map(exit => {
          return traverseExits(
            completePath(gridData, exit.rowIndex, exit.colIndex, "", 0, []),
            []
          )
            .sort()
            .filter(function(item, pos, ary) {
              return !pos || item != ary[pos - 1];
            });
        })
        .filter(cell => cell.length > 1);
    //.reduce((acc, item) => acc + "," + item)
    //console.log(exitPaths);

    let cleanPaths = exitPaths.map(exit =>
      exit.reduce((acc, item) => acc + "," + item)
    );
    //console.log(cleanPaths);

    let noDupes = cleanPaths.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });

    let splitArray = noDupes.map(item => item.split(","));
    console.log(splitArray);

    scores.connections = edgeConnectionsScores(splitArray);

    // let debug = completePath(gridData, 1, 2, "", 0, []);
    // console.log({ debug });

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
                let lp = longestPath(gridData, rowIndex, colIndex);
                return traverse(lp && lp.path, 1);
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
                let lp = longestPath(
                  gridData,
                  rowIndex,
                  colIndex,
                  "",
                  0,
                  [],
                  "rail"
                );
                return traverse(lp && lp.path, 1);
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

const edgeConnectionsScores = array => {
  return array.reduce((acc, item) => acc + scoreLookup[item.length], 0);
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

const traverseExits = (obj, list) => {
  if (obj && typeof obj == "object") {
    Object.entries(obj).forEach(([key, value]) => {
      //debugger;
      if (typeof value === "object") {
        list = traverseExits(value, list);
      } else if (
        typeof value === "string" &&
        value.substring(0, 4) === "edge"
      ) {
        //console.log(value, value.substring(0, 3));
        list.push(value);
      }
    });
    return list;
  }
  return list;
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
