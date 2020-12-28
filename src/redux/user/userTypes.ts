import { UserType } from '../../types/UserType';

export const userTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

interface SetCurrentUser {
    type: typeof userTypes.SET_CURRENT_USER;
    payload: UserType;
}

export interface UserState {
    currentUser: UserType;
}

export type UserActionTypes = SetCurrentUser;
