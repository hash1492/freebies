<template>
  <div>
    <div class="container">
      <h1>Register</h1>
      <form class="form-signin">
        <div class="form-group">
          <label>Email address</label>
          <input type="email" v-model="user.email" class="form-control" placeholder="Email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="user.password" class="form-control" placeholder="Password">
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input type="password" v-model="user.confirm_password" class="form-control" placeholder="Confirm Password">
        </div>
        <button type="button" class="btn btn-info" v-on:keyup.enter="register" v-on:click="register()">Register</button>
        <br><br>
        <div>
          <router-link to="/login">Existing user? Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import * as firebase from '../firebase/config'
  var firebaseAuth = firebase.firebaseAuth

  export default {
    name: 'Register',
    data () {
      return {
        user: {
          email: '',
          password: '',
          confirm_password: ''
        }
      }
    },
    methods: {
      register: function () {
        var self = this
        if (!this.user.email || !this.user.password) {
          self.$notify({
            group: 'foo',
            type: 'error',
            title: 'Email or Password missing',
            text: 'Please enter both Email and Password'
          });
          return 0
        }
        if (this.user.password !== this.user.confirm_password) {
          self.$notify({
            group: 'foo',
            type: 'error',
            title: 'Password and Confirm Password dont match',
            text: 'Password and Confirm Password fields must match'
          });
          return 0
        }
        firebaseAuth.createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(function (response) {
          console.log(response)
          self.$router.push({name: 'Login'})
        })
        .catch(function (err) {
          console.log(err)

          switch (err.code) {
            case 'auth/email-already-in-use':
              self.$notify({
                group: 'foo',
                type: 'error',
                title: 'User already exists',
                text: 'A user with this email already exists'
              });
              break
            case 'auth/invalid-email':
              self.$notify({
                group: 'foo',
                type: 'error',
                title: 'Invalid Email',
                text: 'The email address is badly formatted'
              });
              break
            case 'auth/weak-password':
              self.$notify({
                group: 'foo',
                type: 'error',
                title: 'Weak Password',
                text: 'Password should be atleast 6 characters'
              });
              break;
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
