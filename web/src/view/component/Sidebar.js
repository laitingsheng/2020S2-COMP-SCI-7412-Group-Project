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

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse, Nav, Navbar, NavItem, NavLink } from "reactstrap";

import routes from "routing/Admin";

export default class Sidebar extends React.Component {
    static propTypes = {
        level: PropTypes.number.isRequired,
        toggleSidenav: PropTypes.func.isRequired,
        sidenavOpen: PropTypes.bool.isRequired
    };

    state = { active: 0 };

    onMouseEnterSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned"))
            document.body.classList.add("g-sidenav-show");
    };

    onMouseLeaveSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned"))
            document.body.classList.remove("g-sidenav-show");
    };

    closeSidenav = () => {
        if (window.innerWidth < 1200)
            this.props.toggleSidenav();
    };

    render() {
        return <Navbar className="sidenav navbar-vertical navbar-expand-xs navbar-light bg-white fixed-left" onMouseEnter={this.onMouseEnterSidenav} onMouseLeave={this.onMouseLeaveSidenav}>
            <PerfectScrollbar>
                <div className="scrollbar-inner">
                    <div className="sidenav-header d-flex align-items-center">
                        <div className="ml-auto">
                            <div className={classnames("sidenav-toggler d-none d-xl-block", { active: this.props.sidenavOpen })} onClick={this.props.toggleSidenav}>
                                <div className="sidenav-toggler-inner">
                                    <i className="sidenav-toggler-line" />
                                    <i className="sidenav-toggler-line" />
                                    <i className="sidenav-toggler-line" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar-inner">
                        <Collapse navbar isOpen={true}>
                            <Nav navbar>
                                {routes.map(({ path, icon, name, guard }, key) => guard(this.props.level)
                                    ? <NavItem className={classnames({ active: this.state.active === key })} onClick={() => this.setState({ active: key })} key={key}>
                                        <NavLink to={`/dashboard/${path}`} activeClassName="" onClick={this.closeSidenav} tag={NavLinkRRD}>
                                            <i className={icon} />
                                            <span className="nav-link-text">{name}</span>
                                        </NavLink>
                                    </NavItem>
                                    : null)}
                            </Nav>
                        </Collapse>
                    </div>
                </div>
            </PerfectScrollbar>
        </Navbar>;
    }
}
