// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import 'font-awesome/css/font-awesome.min.css';

import router from './router';
import store from './store/store';
import App from './App';
// import './assets/animate.css';
import { getToken, logout } from './common/auth';

axios
  .interceptors
  .request
  .use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

axios
  .interceptors
  .response
  .use(null, (error) => {
    if (error.response.status === 401) {
      logout();
      router.push({ path: '/login' });
    }
    return Promise.reject(error);
  });

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
