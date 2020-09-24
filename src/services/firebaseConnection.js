import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


var firebaseConfig = {
    apiKey: "AIzaSyCigcW4VGK5zMdg9xVI9SAtXFQ7cCxhmSY",
    authDomain: "denguerv1.firebaseapp.com",
    databaseURL: "https://denguerv1.firebaseio.com",
    projectId: "denguerv1",
    storageBucket: "denguerv1.appspot.com",
    messagingSenderId: "117188928853",
    appId: "1:117188928853:web:392c8bf5592e712ca8bbdc",
    measurementId: "G-LWVB1MYC8Q"
  };


  if(firebase.app.length){
    firebase.initializeApp(firebaseConfig);
  }
  // Initialize Firebase

  export default firebase;
  