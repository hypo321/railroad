import { edge, regularTile } from "../Tile_utils";

const gridData = [
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

export { gridData };
