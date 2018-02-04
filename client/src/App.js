import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

var api = require("./utils/api");

class App extends Component {
  state = {
    response: [],
    loading: true
  };

  componentDidMount = () => {
    api
      .callApi()
      .then(res => this.setState({ response: res, loading: false }))
      .catch(err => console.log(err));
  };

  click = () => {
    console.log(true)
  };

  render() {
    const test = this.state.response.map(val => {
      return <p key={val.id}> {val.name}</p>;
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.loading ? <p>Loading...</p> : test}
        <input placeholder="name" />
        <br />
        <input placeholder="text" />
        <br />
        <br />
        <button onClick={this.click}>Submit</button>
      </div>
    );
  }
}

export default App;
