import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const config = {
    apiKey: 'AIzaSyBJ93D3l_kgGHUfubdHcT3yo0w7eL2IS9k',
    authDomain: 'your-band-sucks.firebaseapp.com',
    databaseURL: 'https://your-band-sucks.firebaseio.com',
    projectId: 'your-band-sucks',
    storageBucket: 'your-band-sucks.appspot.com',
    messagingSenderId: '959829783735',
  }

const fbAuth = firebase.initializeApp(config)

export default fbAuth