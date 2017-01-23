import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux';
import AppContainer from './client/components/app-container';
import './client/styles/main.scss';
import {getDeviceInfo} from './client/device';
import {debounce} from './client/utils/utils';

import appReducer from './client/reducers/app-reducer';
const store = createStore(combineReducers({
  app: appReducer
}));

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