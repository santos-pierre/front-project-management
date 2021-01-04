import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getRoute } from '../../routes/routes';
import Dashboard from '../Page/Dashboard/Dashboard';
import Login from '../Page/Login/Login';
import Register from '../Page/Register/Register';
import GuardedRoute from '../GuardedRoute/GuardedRoute';
import Show from '../Page/Dashboard/Projects/Show';
// import Sandbox from '../Page/Sandbox/Sandbox';
import Create from '../Page/Dashboard/Projects/Create';
import Edit from '../Page/Dashboard/Projects/Edit';
import Profile from '../Page/Profile/Profile';
import Page404 from '../Page/404/404';
import checkAuthenticate from '../../utils/isAuthenticate';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/RooState';

const RouterSwitch = () => {
    let userState = useSelector((state: RootState) => {
        return state.user;
    });
    return (
        <Switch>
            <GuardedRoute
                component={Dashboard}
                path={getRoute('dashboard').path}
                exact
            />
            <GuardedRoute
                component={Create}
                path={getRoute('projects-create').path}
                exact
            />
            <GuardedRoute
                component={Show}
                path={getRoute('projects-show').path}
                exact
            />
            <GuardedRoute
                component={Edit}
                path={getRoute('projects-edit').path}
                exact
            />
            <GuardedRoute
                component={Profile}
                path={getRoute('profile').path}
                exact
            />
            <Route path={getRoute('login').path}>
                {userState.currentUser.isAuthenticated &&
                checkAuthenticate() ? (
                    <Redirect to={getRoute('dashboard').path} />
                ) : (
                    <Login />
                )}
            </Route>
            <Route path={getRoute('register').path}>
                {userState.currentUser.isAuthenticated &&
                checkAuthenticate() ? (
                    <Redirect to={getRoute('dashboard').path} />
                ) : (
                    <Register />
                )}
            </Route>
            {/* <Route path={'/test'}>
                <Sandbox />
            </Route> */}
            <Route component={Page404} path={'/404'} />
            <Route component={Page404} />
        </Switch>
    );
};

export default RouterSwitch;
