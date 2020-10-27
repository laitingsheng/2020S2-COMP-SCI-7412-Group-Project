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

import { auth, UserContext } from "FirebaseClient";
import AdminLayout from "layout/Admin";
import AuthLayout from "layout/Auth";

export default class App extends React.Component {
    state = { user: auth.currentUser };

    componentDidMount() {
        console.log(`mounted: ${this.state.user}`);
        this.unsub = auth.onAuthStateChanged(user => this.setState({ user }))
    }

    componentWillUnmount() {
        this.unsub();
    }

    route() {
        const { path, component } = this.state.user
            ? { path: "/dashboard", component: AdminLayout }
            : { path: "/auth", component: AuthLayout };
        return <>
            <Route path={path} component={component} />
            <Redirect from="*" to={path} />
        </>;
    }

    render() {
        console.log(`render: ${this.state.user} ${auth.currentUser}`);
        return <UserContext.Provider value={this.state.user}>
            <BrowserRouter>
                <Switch>{this.route()}</Switch>
            </BrowserRouter>
        </UserContext.Provider>;
    }
}
