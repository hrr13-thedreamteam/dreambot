import React from 'react';
import { connect } from 'react-redux';
import UserEngagement from '../components/UserEngagement';
import moment from 'moment';
// import d3 from 'd3';

// const GraphContainer = React.createClass({
//   render: function() {

//     return (
//       <Graph labels={this.props.labels} data={this.props.data} dataAvg={this.props.dataAvg}/>
//     )
//   }
// })

const mapStateToProps = (state) => {
  const url = window.location.href;
  const user = url.slice(url.lastIndexOf('/') + 1);
  let reverseState = Object.assign({}, state);
  const comparator = (a, b) => { return new Date(a.ts) - new Date(b.ts) };
  reverseState.messages.messages.sort(comparator);

  let messageByHours = [];

  for (var i = 0; i < 24; i ++) {
    messageByHours.push({ hour: i, count: 0 });
  }
  for(var i = 0; i < reverseState.messages.messages.length; i++){
    if(reverseState.messages.messages[i].user === user){
      messageByHours[reverseState.messages.messages[i].ts.getHours()].count ++;
    }
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
    barChartDatasets: messageByHours,
    labels: scoreByHours.map(message => message.hour),
    data: scoreByHours.map(message => message.averageScore),
    dataAvg: reverseState.messages.messages.map(message => message.comparative)
  };
};


export default connect(mapStateToProps)(UserEngagement);

