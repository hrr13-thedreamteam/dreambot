// referenced:
// https://github.com/mikemintz/rethinkdb-websocket-client/tree/master/examples/tutorial
// https://github.com/mikemintz/react-rethinkdb/blob/master/examples/chat/client/AuthWrapper.jsx

import RethinkdbWebsocketClient from 'rethinkdb-websocket-client';

const token = window.localStorage.getItem('token');
const path = `/db?token=${encodeURIComponent(token)}`;

// Open a WebSocket connection to the server to send RethinkDB queries over
const options = {
  host: HOST, // hostname of the websocket server
  port: PORT, // port number of the websocket server
  path: path,       // HTTP path to websocket route
  secure: false,     // set true to use secure TLS websockets
  db: 'test',        // default database, passed to rethinkdb.connect
};

export const connection = RethinkdbWebsocketClient.connect(options);
export const r = RethinkdbWebsocketClient.rethinkdb;
