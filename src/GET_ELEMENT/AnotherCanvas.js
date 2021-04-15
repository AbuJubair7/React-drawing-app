import React, { Component } from "react";
import Style from "../index.module.css";

export default class AnotherCanvas extends Component {
  constructor(props) {
    super(props);
    this.ctx = undefined;
    this.x = undefined;
    this.y = undefined;
    this.isPressed = false;
    this.size = 5;
    this.state = {
      color: props.color,
      backgroundColor: props.backgroundColor,
      size: { height: props.height, width: props.width },
    };
    this.ref = React.createRef(); // create react ref
  }

  // acessing the attributes of element when dom loads
  componentDidMount() {
    this.ctx = this.ref.current.getContext("2d");
  }
  clearCanvas = (e) => {
    this.ctx.clearRect(0, 0, this.ref.current.width, this.ref.current.height);
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });

    console.log(e.target.name + ": " + e.target.value);
  };
  increaseCanvasSize = (e) => {
    this.setState({
      ...this.state,
      size: {
        ...this.state.size,
        height: parseInt(this.state.size.height) + 50,
      },
    });
  };

  onMouseDown = (e) => {
    this.isPressed = true;

    this.x = e.nativeEvent.offsetX;
    this.y = e.nativeEvent.offsetY;
  };

  onMouseUp = (e) => {
    this.isPressed = false;
    this.x = undefined;
    this.y = undefined;
  };
  onMouseMove = (e) => {
    if (this.isPressed) {
      let x2 = e.nativeEvent.offsetX;
      let y2 = e.nativeEvent.offsetY;

      this.drawCircle(x2, y2);
      this.drawLine(this.x, this.y, x2, y2);

      this.x = x2;
      this.y = y2;
    }
  };
  // funtions to draw
  drawCircle = (x, y) => {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.state.color;
    this.ctx.arc(x, y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  };
  drawLine = (x, y, x2, y2) => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.state.color;
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = this.size * 2;
    this.ctx.stroke();
  };
  render() {
    return (
      <div>
        {" "}
        <canvas
          style={{
            border: "1px solid black",
            backgroundColor: this.state.backgroundColor,
            margin: "0 auto",
            display: "block",
          }}
          height={this.state.size.height}
          width={this.state.size.width}
          id="canvas"
          ref={this.ref}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseMove={this.onMouseMove}
        ></canvas>
        <label className={Style.colorSelect} htmlFor="color">
          Select color
        </label>
        <button onClick={this.clearCanvas}>Clear canvas</button>
        <button onClick={this.increaseCanvasSize}>+</button>
        <input
          className={Style.colorSelect}
          type="color"
          id="color"
          onChange={this.onChange}
          name="color"
        ></input>
      </div>
    );
  }
}
