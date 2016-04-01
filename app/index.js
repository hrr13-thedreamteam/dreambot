// from:
// https://github.com/reactjs/redux/blob/master/examples/real-world/index.js
// https://github.com/reactjs/redux/pull/1455/files

/*
  Research: Why does he import the babel-polyfill?
*/
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import configureStore from './config/configureStore';
import { syncHistoryWithStore } from 'react-router-redux';
import 'bulma/css/bulma.css';
import { routeLocationDidUpdate } from './actions/index';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('root');
let render = () => {
  // https://github.com/reactjs/redux/pull/1455/files#r54380102
  const Root = require('./containers/Root').default;
  ReactDOM.render(
    <Root store={store} history={history} />,
   rootEl
  );
};


browserHistory.listen(location => store.dispatch(routeLocationDidUpdate(location)));

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} />,
     rootEl
    );
  };
  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };
  module.hot.accept('./containers/Root', () => {
    // https://github.com/reactjs/redux/pull/1455/files#r55138543
    setTimeout(render);
  });
}
render();
