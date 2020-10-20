/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim
* Edited by Tinson Lai

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "fullcalendar/main.css";
import "quill/dist/quill.core.css";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/scss/argon-dashboard-pro-react.scss";

import firebase from "firebase/app";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";

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

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Route path="/" render={props => <AuthLayout {...props} />} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
