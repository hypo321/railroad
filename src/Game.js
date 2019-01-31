import React, { Component } from "react";
import "./dice.scss";
import Board from "./Board";
import Dice from "./Dice";
import { updateScores, resetScores } from "./Score_utils";
import { regularTile } from "./Tile_utils";
import { gridData } from "./data/game_grid.js";
import { clearShadow, createShadow } from "./Shadow_utils";
import { isValid, findEndPoints } from "./Board_utils";
import { shake, diceMap, rollOne } from "./Dice_utils";

class Game extends Component {
  state = {
    round: 1,
    roundMsg: "Round 1",
    dice: [rollOne(), rollOne(), rollOne(), rollOne()],
    diceState: ["rolled", "rolled", "rolled", "rolled"],
    selectedTile: 18,
    gridData: gridData,
    gridDataShadow: clearShadow(),
    specialTiles: [true, true, true, true, true, true],
    scores: resetScores()
  };

  setGameState = stateObject => {
    this.setState(stateObject);
  };

  redoRound = () => {
    let diceState = this.state.diceState.map(d => "rolled");
    let gridData = this.state.gridData.map(row =>
      row.map(cell => {
        if (cell && cell.round) {
          if (cell.round === this.state.round) {
            return null;
          }
        }
        return cell;
      })
    );

    let gridDataShadow = clearShadow();
    this.setState({
      diceState,
      gridData,
      gridDataShadow
    });

    updateScores(gridData, this.setGameState);
  };

  placeTile = (rowIndex, colIndex) => {
    let gridData = this.state.gridData;
    let gridDataShadow = this.state.gridDataShadow;
    let shadowTile = gridDataShadow[rowIndex][colIndex];
    gridData[rowIndex][colIndex] = regularTile(
      shadowTile.tile,
      shadowTile.rotation,
      shadowTile.flipped
    );
    gridData[rowIndex][colIndex].round = this.state.round;
    let diceState = this.state.diceState.map(d =>
      d === "selected" ? "played" : d
    );
    gridDataShadow = clearShadow();

    let endPoints = findEndPoints(gridData);

    this.setState({
      gridData,
      selectedTile: 18,
      diceState,
      gridDataShadow,
      endPoints
    });

    updateScores(gridData, this.setGameState);
  };

  placeRotatedTile = (rowIndex, colIndex, rotation, flipped) => {
    let gridData = this.state.gridData;

    gridData[rowIndex][colIndex].rotation = rotation;
    gridData[rowIndex][colIndex].flipped = flipped;

    let endPoints = findEndPoints(gridData);
    // let deadEndScore = this.deadEndScore(endPoints);
    // let middleTileScore = this.checkMiddleTiles(gridData);

    this.setState({ gridData, endPoints });
    updateScores(gridData, this.setGameState);
  };

  rotateTile = (rowIndex, colIndex) => {
    let tile = this.state.gridData[rowIndex][colIndex];
    let rotation = Number(tile.rotation);
    let flipped = tile.flipped;
    let type = tile.type;

    let round = Number(tile.round);
    if (round !== Number(this.state.round)) {
      return;
    }
    if (type === 9) {
      rotation = (rotation + 90) % 360;
      if (
        isValid(colIndex, rowIndex, type, rotation, flipped, "yes", gridData)
          .isValid
      ) {
        this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
      } else {
        flipped = !flipped;
        if (
          isValid(colIndex, rowIndex, type, rotation, flipped, "yes", gridData)
            .isValid
        ) {
          this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
        } else {
          rotation = (rotation + 90) % 360;
          if (
            isValid(
              colIndex,
              rowIndex,
              type,
              rotation,
              flipped,
              "yes",
              gridData
            ).isValid
          ) {
            this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
          } else {
            flipped = !flipped;
            if (
              isValid(
                colIndex,
                rowIndex,
                type,
                rotation,
                flipped,
                "yes",
                gridData
              ).isValid
            ) {
              this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
            } else {
              rotation = (rotation + 90) % 360;
              if (
                isValid(
                  colIndex,
                  rowIndex,
                  type,
                  rotation,
                  flipped,
                  "yes",
                  gridData
                ).isValid
              ) {
                this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
              } else {
                flipped = !flipped;
                if (
                  isValid(
                    colIndex,
                    rowIndex,
                    type,
                    rotation,
                    flipped,
                    "yes",
                    gridData
                  ).isValid
                ) {
                  this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
                } else {
                  rotation = (rotation + 90) % 360;
                  if (
                    isValid(
                      colIndex,
                      rowIndex,
                      type,
                      rotation,
                      flipped,
                      "yes",
                      gridData
                    ).isValid
                  ) {
                    this.placeRotatedTile(
                      rowIndex,
                      colIndex,
                      rotation,
                      flipped
                    );
                  }
                }
              }
            }
          }
        }
      }
    } else {
      rotation = (rotation + 90) % 360;
      if (
        isValid(colIndex, rowIndex, type, rotation, flipped, "yes", gridData)
          .isValid
      ) {
        this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
      } else {
        rotation = (rotation + 90) % 360;
        if (
          isValid(colIndex, rowIndex, type, rotation, flipped, "yes", gridData)
            .isValid
        ) {
          this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
        } else {
          rotation = (rotation + 90) % 360;
          if (
            isValid(
              colIndex,
              rowIndex,
              type,
              rotation,
              flipped,
              "yes",
              gridData
            ).isValid
          ) {
            this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
          } else {
            rotation = (rotation + 90) % 360;
            if (
              isValid(
                colIndex,
                rowIndex,
                type,
                rotation,
                flipped,
                "yes",
                gridData
              ).isValid
            ) {
              this.placeRotatedTile(rowIndex, colIndex, rotation, flipped);
            }
          }
        }
      }
    }
  };

