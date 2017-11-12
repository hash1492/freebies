<template>
  <div class="container">
    <h1>Add Item</h1>
    <br>
    <div class="row">
      <div class="col-md-6">
        <form class="form-horizontal form-add-item">
          <div class="form-group">
            <label for="inputTitle" class="col-sm-2 control-label">Title</label>
            <div class="col-sm-10">
              <input type="text" v-model="item.title" class="form-control" id="inputTitle" placeholder="Title (ex: Leather Couch)">
            </div>
          </div>
          <div class="form-group">
            <label for="inputCategory" class="col-sm-2 control-label">Category</label>
            <div class="col-sm-10">
              <select id="inputCategory"  v-model="item.category" class="form-control">
                <option value='' selected>Select Category</option>
                <option v-for="category in categories" v-bind:value="category.name">{{category.name}}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="inputDescription" class="col-sm-2 control-label">Description</label>
            <div class="col-sm-10">
              <textarea type="text" v-model="item.description" class="form-control" id="inputDescription" placeholder="Description (ex: Black leather couch in very good condition couch.)"></textarea>
            </div>
          </div>

          <div class="form-group">
            <label for="inputAddress" class="col-sm-2 control-label">Address</label>
            <div class="col-sm-10">
              <textarea type="text" v-model="item.address" class="form-control" id="inputAddress" placeholder="Address (ex: 123 Prince St, NY, 10011)"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="button" class="btn btn-default" v-on:click="addItem">Post</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <img class="uploaded-item-img" v-show="showItemImg" v-bind:src="item.imgUrl" alt="Item image appears here">
        <div class="form-group">
           <label for="exampleInputFile">Item Image</label>
           <input class="image-upload-input" type="file" v-on:change='uploadImage($event.target.name, $event.target.files)' accept="image/*" id="exampleInputFile">
           <!-- <p class="help-block">Item Image</p> -->
         </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as firebase from '../firebase/config'
import uuidv4 from 'uuid/v4'

var categoriesCollection = firebase.categoriesCollection
var itemsCollection = firebase.itemsCollection
var firebaseStorage = firebase.firebaseStorage
var firebaseAuth = firebase.firebaseAuth;

export default {
  name: 'AddUpdateItem',
  data () {
    return {
      item: {
        category: ''
      },
      categories: [],
      showItemImg: false
    }
  },
  created: function () {
    var self = this
    categoriesCollection.get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        self.categories.push(doc.data())
      })
    })
  },
  methods: {
    isValidForm: function () {
      if(!this.item.title || !this.item.description || !this.item.category || !this.item.address || !this.item.imgUrl) {
        self.$notify({
          group: 'foo',
          title: 'Form Incomplete',
          text: 'Please make sure all fields are filled'
        });
        return false
      } else {
        return true
      }
    },
    uploadImage: function (target, files) {
      var self = this
      self.showItemImg = false
      var selectedFile = files[0];
      console.log(selectedFile);
      var storageRef = firebaseStorage.ref('/itemImages/' + selectedFile.name)

      var uploadTask = storageRef.put(selectedFile)
      uploadTask.on('state_changed', function(snapshot){
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, function(error) {
          // Handle unsuccessful uploads
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          var downloadURL = uploadTask.snapshot.downloadURL;
          self.$notify({
            group: 'foo',
            title: 'Image Uploaded',
            text: 'Your item image has been uploaded'
          });
          self.showItemImg = true
          self.item.imgUrl = downloadURL
          console.log(downloadURL);
        });
    },
    addItem: function () {
      console.log(this.item)
      var self = this
      if(self.isValidForm()){
        this.item.id = uuidv4()
        this.item.userId = firebaseAuth.currentUser.uid;
        this.item.createdAt = new Date();
        itemsCollection.add(Object.assign({}, this.item))
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
          self.$notify({
            group: 'foo',
            title: 'Added item',
            text: self.item.title + ' was added successfully'
          });
          self.$router.push({name: 'ItemList'})
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
      }
    },
    updateItem: function () {
      console.log(this.item)
    }
  }
}
</script>

<style scoped>
.uploaded-item-img {
  width: 400px;
  border: 1px solid #ddd;
  padding: 10px;
}

.image-upload-input {
  margin: auto;
}
</style>
