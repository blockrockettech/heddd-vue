import TokenUtils from "./token.utils";

const axios = require('axios');


// Set global axios Request interceptor so all outbound requests set the Bearer if one is found
axios.interceptors.request.use(
    (config) => {

        // TODO handle token expiration here

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = 'Bearer ' + user.token;
        }
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Set global axios Response interceptor
axios.interceptors.response.use(
    (response) => {
        // Do nothing is its successful
        return response;
    },
    (error) => {
        console.log("_onFailure()", error.response.status, error.response.data);

        // Check if 401 then auto logout
        if (error.response.status === 401) {
            TokenUtils.clearToken();
            location.reload();
        }

        return Promise.reject(error);
    }
);
