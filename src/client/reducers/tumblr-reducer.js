import {fromJS} from 'immutable';

const initialState = fromJS({
  isLoadingPosts: false,
  posts: []
});

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_IS_LOADING_TUMBLR_POSTS':
      return state.set('isLoadingPosts', action.isLoadingPosts);
    case 'SET_TUMBLR_POSTS':
      return state.set('posts', fromJS(action.posts));
    default:
      return state;
  }

}