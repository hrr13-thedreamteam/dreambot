import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import Main from '../components/Main';
import App from '../containers/App';
import Home from '../components/Home';
import Questions from '../components/Questions';
import AveragesContainer from '../containers/AveragesContainer';
import UserProfileContainer from '../containers/UserProfileContainer';
import LoginContainer from '../containers/LoginContainer';
import CatchContainer from '../containers/CatchContainer';
import CohortContainer from '../containers/CohortContainer';

const Routes = (
  <Route path="/" component={Main}>
    <IndexRedirect to="/app" />
    <Route path="/login" component={LoginContainer} />
    <Route path="/catch" component={CatchContainer} />
    <Route path="/app" component={App} >
      <IndexRoute component={Home} />
      <Route path="/user/:id" component={UserProfileContainer} />
      <Route path="/questions" component={Questions} />
      <Route path="/averages" component={AveragesContainer} />
      <Route path="/cohort" component={CohortContainer} />
    </Route>
  </Route>
);

export default Routes;
