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

import routes from "routing/Auth"
import AuthNavbar from "view/component/navbar/AuthNavbar";

export default class Auth extends React.Component {
    /**
     * @type {React.RefObject<HTMLDivElement>}
     */
    mainContent = React.createRef();

    componentDidMount() {
        document.body.classList.add("bg-default");
    }

    componentWillUnmount() {
        document.body.classList.remove("bg-default");
    }

    render() {
        return <>
            <div className="main-content" ref={this.mainContent}>
                <AuthNavbar />
                <Switch>
                    {routes.map(({ path, component }, key) => <Route exact path={`/auth/${path}`} component={component} key={key} />)}
                    <Redirect from="*" to="/auth/login" />
                </Switch>
            </div>
        </>;
    }
}
