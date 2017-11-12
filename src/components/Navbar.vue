<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a href="" class="navbar-brand" v-on:click="goToHome">Freebies</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse" v-if="isLoggedIn" >
          <ul class="nav navbar-nav">
            <li class="active"><a href="" v-on:click="goToAddItem">+ Add Item</a></li>
            <li class="active"><a href="" v-on:click="goToMyItems">My Items</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="" v-on:click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>

</template>

<script>
import * as firebase from '../firebase/config'
var firebaseAuth = firebase.firebaseAuth

export default {
  name: 'Navbar',
  data () {
    return {
      isLoggedIn: false
    }
  },
  created: function () {
    var self = this
    firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        self.isLoggedIn = true
      } else {
        self.isLoggedIn = false
      }
    })
  },
  methods: {
    goToHome: function (event) {
      event.preventDefault()
      this.$router.push({name: 'Login'})
    },
    goToAddItem: function (event) {
      event.preventDefault()
      this.$router.push({name: 'AddItem'})
    },
    goToMyItems: function (event) {
      event.preventDefault()
      this.$router.push({name: 'MyItems'})
    },
    logout: function (event) {
      event.preventDefault()
      console.log('logout clicked!')
      var self = this
      firebaseAuth.signOut().then(function(response) {
        console.log(response)
        // Sign-out successful.
        self.$router.push({name: 'Login'})
      }).catch(function(err) {
        console.log(err);
        // An error happened.
      });
    }
  }
}

</script>

<style scoped>

</style>
