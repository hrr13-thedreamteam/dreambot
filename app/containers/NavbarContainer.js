import {connect} from 'react-redux';
import React from 'react';
import Navbar from '../components/Navbar';

let NavbarContainer = React.createClass({
  render() {
    const { messages } = this.props;
    return (
      <Navbar messages={messages}/>
      )
  }
})

let mapStateToProps = (state) => {
  return state;
  // return {
  //   messages: state.messages
  // }
}

export default connect(mapStateToProps)(NavbarContainer)