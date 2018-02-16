<template>
  <div>
    <div class="container-fluid">
      <div class="input-group search-input-group">
        <input type="text" class="form-control search-input" v-model="searchText" placeholder="Search for...">
      </div>
      <div class = "row">
        <div class = "col-sm-6 col-md-4" v-for="item in filteredItems">
           <div class = "thumbnail list-item" v-on:click="viewItem(item.id)">
              <img class="item-list-img" v-bind:src= "item.imgUrl" alt = "Item image here">
              <div class = "caption">
                 <h3>{{item.title}}</h3>
                 <p>{{item.userId}}</p>
                 <p class="item-date">{{item.createdAt | formatDate}}</p>
              </div>
           </div>
        </div>
      </div>
      <div class="input-group search-input-group">
        <button :disabled="disableLoadMoreButton" v-on:click="loadMorePosts()" class = "btn btn-info">Load More</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from '../firebase/config'
import moment from 'moment'
import lodash from 'lodash'

var itemsCollection = firebase.itemsCollection

export default {
  name: 'ItemList',
  data () {
    return {
      items: [],
      searchText: '',
      lastVisible: {},
      disableLoadMoreButton: false,
      paginationPageLimit: 5
    }
  },
  computed: {
    filteredItems: function (){
      var items = this.items.filter((item) => {
        return item.title.toLowerCase().includes(this.searchText.toLowerCase());
      });
      return items
    }
  },
  filters: {
    formatDate(value) {
      return moment(String(value)).fromNow()
    }
  },
  created: function () {
    var self = this
    // Non-Realtime implementation

    // itemsCollection
    // .orderBy('createdAt','desc')
    // .get()
    // .then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     self.items.push(doc.data())
    //   })
    //   console.log(self.items);
    // })

    // Realtime implementation
    // itemsCollection
    // .orderBy("createdAt", "desc")
    // .onSnapshot(function (querySnapshot) {
    //    self.items = []
    //    querySnapshot.forEach(function (doc) {
    //      self.items.push(doc.data())
    //    })
    //    console.log(self.items);
    //  })

    // Pagination Implementation
    itemsCollection
    .orderBy("createdAt", "desc")
    .limit(self.paginationPageLimit)
    .onSnapshot(function (querySnapshot) {
       self.items = []
       querySnapshot.forEach(function (doc) {
         self.items.push(doc.data())
       })
       console.log(querySnapshot);
       if(querySnapshot.docs.length > 0) {
         self.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
       }
        if(querySnapshot.docs.length < self.paginationPageLimit) {
          self.disableLoadMoreButton = true;
        }
       console.log(self.items);
     })

  },
  methods: {
    viewItem: function (item_id) {
      console.log(item_id)
      this.$router.push({name: 'ItemDetail', params: {item_id: item_id}})
    },
    loadMorePosts: function () {
      var self = this;

      itemsCollection
      .orderBy("createdAt", "desc")
      .startAfter(self.lastVisible)
      .limit(self.paginationPageLimit)
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          self.items.push(doc.data())
        })
        if(querySnapshot.docs.length > 0) {
          self.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        }

        if(querySnapshot.docs.length < self.paginationPageLimit) {
          self.disableLoadMoreButton = true;
        }
        console.log(self.items);
      })
    }
  }
}
</script>

<style scoped>
.list-item {
  cursor: pointer;
  transition: opacity .2s;
     transition: opacity .2s ease-in-out;
   -moz-transition: opacity .2s ease-in-out;
   -webkit-transition: opacity .2s ease-in-out;
}

.list-item:hover {
  opacity: 0.7;
}
.item-list-img {
  height: 250px;
}
.item-date {
  color: #565656;
  font-style: italic;
}
.search-input-group {
  margin: auto;
  width: 500px;
}
.search-input {
  margin: 20px;
  height: 40px;
  font-size: 18px;
}
</style>
