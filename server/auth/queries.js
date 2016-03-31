import { r, RP } from 'rethinkdb-websocket-server';
import jwt from 'jwt-simple';
import connect from '../utils/connect';
import { jwtSecret } from '../utils/envDefaults';

const runQuery = query => connect().then(conn => query.run(conn));

// Returns a function that will return a Boolean based on whether
// or not the user's authLevel matches the given authLevel
const auth = authLevel => (refs, session) => session.authLevel === authLevel;

const isNumber = () => RP.check(x => typeof x === 'number');

export const sessionCreator = urlQueryParams => {
  try {
    // Try to get the userId from the token
    const { iss: userId } = jwt.decode(urlQueryParams.token, jwtSecret);
    // If we found it, look the user up
    const userQuery = r.table('authorized_users').get(userId);
    // then return the user
    return runQuery(userQuery).then(user => user);
  } catch (e) {
    console.log(e);
    // return Promise.reject('Invalid auth token');
    // If we couldn't get a userId, return a guest user
    return Promise.resolve({
      authLevel: 'guest',
      name: 'guest',
      login: 'guest'
    });
  }
};


export const queryWhitelist = [
  // r.table('messages').changes().opt('db', r.db('test'))
  r.table('messages')
    .changes()
    .opt('db', r.db('test'))
    .validate(auth('admin')),

  // r.table('messages').opt('db', r.db('test'))
  r.table('messages')
    .opt('db', r.db('test'))
    .validate(auth('admin')),

  // r.table('messages').getField('tokens').concatMap(function(var_0) { return var_0; }).opt('db', r.db('test'))
  r.table('messages')
    .getField('tokens')
    .concatMap(var0 => var0)
    .opt('db', r.db('test'))
    .validate(auth('admin')),

  // r.table('messages').filter(r.row('ts').date().eq(r.time(2016, 3, 27, 'Z'))).group(r.row('ts').hours()).count().opt('db', r.db('test'))
  r.table('messages')
    .filter(r.row('ts').date().eq(r.time(isNumber(), isNumber(), isNumber(), 'Z')))
    .group(r.row('ts').hours())
    .count()
    .opt('db', r.db('test'))
    .validate(auth('admin')),

  // r.table('messages').hasFields('name').group('name').count().opt('db', r.db('test'))
  r.table('messages')
    .hasFields('name')
    .group('name')
    .count()
    .opt('db', r.db('test'))
    .validate(auth('admin')),
];

// To reduce clutter above, we could also do this...
// ].map(query => query.validate(auth('admin')));

// Or even this...
// ].map(query => query.opt('db', r.db('test')).validate(auth('admin')));

export const findAuthorizedUser = filter => connect()
  .then(conn => r.table('authorized_users').filter(filter).run(conn)
    .then(cursor => cursor.toArray()));

export const createAuthorizedUser = user => connect()
  .then(conn => r.table('authorized_users').insert(user, { returnChanges: true }).run(conn));
