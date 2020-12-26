import Vue from 'vue';
import App from './App.vue';
import 'materialize-css/dist/js/materialize.min';
import 'vue2-timepicker/dist/VueTimepicker.common';
import VueRouter from 'vue-router';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false

Vue.use(VueRouter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
