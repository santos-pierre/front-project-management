export const themeTypes = {
    TOOGLE_THEME: 'TOOGLE_THEME',
};

interface toogleTheme {
    type: typeof themeTypes.TOOGLE_THEME;
    payload: string;
}

export interface ThemeState {
    value: string;
}

export type ThemeActionTypes = toogleTheme;
