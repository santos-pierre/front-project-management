import { userTypes } from './userTypes';
import { UserType } from '../../types/UserType';

export const setCurrentUser = (user: UserType) => {
    return {
        type: userTypes.SET_CURRENT_USER,
        payload: user,
    };
};
