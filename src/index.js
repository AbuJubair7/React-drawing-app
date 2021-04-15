import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Style from "./index.module.css";

/*................Rendering element.............
  render() can only render one element at a time (JSX)
  We can write HTML inside reder() first paremeter
  we should use second braces to use JS inside JSX
*/

/*................CSS styling in JSX.............
  we can use style inside JSX
  JS take css as an object
  Thats why need to use double brace to use inline css
  need to decalere css property as varable style
  can use class from external folder. For that we need to import that file

*/

ReactDOM.render(<App />, document.getElementById("root"));
