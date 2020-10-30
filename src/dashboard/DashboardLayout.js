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
import { Switch, Redirect, Route } from "react-router-dom";

import FirebaseContext from "../context/FirebaseContext";

import DashboardNavbar from "./DashboardNavbar.js";
import routes from "./routes";
import Sidebar from "./Sidebar.js";

export default class DashboardLayout extends React.Component {
    static contextType = FirebaseContext;

    state = { sidenavOpen: true };

    closeSidenav = () => {
        if (window.innerWidth < 1200)
            this.toggleSidenav();
    };

    toggleSidenav = () => {
        if (document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-pinned");
            document.body.classList.add("g-sidenav-hidden");
        } else {
            document.body.classList.add("g-sidenav-pinned");
            document.body.classList.remove("g-sidenav-hidden");
        }
        this.setState({
            sidenavOpen: !this.state.sidenavOpen
        });
    };

    render() {
        const { user, adminSnapshot } = this.context, level = adminSnapshot && adminSnapshot.exists ? adminSnapshot.get("level") : Number.POSITIVE_INFINITY
        return user ? <>
            <Sidebar level={level} toggleSidenav={this.toggleSidenav} sidenavOpen={this.state.sidenavOpen} />
            <div className="main-content" onClick={this.closeSidenav}>
                <DashboardNavbar toggleSidenav={this.toggleSidenav} sidenavOpen={this.state.sidenavOpen} />
                <Switch>
                    {routes.map(({ path, component, guard }, key) => guard(level)
                        ? <Route exact path={`/dashboard/${path}`} component={component} key={key} />
                        : null)}
                    <Redirect from="*" to="/dashboard/profile" />
                </Switch>
            </div>
            {this.state.sidenavOpen ? <div className="backdrop d-xl-none" onClick={this.toggleSidenav} /> : null}
        </> : <Redirect to="/auth" />;
    }
}
