import React, { useCallback, useEffect, useState } from 'react';
import RouterSwitch from './components/RouterSwitch/RouterSwitch';
import cookiesClient from './api/cookies/cookiesClient';
import { UserType } from './types/UserType';
import { setCurrentUser } from './redux/user/userAction';
import { useDispatch } from 'react-redux';
import usersClient from './api/users/usersClient';
import checkAuthenticate from './utils/isAuthenticate';
import Loading from './components/Loading/Loading';

const App = () => {
    const dispatch = useDispatch();
    const [loading, setIsLoading] = useState(true);

    const setUser = useCallback(
        (user: UserType) => {
            dispatch(setCurrentUser(user));
        },
        [dispatch]
    );
    useEffect(() => {
        const authGithub = async () => {
            try {
                if (!checkAuthenticate()) {
                    const sanctum_token = await cookiesClient.cookies(
                        'SANCTUM_TOKEN'
                    );
                    localStorage.setItem('sanctum_token', sanctum_token.data);
                    const currentUser = await usersClient.currentUser({
                        headers: {
                            Accept: 'application/json',
                            Authorization: `Bearer ${sanctum_token.data}`,
                        },
                    });
                    setUser({
                        ...currentUser.data.user,
                        isAuthenticated: checkAuthenticate(),
                    });
                }
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        authGithub();
    }, [setUser]);

    return <div>{loading ? <Loading /> : <RouterSwitch />}</div>;
};

export default App;
