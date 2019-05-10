const jwtDecode = require('jwt-decode');

const clearToken = () => {
    console.log("Clearing user token");
    // remove user from local storage to log user out
    localStorage.removeItem('user');
};

const setToken = (user) => {
    console.log("Setting user token");
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));
};


const getToken = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user", user);

    if (user) {
        console.log(jwtDecode(user.token));
        return {
            ...user,
            ...jwtDecode(user.token)
        }
    }

    return user;
};


export default {
    clearToken,
    setToken,
    getToken,
};
