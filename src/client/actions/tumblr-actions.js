import fetchJsonp from 'fetch-jsonp';

export function setIsLoadingTumblrPosts(isLoadingPosts) {
  return {
    type: 'SET_IS_LOADING_TUMBLR_POSTS',
    isLoadingPosts
  }
}

export function setTumblrPosts(posts) {
  return {
    type: 'SET_TUMBLR_POSTS',
    posts
  }
}

export function fetchTumblrPosts() {
  return dispatch => {
    dispatch(setIsLoadingTumblrPosts(true));
    fetchJsonp('http://api.tumblr.com/v2/blog/ryanirillidev.tumblr.com/posts?tag=design&api_key=dgYL53KgePEaFbv2WR7B8Xx6QM7qBZG4j0HEJDL3KMzQJoApAj')
      .then(response => response.json())
      .then(data => {
        const {posts} = data.response;
        dispatch(setTumblrPosts(posts));
        dispatch(setIsLoadingTumblrPosts(false));
    }).catch(err => {
      dispatch(setIsLoadingTumblrPosts(false));
    });
  }
}