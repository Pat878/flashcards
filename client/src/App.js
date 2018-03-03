import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { createHashHistory } from "history";
import { CSSTransitionGroup } from "react-transition-group";

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
    cardIndex: null,
    answer: true,
    cardId: 0
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
  };

  showCardsRoute = () => {
    history.push("/cards");
  };

  setCardIndex = i => {
    this.setState({ cardIndex: i });
    this.showCardsRoute();
  };

  flipCard = () => {
    this.setState(prevState => ({
      answer: !prevState.answer
    }));
  };

  nextCard = () => {
    let currentCardId = this.state.cardId;
    let cardSetLength = this.state.response[this.state.cardIndex].length;

    if (currentCardId <= cardSetLength - 1) {
      this.setState({ cardId: (currentCardId += 1) });
    }

    if (currentCardId == cardSetLength) {
      this.setState({ cardId: 0 });
    }
  };

  previousCard = () => {
    let currentCardId = this.state.cardId;
    let cardSetLength = this.state.response[this.state.cardIndex].length;

    if (currentCardId <= cardSetLength - 1) {
      this.setState({ cardId: (currentCardId -= 1) });
    }

    if (currentCardId == -1) {
      this.setState({ cardId: cardSetLength - 1 });
    }
  };

  goBack = () => {
    history.push("/");
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
                        flipCard={this.flipCard}
                        answer={this.state.answer}
                        cardId={this.state.cardId}
                        nextCard={this.nextCard}
                        previousCard={this.previousCard}
                        goBack={this.goBack}
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
