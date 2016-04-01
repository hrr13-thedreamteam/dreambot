import React from 'react';
import { connect } from 'react-redux';
import Cohort from '../components/Cohort';
import { receiveCohortProfiles, sortUsersByEngagement, sortUserByMessageLenAction } from '../actions/userProfileActions';
import { queryCohortProfiles, queryUserMessagesById } from '../actions/queries';
import LeftPanelContainer from '../containers/LeftPanelContainer';
import { getWordCountByUser } from '../actions/userProfileActions';

let CohortContainer = React.createClass({
  componentWillMount() {
    this.props.getCohort();
    this.props.handleWordCountByUser();
  },
  handleWordCountByUser() {
    this.props.sortWordCountByUser(this.props.members, this.props.profiles, this.props.orderByDesc);
    this.forceUpdate();
  },
  handleTerseRanking() {
    this.props.sortUserByMessageLen(this.props.members, this.props.profiles, this.props.orderByDesc);
    this.forceUpdate();
  },
  render() {
    let navbarStyle = 'navbar-item button is-large is-info is-outlined';
    return (
      <div className="container is-fluid">
        <nav className="navbar">
          <p className={navbarStyle} onClick={this.handleWordCountByUser}><a>Most Engaged</a></p>
          <p className={navbarStyle}><a>Most Emoji'ed</a></p>
          <p className={navbarStyle} onClick={this.handleTerseRanking}><a>Most Terse</a></p>
        </nav>
        <div className="columns">
          <div className="column is-2">
            <LeftPanelContainer />
          </div>
          <div className="column">
            <Cohort
              members={this.props.members}
              profiles={this.props.profiles}
            />
          </div>
        </div>
      </div>
      );
  }
});

let mapStateToProps = (state) => {
  state.cohortProfiles.wordCount.forEach(member => {
    if (state.cohortProfiles.profiles[member.group]) {
      state.cohortProfiles.profiles[member.group].wordCount = member.reduction;
    }
  });


  return { profiles: state.cohortProfiles.profiles, members: state.cohortProfiles.members, orderByDesc: state.cohortProfiles.orderByDesc };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getCohort() {
      let profileObj = {
        members: [],
        profiles: {}
      };
      // FIXME: Colton's "U0S27FI8Z" User ID does not match with his "U0S1PNSBY" ID in db
      queryCohortProfiles(data => {
        profileObj.members = data.data.members;
        data.data.profiles.forEach(student => {
          profileObj.profiles[student.id] = student;
        });
        queryUserMessagesById()
        .then(res => {
          res.forEach(user => {
            if (profileObj.profiles[user.group]) {
              profileObj.profiles[user.group].messagesCount = user.reduction;
            }
          });
          dispatch(receiveCohortProfiles(profileObj));
        })
        .catch(err => console.log(err));
      });
    },
    handleWordCountByUser() {
      dispatch(getWordCountByUser());
    },
    sortWordCountByUser(members, profiles, sortByDesc) {
      dispatch(sortUsersByEngagement(members, profiles,'wordCount'));
    },
    sortUserByMessageLen(members, profiles, sortByDesc) {
      dispatch(sortUserByMessageLenAction(members, profiles,'terse'));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CohortContainer);

// export default connect(mapStateToProps, mapDispatchToProps)(Cohort);
