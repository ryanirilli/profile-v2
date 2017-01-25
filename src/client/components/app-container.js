import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';
import Home from './home';
import Lowrider from './lowrider';

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
        <Match exactly pattern="/" component={Home} />
        <Match exactly pattern="/lowrider" component={Lowrider} />
      </div>
    </BrowserRouter>
  }
}