import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Jokes from './components/Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Dad Jokes R Us</h1>
        </header>
        <Jokes />
      </div>
    );
  }
}

export default App;
