var connect = require('../../utils/connect');
var r = require('rethinkdb');

module.exports = {
  getMessages(req, res) {
    connect()
      .then(conn => {
        r.table('messages').run(conn)
          .then(cursor => {
            cursor.toArray().then(result => res.send(result));
          });
      });
  }
};
