// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRn5Nf1_4JZggwEgF5ttKTePsAJg8qKe8",
    authDomain: "comp-sci-7412-group-project.firebaseapp.com",
    databaseURL: "https://comp-sci-7412-group-project.firebaseio.com",
    projectId: "comp-sci-7412-group-project",
    storageBucket: "comp-sci-7412-group-project.appspot.com",
    messagingSenderId: "915849829476",
    appId: "1:915849829476:web:6ef7b7b2b620d1cabf5371",
    measurementId: "G-D9QL9W718S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //console.log(firebase);

  //update firebase libary
  firebase.firestore().settings({timestampsInSnapshots: true});

  //export and import firebase in other files
  export default firebaseConfig;