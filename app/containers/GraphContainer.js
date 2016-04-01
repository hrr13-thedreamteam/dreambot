import React from 'react';
import { connect } from 'react-redux';
import Graph from '../components/Graph';
import moment from 'moment';

const mapStateToProps = (state) => {
  let reverseState = Object.assign({}, state);
  const comparator = (a, b) => { return new Date(a.ts) - new Date(b.ts) };
  reverseState.messages.messages.sort(comparator);

  let messageByHours = [];

  for (var i = 0; i < 24; i ++) {
    messageByHours.push({ hour: i, count: 0 });
  }
  for(var i = 0; i < reverseState.messages.messages.length; i++){
    messageByHours[reverseState.messages.messages[i].ts.getHours()].count ++;
  }

  let scoreByHours = [];

  const year = moment().year();
  const month = moment().month() + 1;
  const day = moment().date();
  const key = `${year}-${month}-${day}`;

  // prevent crashing
  if (reverseState.averages.byHour.available[key]) {
    let scoreData = reverseState.averages.byHour.available[key].data;
    for (var i = 0; i < 24; i ++) {
      scoreByHours.push({ hour: i, averageScore: 0 });
    }

    for(var i = 0; i < scoreData.length; i++){
      scoreByHours[scoreData[i].group].averageScore = scoreData[i].reduction;
    }
  }
  return {
    barChartDatasets: messageByHours.map(message => message.count),
    labels: scoreByHours.map(message => message.hour),
    data: scoreByHours.map(message => message.averageScore),
    dataAvg: reverseState.messages.messages.map(message => message.comparative)
  };
};


export default connect(mapStateToProps)(Graph);

