import { tiles } from "./Tile_utils";

const isValid = (x, y, type, rotation, flipped, test, gridData) => {
  //debugger;
  if (!isBlank(gridData, x, y) && test !== "yes") {
    return false;
  }

  let above = exitAbove(y, x, gridData);
  let below = exitBelow(y, x, gridData);
  let left = exitLeft(y, x, gridData);
  let right = exitRight(y, x, gridData);

  let match = {};

  let selected = tiles[type];

  match.found = false;
  match.clash = false;

  // test above
  match.above = matchExits(
    selected.exits[rotatedDirection("north", rotation, flipped)],
    above
  );
  match.found =
    match.above &&
    match.above !== "blank" &&
    match.above !== "edge" &&
    match.above !== "clash"
      ? true
      : match.found;
  match.clash = match.above === "clash" ? true : match.clash;

  // test below
  match.below = matchExits(
    selected.exits[rotatedDirection("south", rotation, flipped)],
    below
  );
  match.found =
    match.below &&
    match.below !== "blank" &&
    match.below !== "edge" &&
    match.below !== "clash"
      ? true
      : match.found;
  match.clash = match.below === "clash" ? true : match.clash;

  // test right
  match.right = matchExits(
    selected.exits[rotatedDirection("east", rotation, flipped)],
    right
  );
  match.found =
    match.right &&
    match.right !== "blank" &&
    match.right !== "edge" &&
    match.right !== "clash"
      ? true
      : match.found;
  match.clash = match.right === "clash" ? true : match.clash;

  // test left
  match.left = matchExits(
    selected.exits[rotatedDirection("west", rotation, flipped)],
    left
  );
  match.found =
    match.left &&
    match.left !== "blank" &&
    match.left !== "edge" &&
    match.left !== "clash"
      ? true
      : match.found;
  match.clash = match.left === "clash" ? true : match.clash;

  //console.log(x, y, rotation, flipped, match);

  if (match.clash && match.found) {
    return { isValid: false, match };
  }

  if (
    (selected.exits[rotatedDirection("north", rotation, flipped)] === "rail" &&
      above === "rail") ||
    (selected.exits[rotatedDirection("north", rotation, flipped)] === "road" &&
      above === "road")
  ) {
    return { isValid: true, match };
  }
  if (
    (selected.exits[rotatedDirection("south", rotation, flipped)] === "rail" &&
      below === "rail") ||
    (selected.exits[rotatedDirection("south", rotation, flipped)] === "road" &&
      below === "road")
  ) {
    return { isValid: true, match };
  }
  if (
    (selected.exits[rotatedDirection("east", rotation, flipped)] === "rail" &&
      right === "rail") ||
    (selected.exits[rotatedDirection("east", rotation, flipped)] === "road" &&
      right === "road")
  ) {
    return { isValid: true, match };
  }
  if (
    (selected.exits[rotatedDirection("west", rotation, flipped)] === "rail" &&
      left === "rail") ||
    (selected.exits[rotatedDirection("west", rotation, flipped)] === "road" &&
      left === "road")
  ) {
    return { isValid: true, match };
  }

  return { isValid: false, match };
};

const isBlank = (gridData, x, y) => {
  return gridData[y][x] === null ? true : false;
};

const rotatedDirection = (direction, rotation, flipped) => {
  let points = ["north", "east", "south", "west"];
  if (flipped) {
    points = ["north", "west", "south", "east"];
  }

  //debugger;
  rotation = (rotation % 360) / 90;
  // if (rotation === 0) {
  //   return direction;
  // }
  let dirNum = 0;
  if (direction === "north") {
    dirNum = 0;
  }
  if (direction === "east") {
    dirNum = 1;
  }
  if (direction === "south") {
    dirNum = 2;
  }
  if (direction === "west") {
    dirNum = 3;
  }

  let dirIndex = (4 + dirNum - rotation) % 4;

  return points[dirIndex];
};

