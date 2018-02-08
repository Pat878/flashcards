import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, Switch, HashRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

var Routes = require("./components/Routes");
var api = require("./utils/api");

class App extends Component {
  state = {
    response: [],
    loading: true,
    collapsed: true
  };

  toggleHeader = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
    console.log(true)
  };

  render() {
    return (
      <div>
        <Routes
          toggleHeader={this.toggleHeader}
          collapsed={this.state.collapsed}
        />
      </div>
    );
  }
}

export default App;
