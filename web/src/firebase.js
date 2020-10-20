/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Tinson Lai

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyBRn5Nf1_4JZggwEgF5ttKTePsAJg8qKe8",
    authDomain: "comp-sci-7412-group-project.firebaseapp.com",
    databaseURL: "https://comp-sci-7412-group-project.firebaseio.com",
    projectId: "comp-sci-7412-group-project",
    storageBucket: "comp-sci-7412-group-project.appspot.com",
    messagingSenderId: "915849829476",
    appId: "1:915849829476:web:6ef7b7b2b620d1cabf5371",
    measurementId: "G-D9QL9W718S"
});

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export default { auth, firestore };
