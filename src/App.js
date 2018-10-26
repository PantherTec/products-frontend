import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Main from "./main";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Product App</h1>
        <ul className="header">
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/create">
              Create a product
            </Link>
          </li>
        </ul>
        <Main />
      </div>
    );
  }
}

export default App;
