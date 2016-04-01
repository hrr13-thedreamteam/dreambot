import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Graph from '../components/Graph';
import Selector from '../components/Selector';

import { getHoursIfNeeded, notify } from '../actions';

const AveragesContainer = React.createClass({
  componentDidMount() {
    // Grab today's date by default
    this.props.dispatch(getHoursIfNeeded({
      year: moment().year(),
      month: moment().month() + 1,
      day: moment().date()
    }));
  },

  getAverages(date) {
    const { year, month, day } = date;
    if (!year || !month || !day ) {
      return this.props.dispatch(notify('You must enter a year, month, and day', 'error'));
    }
    this.props.dispatch(getHoursIfNeeded(date));
  },

  render() {
    const { labels, data } = this.props;
    return (
      <div>
        <Selector onSubmit={this.getAverages} />
        <Graph labels={labels} data={data} />
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { available } = state.averages.byHour
  const { year, month, day } = state.averages.byHour.displayedDate;
  const key = `${year}-${month}-${day}`;
  return {
    labels: available[key] && available[key].data.map(obj => moment().hour(obj.group).format('hA')),
    data: available[key] && available[key].data.map(obj => obj.reduction),
  };
}

export default connect(mapStateToProps)(AveragesContainer);
