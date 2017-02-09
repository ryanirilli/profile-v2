import React, {Component} from 'react';
import Masonry from './masonry';

export default class Tumblr extends Component {

  componentDidMount() {
    if (!this.props.posts.size) {
      this.props.fetchPosts();
    }
  }

  renderPost(post, i) {
    return <div key={i} className="o-layout__item u-1/4">
      <img src={post.getIn(['photos', 0, 'alt_sizes', 0, 'url'])} />
    </div>
  }

  render() {
    if (!this.props.posts.size) {
      return null;
    }

    return <Masonry>
      <div className="o-layout o-layout--flush">
        {this.props.posts.map((post, i) => this.renderPost(post, i))}
      </div>
    </Masonry>
  }
}