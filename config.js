  
import firebase from 'firebase'
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyDxPMshjDm8q1jUq97q6g-tI5kW4WcPzAE",
    authDomain: "pro71storyhib2.firebaseapp.com",
    projectId: "pro71storyhib2",
    storageBucket: "pro71storyhib2.appspot.com",
    messagingSenderId: "753557256901",
    appId: "1:753557256901:web:9868e89ca4ea42051d0eac"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default  firebase.firestore();