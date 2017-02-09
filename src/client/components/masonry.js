import React, {Component} from 'react';
import MasonryLayout from 'masonry-layout';
import imagesloaded from 'imagesloaded';

export default class Masonry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masonry: null,
      isImagesLoaded: false
    }
  }

  componentDidMount() {
    const {container} = this.refs;
    imagesloaded(container.children[0], () => this.createMasonry());
  }

  componentWillUnmount() {
    const {masonry} = this.state;
    if (masonry) {
      masonry.destroy();
    }
  }

  createMasonry() {
    if (!this.refs.container) {
      return;
    }

    const el = this.refs.container.children[0];
    const masonry = new MasonryLayout(el);
    this.setState({masonry, isImagesLoaded: true});
  }

  render() {
    return <div ref="container" className={`masonry o-transition-opacity-up ${this.state.isImagesLoaded ? 'o-transition-opacity-up--active' : ''}`}>
      {this.props.children}
    </div>;
  }
}