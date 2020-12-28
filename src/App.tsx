import React, { useEffect, useCallback, useState } from 'react';
import RouterSwitch from './components/RouterSwitch/RouterSwitch';
import usersClient from './api/users/usersClient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './types/RooState';
import { UserType } from './types/UserType';
import { setCurrentUser } from './redux/user/userAction';
import Loading from './components/Loading/Loading';
import { useHistory } from 'react-router-dom';

const App = () => {
    const currentUser = useSelector(
        (state: RootState) => state.user.currentUser
    );
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const setUser = useCallback(
        (user: UserType) => {
            dispatch(setCurrentUser(user));
        },
        [dispatch]
    );

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await usersClient.currentUser();
                setUser({
                    name: response.data.name,
                    email: response.data.email,
                    photo: response.data.photo,
                    isAuthenticated: true,
                });
                setIsLoading(true);
            } catch (error) {
                if (error.status === 401) {
                    setUser({
                        name: undefined,
                        email: undefined,
                        isAuthenticated: false,
                    });
                    setIsLoading(true);
                }
            }
        };
        getCurrentUser();
    }, [setUser, history]);

    return (
        <div>
            {isLoading ? (
                <RouterSwitch isAuth={currentUser.isAuthenticated} />
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default App;
