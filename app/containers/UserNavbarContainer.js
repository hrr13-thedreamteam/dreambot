import { connect } from 'react-redux';
import React from 'react';
import UserNavbar from '../components/UserNavbar';

const getAnalytics = (messages) => {
  let analytics = messages.reduce((acc, message) => {
    acc.totalSentiment += message.score;
    return acc;
  }, { totalSentiment: 0 });

  return analytics;
};

let mapStateToProps = (state) => {
  const url = window.location.href;
  const user = url.slice(url.lastIndexOf('/') + 1);
  const userMessages = state.messages.messages.filter(message => message.user === user)
  return {
    messages: userMessages,
    analytics: Object.assign({}, getAnalytics(userMessages),
    {
      topics: Object.keys(state.wordCount).map(key => ({ [key]:state.wordCount[key] } ))
      .sort((a, b) => b[Object.keys(b).join('')] - a[Object.keys(a).join('')])
      .slice(0,3)
      .map(pair => Object.keys(pair).join(''))
    }),
    users: state.engagement.slice().map(user => user.name).slice(0,3)
  }
};


export default connect(mapStateToProps)(UserNavbar);
