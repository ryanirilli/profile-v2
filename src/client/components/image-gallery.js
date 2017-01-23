import React, {Component} from 'react';
import mojs from 'mo-js';

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: 0,
      activeImageAnimation: null
    }
  }

  componentDidMount() {
    const activeImageAnimation = new mojs.Html({
      el: this.refs.activeImage,
      easing: 'elastic.out',
      scale: { 0.8 : 1 }
    }).play();
    this.setState({ activeImageAnimation });
  }

  handleImageClick(index) {
    this.setState({ activeImage: index });
    const {activeImageAnimation} = this.state;
    activeImageAnimation.replay();
  }

  renderImagePicker(image, i) {
    const isActive = i === this.state.activeImage;
    return <div key={i}
                style={{background: image.pickerBg}}
                onClick={e => this.handleImageClick(i)}
                className={`c-image-gallery__picker ${isActive ? 'c-image-gallery__picker--active' : ''}`} />
  }

  render() {
    const {images} = this.props;
    return <div className="c-image-gallery">
      <img ref="activeImage" className="c-image-gallery__img"
           src={this.props.images[this.state.activeImage].path} />
      <div className="c-image-gallery__pickers">
        {images.map((image, i) => this.renderImagePicker(image, i))}
      </div>
    </div>
  }
}