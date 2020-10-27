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
<<<<<<<<< Temporary merge branch 1
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AdminLayout from "./view/Admin";
import AuthLayout from "./view/Auth";

export default class App extends React.Component {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route path="/dashboard" component={AdminLayout} />
                <Route path="/" component={AuthLayout} />
=========
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import UserComponent from "./UserComponent";
import AdminLayout from "./view/Admin";
import AuthLayout from "./view/Auth";

export default class App extends UserComponent {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route path="/dashboard" render={props => this.state.user ? <AdminLayout {...props} /> : <Redirect to="/login" /> } />
                <Route path="/" render={props => this.state.user ? <Redirect to="/dashboard" /> : <AuthLayout {...props} /> } />
>>>>>>>>> Temporary merge branch 2
            </Switch>
        </BrowserRouter>;
    }
}
