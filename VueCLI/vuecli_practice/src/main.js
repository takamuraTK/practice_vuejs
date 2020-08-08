import Vue from 'vue'
import App from './App.vue'
import LikeNumber from './components/LikeNumber.vue'

Vue.config.productionTip = false
Vue.component('LikeNumber', LikeNumber)
Vue.directive("border", function (el, binding) {
  el.style.border = "solid black 2px";
  el.style.borderWidth = binding.value.width;
  el.style.borderColor = binding.value.color;
  el.style.borderStyle = binding.arg;
  if (binding.modifiers.round) {
    el.style.borderRadius = "0.5rem"
  }
  if (binding.modifiers.shadow) {
    el.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.26)"
  }
});
Vue.filter("upperCase", function (value) {
  return value.toUpperCase();
})

new Vue({
  render: h => h(App),
}).$mount('#app')
