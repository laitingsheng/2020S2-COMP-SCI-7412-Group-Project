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

import firebase from "firebase/app";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "firebase/auth";
import "firebase/firestore";

import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "fullcalendar/main.css";
import "quill/dist/quill.core.css";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./assets/css/nucleo.css";
import "./assets/scss/argon-dashboard-pro-react.scss";

import FirebaseContext from "./context/FirebaseContext";

import Authentication from "./Authentication";
import DashboardLayout from "./dashboard/DashboardLayout";

const app = firebase.apps.length > 0 ? firebase.apps[0] : firebase.initializeApp({
    apiKey: "AIzaSyBRn5Nf1_4JZggwEgF5ttKTePsAJg8qKe8",
    authDomain: "comp-sci-7412-group-project.firebaseapp.com",
    databaseURL: "https://comp-sci-7412-group-project.firebaseio.com",
    projectId: "comp-sci-7412-group-project",
    storageBucket: "comp-sci-7412-group-project.appspot.com",
    messagingSenderId: "915849829476",
    appId: "1:915849829476:web:6ef7b7b2b620d1cabf5371",
    measurementId: "G-D9QL9W718S"
});

const auth = app.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).catch(console.log);

const firestore = app.firestore();

class App extends React.Component {
    state = { auth, firestore };

    constructor(props) {
        super(props);

        auth.onAuthStateChanged(user => {
            if (this.doc_unsub) {
                this.doc_unsub();
                delete this.doc_unsub;
            }
            if (this.admin_unsub) {
                this.admin_unsub();
                delete this.admin_unsub;
            }

            if (user) {
                const userRef = firestore.collection("users").doc(user.uid);
                this.doc_unsub = userRef.onSnapshot(docSnapshot => this.setState({ docSnapshot }), console.log);
                const adminRef = firestore.collection("admins").doc(user.uid);
                this.admin_unsub = adminRef.onSnapshot(adminSnapshot => this.setState({ adminSnapshot } ), console.log);
                this.setState({ user, userRef, adminRef });
            } else
                this.setState({ user, docSnapshot: undefined, adminSnapshot: undefined, userRef: undefined, adminRef: undefined });
        });
    }

    render() {
        return <FirebaseContext.Provider value={_.assign({}, this.state)}>
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard" component={DashboardLayout} />
                    <Route exact path="/auth" component={Authentication} />
                    <Redirect from="*" to="/auth" />
                </Switch>
            </BrowserRouter>
        </FirebaseContext.Provider>;
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
