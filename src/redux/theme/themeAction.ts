import { themeTypes } from './themeTypes';

export const toogleTheme = (theme: string) => {
    return {
        type: themeTypes.TOOGLE_THEME,
        payload: theme,
    };
};
