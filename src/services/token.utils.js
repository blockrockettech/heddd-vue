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

export default {
    clearToken,
    setToken,
};
