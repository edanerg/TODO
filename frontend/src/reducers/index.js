import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import userReducer from './userReducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  taskStates: taskReducer,
  userStates: userReducer,
  loadingBar: loadingBarReducer
});
