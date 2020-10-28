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

import AdminNavbar from "view/component/navbar/AdminNavbar.js";
import Sidebar from "view/component/Sidebar.js";
import routes from "routing/Admin";

export default class Admin extends React.Component {
    state = {};

    /**
     * @type {React.RefObject<HTMLDivElement>}
     */
    mainContent = React.createRef();

    closeSidenav = () => {
        if (window.innerWidth < 1200) {
            this.toggleSidenav();
        }
    };

    // toggles collapse between mini sidenav and normal
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
        return <>
            <Sidebar {...this.props} toggleSidenav={this.toggleSidenav} sidenavOpen={this.state.sidenavOpen} />
            <div className="main-content" ref={this.mainContent} onClick={this.closeSidenav}>
                <AdminNavbar {...this.props} toggleSidenav={this.toggleSidenav} sidenavOpen={this.state.sidenavOpen} />
                <Switch>
                    {routes.map(({ path, component }, key) => <Route exact path={`/dashboard/${path}`} component={component} key={key} />)}
                    <Redirect from="*" to="/dashboard/profile" />
                </Switch>
            </div>
            {this.state.sidenavOpen ? <div className="backdrop d-xl-none" onClick={this.toggleSidenav} /> : null}
        </>;
    }
}
