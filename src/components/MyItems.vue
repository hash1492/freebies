<template>
  <div>
    <div class="container-fluid">
      <div class = "row">
        <div class = "col-sm-6 col-md-4" v-for="item in items">
           <div class = "thumbnail">
              <img class="item-list-img" v-bind:src= "item.imgUrl" alt = "Generic placeholder thumbnail">
              <div class = "caption">
                 <h3>{{item.title}}</h3>
                 <p class="item-date">{{item.createdAt | formatDate}}</p>
                 <p>
                   <button type="button" v-on:click="viewItem(item.id)" class = "btn btn-info" name="button">View</button>
                   <button type="button" v-on:click="editItem(item.id)" class = "btn btn-default" name="button">Edit</button>
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
import moment from 'moment'
import lodash from 'lodash'

var itemsCollection = firebase.itemsCollection
var firebaseAuth = firebase.firebaseAuth;

export default {
  name: 'MyItems',
  data () {
    return {
      items: []
    }
  },
  filters: {
    formatDate(value) {
      return moment(String(value)).fromNow()
    }
  },
  created: function () {
    var self = this
    itemsCollection.where('userId','==', firebaseAuth.currentUser.email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        self.items.push(doc.data())
        console.log(doc.data())
      })
      self.items = _.sortBy(self.items, 'createdAt').reverse();
    })
  },
  methods: {
    viewItem: function (item_id) {
      this.$router.push({name: 'ItemDetail', params: {item_id: item_id}})
    },
    editItem: function (item_id) {
      this.$router.push({name: 'UpdateItem', params: {item_id: item_id}})
    }
  }
}
</script>

<style scoped>
.item-list-img {
  height: 250px;
}
</style>
