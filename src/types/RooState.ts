import { UserState } from '../redux/user/userTypes';
import { ThemeState } from '../redux/theme/themeTypes';

export interface RootState {
    user: UserState;
    theme: ThemeState;
}
