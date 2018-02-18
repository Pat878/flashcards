import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { createHashHistory } from "history";

var Navbar = require("./components/Navbar");
var Main = require("./components/Main");
var Index = require("./components/Index");
var CardIndex = require("./components/CardIndex");
var Cards = require("./components/Cards");
var Loading = require("./components/Loading");
var Footer = require("./components/Footer");

var api = require("./utils/api");
var history = createHashHistory();

class App extends Component {
  state = {
    startingCards: ["Array"],
    response: [],
    loading: true,
    collapsed: true,
    cardIndex: null
  };

  componentDidMount = () => {
    api
      .getCardData()
      .then(res => this.setState({ response: res, loading: false }))
      .catch(err => console.log(err));
  };

  toggleHeader = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
    console.log(true);
  };

  showCardsRoute = () => {
    history.push("/cards");
  };

  setCardIndex = i => {
    this.setState({ cardIndex: i });
    this.showCardsRoute();
  };

  render() {
    return (
      <div>
        <Navbar
          toggleHeader={this.toggleHeader}
          collapsed={this.state.collapsed}
        />
        <Main />
        <div>
          <HashRouter>
            <div>
              <Switch>
                <Route
                  exact
                  path={"/"}
                  render={props => (
                    <CardIndex
                      startingCards={this.state.startingCards}
                      showCardsRoute={this.showCardsRoute}
                      setCardIndex={this.setCardIndex}
                    />
                  )}
                />
                <Route
                  exact
                  path={"/cards"}
                  render={props =>
                    this.state.loading ? (
                      <Loading />
                    ) : (
                      <Cards
                        response={this.state.response}
                        showCardsRoute={this.showCardsRoute}
                        cardIndex={this.state.cardIndex}
                      />
                    )
                  }
                />
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
