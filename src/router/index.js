import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import ItemList from '../components/ItemList.vue'
import ItemDetail from '../components/ItemDetail.vue'
import AddUpdateItem from '../components/AddUpdateItem.vue'
import MyItems from '../components/MyItems.vue'
import * as firebase from '../firebase/config'
var firebaseAuth = firebase.firebaseAuth

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (user) {
            next({name: 'ItemList'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (user) {
            next({name: 'ItemList'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/item-list',
      name: 'ItemList',
      component: ItemList,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/item-detail/:item_id',
      name: 'ItemDetail',
      component: ItemDetail,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/add-item',
      name: 'AddItem',
      component: AddUpdateItem,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/update-item/:item_id',
      name: 'UpdateItem',
      component: AddUpdateItem,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/my-items',
      name: 'MyItems',
      component: MyItems,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    { path: '*', redirect: '/login' }
  ]
})
