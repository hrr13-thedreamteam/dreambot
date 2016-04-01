import { connect } from 'react-redux';
import React from 'react';
import SearchBox from '../components/SearchBox';
import { searchKeyword, disableFilterMessages } from '../actions/index';

const detectChange = () => {
  console.log('Detecting changes...');
}

const mapStateToProps = (state) => {
  return {
    filteredUsername: state.searchBox.inputField
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    detectChange,
    disableFilter() {
      dispatch(disableFilterMessages());
    },
    handleKeyPress: (input) => {
      if (input) {
        dispatch(searchKeyword(input))
        .then(() => {
        })
        .catch(err => {
          console.log(err);
        })
        // dispatch(filterMessages(input));
      } else if (!input.length){
        console.log('no length')
        dispatch(disableFilterMessages())
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
