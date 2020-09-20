import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getRoute } from '../../routes/routes';
import Dashboard from '../Page/Dashboard/Dashboard';
import Login from '../Page/Login/Login';
import Register from '../Page/Register/Register';
import GuardedRoute from '../GuardedRoute/GuardedRoute';
import PropsTypes, { InferProps } from "prop-types";


function RouterSwitch({ isAuth }: InferProps<typeof RouterSwitch.propsTypes>) {
    return (
        <Switch>
            <GuardedRoute component={Dashboard} path={getRoute('dashboard').path} exact auth={isAuth} />
            <Route path={getRoute('login').path}>
                {isAuth ? <Redirect to={getRoute('dashboard').path} /> : <Login />}
            </Route>
            <Route path={getRoute('register').path}>
                {isAuth ? <Redirect to={getRoute('dashboard').path} /> : <Register />}
            </Route>
        </Switch>
    )
}

RouterSwitch.propsTypes = {
    isAuth: PropsTypes.bool.isRequired
}

export default RouterSwitch;