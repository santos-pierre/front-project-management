import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toogleTheme } from '../../../../../redux/theme/themeAction';
import { currentTheme } from '../../../../../redux/theme/themeSelectors';
import { currentUser } from '../../../../../redux/user/userSelectors';

type MenuMobileProps = {
    isOpen: boolean;
    links: any;
    handleLogout: Function;
};

const MenuMobile = ({ isOpen, links, handleLogout }: MenuMobileProps) => {
    const dispatch = useDispatch();
    const user = useSelector(currentUser);
    const theme = useSelector(currentTheme);
    const setTheme = useCallback(
        (theme: string) => dispatch(toogleTheme(theme)),
        [dispatch]
    );

    return (
        <div className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-2">
                <Link
                    to={links.home.href}
                    className="block px-3 py-2 text-base font-medium text-teal-200 rounded-md hover:text-teal-100 hover:bg-teal-600"
                >
                    Dashboard
                </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-teal-600">
                <div className="px-2">
                    {!user.github_account && (
                        <Link
                            to={links.profile.href}
                            className="block px-3 py-2 text-base font-medium text-teal-200 rounded-md hover:text-teal-100 hover:bg-teal-600"
                        >
                            Your Profile
                        </Link>
                    )}
                    <span
                        className="flex justify-between px-3 py-2 text-base font-medium text-teal-200 rounded-md cursor-pointer hover:text-teal-100 hover:bg-teal-600"
                        role="menuitem"
                        onClick={
                            theme === 'dark'
                                ? () => setTheme('light')
                                : () => setTheme('dark')
                        }
                    >
                        {theme === 'dark' ? (
                            <>
                                Light Theme
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </>
                        ) : (
                            <>
                                Dark Theme
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            </>
                        )}
                    </span>
                    <span
                        className="block px-3 py-2 text-base font-medium text-teal-200 rounded-md cursor-pointer hover:text-teal-100 hover:bg-teal-600"
                        onClick={() => handleLogout()}
                    >
                        Log Out
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MenuMobile;
