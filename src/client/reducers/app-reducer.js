import {fromJS} from 'immutable';
const initialState = fromJS({
  device: null,
  scrollVal: 0
});
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DEVICE': {
      return state.set('device', action.device);
    }
    case 'SET_SCROLL_VAL':
    default:
      return state.set('scrollVal', action.scrollVal);
  }
}