import { connect } from 'react-redux';
import React from 'react';
import QuestionNavbar from '../components/QuestionNavbar';

const getAnalytics = (messages) => {
  let analytics = messages.reduce((acc, message) => {
    acc.totalSentiment += message.score;
    return acc;
  }, { totalSentiment: 0 });

  return analytics;
};

let mapStateToProps = (state) => {
  return {
    messages: state.messages.messages.filter(message => message['classification'] !== undefined),
    analytics: Object.assign({}, getAnalytics(state.messages.messages),
    {
      topics: state.classify.classify.classifications
        .map(classification => [classification.group, classification.reduction])
        .sort((a,b) => b[1] - a[1]).splice(0,3)
        .map(topic => topic[0])
    }),
    users: state.engagement.slice().map(user => user.name).slice(0,3)
  }
};


export default connect(mapStateToProps)(QuestionNavbar);
