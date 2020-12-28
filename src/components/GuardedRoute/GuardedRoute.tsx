import React, { ReactType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getRoute } from '../../routes/routes';

type GuardedRouteProps = {
    component: ReactType;
    auth: boolean;
    path?: string;
    exact?: boolean;
};

function GuardedRoute({
    component: Component,
    auth,
    ...rest
}: GuardedRouteProps) {
    return (
        <Route
            {...rest}
            render={(props) =>
                auth === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={getRoute('login').path} />
                )
            }
        />
    );
}

export default GuardedRoute;
