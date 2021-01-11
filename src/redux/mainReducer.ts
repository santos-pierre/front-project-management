import { combineReducers } from 'redux';
import themeReducer from './theme/themeReducer';
import userReducer from './user/userReducer';

const mainReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

export default mainReducer;
