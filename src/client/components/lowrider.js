import React, {Component} from 'react';
import mojs from 'mo-js';

export default class Lowrider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHittingSwitches: false,
      body: null,
      frontWheel: null,
      backWheel: null
    }
  }

  componentDidMount() {
    const body = new mojs.Html({
      el: this.refs.body,
      angleZ: { 0 : 20 },
      easing: 'expo.out',
      isYoyo: true,
      repeat: 999
    });

    const frontWheel = new mojs.Html({
      el: this.refs.frontWheel,
      angleZ: { 0 : 20 },
      easing: 'expo.out',
      isYoyo: true,
      repeat: 999
    });

    const backWheel = new mojs.Html({
      el: this.refs.backWheel,
      x: { 0 : -10 },
      angleZ: { 0 : -10 },
      isYoyo: true,
      repeat: 999,
      easing: 'quint.out',
    });

    this.setState({body, frontWheel, backWheel});
  }

  onToggleSwitch() {
    const {isHittingSwitches, body, frontWheel, backWheel} = this.state;
    [body, frontWheel, backWheel].forEach(anim => !isHittingSwitches ? anim.play() : anim.setProgress(0).pause());
    this.setState({isHittingSwitches: !isHittingSwitches});
  }

  render() {
    return <div>
      <div className="c-lowrider">
        <img className="c-lowrider__body" ref="body" src="/public/lowrider/body.svg" />
        <img className="c-lowrider__front-wheel" ref="frontWheel" src="/public/lowrider/wheel.svg" />
        <img className="c-lowrider__back-wheel" ref="backWheel" src="/public/lowrider/wheel.svg" />
      </div>
      <div className="u-text-center u-margin-top">
        <div className="c-toggle c-toggle--white" onClick={e => this.onToggleSwitch()}>
          <div className={`c-toggle__switch ${this.state.isHittingSwitches ? 'c-toggle__switch--on' : ''}`} />
        </div>
      </div>
    </div>
  }
}