  changeTile = selectedTile => {
    let specialTiles = this.state.specialTiles;
    if (specialTiles[selectedTile - 10]) {
      specialTiles[selectedTile - 10] = false;
      const gridDataShadow = createShadow(selectedTile, this.state.gridData);
      console.log(gridDataShadow);
      this.setState({
        selectedTile,
        gridDataShadow,
        specialTiles
      });
    }
  };

  clickDice = die => {
    if (this.state.dice[die] === 0) {
      return;
    }
    if (this.state.diceState[die] === "played") {
      return;
    }
    let selectedTile = diceMap[die][this.state.dice[die] - 1];
    let diceState = this.state.diceState.map(d =>
      d === "selected" ? "rolled" : d
    );

    diceState[die] = "selected";
    //console.log("Grid", this.state.gridData);
    const gridDataShadow = createShadow(selectedTile, this.state.gridData);
    //console.log(gridDataShadow);
    this.setState({
      selectedTile,
      diceState,
      gridDataShadow
    });
  };

  allPlayed = () => {
    //debugger;
    let diceFilter = this.state.diceState.filter(d => d === "played");
    if (diceFilter.length === this.state.diceState.length) {
      return true;
    }
    return false;
  };

  nonePlayed = () => {
    //debugger;
    let diceFilter = this.state.diceState.filter(d => d === "played");
    if (diceFilter.length === 0) {
      return true;
    }
    return false;
  };

  //   directionMap = {
  //     north: "above",
  //     east: "right",
  //     south: "below",
  //     west: "left"
  //   };

  render() {
    return (
      <div className="Game">
        <div className="Board">
          <Board
            endPoints={this.state.endPoints}
            scores={this.state.scores}
            rotateTile={this.rotateTile}
            placeTile={this.placeTile}
            setTile={this.changeTile}
            gridData={this.state.gridData}
            gridDataShadow={this.state.gridDataShadow}
            isValid={isValid}
            selectedTile={this.state.selectedTile}
            specialTiles={this.state.specialTiles}
          />
        </div>
        <div className="DiceTray">
          <h1>{this.state.roundMsg}</h1>
          <div className="controlButtons">
            {!this.nonePlayed() ? (
              <button className="btn" onClick={this.redoRound}>
                {"<< Redo round"}
              </button>
            ) : null}
            <br />
            {this.state.round < 7 && this.allPlayed() ? (
              <button
                className="btnNext"
                onClick={() => shake(this.state.round, this.setGameState)}
              >
                {"Start Round " + (this.state.round + 1) + " >>"}
              </button>
            ) : null}
          </div>
          <Dice
            enabled={this.state.diceState[0]}
            clickDice={() => this.clickDice(0)}
            type="dice"
            face={"side" + this.state.dice[0]}
          />
          <Dice
            enabled={this.state.diceState[1]}
            clickDice={() => this.clickDice(1)}
            type="dice"
            face={"side" + this.state.dice[1]}
          />

          <br />
          <Dice
            enabled={this.state.diceState[2]}
            clickDice={() => this.clickDice(2)}
            type="dice"
            face={"side" + this.state.dice[2]}
          />
          <Dice
            enabled={this.state.diceState[3]}
            clickDice={() => this.clickDice(3)}
            type="dice2"
            face={"side" + this.state.dice[3]}
          />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default Game;
