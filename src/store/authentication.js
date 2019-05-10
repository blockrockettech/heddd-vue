import router from '../router';
import TokenUtils from "../services/token.utils";

const user = TokenUtils.getToken();

const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {}, user: null};

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        getUser({commit, rootState}) {
            rootState.authService.getUser()
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push('/');
                    },
                    error => {
                        commit('loginFailure', error);
                    }
                );
        },
        login({dispatch, commit, rootState}, {username, password, redirect}) {
            commit('loginRequest', {username});

            rootState.authService.login(username, password)
                .then(
                    user => {
                        commit('loginSuccess', user);
                        router.push(redirect);
                    },
                    error => {
                        commit('loginFailure', error);
                    }
                );
        },
        logout({commit, rootState}) {
            rootState.authService.logout();
            commit('logout');
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = {loggingIn: true};
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = {loggedIn: true};
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
};
