<template>
  <div>
    <div class="container">
      <div v-if="item.id">
        <br>
        <div class="row">
          <div class="col-md-6">
            <img class="item-detail-img" v-bind:src="item.imgUrl" alt="Item image here">
          </div>
          <div class="col-md-6">
            <div class="jumbotron">
              <h2 class="item-title">{{item.title}}</h2>
              <p class="item-date">Added: {{item.createdAt | formatDate}}</p>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">Category</th>
                    <td>{{item.category}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Description</th>
                    <td>{{item.description}}</td>
                  </tr>
                  <tr>
                    <th scope="row">User ID</th>
                    <td>{{item.userId}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td>{{item.address}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Phone Number</th>
                    <td>{{item.phoneNumber}}</td>
                  </tr>
                </tbody>
              </table>
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
    var self = this
    itemsCollection.where("id", "==", this.$route.params.item_id)
    .get()
    .then(function(querySnapshot) {
      if(querySnapshot.empty) {
        self.$router.push({name: 'GenericError'})
        return
      }
      querySnapshot.forEach(function(doc) {
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
.item-title {
  font-weight: bold;
}
.item-date {
  color: #565656;
  font-size: 16px;
}
</style>
