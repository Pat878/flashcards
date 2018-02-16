import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

var Navbar = require("./components/Navbar");
var Main = require("./components/Main");
var Index = require("./components/Index");
var Footer = require("./components/Footer");
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
    console.log(true);
  };

  render() {
    return (
      <div>
        <Navbar
          toggleHeader={this.toggleHeader}
          collapsed={this.state.collapsed}
        />
        <div>
          <HashRouter>
            <div>
              <Switch>
                <Route exact path={"/"} render={props => <Main />} />
                <Route
                  render={function() {
                    return <p>Not Found</p>;
                  }}
                />
              </Switch>
            </div>
          </HashRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
