import React from "react";
import Canvas from "./components/Canvas";
import AnotherCanvas from "./components/AnotherCanvas";

function App() {
  let width = 950;

  return (
    <div>
      <AnotherCanvas height="800" width={width} backgroundColor="white" />
    </div>
  );
}

export default App;
