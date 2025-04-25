import React, { Component } from "react";
// Dynamically load transparent tile images
const transparentImages = require.context(
  "./images/transparent",
  false,
  /\.png$/
);

//import Canvas from "./canvas";

class Board extends Component {
  render() {
    return (
      <div>
        <div className="Board">
          <Scoring scores={this.props.scores} />
          <Tile
            setTile={this.props.setTile}
            enabled={this.props.specialTiles[0]}
            number="10"
          />
          <Tile
            setTile={this.props.setTile}
            enabled={this.props.specialTiles[1]}
            number="11"
          />
          <Tile
            setTile={this.props.setTile}
            enabled={this.props.specialTiles[2]}
            number="12"
          />
          <Tile
            setTile={this.props.setTile}
            enabled={this.props.specialTiles[3]}
            number="13"
          />
          <Tile
            setTile={this.props.setTile}
            enabled={this.props.specialTiles[4]}
            number="14"
          />
          <Tile
            setTile={this.props.setTile}
            enabled={this.props.specialTiles[5]}
            number="15"
          />

          {/* <Canvas /> */}
          <canvas />

          <Grid
            endPoints={this.props.endPoints}
            rotateTile={this.props.rotateTile}
            placeTile={this.props.placeTile}
            gridData={this.props.gridData}
            gridDataShadow={this.props.gridDataShadow}
          />
        </div>
      </div>
    );
  }
}

class Grid extends Component {
  render() {
    let gridData = this.props.gridData;
    let gridDataShadow = this.props.gridDataShadow;
    let endPoints = this.props.endPoints;

    return (
      <div className="Grid">
        <div className="gridDiv">
          {gridData.map((row, rowIndex) => {
            if (rowIndex < 1 || rowIndex > 7) {
              return null;
            }
            return (
              <div key={"divRow:" + rowIndex} className="gridRow">
                {row.map((tile, colIndex) => {
                  if (colIndex < 1 || colIndex > 7) {
                    return null;
                  }

                  if (tile === null) {
                    if (gridDataShadow[rowIndex][colIndex]) {
                      let shadowTile = gridDataShadow[rowIndex][colIndex];

                      let shadowRotation = shadowTile.rotation;
                      let shadowFlipped = shadowTile.flipped;
                      let transformString = shadowFlipped
                        ? "rotate(" + shadowRotation + "deg) scaleX(-1)"
                        : "rotate(" + shadowRotation + "deg)";
                      return (
                        <div
                          key={rowIndex + ":" + colIndex}
                          className={"gridCell validCell"}
                        >
                          <img
                            onClick={event => {
                              this.props.placeTile(rowIndex, colIndex);
                            }}
                            key={"img:" + rowIndex + ":" + colIndex}
                            alt={
                              "From Shadow x:" + rowIndex + ", y:" + colIndex
                            }
                            className={"imgBlank validCell"}
                            src={transparentImages(`./RRI-${shadowTile.tile}.png`)}
                            style={{
                              transform: transformString
                            }}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={rowIndex + ":" + colIndex}
                          className={"gridCell"}
                        />
                      );
                    }
                  } else {
                    let tileFlipped = tile.flipped;
                    let tileRotation = tile.rotation;
                    let transformString = tileFlipped
                      ? "rotate(" + tileRotation + "deg) scaleX(-1)"
                      : "rotate(" + tileRotation + "deg)";
                    let deadEnds = [];
                    if (
                      endPoints &&
                      endPoints[rowIndex][colIndex] &&
                      endPoints[rowIndex][colIndex].match
                    ) {
                      let match = endPoints[rowIndex][colIndex].match;

                      if (match.left === "dead-end") {
                        deadEnds.push(
                          <span
                            key={rowIndex + ":" + colIndex + ":left"}
                            className="left"
                          >
                            O
                          </span>
                        );
                      }
                      if (match.right === "dead-end") {
                        deadEnds.push(
                          <span
                            key={rowIndex + ":" + colIndex + ":right"}
                            className="right"
                          >
                            O
                          </span>
                        );
                      }
                      if (match.above === "dead-end") {
                        deadEnds.push(
                          <span
                            key={rowIndex + ":" + colIndex + ":above"}
                            className="above"
                          >
                            O
                          </span>
                        );
                      }
                      if (match.below === "dead-end") {
                        deadEnds.push(
                          <span
                            key={rowIndex + ":" + colIndex + ":below"}
                            className="below"
                          >
                            O
                          </span>
                        );
                      }
                    }

                    return (
                      <div
                        onClick={() =>
                          this.props.rotateTile(rowIndex, colIndex)
                        }
                        key={rowIndex + ":" + colIndex}
                        className={"gridCell"}
                      >
                        <span className="roundNumber">{tile.round}</span>
                        <img
                          alt={"x:" + rowIndex + ", y:" + colIndex}
                          key={"img:" + rowIndex + ":" + colIndex}
                          className="imgCell"
                          style={{
                            transform: transformString
                          }}
                          src={transparentImages(`./RRI-${tile.type}.png`)}
                        />
                        {deadEnds}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class Tile extends Component {
  render() {
    return (
      <div
        onClick={() => {
          this.props.setTile(this.props.number);
        }}
        className={
          "tile tile" +
          this.props.number +
          (this.props.enabled ? " enabled" : " disabled")
        }
      >
        {" "}
      </div>
    );
  }
}

class Scoring extends Component {
  render() {
    const scores = this.props.scores;
    return (
      <React.Fragment>
        <div className={"scoring connections"}>{scores.connections}</div>
        <div className={"scoring longestroad"}>{scores.road}</div>
        <div className={"scoring longestrail"}>{scores.rail}</div>
        <div className={"scoring middletile"}>{scores.middleTiles}</div>
        <div className={"scoring deadend"}>{scores.deadEnd}</div>
        <div className={"scoring expansions"}>{scores.expansions}</div>
        <div className={"scoring total"}>{scores.total}</div>
      </React.Fragment>
    );
  }
}

export default Board;
