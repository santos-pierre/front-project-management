import React, { ElementType } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getRoute } from '../../routes/routes';
import { RootState } from '../../types/RooState';
import checkAuthenticate from '../../utils/isAuthenticate';

type GuardedRouteProps = {
    component: ElementType;
    path?: string;
    exact?: boolean;
};

function GuardedRoute({ component: Component, ...rest }: GuardedRouteProps) {
    let userState = useSelector((state: RootState) => {
        return state.user;
    });
    return (
        <Route
            {...rest}
            render={(props) =>
                userState.currentUser.isAuthenticated && checkAuthenticate() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={getRoute('login').path} />
                )
            }
        />
    );
}

export default GuardedRoute;
