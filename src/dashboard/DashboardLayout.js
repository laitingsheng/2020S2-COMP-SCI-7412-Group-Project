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
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Switch, Redirect, Route, NavLink as NavLinkRRD } from "react-router-dom";
import {
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    Nav,
    Navbar,
    NavItem, NavLink,
    UncontrolledDropdown
} from "reactstrap";

import FirebaseContext from "../context/FirebaseContext";
import Profile from "./component/Profile";
import Candidates from "./component/Candidates";
import Ballot from "./component/Ballot";

/**
 * @returns {boolean}
 */
const guard_trivial = () => true;

/**
 * @param {number} least
 * @returns {function(number | null): boolean}
 */
const guard_level = least => (level => !level || level <= least)

const routes = [
    {
        path: "profile",
        name: "Profile",
        icon: "ni ni-archive-2 text-primary",
        component: Profile,
        guard: guard_trivial
    },
    {
        path: "candidates",
        name: "Candidates",
        icon: "ni ni-circle-08 text-info",
        component: Candidates,
        guard: guard_level(1)
    },
    {
        path: "ballot",
        name: "Ballot",
        icon: "ni ni-archive-2 text-info",
        component: Ballot,
        guard: guard_trivial
    }
];

export default class DashboardLayout extends React.Component {
    static contextType = FirebaseContext;

    state = { sidenavOpen: true, active: this.props.location.pathname.match("^/dashboard/([\\w-]+)$")?.[1] };

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

    onMouseEnterSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned"))
            document.body.classList.add("g-sidenav-show");
    };

    onMouseLeaveSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned"))
            document.body.classList.remove("g-sidenav-show");
    };

    logout = e => {
        e.preventDefault();

        this.context.auth.signOut().catch(console.log);
    };

    /**
     * @returns {JSX.Element}
     */
    Navbar = () => {
        const { user } = this.context;
        return user ? <Navbar className="navbar-top navbar-expand border-bottom navbar-dark bg-info">
            <Container fluid>
                <Collapse navbar isOpen={true}>
                    <Nav className="align-items-center ml-auto ml-md-auto" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                <Media className="align-items-center">
                                <span className="avatar avatar-sm rounded-circle">
                                    <img src={user.photoURL} />
                                </span>
                                    <Media className="ml-2 d-none d-lg-block">
                                        <span className="mb-0 text-sm font-weight-bold">{user.displayName}</span>
                                    </Media>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="#pablo" onClick={this.logout}>
                                    <i className="ni ni-user-run" />
                                    <span>
                                        Logout
                                    </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>: null;
    };

    /**
     * @param {{ level: number }} props
     * @returns {JSX.Element}
     */
    Sidebar = props => <Navbar className="sidenav navbar-vertical navbar-expand-xs navbar-light bg-white fixed-left" onMouseEnter={this.onMouseEnterSidenav} onMouseLeave={this.onMouseLeaveSidenav}>
        <PerfectScrollbar>
            <div className="scrollbar-inner">
                <div className="sidenav-header d-flex align-items-center">
                    <div className="ml-auto">
                        <div className={classnames("sidenav-toggler d-none d-xl-block", { active: this.state.sidenavOpen })} onClick={this.toggleSidenav}>
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
                            {routes.map(({ path, icon, name, guard }, key) => guard(props.level) ?
                                <NavItem className={classnames({ active: this.state.active === name })} onClick={() => this.setState({ active: name })} key={key}>
                                    <NavLink to={`/dashboard/${path}`} activeClassName="" onClick={this.closeSidenav} tag={NavLinkRRD}>
                                        <i className={icon} />
                                        <span className="nav-link-text">
                                            {name}
                                        </span>
                                    </NavLink>
                                </NavItem> : null)}
                        </Nav>
                    </Collapse>
                </div>
            </div>
        </PerfectScrollbar>
    </Navbar>;

    render() {
        const { adminSnapshot } = this.context, level = adminSnapshot && adminSnapshot.exists ? adminSnapshot.get("level") : Number.POSITIVE_INFINITY
        return <>
            <this.Sidebar level={level} />
            <div className="main-content" onClick={this.closeSidenav}>
                <this.Navbar />
                <Switch>
                    {routes.map(({ path, component, guard }, key) => guard(level)
                        ? <Route exact path={`/dashboard/${path}`} component={component} key={key} />
                        : null)}
                    <Redirect from="*" to="/dashboard/profile" />
                </Switch>
            </div>
            {this.state.sidenavOpen ? <div className="backdrop d-xl-none" onClick={this.toggleSidenav} /> : null}
        </>;
    }
}
