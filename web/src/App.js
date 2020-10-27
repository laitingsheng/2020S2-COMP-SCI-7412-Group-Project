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

import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import UserComponent from "./UserComponent";
import AdminLayout from "./view/Admin";
import AuthLayout from "./view/Auth";

export default class App extends UserComponent {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route path="/dashboard" component={AdminLayout} />
                <Route path="/" component={AuthLayout} />
            </Switch>
        </BrowserRouter>;
    }
}
