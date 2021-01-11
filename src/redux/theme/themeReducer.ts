import { themeTypes, ThemeActionTypes, ThemeState } from './themeTypes';

const INITIAL_STATE: ThemeState = {
    value: 'light',
};

const themeReducer = (
    state = INITIAL_STATE,
    action: ThemeActionTypes
): ThemeState => {
    switch (action.type) {
        case themeTypes.TOOGLE_THEME:
            return { ...state, value: action.payload };
        default:
            return state;
    }
};

export default themeReducer;