const exitAbove = (y, x, gridData) => {
  let target = {};
  if (y > 0 && y < 8 && x > 0 && x < 8 && gridData[y - 1][x]) {
    target.exits = tiles[gridData[y - 1][x].type].exits;
    target.rotation = gridData[y - 1][x].rotation;
    target.flipped = gridData[y - 1][x].flipped;
    return target.exits[
      rotatedDirection("south", target.rotation, target.flipped)
    ];
  }
  return null;
};

const exitLeft = (y, x, gridData) => {
  let target = {};
  if (y > 0 && y < 8 && x > 0 && x < 8 && gridData[y][x - 1]) {
    target.exits = tiles[gridData[y][x - 1].type].exits;
    target.rotation = gridData[y][x - 1].rotation;
    target.flipped = gridData[y][x - 1].flipped;
    return target.exits[
      rotatedDirection("east", target.rotation, target.flipped)
    ];
  }
  return null;
};
const exitBelow = (y, x, gridData) => {
  let target = {};
  if (y > 0 && y < 8 && x > 0 && x < 8 && gridData[y + 1][x]) {
    target.exits = tiles[gridData[y + 1][x].type].exits;
    target.rotation = gridData[y + 1][x].rotation;
    target.flipped = gridData[y + 1][x].flipped;
    return target.exits[
      rotatedDirection("north", target.rotation, target.flipped)
    ];
  }
  return null;
};
const exitRight = (y, x, gridData) => {
  let target = {};
  if (y > 0 && y < 8 && x > 0 && x < 8 && gridData[y][x + 1]) {
    target.exits = tiles[gridData[y][x + 1].type].exits;
    target.rotation = gridData[y][x + 1].rotation;
    target.flipped = gridData[y][x + 1].flipped;
    return target.exits[
      rotatedDirection("west", target.rotation, target.flipped)
    ];
  }
  return null;
};

const exitFromTile = (tile, direction) => {
  return tiles[tile.type].exits[
    rotatedDirection(direction, tile.rotation, tile.flipped)
  ];
};

const checkExits = (selectedExit, target) => {
  //debugger;

  if (selectedExit === target || target === "edge") {
    return "valid";
  }
  if (
    (!target || target === "blank") &&
    (selectedExit === "road" || selectedExit === "rail")
  ) {
    return "dead-end";
  }

  return null;
};

const findEndPoints = gridData => {
  const endPoints = gridData.map((row, rowIndex) => {
    if (rowIndex < 1 || rowIndex > 7) {
      return null;
    }
    return row.map((tile, colIndex) => {
      if (colIndex < 1 || colIndex > 7) {
        return null;
      }

      if (tile === null) {
        return null;
      } else {
        let y = rowIndex,
          x = colIndex,
          { rotation, flipped, type } = tile;
        let above = exitAbove(y, x, gridData);
        let below = exitBelow(y, x, gridData);
        let left = exitLeft(y, x, gridData);
        let right = exitRight(y, x, gridData);

        let match = {};

        let selected = tiles[type];

        //   match.found = false;
        //   match.clash = false;

        match.above = checkExits(
          selected.exits[rotatedDirection("north", rotation, flipped)],
          above
        );
        match.below = checkExits(
          selected.exits[rotatedDirection("south", rotation, flipped)],
          below
        );
        match.right = checkExits(
          selected.exits[rotatedDirection("east", rotation, flipped)],
          right
        );

        match.left = checkExits(
          selected.exits[rotatedDirection("west", rotation, flipped)],
          left
        );

        return { match };
      }
    });
  });

  return endPoints;
};

