import { edge, regularTile } from "../Tile_utils";

const fullGrid = [
  [
    null,
    {
      type: 18,
      rotation: 0,
      flipped: false
    },
    {
      type: 16,
      rotation: -90,
      flipped: false
    },
    {
      type: 18,
      rotation: 0,
      flipped: false
    },
    {
      type: 17,
      rotation: 180,
      flipped: false
    },
    {
      type: 18,
      rotation: 0,
      flipped: false
    },
    {
      type: 16,
      rotation: -90,
      flipped: false
    },
    {
      type: 18,
      rotation: 0,
      flipped: false
    },
    null
  ],
  [
    {
      type: 18,
      rotation: 270,
      flipped: false
    },
    {
      type: 4,
      rotation: 180,
      flipped: false
    },
    {
      type: 5,
      rotation: 180,
      flipped: false
    },
    {
      type: 5,
      rotation: 270,
      flipped: false,
      round: 1
    },
    null,
    null,
    null,
    null,
    {
      type: 18,
      rotation: 90,
      flipped: false
    }
  ],
  [
    {
      type: 17,
      rotation: 450,
      flipped: false
    },
    {
      type: 4,
      rotation: 90,
      flipped: false
    },
    {
      type: 4,
      rotation: 0,
      flipped: false
    },
    {
      type: 5,
      rotation: 270,
      flipped: false,
      round: 1
    },
    null,
    null,
    null,
    {
      type: 2,
      rotation: 180,
      flipped: false,
      round: 2
    },
    {
      type: 17,
      rotation: 270,
      flipped: false
    }
  ],
  [
    {
      type: 18,
      rotation: 270,
      flipped: false
    },
    null,
    null,
    {
      type: 7,
      rotation: 180,
      flipped: false,
      round: 1
    },
    {
      type: 2,
      rotation: 270,
      flipped: false,
      round: 1
    },
    null,
    null,
    {
      type: 3,
      rotation: 180,
      flipped: false,
      round: 5
    },
    {
      type: 18,
      rotation: 90,
      flipped: false
    }
  ],
  [
    {
      type: 16,
      rotation: 180,
      flipped: false
    },
    null,
    null,
    {
      type: 6,
      rotation: 180,
      flipped: false,
      round: 2
    },
    null,
    null,
    null,
    null,
    {
      type: 16,
      rotation: 0,
      flipped: false
    }
  ],
  [
    {
      type: 18,
      rotation: 270,
      flipped: false
    },
    null,
    {
      type: 4,
      rotation: 270,
      flipped: false,
      round: 3
    },
    {
      type: 12,
      rotation: 270,
      flipped: false,
      round: 3
    },
    {
      type: 4,
      rotation: 270,
      flipped: false,
      round: 3
    },
    {
      type: 5,
      rotation: 90,
      flipped: false,
      round: 5
    },
    null,
    null,
    {
      type: 18,
      rotation: 90,
      flipped: false
    }
  ],
  [
    {
      type: 17,
      rotation: 450,
      flipped: false
    },
    null,
    {
      type: 6,
      rotation: 180,
      flipped: false,
      round: 3
    },
    {
      type: 5,
      rotation: 90,
      flipped: false,
      round: 4
    },
    {
      type: 5,
      rotation: 0,
      flipped: false,
      round: 4
    },
    {
      type: 5,
      rotation: 270,
      flipped: false,
      round: 5
    },
    null,
    {
      type: 1,
      rotation: 180,
      flipped: false,
      round: 3
    },
    {
      type: 17,
      rotation: 270,
      flipped: false
    }
  ],
  [
    {
      type: 18,
      rotation: 270,
      flipped: false
    },
    null,
    {
      type: 6,
      rotation: 180,
      flipped: false,
      round: 2
    },
    {
      type: 4,
      rotation: 90,
      flipped: false,
      round: 4
    },
    {
      type: 7,
      rotation: 270,
      flipped: false,
      round: 2
    },
    null,
    null,
    {
      type: 2,
      rotation: 90,
      flipped: false,
      round: 4
    },
    {
      type: 18,
      rotation: 90,
      flipped: false
    }
  ],
  [
    null,
    {
      type: 18,
      rotation: 180,
      flipped: false
    },
    {
      type: 16,
      rotation: 90,
      flipped: false
    },
    {
      type: 18,
      rotation: 180,
      flipped: false
    },
    {
      type: 17,
      rotation: 360,
      flipped: false
    },
    {
      type: 18,
      rotation: 180,
      flipped: false
    },
    {
      type: 16,
      rotation: 90,
      flipped: false
    },
    {
      type: 18,
      rotation: 180,
      flipped: false
    },
    null
  ]
];

