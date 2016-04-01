import React from 'react';
import QuestionsContainer from '../containers/QuestionsContainer'
import QuestionNavbarContainer from '../containers/QuestionNavbarContainer';
import LeftPanelContainer from '../containers/LeftPanelContainer';
import SearchBoxContainer from '../containers/SearchBoxContainer';
import QuestionMessageContainer from '../containers/QuestionMessageContainer';

const Questions = React.createClass({
  render: function () {
    return (
      <div className="container is-fluid">
        <QuestionNavbarContainer/>
        <h1 className="control">
          <SearchBoxContainer />
        </h1>
        <div className='columns'>
          <div className="column is-2">
            <LeftPanelContainer />
          </div>
          <div className="column is-text-centered">
            <QuestionsContainer />
          </div>
          <div className="column is-quarter">
            <QuestionMessageContainer />
          </div>
          </div>
      </div>
    );
  }
});


export default Questions;
