import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
var home = function home(resolve) {
  return require(['@/views/Home'], resolve);
};
var recommend = function recommend(resolve) {
  return require(['@/views/recommend'], resolve);
};
var hot_song = function hot_song(resolve) {
  return require(['@/views/hot_song'], resolve);
};
var search = function search(resolve) {
  return require(['@/views/search'], resolve);
};
var playlist = function playlist(resolve) {
  return require(['@/views/playlist'], resolve);
};

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: home,
    children: [{
      redirect: 'recommend',
      path: '/'
    }, {
      path: '/recommend',
      component: recommend
    }, {
      path: '/hot',
      component: hot_song
    }, {
      path: '/search',
      component: search
    }]
  }, {
    path: '/list/:id',
    component: playlist
  }]
});

//# sourceMappingURL=index-compiled.js.map