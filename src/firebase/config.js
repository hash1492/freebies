import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCg9xYUds0c1Mr-cmYeg18CeO4kFtZRWsQ',
  authDomain: 'freebies-d4506.firebaseapp.com',
  databaseURL: 'https://freebies-d4506.firebaseio.com',
  projectId: 'freebies-d4506',
  storageBucket: 'freebies-d4506.appspot.com',
  messagingSenderId: '137162894711'
}
export const app = firebase.initializeApp(config)
export const firebaseAuth = firebase.auth()
export const firebaseStorage = firebase.storage()
export const itemsCollection = firebase.firestore().collection('items')
export const categoriesCollection = firebase.firestore().collection('categories')
