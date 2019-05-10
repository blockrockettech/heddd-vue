import router from '../router';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {}, user: null};

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
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
                        // dispatch('alert/error', error, {root: true});
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
