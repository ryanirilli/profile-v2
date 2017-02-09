import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AppContainer from './client/components/app-container';
import './client/styles/main.scss';
import {getDeviceInfo} from './client/device';
import {debounce} from './client/utils/utils';
import {setScrollVal} from './client/actions/app-actions';
import appReducer from './client/reducers/app-reducer';
import tumblrReducer from './client/reducers/tumblr-reducer';
import 'whatwg-fetch';

const store = createStore(combineReducers({
  app: appReducer,
  tumblr: tumblrReducer
}), applyMiddleware(thunk));

window.onscroll = () => {
  store.dispatch(setScrollVal());
};

function setDevice() {
  store.dispatch({
    type: 'SET_DEVICE',
    device: getDeviceInfo()
  });
}

setDevice();
const debouncedSetDevice = debounce(setDevice, 200);
window.addEventListener('resize', debouncedSetDevice);

render(<Provider store={store}>
  <AppContainer/>
</Provider>, document.querySelector('#app-root'));