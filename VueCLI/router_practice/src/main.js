import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  next();
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