const testgridData = [
  [
    null,
    edge("top", "blank"),
    edge("top", "road"),
    edge("top", "blank"),
    edge("top", "rail"),
    edge("top", "blank"),
    edge("top", "road"),
    edge("top", "blank"),
    null
  ],
  [
    edge("left", "blank"),
    regularTile(4, 180, false),
    regularTile(5, 180, false),
    // null,
    // null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "blank")
  ],
  [
    edge("left", "rail"),
    regularTile(4, 90, false),
    regularTile(4, 0, false),
    // null,
    // null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "rail")
  ],
  [
    edge("left", "blank"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "blank")
  ],
  [
    edge("left", "road"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "road")
  ],
  [
    edge("left", "blank"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "blank")
  ],
  [
    edge("left", "rail"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "rail")
  ],
  [
    edge("left", "blank"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "blank")
  ],
  [
    null,
    edge("bottom", "blank"),
    edge("bottom", "road"),
    edge("bottom", "blank"),
    edge("bottom", "rail"),
    edge("bottom", "blank"),
    edge("bottom", "road"),
    edge("bottom", "blank"),
    null
  ]
];

const blankGrid = [
  [
    null,
    edge("top", "blank"),
    edge("top", "road"),
    edge("top", "blank"),
    edge("top", "rail"),
    edge("top", "blank"),
    edge("top", "road"),
    edge("top", "blank"),
    null
  ],
  [
    edge("left", "blank"),

    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "blank")
  ],
  [
    edge("left", "rail"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "rail")
  ],
  [
    edge("left", "blank"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "blank")
  ],
  [
    edge("left", "road"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "road")
  ],
  [
    edge("left", "blank"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "blank")
  ],
  [
    edge("left", "rail"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "rail")
  ],
  [
    edge("left", "blank"),
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    edge("right", "blank")
  ],
  [
    null,
    edge("bottom", "blank"),
    edge("bottom", "road"),
    edge("bottom", "blank"),
    edge("bottom", "rail"),
    edge("bottom", "blank"),
    edge("bottom", "road"),
    edge("bottom", "blank"),
    null
  ]
];

