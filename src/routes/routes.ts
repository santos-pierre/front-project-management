import { RouteType } from "../types/RouteType";

const ROUTES: Array<RouteType> = [
    // Auth Routes
    {
        name: 'login',
        path: '/login',
        componentPath: 'Page/Login/Login.tsx',
        protected: false,
    },
    {
        name: 'register',
        path: '/register',
        componentPath: 'Page/Register/Register.tsx',
        protected: false
    },
    //Dashboard Routes
    {
        name: 'dashboard',
        path: '/',
        componentPath: 'Page/Dashboard/Dashboard.tsx',
        protected: true
    },
    //Projects Routes
    {
        name: 'projects-create',
        path: '/projects/create',
        componentPath: 'Page/Dashboard/Projects/Create.tsx',
        protected: true
    },
    {
        name: 'projects-edit',
        path: '/projects/edit/:slug',
        componentPath: 'Page/Dashboard/Projects/Edit.tsx',
        protected: true
    },
    {
        name: 'projects-show',
        path: '/projects/:slug',
        componentPath: 'Page/Dashboard/Projects/Show.tsx',
        protected: true,
    },
    //End Project Routes
    {
        name: 'profile',
        path: '/profile',
        componentPath: 'Page/Dashboard/Projects/Create.tsx',
        protected: true
    },
]


const getAllRoutes = (): Array<RouteType> => {
    return ROUTES;
}


const getRoute = (name: string, params?: object): RouteType => {
    let route = ROUTES.filter((route) => route.name === name)[0];
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            route = { ...route, path: route.path.replace(`:${key}`, value) };
        }
    }
    return route;
}

export { getAllRoutes, getRoute };