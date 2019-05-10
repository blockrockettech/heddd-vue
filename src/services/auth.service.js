import axios from 'axios';
import {authHeader} from "./auth.header";

export default class AuthService {

    constructor(apiRoot = 'http://localhost:3000') {
        this.apiRoot = apiRoot;
    }

    getAll() {
        return axios
            .get(`${this.apiRoot}/users`, {
                headers: authHeader()
            })
            .then(this._handleResponse);
    }

    login(username, password) {

        const payload = JSON.stringify({username, password});

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };

        return axios.post(`${this.apiRoot}/auth/login`, payload, config)
            .catch((error) => {

                // Check if 401 then auto logout
                if (error.response.status === 401) {
                    this.logout();
                    location.reload();
                }

                // reject promise
                const failure = (error.response && error.response.data.message) || error.response.statusText;
                return Promise.reject(failure);
            })
            .then((response) => {
                const data = response.data;

                // If not valid
                if (response.status !== 200) {
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                return Promise.resolve(data);
            })
            .then(user => {
                // login successful if there's a jwt token in the response
                if (user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }

}
