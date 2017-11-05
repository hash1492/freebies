<template>
  <div>
    <freebies-navbar></freebies-navbar>
    <router-view/>
  </div>
</template>

<script>
import FreebiesNavbar from './Navbar.vue'

export default {
  components: {
    'freebies-navbar': FreebiesNavbar
  },
  data() {
    return {

    }
  }
}
</script>

<style>
</style>
