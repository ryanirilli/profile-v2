import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';
import Home from './home';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingMenu: false
    }
  }

  toggleMenu() {
    this.setState({
      isShowingMenu: !this.state.isShowingMenu
    });
  }

  render() {
    return <BrowserRouter>
      <div className="app-container">

        <div onClick={this.toggleMenu} className="menu">
          <a href="https://github.com/ryanirilli" target="_blank"><i className="menu__item icon-github" /></a>
          <a href="https://twitter.com/ryanirilli" target="_blank"><i className="menu__item icon-twitter" /></a>
          <a href="https://medium.com/@ryanirilli" target="_blank"><i className="menu__item icon-medium" /></a>
          <a href="https://www.linkedin.com/in/ryanirilli/" target="_blank"><i className="menu__item icon-linkedin" /></a>
        </div>

        <svg style={{position: 'absolute'}} xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <Match exactly pattern="/" component={Home} />
      </div>
    </BrowserRouter>
  }
}