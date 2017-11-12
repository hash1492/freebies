<template>
  <div>
    <div class="container-fluid">
      <div class = "row">
        <div class = "col-sm-6 col-md-4" v-for="item in items">
           <div class = "thumbnail">
              <img class="item-list-img" v-bind:src= "item.imgUrl" alt = "Generic placeholder thumbnail">
              <div class = "caption">
                 <h3>{{item.title}}</h3>
                 <p>{{item.description}}</p>
                 <p>
                   <button type="button" v-on:click="viewItem(item.id)" class = "btn btn-primary" name="button">View</button>
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from '../firebase/config'

var itemsCollection = firebase.itemsCollection
var firebaseAuth = firebase.firebaseAuth;

export default {
  name: 'MyItems',
  data () {
    return {
      items: []
    }
  },
  created: function () {
    var self = this
    itemsCollection.where('userId','==', firebaseAuth.currentUser.uid)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        self.items.push(doc.data())
        console.log(doc.data())
      })
    })
  },
  methods: {
    viewItem: function (item_id) {
      console.log(item_id)
      this.$router.push({name: 'ItemDetail', params: {item_id: item_id}})
    },
    getItems: function () {
      var self = this
      itemsCollection.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          self.items.push(doc.data())
          console.log(doc.data())
        })
      })
    }
  }
}
</script>

<style scoped>
router-link {
  color: #FFFFFF !important;
}
.item-list-img {
  height: 250px;
}
</style>
