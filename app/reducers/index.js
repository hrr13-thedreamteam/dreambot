import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import messages from './messagesReducer';
import searchBox from './SearchBoxReducer';
import averages from './averagesReducer';
import notifications from './notificationsReducer';
import wordCount from './wordCountReducer';
import classify from './questionReducer';
import engagement from './engagementReducer';
import profile from './userProfileReducer';
import cohortProfiles from './cohortProfilesReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  routing,
  messages,
  searchBox,
  averages,
  notifications,
  wordCount,
  classify,
  engagement,
  profile,
  cohortProfiles,
  auth
});

export default rootReducer;

