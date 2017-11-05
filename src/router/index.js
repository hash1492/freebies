import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import ItemList from '../components/ItemList.vue'
import ItemDetail from '../components/ItemDetail.vue'
import AddUpdateItem from '../components/AddUpdateItem.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/item-list',
      name: 'ItemList',
      component: ItemList
    },
    {
      path: '/item-detail/:item_id',
      name: 'ItemDetail',
      component: ItemDetail
    },
    {
      path: '/add-item',
      name: 'AddItem',
      component: AddUpdateItem
    },
    {
      path: '/update-item/:item_id',
      name: 'UpdateItem',
      component: AddUpdateItem
    },
    { path: '*', redirect: '/login' }
  ]
})
