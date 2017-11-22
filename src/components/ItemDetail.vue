<template>
  <div>
    <div class="container">
      <!-- <h2>Item detail</h2> -->
      <div>
        <br>
        <div class="row">
          <div class="col-md-6">
            <img class="item-detail-img" v-bind:src="item.imgUrl" alt="Item image here">
          </div>
          <div class="col-md-6">
            <div class="jumbotron item-details">
              <h2 class="item-title">{{item.title}}</h2>
              <p class="item-date">Added: {{item.createdAt | formatDate}}</p>
              <h4>Category: {{item.category}}</h4>
              <h4>Description: {{item.description}}</h4>
              <h4>Address: {{item.address}}</h4>
              <h4>User ID: {{item.userId}}</h4>
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
  name: 'ItemDetail',
  data () {
    return {
      item: {}
    }
  },
  filters: {
    formatDate(value) {
      return moment(String(value)).fromNow()
    }
  },
  created: function () {
    console.log(this.$route.params.item_id)
    var self = this
    itemsCollection.where("id", "==", this.$route.params.item_id)
    .get()
    .then(function(querySnapshot) {
      console.log(querySnapshot);
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          self.item = doc.data()
      });
      console.log(self.item);
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

  },
  methods: {
    test: function () {

    }
  }
}
</script>

<style scoped>
.item-detail-img {
  width: 500px;
  border: 1px solid #ddd;
  padding: 10px;
}
.item-details {
  height: 300px
}

.item-title {
  font-weight: bold;
}
.item-date {
  color: #565656;
  font-size: 16px;
}
</style>
