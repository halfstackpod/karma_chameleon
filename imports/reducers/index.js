import { combineReducers } from 'redux';
import karmaReducer from './karmaReducer';

export default combineReducers({
    karma: karmaReducer
});