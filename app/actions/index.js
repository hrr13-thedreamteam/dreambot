import * as queries from './queries';
import { receiveMessages } from './messagesActions';

export * from './averagesActions';
export * from './notificationsActions';
export * from './userProfileActions';
export * from './messagesActions';
export * from './authActions';

export const requestSearch = query => ({ type: 'REQUEST_SEARCH', query });

// thunk action creators to enable async calls
// thunk returns functions instead of objects

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const requestCategories = () => ({ type: REQUEST_CATEGORIES });

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const receiveCategories = categories => ({ type: RECEIVE_CATEGORIES, categories });

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const fetchCategories = () => dispatch => {
  dispatch(requestCategories());
  return queries.getClassifications()
    .then(categoriesReceived => dispatch(receiveCategories(categoriesReceived)))
    .catch(err => console.log(err));
};


export const searchKeyword = (input) =>
  dispatch => queries.getSearchResults(input)
    .then(messagesReceived => dispatch(receiveMessages(messagesReceived)))
    .catch(err => console.log(err));

export const receiveMessageVolume = (groups) => (
  {
    type: 'RECEIVE_MESSAGE_VOLUME',
    groups,
  }
);

export const getMessageVolume = () => dispatch => {
  let today = new Date();
  let todaySpecs = {
    year: today.getYear() + 1900,
    month: today.getMonth() + 1,
    day: today.getDate()
  };
  return queries.getVolumeOfMessagesByHour(todaySpecs)
    .then(res => {
      dispatch(receiveMessageVolume(res));
    });
};

export const receiveWordCount = (dict) => (
  {
    type: 'RECEIVE_WORD_COUNT',
    words: dict
  }
)

export const getWordCount = () => dispatch => {
  return queries.getAllUniqueWords()
    .then(res => {
      let dictionary = {};
      res.forEach(word => {
        if (!dictionary[word]) {
          dictionary[word] = 1;
        } else {
          dictionary[word] = dictionary[word] + 1;
        }
      })
      dispatch(receiveWordCount(dictionary));
    });
};
export const receiveEngagementByUser = (count) => (
  {
    type: 'RECEIVE_ENGAGEMENT_BY_USER',
    count
  }
);

export const routeLocationDidUpdate = (location) => (
  {
    type: 'LOCATION_UPDATED',
    location,  
  }
);

export const getEngagementByUser = () => dispatch => {
  return queries.getUserMessageReduction()
    .then(res => {
      dispatch(receiveEngagementByUser(res));
    })
}
//
