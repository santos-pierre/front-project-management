import { userTypes, UserActionTypes, UserState } from './userTypes';

const INITIAL_STATE: UserState = {
    currentUser: {
        name: undefined,
        email: undefined,
        isAuthenticated: false,
    }
}

const userReducer = (state = INITIAL_STATE, action: UserActionTypes): UserState => {
    switch (action.type) {
        case userTypes.SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
}


export default userReducer;