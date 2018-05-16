import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Home from '@/components/Home'
import List from '@/components/List'
import Form from '@/components/Form'
import Table from '@/components/Table'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
    	path: '/login',
    	component: Login,
    	name: 'login'
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      children: [
        {
          path: 'list',
          component: List,
          name: 'list'
        },
        {
          path: 'table',
          component: Table,
          name: 'table'
        },
        {
          path: 'form',
          component: Form,
          name: 'form'
        }
      ]
    }
  ]
})
