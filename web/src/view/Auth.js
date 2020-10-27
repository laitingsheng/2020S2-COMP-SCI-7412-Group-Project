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
import { Redirect, Route, Switch } from "react-router-dom";

import UserComponent from "../UserComponent";
import Login from "./component/Login";
import Register from "./component/Register";
import AuthNavbar from "./component/navbar/AuthNavbar";

export default class Auth extends UserComponent {
    /**
     * @type {React.RefObject<HTMLDivElement>}
     */
    mainContent = React.createRef();

    componentDidMount() {
        super.componentDidMount();

        document.body.classList.add("bg-default");
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        document.body.classList.remove("bg-default");
    }

    render() {
        return this.state.user ? <Redirect to="/dashboard" /> : <>
            <div className="main-content" ref={this.mainContent}>
                <AuthNavbar />
                <Switch>
                    <Route path="/auth/login" component={Login} key={0} />
                    <Route path="/auth/register" component={Register} key={1} />
                    <Redirect from="*" to="/auth/login" />
                </Switch>
            </div>
        </>;
    }
}
