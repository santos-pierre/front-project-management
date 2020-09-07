import { RouteType } from "../types/RouteType";

const ROUTES = [
    {
        name: 'dashboard',
        path: '/',
        componentPath: 'Page/Dashboard/Dashboard.jsx',
        protected: true
    },
    {
        name: 'login',
        path: '/login',
        componentPath: 'Page/Login/Login.jsx',
        protected: false,
    },
    {
        name: 'register',
        path: '/register',
        componentPath: 'Page/Register/Register.jsx',
        protected: false
    }
]


const getAllRoutes = (): Array<RouteType> => {
    return ROUTES;
}

const getRoute = (name: string): RouteType => {
    return ROUTES.filter((route) => route.name === name)[0];
}

export { getAllRoutes, getRoute };