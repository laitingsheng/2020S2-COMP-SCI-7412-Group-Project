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
import { auth } from "./firebase";

export default class UserComponent extends React.Component {
    state = {};

    /**
     * @param {firebase.User | null} user
     */
    update_user = user => this.setState({ user })

    componentDidMount() {
        this.unsubscribe_auth = auth.onAuthStateChanged(this.update_user);
    }

    componentWillUnmount() {
        this.unsubscribe_auth();
        delete this.unsubscribe_auth;
    }
}
