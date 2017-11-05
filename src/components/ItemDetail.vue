<template>
  <div>


    <div class="container">
      <h2>Item detail</h2>
      <div class="jumbotron">
        <div class="row">
          <div class="col-md-6">
            <slider animation="fade" class="item-carousel">
              <p style="line-height: 280px; font-size: 5rem; text-align: center;" v-if="!item.images.length">Loading...</p>
              <slider-item v-for="(i, index) in item.images" :key="index" :on-click="test">
                <img v-bind:src= "i" alt="">
              </slider-item>
            </slider>
          </div>
          <div class="col-md-6">
            Guitar
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
  name: 'ItemDetail',
  components: {
    Slider,
    SliderItem
  },
  data () {
    return {
      item: {
        images: ['../src/assets/logo.png','../src/assets/logo.png','../src/assets/logo.png']
      }
    }
  },
  methods: {
    test: function () {

    }
  }
}
</script>

<style>
.item-carousel {
  width: 500px !important;
}

</style>