const longestPath = (
  gridData,
  rowIndex,
  colIndex,
  source = "",
  depth = 0,
  list = [],
  type = "road"
) => {
  depth++;
  let path = { x: colIndex, y: rowIndex, depth };
  let tile = gridData[rowIndex][colIndex];
  if (list && list.length > 0)
    console.log({
      length: list.length,
      list: list.map(thing => {
        return {
          x: thing.x,
          y: thing.y,
          depth: thing.depth,
          source: thing.source
        };
      })
    });

  if (!tile) {
    //  console.log(rowIndex + ":" + colIndex, "No tile found");
    return { path: null, list: list };
  }

  if (rowIndex < 1 || rowIndex > 7 || colIndex < 1 || colIndex > 7) {
    path.end = "edge-connection";
    //   console.log(rowIndex + ":" + colIndex, "Found edge connection");
    return { path: null, list: list };
  }

  if (
    list.filter(cell => cell.x === colIndex && cell.y === rowIndex).length > 0
  ) {
    // console.log(rowIndex + ":" + colIndex, "Found previously visited tile");
    return { path: null, list: list };
  }

  let exits = isValid(
    colIndex,
    rowIndex,
    tile.type,
    tile.rotation,
    tile.flipped,
    "yes",
    gridData
  );

  if (!exits) {
    return { path: null, list: list };
  }

  list.push({ x: colIndex, y: rowIndex, depth, source });

  list.length = depth;

  if (depth === 1) {
    let endpoints = 0;
    if (exitFromTile(tile, "north") === type) {
      if (exits.match.above === type && rowIndex === 1) {
        //  console.log("Found connection north:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.above !== exitFromTile(tile, "north")) {
        //  console.log("Found end north:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }

    if (exitFromTile(tile, "east") === type) {
      if (exits.match.right === type && colIndex === 7) {
        //  console.log("Found connection east:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.right !== exitFromTile(tile, "east")) {
        //  console.log("Found end east:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }

    if (exitFromTile(tile, "south") === type) {
      if (exits.match.below === type && rowIndex === 7) {
        //  console.log("Found connection south:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.below !== exitFromTile(tile, "south")) {
        //  console.log("Found end south:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }
    if (exitFromTile(tile, "west") === type) {
      if (exits.match.left === type && colIndex === 1) {
        //  console.log("Found connection west:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.left !== exitFromTile(tile, "west")) {
        // console.log("Found end west:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }
    if (endpoints === 0) {
      if (tile.type !== 8 && tile.type !== 9 && tile.type !== 11) {
        //console.log("Not an endpoint", colIndex, rowIndex, tile);
        return null;
      }
    }
  }
  let lp = null;
  //debugger;
  if (exits.match.above === type && exitFromTile(tile, "north") === type) {
    if (source !== "above" && rowIndex > 1) {
      //  console.log("found above");
      // if (rowIndex === 0) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-below" });
      //   return path;
      // }
      //path.push({ x: colIndex, y: rowIndex, direction: "below" });

      lp = longestPath(
        gridData,
        rowIndex - 1,
        colIndex,
        "below",
        depth,
        list,
        type
      );

      path.above = lp.path;
      list = lp.list;
    }
  }
  list.length = depth;
  if (exits.match.right === type && exitFromTile(tile, "east") === type) {
    if (source !== "right" && colIndex < 7) {
      // console.log("found right");
      // if (colIndex === 7) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-left" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "left" });
      lp = longestPath(
        gridData,
        rowIndex,
        colIndex + 1,
        "left",
        depth,
        list,
        type
      );

      path.right = lp.path;
      list = lp.list;
    }
  }
  list.length = depth;
  if (exits.match.below === type && exitFromTile(tile, "south") === type) {
    if (source !== "below" && rowIndex < 7) {
      //  console.log("found below");
      // if (rowIndex === 7) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-above" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "above" });
      lp = longestPath(
        gridData,
        rowIndex + 1,
        colIndex,
        "above",
        depth,
        list,
        type
      );

      path.below = lp.path;
      list = lp.list;
    }
  }
  list.length = depth;
  if (exits.match.left === type && exitFromTile(tile, "west") === type) {
    if (source !== "left" && colIndex > 1) {
      //  console.log("found left");
      // if (colIndex === 0) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-right" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "right" });
      lp = longestPath(
        gridData,
        rowIndex,
        colIndex - 1,
        "right",
        depth,
        list,
        type
      );
      path.left = lp.path;
      list = lp.list;
    }
  }
  list.length = depth;
  //path.push({ x: colIndex, y: rowIndex, direction: "end" });
  return { path, list };
};

const longestRoad = (gridData, rowIndex, colIndex, source, depth, list) => {
  depth++;

  let path = { x: colIndex, y: rowIndex, depth, source };
  let tile = gridData[rowIndex][colIndex];

  // if (list && list.length > 0)
  //   console.log({
  //     length: list.length,
  //     list: list.map(thing => {
  //       return {
  //         x: thing.x,
  //         y: thing.y,
  //         depth: thing.depth,
  //         source: thing.source
  //       };
  //     })
  //   });

  if (!tile) {
    return { path: null, list };
  }
  if (rowIndex < 1 || rowIndex > 7 || colIndex < 1 || colIndex > 7) {
    path.end = "edge-connection";
    return { path: null, list };
  }

  if (
    list.filter(cell => cell.x === colIndex && cell.y === rowIndex).length > 0
  ) {
    return { path: null, list };
  }

  list.push({ x: colIndex, y: rowIndex });

  let exits = isValid(
    colIndex,
    rowIndex,
    tile.type,
    tile.rotation,
    tile.flipped,
    "yes",
    gridData
  );

  if (!exits) {
    return path;
  }

  // check for end node
  if (depth === 1) {
    let endpoints = 0;
    if (exitFromTile(tile, "north") === "road") {
      if (exits.match.above === "road" && rowIndex === 1) {
        //  console.log("Found connection north:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.above !== exitFromTile(tile, "north")) {
        //  console.log("Found end north:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }

    if (exitFromTile(tile, "east") === "road") {
      if (exits.match.right === "road" && colIndex === 7) {
        //  console.log("Found connection east:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.right !== exitFromTile(tile, "east")) {
        //  console.log("Found end east:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }

    if (exitFromTile(tile, "south") === "road") {
      if (exits.match.below === "road" && rowIndex === 7) {
        //  console.log("Found connection south:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.below !== exitFromTile(tile, "south")) {
        //  console.log("Found end south:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }
    if (exitFromTile(tile, "west") === "road") {
      if (exits.match.left === "road" && colIndex === 1) {
        //  console.log("Found connection west:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.left !== exitFromTile(tile, "west")) {
        // console.log("Found end west:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }
    if (endpoints === 0) {
      if (tile.type !== 8 && tile.type !== 9 && tile.type !== 11) {
        //console.log("Not an endpoint", colIndex, rowIndex, tile);
        return null;
      }
    }
  }

  //debugger;
  if (exits.match.above === "road" && exitFromTile(tile, "north") === "road") {
    if (source !== "above" && rowIndex > 1) {
      //  console.log("found above");
      // if (rowIndex === 0) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-below" });
      //   return path;
      // }
      //path.push({ x: colIndex, y: rowIndex, direction: "below" });
      path.above = longestRoad(
        gridData,
        rowIndex - 1,
        colIndex,
        "below",
        depth,
        list
      ).path;
    }
  }
  if (exits.match.right === "road" && exitFromTile(tile, "east") === "road") {
    if (source !== "right" && colIndex < 7) {
      // console.log("found right");
      // if (colIndex === 7) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-left" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "left" });
      path.right = longestRoad(
        gridData,
        rowIndex,
        colIndex + 1,
        "left",
        depth,
        list
      ).path;
    }
  }
  if (exits.match.below === "road" && exitFromTile(tile, "south") === "road") {
    if (source !== "below" && rowIndex < 7) {
      //  console.log("found below");
      // if (rowIndex === 7) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-above" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "above" });
      path.below = longestRoad(
        gridData,
        rowIndex + 1,
        colIndex,
        "above",
        depth,
        list
      ).path;
    }
  }
  if (exits.match.left === "road" && exitFromTile(tile, "west") === "road") {
    if (source !== "left" && colIndex > 1) {
      //  console.log("found left");
      // if (colIndex === 0) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-right" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "right" });
      path.left = longestRoad(
        gridData,
        rowIndex,
        colIndex - 1,
        "right",
        depth,
        list
      ).path;
    }
  }
  //path.push({ x: colIndex, y: rowIndex, direction: "end" });
  return { path, list };
};

const longestRail = (gridData, rowIndex, colIndex, source, depth) => {
  depth++;
  let path = { x: colIndex, y: rowIndex, depth };
  let tile = gridData[rowIndex][colIndex];

  // console.log({ tile }, { path });
  //debugger;
  if (!tile) {
    return null;
  }
  if (rowIndex < 1 || rowIndex > 7 || colIndex < 1 || colIndex > 7) {
    path.end = "edge-connection";
    return path;
  }

  let exits = isValid(
    colIndex,
    rowIndex,
    tile.type,
    tile.rotation,
    tile.flipped,
    "yes",
    gridData
  );

  if (!exits) {
    return path;
  }

  // check for end node
  if (depth === 1) {
    let endpoints = 0;
    if (exitFromTile(tile, "north") === "rail") {
      if (exits.match.above === "rail" && rowIndex === 1) {
        //  console.log("Found connection north:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.above !== exitFromTile(tile, "north")) {
        //  console.log("Found end north:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }

    if (exitFromTile(tile, "east") === "rail") {
      if (exits.match.right === "rail" && colIndex === 7) {
        //  console.log("Found connection east:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.right !== exitFromTile(tile, "east")) {
        //  console.log("Found end east:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }

    if (exitFromTile(tile, "south") === "rail") {
      if (exits.match.below === "rail" && rowIndex === 7) {
        //  console.log("Found connection south:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.below !== exitFromTile(tile, "south")) {
        //  console.log("Found end south:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }
    if (exitFromTile(tile, "west") === "rail") {
      if (exits.match.left === "rail" && colIndex === 1) {
        // console.log("Found connection west:", colIndex, rowIndex, tile);
        endpoints++;
      } else if (exits.match.left !== exitFromTile(tile, "west")) {
        // console.log("Found end west:", colIndex, rowIndex, tile);
        endpoints++;
      }
    }
    if (endpoints === 0) {
      if (tile.type !== 8 && tile.type !== 9 && tile.type !== 11) {
        //console.log("Not an endpoint", colIndex, rowIndex, tile);
        return null;
      }
    }
  }

  //debugger;
  if (exits.match.above === "rail" && exitFromTile(tile, "north") === "rail") {
    if (source !== "above" && rowIndex > 1) {
      //  console.log("found above");
      // if (rowIndex === 0) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-below" });
      //   return path;
      // }
      //path.push({ x: colIndex, y: rowIndex, direction: "below" });
      path.above = longestRail(
        gridData,
        rowIndex - 1,
        colIndex,
        "below",
        depth
      );
    }
  }
  if (exits.match.right === "rail" && exitFromTile(tile, "east") === "rail") {
    if (source !== "right" && colIndex < 7) {
      // console.log("found right");
      // if (colIndex === 7) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-left" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "left" });
      path.right = longestRail(gridData, rowIndex, colIndex + 1, "left", depth);
    }
  }
  if (exits.match.below === "rail" && exitFromTile(tile, "south") === "rail") {
    if (source !== "below" && rowIndex < 7) {
      //  console.log("found below");
      // if (rowIndex === 7) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-above" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "above" });
      path.below = longestRail(
        gridData,
        rowIndex + 1,
        colIndex,
        "above",
        depth
      );
    }
  }
  if (exits.match.left === "rail" && exitFromTile(tile, "west") === "rail") {
    if (source !== "left" && colIndex > 1) {
      //  console.log("found left");
      // if (colIndex === 0) {
      //   path.push({ x: colIndex, y: rowIndex, direction: "edge-right" });
      //   return path;
      // }
      // path.push({ x: colIndex, y: rowIndex, direction: "right" });
      path.left = longestRail(gridData, rowIndex, colIndex - 1, "right", depth);
    }
  }
  //path.push({ x: colIndex, y: rowIndex, direction: "end" });
  return path;
};

const matchExits = (selectedExit, target) => {
  //debugger;
  if (!target || !selectedExit) {
    return null;
  }
  if (
    selectedExit === target ||
    target === "blank" ||
    selectedExit === "blank" ||
    selectedExit === "edge" ||
    target === "edge"
  ) {
    return target;
  } else if (selectedExit !== target) {
    return "clash";
  }
  return null;
};

export {
  isValid,
  isBlank,
  exitAbove,
  exitBelow,
  exitLeft,
  exitRight,
  exitFromTile,
  checkExits,
  findEndPoints,
  longestRoad,
  longestRail,
  longestPath
};
