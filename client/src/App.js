import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, HashRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { createHashHistory } from "history";

var Navbar = require("./components/Navbar");
var Main = require("./components/Main");
var CardIndex = require("./components/CardIndex");
var Cards = require("./components/Cards");
var Loading = require("./components/Loading");
var Footer = require("./components/Footer");

var api = require("./utils/api");
var history = createHashHistory();

class App extends Component {
  state = {
    startingCards: [],
    response: [],
    loading: true,
    collapsed: true,
    cardIndex: null,
    hideAnswer: true,
    cardId: 0,
    showNotes: false,
    notes: ""
  };

  componentDidMount = () => {
    api
      .getCardData()
      .then(res =>
        this.setState({
          response: res,
          loading: false,
          startingCards: this.startingCards(res)
        })
      )
      .catch(err => console.log(err));
  };

  startingCards = res => {
    let startingCards = [];
    for (let i = 0; i < res.length; i++) {
      startingCards.push(res[i].group);
    }
    return startingCards;
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
      hideAnswer: !prevState.hideAnswer
    }));
  };

  nextCard = () => {
    let currentCardId = this.state.cardId;
    let cardSetLength = this.state.response[this.state.cardIndex].content
      .length;

    if (currentCardId <= cardSetLength - 1) {
      this.setState({ cardId: currentCardId + 1 });
    }

    if (currentCardId === cardSetLength - 1) {
      this.setState({ cardId: 0 });
    }
  };

  previousCard = () => {
    let currentCardId = this.state.cardId;
    let cardSetLength = this.state.response[this.state.cardIndex].content
      .length;

    if (currentCardId <= cardSetLength - 1) {
      this.setState({ cardId: currentCardId - 1 });
    }

    if (this.state.cardId === 0) {
      this.setState({ cardId: cardSetLength - 1 });
    }
  };

  goBack = () => {
    history.push("/");
    if (!this.state.hideAnswer) {
      this.setState({ hideAnswer: true });
    }
    this.setState({ cardId: 0, showNotes: false });
  };

  toggleNotes = () => {
    this.setState(prevState => ({
      showNotes: !prevState.showNotes
    }));
    this.setNoteState();
  };

  setNoteState = () => {
    let cardId = this.state.cardId;
    let cardIndex = this.state.cardIndex;
    let notes = this.state.response[cardIndex].content[cardId].notes;
    if (typeof notes !== "undefined") {
      this.setState({ notes: notes });
    } else {
      this.setState({ notes: "" });
    }
  };

  inputNotes = e => {
    this.setState({ notes: e.target.value });
  };

  setCardObject = () => {
    let cardCollection = this.state.response;
    let cardIndex = this.state.cardIndex;
    let cardsToUpdate = cardCollection[cardIndex].content;

    let updatedCards = cardsToUpdate.map(card => {
      if (card.id === this.state.cardId + 1) {
        return Object.assign({}, card, {
          notes: this.state.notes
        });
      } else {
        return card;
      }
    });

    let newCardCollection = cardCollection.map((object, index) => {
      if (index == cardIndex) {
        return Object.assign({}, object, {
          content: updatedCards
        });
      } else {
        return object;
      }
    });
    return newCardCollection;
  };

  submitUpdate = () => {
    api
      .updateNotes(this.setCardObject())
      .then(responseJson => {
        this.handleUpdate(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUpdate = newCardCollection => {
    this.setState({ response: newCardCollection });
  };

  /*  submitNotes = () => {
    let card = this.state.response;
    api.updateNotes(card);
  }; */

  render() {
    return (
      <div>
        <Navbar />
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
                        hideAnswer={this.state.hideAnswer}
                        cardId={this.state.cardId}
                        nextCard={this.nextCard}
                        previousCard={this.previousCard}
                        goBack={this.goBack}
                        toggleNotes={this.toggleNotes}
                        showNotes={this.state.showNotes}
                        inputNotes={this.inputNotes}
                        handleUpdate={this.handleUpdate}
                        notes={this.state.notes}
                        setNoteState={this.setNoteState}
                        submitUpdate={this.submitUpdate}
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
