import React, {Component} from 'react';
import mojs from 'mo-js';

export default class OpeningAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHasLoaded: false,
      monitorHasLoaded: false,
      mouseHasLoaded: false,
      keyboard: null,
      monitor: null,
      mouse: null,
      mouseBurst: null,
      bg: null,
      bgBurst: null,
      underline: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevKeyboardHasLoaded = prevState.keyboardHasLoaded;
    const prevMinitorHasLoaded = prevState.monitorHasLoaded;
    const prevMouseHasLoaded = prevState.mouseHasLoaded;
    const {keyboardHasLoaded, monitorHasLoaded, mouseHasLoaded} = this.state;
    const prevHasLoadedArr = [prevKeyboardHasLoaded, prevMinitorHasLoaded, prevMouseHasLoaded];
    const curHasLoadedArr = [keyboardHasLoaded, monitorHasLoaded, mouseHasLoaded];
    const prevHasLoaded = prevHasLoadedArr.every(item => item);
    const curHasLoaded = curHasLoadedArr.every(item => item);
    if (!prevHasLoaded && curHasLoaded) {
      this.createAnimation();
    }
  }

  createAnimation() {
    const border = 2 * Math.PI * 170;
    const bg = new mojs.Shape({
      parent: this.refs.container,
      className: 'opening-animation__bg',
      delay: 300,
      duration: 800,
      y: '50px',
      fill: 'rgba(0,0,0,0.4)',
      stroke: '#FF7F66',
      strokeLinecap: 'round',
      strokeWidth: 30,
      strokeDashoffset: { [border * -1] : 0 },
      strokeDasharray: border,
      scale: { 0 : 1, easing: 'ease.out' },
      radius: 140,
      opacity: { 0: 1 },
    }).then({
      easing: 'elastic.out',
      radius: { 140 : 120 }
    }).play();

    const bg2 = new mojs.Shape({
      parent: this.refs.container,
      className: 'opening-animation__bg2',
      y: '50px',
      delay: 1200,
      easing: 'elastic.out',
      fill: 'rgba(0,0,0,0.3)',
      radius: { 120 : 150 }
    }).play();

    const bgBurst = new mojs.Burst({
      parent: this.refs.container,
      y: '50px',
      stroke: '#fff',
      children: {
        fill: 'white',
      }
    }).play();

    const monitor = new mojs.Html({
      el: this.refs.monitor,
      isShowStart: true,
      easing: 'elastic.out',
      duration: 1500,
      delay: 400,
      opacity: { 0 : 1 },
      scale: { 0.2 : 1 }
    }).play();

    const keyboard = new mojs.Html({
      el: this.refs.keyboard,
      isShowStart: true,
      duration: 1000,
      delay: 600,
      opacity: { 0 : 1 },
      easing: 'quart.out',
      x: { '-200px' : 0 }
    }).play();

    const mouse = new mojs.Html({
      el: this.refs.mouse,
      isShowStart: true,
      easing: 'elastic.inout',
      duration: 1000,
      delay: 1000,
      opacity: { 0 : 1 },
      y: { '-100px' : 0 }
    }).play();

    const mouseBurst = new mojs.Burst({
      x: '80px',
      y: '150px',
      parent: this.refs.container,
      children: {
        delay: 1600,
        fill: '#fff'
      }
    }).play();

    this.setState({bg, bgBurst, monitor, keyboard, mouse, mouseBurst});
  }

  render() {
    return <div ref="container" className="opening-animation" style={this.props.style}>
      <img onLoad={e => this.setState({keyboardHasLoaded: true})}
           className="opening-animation__keyboard"
           ref="keyboard"
           src="/public/keyboard.svg" />

      <img onLoad={e => this.setState({monitorHasLoaded: true})}
           className="opening-animation__monitor"
           ref="monitor"
           src="/public/monitor.svg" />

      <img onLoad={e => this.setState({mouseHasLoaded: true})}
           className="opening-animation__mouse"
           ref="mouse"
           src="/public/mouse.svg" />
    </div>
  }
}