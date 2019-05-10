import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

// Load in the interceptor so all requests have this.
require('./services/auth.interceptors');

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
