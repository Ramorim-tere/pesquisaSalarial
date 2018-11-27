import Vue from 'vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Respostas from './components/Respostas.vue'
var VueCookie = require('vue-js-cookie');
Vue.use(VueCookie);

const routes = {
  '/': Login,
  '/register': Register,
  '/respostas': Respostas,
}

new Vue({
  el: '#login',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent: function () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render: function (h) { return h(this.ViewComponent) }
})
