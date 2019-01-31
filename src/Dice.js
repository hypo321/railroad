import React, { Component } from "react";

class Dice extends Component {
  render() {
    return (
      <div
        onClick={this.props.clickDice}
        className={
          this.props.type + " " + this.props.face + " " + this.props.enabled
        }
      >
        <div className={"front " + this.props.enabled} />
        <div className={"back " + this.props.enabled} />
        <div className={"right " + this.props.enabled} />
        <div className={"left " + this.props.enabled} />
        <div className={"top " + this.props.enabled} />
        <div className={"bottom " + this.props.enabled} />
      </div>
    );
  }
}

export default Dice;
