import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Character from '@/components/Character'

Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:pageId',
      name: 'Character',
      component: Character
    }
  ]
})
