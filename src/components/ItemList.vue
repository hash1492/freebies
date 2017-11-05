<template>
  <div>
    Item List

    <div class="container-fluid">
      <div class = "row">
        <div class = "col-sm-6 col-md-4" v-for="item in items">
           <div class = "thumbnail">
              <img v-bind:src= "item.imgUrl" alt = "Generic placeholder thumbnail">
              <div class = "caption">
                 <h3>Guitar</h3>
                 <p>Electric Guitar</p>
                 <p>
                    <a href = "#" class = "btn btn-primary" role = "button">
                       View
                    </a>
                    <a href = "#" class = "btn btn-default" role = "button">
                       Favorite
                    </a>
                 </p>
              </div>
           </div>
        </div>
       <!-- <div class = "col-sm-6 col-md-4">
          <div class = "thumbnail">
             <img src = "../assets/logo.png" alt = "Generic placeholder thumbnail">
             <div class = "caption">
                <h3>Guitar</h3>
                <p>Electric Guitar</p>
                <p>
                   <a href = "#" class = "btn btn-primary" role = "button">
                      View
                   </a>
                   <a href = "#" class = "btn btn-default" role = "button">
                      Favorite
                   </a>
                </p>
             </div>
          </div>
       </div>

       <div class = "col-sm-6 col-md-4">
          <div class = "thumbnail">
             <img src = "../assets/logo.png" alt = "Generic placeholder thumbnail">
             <div class = "caption">
                <h3>Guitar</h3>
                <p>Electric Guitar</p>
                <p>
                   <a href = "#" class = "btn btn-primary" role = "button">
                      View
                   </a>
                   <a href = "#" class = "btn btn-default" role = "button">
                      Favorite
                   </a>
                </p>
             </div>
          </div>
       </div>

       <div class = "col-sm-6 col-md-4">
          <div class = "thumbnail">
             <img src = "../assets/logo.png" alt = "Generic placeholder thumbnail">
             <div class = "caption">
                <h3>Guitar</h3>
                <p>Electric Guitar</p>
                <p>
                   <a href = "#" class = "btn btn-primary" role = "button">
                      View
                   </a>
                   <a href = "#" class = "btn btn-default" role = "button">
                      Favorite
                   </a>
                </p>
             </div>
          </div>
       </div> -->
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ItemList',
  data () {
    return {
      items: [
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        },
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        },
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        },
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        },
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        },
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        },
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        },
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        },
        {
          imgUrl: '../src/assets/logo.png',
          title: 'Guitar',
          description: 'Electric Guitar very good condition'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style>
</style>
