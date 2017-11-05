<template>
  <div>
    <div class="container">
      <form class="form-signin">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" v-model="user.email" class="form-control" id="exampleInputEmail1" placeholder="Email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" v-model="user.password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button type="button" class="btn btn-primary" v-on:keyup.enter="login" v-on:click="login()">Login</button>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
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
        console.log('login clicked!')
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
