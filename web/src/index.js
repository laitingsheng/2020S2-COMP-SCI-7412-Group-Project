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
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "fullcalendar/main.css";
import "quill/dist/quill.core.css";
import "select2/dist/css/select2.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "./assets/css/nucleo.css";
import "./assets/scss/argon-dashboard-pro-react.scss";

import { auth } from "./firebase";
import AdminLayout from "./view/Admin";
import AuthLayout from "./view/Auth";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/dashboard" render={props => auth.currentUser?.emailVerified ? <AdminLayout {...props} /> : <Redirect to="/login" />} />
            <Route path="/" component={AuthLayout} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
