import React from 'react';
import { connect } from 'react-redux';
import Messages from '../components/Messages';

const MessagesContainer = React.createClass({
  render: function() {
    return (
      <Messages messages={this.props.messages}/>
    )
  }
})

const mapStateToProps = (state) => {
  return state;
}

const GetMessages = connect(mapStateToProps)(MessagesContainer);

export default GetMessages;