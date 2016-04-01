import React from 'react';
import { connect } from 'react-redux';

import BarGraph from '../components/BarGraph';
import { fetchCategories } from '../actions'


const QuestionContainer = React.createClass({
  // getDefaultProps() {
  //   return {
  //     year: moment().year(),
  //     month: moment().month() + 1,
  //     day: moment().date() - 2
  //   };
  // },

  componentDidMount() {
    this.props.dispatch(fetchCategories());
  },

  // getAverages(date) {
  //   const { year, month, day } = date;
  //   this.props.dispatch(getAveragesByHour({ year, month, day }));
  // },

  render() {
      // const { currentDate, averages } = this.props;
      // const labels = averages[currentDate] && averages[currentDate].map(obj => moment().hour(obj.group).format('hA'));
      // const data = averages[currentDate] && averages[currentDate].map(obj => obj.reduction);
    return (
      <div>
        <BarGraph labels={this.props.labels} data={this.props.data}/>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const {classifications} = state.classify.classify;
  return {
    labels: classifications.map(current => current.group),
    data: classifications.map(data => data.reduction)
  }
}

export default connect(mapStateToProps)(QuestionContainer);
