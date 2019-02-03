import React, { Component } from "react";
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
            isValid={this.props.isValid}
            selectedTile={this.props.selectedTile}
          />
          {/* <img
            className="BoardBackground"
            src={"/images/RRI-board.png"}
            alt="board"
          /> */}
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

    // let tileRotate = 0;
    // let tileFlipped = false;
    // let testTile = this.props.selectedTile;
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
                      //console.log(shadowTile);
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
                              //console.log(shadowTile);
                              this.props.placeTile(rowIndex, colIndex);
                            }}
                            key={"img:" + rowIndex + ":" + colIndex}
                            alt={
                              "From Shadow x:" + rowIndex + ", y:" + colIndex
                            }
                            className={"imgBlank validCell"}
                            src={
                              "/images/transparent/RRI-" +
                              shadowTile.tile +
                              ".png"
                            }
                            style={{
                              transform: transformString
                            }}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          // onClick={() =>
                          //   this.props.rotateTile(rowIndex, colIndex)
                          // }
                          key={rowIndex + ":" + colIndex}
                          className={"gridCell"}
                        />
                      );
                    }
                  } else {
                    //console.log(gridData);
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
                          src={"/images/transparent/RRI-" + tile.type + ".png"}
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
  // dragMouseDown = e => {
  //   e = e || window.event;
  //   //console.log(e.target.offsetLeft);
  //   e.preventDefault();
  //   // get the mouse cursor position at startup:
  //   this.posX2 = e.clientX;
  //   this.posY2 = e.clientY;
  //   console.log(this.posX2, this.posY2);
  //   document.onmouseup = this.closeDragElement;
  //   // call a function whenever the cursor moves:
  //   document.onmousemove = this.elementDrag;
  // };

  // elementDrag = e => {
  //   e = e || window.event;

  //   e.preventDefault();
  //   // calculate the new cursor position:
  //   this.posX1 = this.posX2 - e.clientX;
  //   this.posY1 = this.posY2 - e.clientY;
  //   this.posX2 = e.clientX;
  //   this.posY2 = e.clientY;
  //   let newTop = e.target.offsetTop - this.posY1 + "px";
  //   let newLeft = e.target.offsetLeft - this.posX1 + "px";
  //   //set the element's new position:
  //   this.setState({
  //     pos: { left: newLeft, top: newTop }
  //   });
  // };

  // closeDragElement = () => {
  //   // stop moving when mouse button is released:
  //   document.onmouseup = null;
  //   document.onmousemove = null;
  // };

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
