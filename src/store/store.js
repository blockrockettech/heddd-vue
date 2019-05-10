import Vue from 'vue';
import Vuex from 'vuex';

import {authentication} from './authentication';
import {users} from './users';

import HeddService from '../services/hedd.service';
import AuthService from "../services/auth.service";

Vue.use(Vuex);

const MOCK_API = 'http://127.0.0.1:3000';

export default new Vuex.Store({

    // Add different modules to the store, these will be name space by name e.g. `users.user`
    modules: {
        authentication,
        users
    },
    state: {
        guid: null,
        // FIXME - define alternative
        // Not an ideal pattern but we bootstrap the services here
        heddService: new HeddService(MOCK_API),
        authService: new AuthService(MOCK_API),
    },
    mutations: {
        setEnquiryUuid(state, guid) {
            state.guid = guid;
        },
        storeResult(state, results) {
            state.results = results;
        },
    },
    actions: {
        async enquiry({commit}, formData) {
            console.log(`GUID`, formData);

            const enquiry = await this.state.heddService.createEnquiry(formData);

            commit('setEnquiryUuid', enquiry['enquiry-guid']);
        },
        async lookupResult({commit, state}) {
            console.log(`Looking up results`, state.guid);

            this.state.heddService.queryEnquiry(state.guid)
                .then((data) => {
                    commit('storeResult', data);
                });
        },
    }
});
