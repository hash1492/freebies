<template>
  <div>
    <div class="container">
      <h1>Login</h1>
      <form class="form-signin">
        <div class="form-group">
          <label>Email address</label>
          <input type="email" v-model="user.email" class="form-control" placeholder="Email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="user.password" v-on:keyup.enter="login" class="form-control" placeholder="Password">
        </div>
        <button type="button" class="btn btn-primary" v-on:click="login()">Login</button>
        <br><br>
        <div>
          <router-link to="/register">New user? Register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
import * as firebase from '../firebase/config'
var firebaseAuth = firebase.firebaseAuth

  export default {
    name: 'Login',
    data () {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login: function () {
        var self = this
        if (!this.user.email || !this.user.password) {
          self.$notify({
            group: 'foo',
            title: 'Email or Password missing',
            text: 'Please enter both email and password'
          });
          return 0
        }
        firebaseAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(function (response) {
          console.log(response)
          self.$notify({
            group: 'foo',
            title: 'Welcome',
            text: 'Hello ' + self.user.email + '!'
          });
          self.$router.push({name: 'ItemList'})
        })
        .catch(function (err) {
          console.log(err)
          switch (err.code) {
            case 'auth/invalid-email':
              self.$notify({
                group: 'foo',
                type: 'error',
                title: 'Invalid email',
                text: 'The email address is badly formed'
              });
              self.user.email = ''
              self.user.password = ''
              break
            case 'auth/user-not-found':
              self.$notify({
                group: 'foo',
                type: 'error',
                title: 'User not found',
                text: 'The user with this email was not found'
              });
              self.user.email = ''
              self.user.password = ''
              break
            case 'auth/wrong-password':
              self.$notify({
                group: 'foo',
                type: 'error',
                title: 'Incorrect Password',
                text: 'The password entered for this user is incorrect'
              });
              self.user.password = ''
              break
            default:
          }
        })
      }
    }
  }
</script>
<style>
.form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
</style>
