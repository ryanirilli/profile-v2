import React, {Component} from 'react';

export default class SexyImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingDetail: false,
      isAnimatingDetailOut: false
    }
  }

  onAnimationEnd() {
    const {isAnimatingDetailOut} = this.state;
    if (isAnimatingDetailOut) {
      this.setState({
        isShowingDetail: false,
        isAnimatingDetailOut: false
      })
    }
  }

  renderDetail() {
    const {isAnimatingDetailOut} = this.state;
    return <div className={`c-modal ${isAnimatingDetailOut ? 'o-animate-fade-out' : 'o-animate-fade-in'}`}>
      <div className={`c-modal__content ${isAnimatingDetailOut ? 'o-animate-fade-out-slide-right' : 'o-animate-fade-in-slide-right-stagger-1'}`}
           onAnimationEnd={e => this.onAnimationEnd()}>
        <div className="u-text-center">
          <img className={this.props.detailClassName || ''}
               onClick={e => this.setState({isAnimatingDetailOut: true})}
               src={this.props.src} />
        </div>
      </div>
    </div>
  }

  render() {
    return <div className="c-sexy-img">
      <img className={this.props.className || ''} ref="img" onClick={e => this.setState({isShowingDetail: true})} src={this.props.src} />
      {this.state.isShowingDetail && this.renderDetail()}
    </div>
  }
}