import axios from 'axios';
import TokenUtils from "./token.utils";

export default class AuthService {

    constructor(apiRoot = 'http://localhost:3000') {
        this.apiRoot = apiRoot;
    }

    getUser() {
        return axios
            .get(`${this.apiRoot}/auth/user`)
            .then((response) => {
                console.log("_onSuccess()", response.data);
                const user = response.data;

                // login successful if there's a jwt token in the response
                if (user.token) {
                    TokenUtils.setToken(user);
                }
                return user;
            });
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
            .then((response) => {
                console.log("_onSuccess()", response.data);
                const user = response.data;

                // login successful if there's a jwt token in the response
                if (user.token) {
                    TokenUtils.setToken(user);
                }
                return user;
            });
    }

    logout() {
        console.log("log out user");
        TokenUtils.clearToken();
    }

}
