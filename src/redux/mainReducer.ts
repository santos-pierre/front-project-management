import { combineReducers } from 'redux';

import userReducer from './user/userReducer';

const mainReducer = combineReducers({
    user: userReducer,
});

export default mainReducer;
