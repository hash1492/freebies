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
                 <p class="item-date">{{item.createdAt | formatDate}}</p>
                 <p>
                   <button type="button" v-on:click="viewItem(item.id)" class = "btn btn-primary" name="button">View</button>
                   <!-- <button type="button" v-on:click="favoriteItem(item.id)" class = "btn btn-default" name="button">Favorite</button> -->
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

var itemsCollection = firebase.itemsCollection

export default {
  name: 'ItemList',
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
    itemsCollection.get()
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
    }
  }
}
</script>

<style scoped>
.item-list-img {
  height: 250px;
}
.item-date {
  color: #565656;
  font-style: italic;
}
</style>
