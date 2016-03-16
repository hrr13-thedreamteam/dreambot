// from:
// https://github.com/reactjs/redux/blob/master/examples/real-world/index.js
// https://github.com/reactjs/redux/pull/1455/files

/*
  Research: Why does he import the babel-polyfill?
*/
import 'babel-polyfill';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import 'bulma/css/bulma.css';
// import { syncHistoryWithStore } from 'react-router-redux';
// import configureStore from './store/configureStore';

// const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store)

/*
  We're ignoring what he does with react-router-redux and what he does in `./store/configureStore` for now.
  So, we'll make our own simple placeholder store
  Later, we should hook this up to a RootReducer ( I think )
*/

// Set default state
const store = configureStore();

const rootEl = document.getElementById('root');
let render = () => {
  // https://github.com/reactjs/redux/pull/1455/files#r54380102
  const Root = require('./containers/Root').default;
  ReactDOM.render(
    <Root store={store} history={browserHistory}/>,
   rootEl
  );
};
if (module.hot) {
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
}
