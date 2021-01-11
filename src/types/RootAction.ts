import { ThemeActionTypes } from '../redux/theme/themeTypes';
import { UserActionTypes } from '../redux/user/userTypes';
export type RootAction = UserActionTypes | ThemeActionTypes;
