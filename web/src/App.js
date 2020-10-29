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

import { auth, firestore, FirebaseContext } from "FirebaseClient";
import AdminLayout from "layout/Admin";
import AuthLayout from "layout/Auth";

export default class App extends React.Component {
    state = {};

    componentDidMount() {
        this.user_unsub = auth.onAuthStateChanged(user => {
            if (user) {
                this.doc_unsub = firestore.collection("users").doc(user.uid).onSnapshot(doc => this.setState({ doc }), console.log);
                this.admin_unsub = firestore.collection("admins").doc(user.uid).onSnapshot(admin => this.setState( { admin } ), console.log)
            } else {
                if (this.doc_unsub) {
                    this.doc_unsub();
                    delete this.doc_unsub;
                }
                if (this.admin_unsub) {
                    this.admin_unsub();
                    delete this.admin_unsub();
                }
            }
            this.setState({ user });
        });
    }

    componentWillUnmount() {
        this.user_unsub();
        delete this.user_unsub;
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
        return <FirebaseContext.Provider value={Object.assign({}, this.state)}>
            <BrowserRouter>
                <Switch>
                    {this.route()}
                </Switch>
            </BrowserRouter>
        </FirebaseContext.Provider>;
    }
}
