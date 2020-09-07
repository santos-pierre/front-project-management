import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { getRoute } from '../../routes/routes';
import Dashboard from '../Page/Dashboard/Dashboard';
import Login from '../Page/Login/Login';
import Register from '../Page/Register/Register';


export default () => {
    return (
        <Switch>
            <Route path={getRoute('dashboard').path} exact>
                <Dashboard />
            </Route>
            <Route path={getRoute('login').path}>
                <Login />
            </Route>
            <Route path={getRoute('register').path}>
                <Register />
            </Route>
        </Switch>
    )
}