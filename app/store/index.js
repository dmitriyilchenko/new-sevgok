import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as storage from 'redux-storage';
import debounce from 'redux-storage-decorator-debounce';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from '../reducers';

const createEngine = (key) => ({
  load() {
    return AsyncStorage.getItem(key)
      .then((jsonState) => JSON.parse(jsonState) || {});
  },

  save(state) {
    const jsonState = JSON.stringify(state);
    return AsyncStorage.setItem(key, jsonState);
  }
});

let engine = createEngine('starter-kit-store');
engine = debounce(engine, 100);

const middleware = storage.createMiddleware(engine);

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, middleware)
)(createStore);

const reducer = storage.reducer(rootReducer)

export const load = storage.createLoader(engine);
export const store = createStoreWithMiddleware(reducer);
