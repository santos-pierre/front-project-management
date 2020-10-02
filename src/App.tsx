import React, { useEffect, useCallback, useState } from 'react';
import RouterSwitch from './components/RouterSwitch/RouterSwitch';
import usersClient from './api/users/usersClient';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './types/RooState';
import { UserType } from './types/UserType';
import { setCurrentUser } from "./redux/user/userAction";
import Loading from './components/Loading/Loading';

const App = () => {
  const currentUser = useSelector(((state: RootState) => state.user.currentUser));
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const setUser = useCallback((user: UserType) => {
    dispatch(setCurrentUser(user));
  }, [dispatch]);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        // Check in store first if the user is logged, reducing useless API call
        if (currentUser.isAuthenticated) {
          setIsLoading(true);
        } else {
          // If user deleted localstorage try to connect him with cookie session and rehydrate the store
          const response = await usersClient.currentUser();
          console.log(response);
          setUser({ name: response.data.name, email: response.data.email, isAuthenticated: true });
          setIsLoading(true);
        }
      } catch (error) {
        setIsLoading(true);
      }
    }
    getCurrentUser();
  });

  return (
    <div>
      {isLoading ? <RouterSwitch isAuth={currentUser.isAuthenticated} /> : <Loading />}
    </div>
  );
}

export default App;
