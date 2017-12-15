<template>
  <div class="container">
    <h1 v-if="!editMode">Add Item</h1>
    <h1 v-else>Update Item</h1>
    <br>
    <div class="row">
      <div class="col-md-6">
        <form class="form-horizontal form-add-item">
          <div class="form-group">
            <label class="col-sm-2 control-label">Title</label>
            <div class="col-sm-10">
              <input type="text" v-model="item.title" maxlength="30" class="form-control" placeholder="Title (ex: Leather Couch)">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">Category</label>
            <div class="col-sm-10">
              <select v-model="item.category" class="form-control">
                <option value='' selected>Select Category</option>
                <option v-for="category in categories" v-bind:value="category.name">{{category.name}}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Description</label>
            <div class="col-sm-10">
              <textarea type="text" v-model="item.description" maxlength="500" rows="5" class="form-control" placeholder="Description (ex: Black leather couch in very good condition couch.)"></textarea>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Address</label>
            <div class="col-sm-10">
              <textarea type="text" v-model="item.address" class="form-control" placeholder="Address (ex: 123 Prince St, NY, 10011)"></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <button type="button" class="btn btn-info" v-if="!editMode" v-on:click="addItem">Post</button>
              <div v-else>
                <button type="button" class="btn btn-info" v-on:click="updateItem">Update</button>
                <button type="button" class="btn btn-danger" v-on:click="deleteItem">Delete</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-6">
        <img class="uploaded-item-img" v-show="showItemImg" v-bind:src="item.imgUrl" alt="Item image appears here">
        <div class="form-group">
           <label>Item Image</label>
           <input class="image-upload-input" type="file" v-on:change='uploadImage($event.target.name, $event.target.files)' accept="image/*">
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
      itemFireBaseId: '',
      categories: [],
      showItemImg: false,
      editMode: false
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
    // Edit mode
    if(this.$route.params.item_id) {
      this.editMode = true
      itemsCollection.where("id", "==", this.$route.params.item_id)
      .get()
      .then(function(querySnapshot) {
        console.log(querySnapshot);
        if(querySnapshot.empty) {
          self.$router.push({name: 'GenericError'})
          return
        }
        querySnapshot.forEach(function(doc) {
            // If the item is not from the current user, don't let him/her update it
            if(doc.data().userId !== firebaseAuth.currentUser.email) {
              self.$router.push({name: 'GenericError'})
              return
            }
            self.itemFireBaseId = doc.id
            self.item = doc.data()
            self.showItemImg = true
        });
        console.log(self.item);
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });
    }
  },
  methods: {
    isValidForm: function () {
      if(!this.item.title || !this.item.description || !this.item.category || !this.item.address || !this.item.imgUrl) {
        this.$notify({
          group: 'foo',
          type: 'error',
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
      var self = this
      if(this.isValidForm()){
        this.item.id = uuidv4()
        this.item.userId = firebaseAuth.currentUser.email;
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
      var self = this
      itemsCollection.doc(this.itemFireBaseId)
      .update(this.item)
      .then(function() {
          console.log("Document successfully updated!");
          self.$notify({
            group: 'foo',
            title: 'Item Updated',
            text: self.item.title + ' has been updated successfully'
          });
          self.$router.push({name: 'MyItems'})
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    },
    deleteItem: function () {
      var response = confirm('Are you sure you want to delete?')
      if(response) {
        var self = this
        itemsCollection.doc(this.itemFireBaseId)
        .delete().then(function () {
          console.log('Document successfully deleted!')
          self.$notify({
            group: 'foo',
            title: 'Item Deleted',
            text: self.item.title + ' has been deleted successfully'
          });
          self.$router.push({name: 'MyItems'})
        }).catch(function (error) {
          console.error('Error removing document: ', error)
        })
      }
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
