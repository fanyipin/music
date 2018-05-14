// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import adapt from './assets/js/adapt';
adapt();

import './assets/css/public.css'
import 'font-awesome/css/font-awesome.css'  //字体图标

import axios from 'axios';
Vue.prototype.$http = axios ;

import store from './store';

Vue.filter('toBillion', function(value){
  return (value / 10000).toFixed(2)
})
Vue.filter('two', function(value){
  return value < 10 ? '0' + value : value
})

Vue.directive('title', {
  update: function (el, binding) {
    document.title = binding.value;
    console.log(98)
  },
  inserted: function (el, binding) {
    document.title = binding.value;
    console.log(98)
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
