const tiles = [
  {
    exits: { north: "rail", east: "blank", south: "blank", west: "road" },
    bridge: false,
    special: false,
    edge: true
  },
  {
    exits: { north: "rail", east: "blank", south: "blank", west: "rail" },
    bridge: false,
    special: false,
    edge: false
  },
  {
    exits: { north: "rail", east: "rail", south: "blank", west: "rail" },
    bridge: false,
    special: false,
    edge: false
  },
  {
    exits: { north: "rail", east: "blank", south: "rail", west: "blank" },
    bridge: false,
    special: false,
    edge: false
  },
  {
    exits: { north: "road", east: "blank", south: "blank", west: "road" },
    bridge: false,
    special: false,
    edge: false
  },
  {
    exits: { north: "road", east: "road", south: "blank", west: "road" },
    bridge: false,
    special: false,
    edge: false
  },
  {
    exits: { north: "road", east: "blank", south: "road", west: "blank" },
    bridge: false,
    special: false,
    edge: false
  },
  {
    exits: { north: "road", east: "rail", south: "road", west: "rail" },
    bridge: true,
    special: false,
    edge: false
  },
  {
    exits: { north: "rail", east: "blank", south: "road", west: "blank" },
    bridge: false,
    special: false,
    edge: false
  },
  {
    exits: { north: "rail", east: "blank", south: "blank", west: "road" },
    bridge: false,
    special: false,
    edge: false
  },
  {
    exits: { north: "road", east: "road", south: "rail", west: "road" },
    bridge: false,
    special: true,
    edge: false
  },
  {
    exits: { north: "road", east: "rail", south: "rail", west: "rail" },
    bridge: false,
    special: true,
    edge: false
  },
  {
    exits: { north: "road", east: "road", south: "road", west: "road" },
    bridge: false,
    special: true,
    edge: false
  },
  {
    exits: { north: "rail", east: "rail", south: "rail", west: "rail" },
    bridge: false,
    special: true,
    edge: false
  },
  {
    exits: { north: "road", east: "rail", south: "rail", west: "road" },
    bridge: false,
    special: true,
    edge: false
  },
  {
    exits: { north: "road", east: "rail", south: "road", west: "rail" },
    bridge: false,
    special: true,
    edge: false
  },
  {
    exits: { north: "blank", east: "blank", south: "blank", west: "road" },
    bridge: false,
    special: true,
    edge: true
  },
  {
    exits: { north: "rail", east: "blank", south: "blank", west: "blank" },
    bridge: false,
    special: false,
    edge: true
  },
  {
    exits: { north: "edge", east: "edge", south: "edge", west: "edge" },
    bridge: false,
    special: false,
    edge: false
  }
];

const edge = (side, type) => {
  let r = 0;
  let tileType = 0;

  if (type === "rail") {
    r = 180;
    tileType = 17;
  } else if (type === "road") {
    r = -90;
    tileType = 16;
  } else if (type === "blank") {
    r = 0;
    tileType = 18;
  }

  if (side === "top") {
    r = r + 0;
  } else if (side === "right") {
    r = r + 90;
  } else if (side === "bottom") {
    r = r + 180;
  } else if (side === "left") {
    r = r + 270;
  }

  return { type: tileType, rotation: r, flipped: false };
};

const regularTile = (type, rotation, flipped) => {
  return { type, rotation, flipped };
};

export { tiles, edge, regularTile };
