import React, {Component} from 'react';
import mojs from 'mo-js';

export default class OpeningAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboard: null,
      monitor: null,
      mouse: null,
      mouseBurst: null,
      bg: null,
      bgBurst: null,
      underline: null
    }
  }

  componentDidMount() {
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

    const underline = new mojs.Shape({
      parent: this.refs.container,
      className: 'opening-animation__underline',
      shape: 'line',
      stroke: '#c8d1da',
      radiusY: '1px',
      radiusX: { 0 : '140%' },
      duration: 600,
      strokeLinecap: 'round',
      easing: 'ease.out'
    }).play();

    this.setState({bg, bgBurst, monitor, keyboard, mouse, mouseBurst, underline});
  }

  render() {
    return <div ref="container" className="opening-animation">
      <img className="opening-animation__keyboard" ref="keyboard" src="/public/keyboard.svg" />
      <img className="opening-animation__monitor" ref="monitor" src="/public/monitor.svg" />
      <img className="opening-animation__mouse" ref="mouse" src="/public/mouse.svg" />
    </div>
  }
}