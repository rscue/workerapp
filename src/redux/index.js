import { combineReducers } from 'redux';

export default combineReducers({
    auth: require('./AuthRedux').reducer,
    profile: require('./ProfileRedux').reducer,
});