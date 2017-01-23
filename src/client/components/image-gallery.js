import React, {Component} from 'react';

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: 0
    }
  }

  renderImagePicker(image, i) {
    const isActive = i === this.state.activeImage;
    return <div key={i}
                style={{background: image.pickerBg}}
                onClick={e => this.setState({ activeImage: i })}
                className={`c-image-gallery__picker ${isActive ? 'c-image-gallery__picker--active' : ''}`} />
  }

  render() {
    const {images} = this.props;
    return <div className="c-image-gallery">
      <img className="c-image-gallery__img"
           src={this.props.images[this.state.activeImage].path} />
      <div className="c-image-gallery__pickers">
        {images.map((image, i) => this.renderImagePicker(image, i))}
      </div>
    </div>
  }
}