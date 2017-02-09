import React, {Component} from 'react';

export default class Slides extends Component {
  renderNav() {
    return <div className="c-slides__nav">
      <div className="c-slides__nav-next" onClick={e => this.onChangeSlide('next')} >
        <i className="icon-chevron-thin-right" />
      </div>
      <div className="c-slides__nav-prev" onClick={e => this.onChangeSlide('prev')} >
        <i className="icon-chevron-thin-left" />
      </div>
    </div>
  }

  onChangeSlide(direction) {
    this.refs.slide.scrollTop = 0;
    switch (direction) {
      case 'prev':
        this.props.onChangeSlide(this.props.curSlide - 1);
        break;
      case 'next':
        this.props.onChangeSlide(this.props.curSlide + 1);
        break;
      default:
        return null
    }
  }

  componentDidMount() {
    const {slide} = this.refs;
    slide.onscroll = () => {
      this.props.setScrollVal(slide);
    };
  }

  componentWillUnmount() {
    const {slide} = this.refs;
    slide.onscroll = null;
    this.props.setScrollVal();
  }

  render() {
    const {curSlide} = this.props;
    return <div ref="slides" className="c-slides">
        <div className="c-slides__container">
          <div ref="slide" className={`c-slide c-slide-${curSlide}`}>
            {this.props.renderSlide(curSlide)}
          </div>
      </div>
      {this.renderNav()}
    </div>
  }
}