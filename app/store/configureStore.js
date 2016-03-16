import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers'
import logger from 'redux-logger'
import io from 'socket.io-client';
const socket = io('http://localhost:1337');
import { addMessage } from '../actions';

// applying middleware

export default function configureStore(initialState){
  const store = createStore(rootReducer);
  socket.on('test', (data) => {
    store.dispatch(addMessage(data.new_val));
  });
  return store;
}
