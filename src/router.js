import Vue from 'vue';
import * as _ from 'lodash';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Verify from './views/Verify';
import Login from './views/Login';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                requiresLogin: false
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                requiresLogin: false
            }
        },
        {
            path: '/verify',
            name: 'verify',
            component: Verify,
            meta: {
                requiresLogin: true
            }
        },
        {
            path: '/about',
            name: 'about',
            meta: {
                requiresLogin: false
            },
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    // const publicPages = ['/login'];

    // check if the page requires login, assumes not if not set
    const authRequired = _.get(to.meta, 'requiresLogin', false);

    // Find the logged in user
    const loggedIn = localStorage.getItem('user');

    // If the route requires login and no user found, redirect to login
    if (authRequired && !loggedIn) {
        return next({
            path: '/login',
            query: {
                // set the path you are trying to go to in order to redirect you after auth
                redirect: to.name
            }
        });
    }

    // invoke the next route if validation not required
    next();
});


export default router;
