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
        <div class="form-group">
          <label for="exampleInputPassword2">Confirm Password</label>
          <input type="password" v-model="user.confirm_password" class="form-control" id="exampleInputPassword2" placeholder="Confirm Password">
        </div>
        <button type="button" class="btn btn-primary" v-on:keyup.enter="register" v-on:click="register()">Register</button>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'Register',
    data () {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      register: function () {
        console.log('register clicked!')
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