const gridPath = [
  [
    null,
    {
      type: 18,
      rotation: 0,
      flipped: false
    },
    {
      type: 16,
      rotation: -90,
      flipped: false
    },
    {
      type: 18,
      rotation: 0,
      flipped: false
    },
    {
      type: 17,
      rotation: 180,
      flipped: false
    },
    {
      type: 18,
      rotation: 0,
      flipped: false
    },
    {
      type: 16,
      rotation: -90,
      flipped: false
    },
    {
      type: 18,
      rotation: 0,
      flipped: false
    },
    null
  ],
  [
    {
      type: 18,
      rotation: 270,
      flipped: false
    },
    null,
    {
      type: 4,
      rotation: 90,
      flipped: false,
      round: 2
    },
    {
      type: 6,
      rotation: 270,
      flipped: false,
      round: 4
    },
    {
      type: 7,
      rotation: 270,
      flipped: false,
      round: 2
    },
    {
      type: 6,
      rotation: 270,
      flipped: false,
      round: 2
    },
    {
      type: 5,
      rotation: 0,
      flipped: false,
      round: 1
    },
    {
      type: 4,
      rotation: 270,
      flipped: false,
      round: 1
    },
    {
      type: 18,
      rotation: 90,
      flipped: false
    }
  ],
  [
    {
      type: 17,
      rotation: 450,
      flipped: false
    },
    {
      type: 3,
      rotation: 270,
      flipped: false,
      round: 5
    },
    {
      type: 1,
      rotation: 270,
      flipped: false,
      round: 5
    },
    null,
    {
      type: 3,
      rotation: 180,
      flipped: false,
      round: 2
    },
    null,
    {
      type: 1,
      rotation: 180,
      flipped: false,
      round: 1
    },
    {
      type: 15,
      rotation: 180,
      flipped: false,
      round: 1
    },
    {
      type: 17,
      rotation: 270,
      flipped: false
    }
  ],
  [
    {
      type: 18,
      rotation: 270,
      flipped: false
    },
    null,
    {
      type: 2,
      rotation: 0,
      flipped: false,
      round: 6
    },
    {
      type: 2,
      rotation: 270,
      flipped: false,
      round: 6
    },
    {
      type: 3,
      rotation: 180,
      flipped: false,
      round: 3
    },
    null,
    {
      type: 3,
      rotation: 180,
      flipped: false,
      round: 1
    },
    {
      type: 6,
      rotation: 180,
      flipped: false,
      round: 2
    },
    {
      type: 18,
      rotation: 90,
      flipped: false
    }
  ],
  [
    {
      type: 16,
      rotation: 180,
      flipped: false
    },
    {
      type: 4,
      rotation: 270,
      flipped: false,
      round: 3
    },
    null,
    {
      type: 3,
      rotation: 180,
      flipped: false,
      round: 7
    },
    {
      type: 3,
      rotation: 180,
      flipped: false,
      round: 3
    },
    null,
    {
      type: 9,
      rotation: 0,
      flipped: true,
      round: 1
    },
    {
      type: 5,
      rotation: 0,
      flipped: false,
      round: 1
    },
    {
      type: 16,
      rotation: 0,
      flipped: false
    }
  ],
  [
    {
      type: 18,
      rotation: 270,
      flipped: false
    },
    {
      type: 5,
      rotation: 90,
      flipped: false,
      round: 4
    },
    {
      type: "12",
      rotation: 270,
      flipped: false,
      round: 6
    },
    {
      type: 6,
      rotation: 270,
      flipped: false,
      round: 4
    },
    {
      type: 9,
      rotation: 0,
      flipped: false,
      round: 4
    },
    null,
    null,
    null,
    {
      type: 18,
      rotation: 90,
      flipped: false
    }
  ],
  [
    {
      type: 17,
      rotation: 450,
      flipped: false
    },
    {
      type: 9,
      rotation: 270,
      flipped: true,
      round: 3
    },
    {
      type: 4,
      rotation: 90,
      flipped: false,
      round: 6
    },
    {
      type: 8,
      rotation: 90,
      flipped: false,
      round: 6
    },
    null,
    null,
    {
      type: 1,
      rotation: 180,
      flipped: false,
      round: 1
    },
    {
      type: 3,
      rotation: 270,
      flipped: false,
      round: 2
    },
    {
      type: 17,
      rotation: 270,
      flipped: false
    }
  ],
  [
    {
      type: 18,
      rotation: 270,
      flipped: false
    },
    null,
    null,
    null,
    {
      type: 2,
      rotation: 90,
      flipped: false,
      round: 5
    },
    {
      type: 8,
      rotation: 270,
      flipped: false,
      round: 5
    },
    {
      type: "14",
      rotation: 270,
      flipped: false,
      round: 2
    },
    null,
    {
      type: 18,
      rotation: 90,
      flipped: false
    }
  ],
  [
    null,
    {
      type: 18,
      rotation: 180,
      flipped: false
    },
    {
      type: 16,
      rotation: 90,
      flipped: false
    },
    {
      type: 18,
      rotation: 180,
      flipped: false
    },
    {
      type: 17,
      rotation: 360,
      flipped: false
    },
    {
      type: 18,
      rotation: 180,
      flipped: false
    },
    {
      type: 16,
      rotation: 90,
      flipped: false
    },
    {
      type: 18,
      rotation: 180,
      flipped: false
    },
    null
  ]
];

// let gridData = fullGrid;
let gridData = blankGrid;
//let gridData = gridPath;

let connectingExits = gridData
  .map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      let x = colIndex === 0 ? 1 : colIndex === 8 ? 7 : colIndex;
      let y = rowIndex === 0 ? 1 : rowIndex === 8 ? 7 : rowIndex;
      return { colIndex: x, rowIndex: y, cell };
    })
  )
  .reduce((total, cell) => {
    return total.concat(cell);
  }, [])
  .filter(
    cell => cell.cell && (cell.cell.type === 17 || cell.cell.type === 16)
  );

export { gridData, connectingExits };
