import React, { Component } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.endPaintEvent = this.endPaintEvent.bind(this);
  }

  isPainting = false;
  // Different stroke styles to be used for user and guest
  userStrokeStyle = "#000";
  guestStrokeStyle = "#F0C987";
  //   line = [];

  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown(e) {
    const { nativeEvent } = e;
    const { offsetX, offsetY } = nativeEvent;
    if (offsetY > 170) {
      this.isPainting = true;
      this.prevPos = { offsetX, offsetY };
    }
    e.preventDefault();
  }

  onMouseMove(e) {
    e.preventDefault();
    const { nativeEvent } = e;
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      if (offsetY > 170) {
        const offSetData = { offsetX, offsetY };
        // Set the start and stop position of the paint event.
        //   const positionData = {
        //     start: { ...this.prevPos },
        //     stop: { ...offSetData }
        //   };
        //   // Add the position to the line array
        //   this.line = this.line.concat(positionData);
        this.paint(this.prevPos, offSetData, this.userStrokeStyle);
      } else {
        this.endPaintEvent(e);
      }
    }
  }

  onTouchStart(e) {
    e.preventDefault();
    if (e.touches) {
      if (e.touches.length === 1) {
        // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        const offsetX = touch.pageX - touch.target.offsetLeft;
        const offsetY = touch.pageY - touch.target.offsetTop;
        if (offsetY > 170) {
          this.isPainting = true;
          this.prevPos = { offsetX, offsetY };
        }
      }
    }
  }

  onTouchMove(e) {
    if (e.touches && this.isPainting) {
      if (e.touches.length === 1) {
        // Only deal with one finger
        var touch = e.touches[0]; // Get the information for finger #1
        const offsetX = touch.pageX - touch.target.offsetLeft;
        const offsetY = touch.pageY - touch.target.offsetTop;
        if (offsetY > 170) {
          this.isPainting = true;
          const offSetData = { offsetX, offsetY };
          // const positionData = {
          //   start: { ...this.prevPos },
          //   stop: { ...offSetData }
          // };
          // this.line = this.line.concat(positionData);
          this.paint(this.prevPos, offSetData, this.userStrokeStyle);
        } else {
          this.endPaintEvent(e);
        }
      }
    }
    e.preventDefault();
  }

  endPaintEvent(e) {
    e.preventDefault();
    if (this.isPainting) {
      this.isPainting = false;
    }
  }
  paint(prevPos, currPos, strokeStyle) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element.
    this.canvas.width = 600;
    this.canvas.height = 900;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 3;

    // onTouchStart={{ handler: this.onTouchStart, passive: false }}
    // onTouchLeave={{ handler: this.endPaintEvent, passive: false }}
    // onTouchEnd={{ handler: this.endPaintEvent, passive: false }}
    // onTouchMove={{ handler: this.onTouchMove, passive: false }}
    if (this.ctx) {
      // React to mouse events on the canvas, and mouseup on the entire document

      this.canvas.addEventListener("touchstart", this.onTouchStart, false);
      this.canvas.addEventListener("touchend", this.endPaintEvent, false);
      this.canvas.addEventListener("touchmove", this.onTouchMove, false);
      this.canvas.addEventListener("touchleave", this.endPaintEvent, false);
    }
  }

  render() {
    return (
      <canvas
        // We use the ref attribute to get direct access to the canvas element.
        ref={ref => (this.canvas = ref)}
        //style={{ background: "black" }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
        //   onTouchStart={this.onTouchStart}
        //   onTouchLeave={this.endPaintEvent}
        //   onTouchEnd={this.endPaintEvent}
        //   onTouchMove={this.onTouchMove}
      />
    );
  }
}
export default Canvas;
