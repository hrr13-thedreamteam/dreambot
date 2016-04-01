import { connect } from 'react-redux';
import React from 'react';
import Navbar from '../components/Navbar';

const getAnalytics = (messages) => {
  let analytics = messages.reduce((acc, message) => {
    acc.totalSentiment += message.score;
    return acc;
  }, { totalSentiment: 0 });

  return analytics;
};

let mapStateToProps = (state) => {
  return {
    messages: state.messages.messages,
    analytics: Object.assign({}, getAnalytics(state.messages.messages),
    {
      topics: Object.keys(state.wordCount).map(key => ({ [key]:state.wordCount[key] } ))
      .sort((a, b) => b[Object.keys(b).join('')] - a[Object.keys(a).join('')])
      .slice(0,3)
      .map(pair => Object.keys(pair).join(''))
    }),
    users: state.engagement.slice().map(user => user.name).slice(0,3)
  }
};


export default connect(mapStateToProps)(Navbar);
