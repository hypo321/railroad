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

let gridData = fullGrid;

export { gridData };
