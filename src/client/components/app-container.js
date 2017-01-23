import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';
import Home from './home';

export default class AppContainer extends Component {
  render() {
    return <BrowserRouter>
      <div className="app-container">
        <Match exactly pattern="/" component={Home} />
      </div>
    </BrowserRouter>
  }
}