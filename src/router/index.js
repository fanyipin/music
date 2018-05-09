import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const home = resolve => require(['@/views/Home'],resolve)
const recommend = resolve => require(['@/views/recommend'],resolve)
const hot_song = resolve => require(['@/views/hot_song'],resolve)
const search = resolve => require(['@/views/search'],resolve)
const playlist = resolve => require(['@/views/playlist'],resolve)
const song = resolve => require(['@/views/song'],resolve)

Vue.use(Router)

export default new Router({
  mode:'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children : [
        {
          redirect : 'recommend',
          path : '/'
        },
        {
          path:'/recommend',
          component:recommend
        },
        {
          path:'/hot',
          component:hot_song
        },
        {
          path:'/search',
          component:search
        }
      ]
    },
    {
      path : '/list/:id',
      component : playlist
    },
    {
      path : '/song/:id',
      component : song
    }

  ]
})
