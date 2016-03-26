import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github2';
import r from 'rethinkdb';
import connect from './connect';
import axios from 'axios';

const findAuthorizedUser = () => connect()
  .then(conn => r.table('authorized_users').run(conn)
    .then(cursor => cursor.toArray()))

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser( (user, done) => {
  // console.log('USER IN SERIALIZE: ', user);
  done(null, user);
});

passport.deserializeUser( (obj, done) => {
  // console.log('OBJ IN DESERIALIZE: ', obj);
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:1337/auth/github/callback",
    scope: [ 'user', 'read:org']
  }, (accessToken, refreshToken, profile, done) => {
    // asynchronous verification, for effect...
    process.nextTick( () => {
      // console.log('accessToken: ', accessToken);
      // console.log('refreshToken: ', refreshToken);
      // console.log('profile: ', profile);

      // If we've made it to this point...we have successfully authenticated with github...
      // Now, lets reach out to see what organizations the user is in
      axios.get('https://api.github.com/user/orgs', {
        params: {
          'access_token': accessToken
        }
      }).then(res => {
        // console.log(res);

        // res.data will contain an array of org objects that look like:
        // {
        //   login: 'hrr13-thedreamteam',
        //   id: 17730304,
        //   url: 'https://api.github.com/orgs/hrr13-thedreamteam',
        //   repos_url: 'https://api.github.com/orgs/hrr13-thedreamteam/repos',
        //   events_url: 'https://api.github.com/orgs/hrr13-thedreamteam/events',
        //   hooks_url: 'https://api.github.com/orgs/hrr13-thedreamteam/hooks',
        //   issues_url: 'https://api.github.com/orgs/hrr13-thedreamteam/issues',
        //   members_url: 'https://api.github.com/orgs/hrr13-thedreamteam/members{/member}',
        //   public_members_url: 'https://api.github.com/orgs/hrr13-thedreamteam/public_members{/member}',
        //   avatar_url: 'https://avatars.githubusercontent.com/u/17730304?v=3',
        //   description: null
        // }

        // make sure they're from correct org
        // hrr13-thedreamteam org id is: 17730304
        const hasOrg = res.data.some(org => org.id === 17730304);
        console.log('DID WE FIND THE ORG!?!?!? --- ', hasOrg ? 'Yes!!' : 'No... :(');

        // look up user in DB
        findAuthorizedUser()
          .then(res => console.log(res))
          // If they exist...
            // give them a JWT
          // If they don't exist...
            // add them
            // give them a JWT
      })
      .catch(err => console.log(err))

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

// referenced: https://github.com/cfsghost/passport-github/blob/master/examples/login/app.js
export default function(app) {
  app.use(passport.initialize());

  app.get('/auth/github', passport.authenticate('github'), function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
  });
}

