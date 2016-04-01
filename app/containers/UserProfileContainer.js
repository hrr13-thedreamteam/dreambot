import React from 'react';
import { getSingleUserMessageReduction } from '../actions/queries';
import { replaceProfile } from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import BarGraph from '../components/BarGraph';
import UserMessagesContainer from '../containers/UserMessagesContainer';
import UserNavbarContainer from '../containers/UserNavbarContainer';
import LeftPanelContainer from '../containers/LeftPanelContainer';
import SearchBoxContainer from '../containers/SearchBoxContainer';
import UserEngagementContainer from '../containers/UserEngagementContainer';


const UserProfileContainer = React.createClass({
  componentDidMount() {
    console.log('component mounted');
    getSingleUserMessageReduction(this.props.params.id)
      .then(data => this.props.dispatch(replaceProfile(data)))
      .catch(err => console.log(err));
  },

  render() {
    const { labels, data } = this.props;
    return (
      <div className="container is-fluid">
        <UserNavbarContainer/>
        <h1 className="control">
          <SearchBoxContainer />
        </h1>
        <div className='columns'>
          <div className="column is-2">
            <LeftPanelContainer />
          </div>
          <div className="column is-text-centered">
            <BarGraph labels={labels} data={data} width='200' height='125'/>
            <UserEngagementContainer />
          </div>
        <div className="column is-quarter">
            <UserMessagesContainer />
          </div>
        </div>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { profile } = state;
  const length = moment().endOf('month').date();
  let questionsByDay = [];
  for (var i = 1; i <= length; i ++) {
    questionsByDay.push({ group: i, reduction: 0 });
  }
  profile.forEach(item => {
    questionsByDay[item['group'] - 1].reduction = item['reduction'];
  });
  return {
    labels: questionsByDay.map((arr) => arr.group),
    data: questionsByDay.map((arr) => arr.reduction),
  }
}

export default connect(mapStateToProps)(UserProfileContainer);
  // const filled = profile
  //   .sort((a, b) => a.group - b.group)
  //   .reduce((prev, cur) => {
  //     let prevDay = prev[prev.length - 1] || 0;
  //   }, [])
