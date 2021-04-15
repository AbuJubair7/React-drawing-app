import React, { useState } from "react";
import Style from "../index.module.css";

export default function Canvas(props) {
  //This functional component is an example of use React ref
  /*
  in react you cannot call getContext() because component renders after you calling
  so it return a null pointer exeption. For that you need to use React.useRef() and 
  store it in a reference variable. Then in the JSX file define ref={ref} inside component
  attribute.
  when we need data like context-> when the render is ready then we need to wrap the ref.
  In order to access the element
  we can use React.useEffect(()=>{...}) use (ref.current) inside the callback method define the data.
  */
  const ref = React.useRef();

  let x = undefined;
  let y = undefined;
  let size = 5;
  let isPressed = false;
  var ctx = undefined;

  // acessing the attributes of element when dom loads
  React.useEffect(() => {
    ctx = ref.current.getContext("2d");
  });

  const [canvasProperties, setCanvasProperties] = useState({
    color: props.color,
    backgroundColor: props.backgroundColor,
    size: { height: props.height, width: props.width },
  });

  const clearCanvas = (e) => {
    ctx.clearRect(0, 0, ref.current.width, ref.current.height);
    console.log(ref.current.width);
    console.log(ref.current.height);
  };
  const onChange = (e) => {
    setCanvasProperties({
      ...canvasProperties,
      [e.target.name]: e.target.value,
    });

    console.log(e.target.name + ": " + e.target.value);
  };
  const increaseCanvasSize = (e) => {
    setCanvasProperties({
      ...canvasProperties,
      size: {
        ...canvasProperties.size,
        height: parseInt(canvasProperties.size.height) + 50,
      },
    });
  };
  // Error solve on calling e.offsetX/offsetY
  /*The event object returned by react is a react SyntheticEvent which wraps the normal JavaScript event object 
    and contains some cross browser conveniences. 
    That's why we nee to call it as e.nativeEvent.offsetX
    here nativeEvent helps us to get the actual event.

  */
  const onMouseDown = (e) => {
    isPressed = true;

    x = e.nativeEvent.offsetX;
    y = e.nativeEvent.offsetY;
  };

  const onMouseUp = (e) => {
    isPressed = false;
    x = undefined;
    y = undefined;
  };
  const onMouseMove = (e) => {
    if (isPressed) {
      let x2 = e.nativeEvent.offsetX;
      let y2 = e.nativeEvent.offsetY;

      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);

      x = x2;
      y = y2;
    }
  };
  // funtions to draw
  const drawCircle = (x, y) => {
    ctx.beginPath();
    ctx.fillStyle = canvasProperties.color;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawLine = (x, y, x2, y2) => {
    ctx.beginPath();
    ctx.strokeStyle = canvasProperties.color;
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = size * 2;
    ctx.stroke();
  };
  return (
    <div>
      <canvas
        style={{
          border: "1px solid black",
          backgroundColor: canvasProperties.backgroundColor,
          margin: "0 auto",
          display: "block",
        }}
        height={canvasProperties.size.height}
        width={canvasProperties.size.width}
        id="canvas"
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      ></canvas>

      <label className={Style.colorSelect} htmlFor="color">
        Select color
      </label>
      <button onClick={clearCanvas}>Clear canvas</button>
      <button onClick={increaseCanvasSize}>+</button>
      <input
        className={Style.colorSelect}
        type="color"
        id="color"
        onChange={onChange}
        name="color"
      ></input>
    </div>
  );
}
