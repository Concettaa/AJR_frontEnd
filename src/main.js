import Vue from 'vue';
import App from './App.vue';
import vuetify from "@/plugins/vuetify";
import router from "./router";
import axios from 'axios';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCode } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@mdi/font/css/materialdesignicons.css'

// library.add(faCode);
// Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
