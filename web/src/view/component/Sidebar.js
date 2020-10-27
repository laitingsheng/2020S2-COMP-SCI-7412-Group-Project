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
import { NavLink as NavLinkRDD } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse, Nav, Navbar, NavItem, NavLink } from "reactstrap";

class Sidebar extends React.Component {
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
        const scrollBarInner = <div className="scrollbar-inner">
            <div className="sidenav-header d-flex align-items-center">
                <div className="ml-auto">
                    <div className={classnames("sidenav-toggler d-none d-xl-block", { active: this.props.sidenavOpen })} onClick={this.props.toggleSidenav}>
                        <div className="sidenav-toggler-inner">
                            <i className="sidenav-toggler-line"/>
                            <i className="sidenav-toggler-line"/>
                            <i className="sidenav-toggler-line"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-inner">
                <Collapse navbar isOpen={true}>
                    <Nav navbar>
                    </Nav>
                </Collapse>
            </div>
        </div>;
        return <Navbar className="sidenav navbar-vertical navbar-expand-xs navbar-light bg-white fixed-left" onMouseEnter={this.onMouseEnterSidenav} onMouseLeave={this.onMouseLeaveSidenav}>
            {navigator.platform.indexOf("Win") > -1 ? <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar> : scrollBarInner}
        </Navbar>;
    }
}

Sidebar.propTypes = {
    // function used to make sidenav mini or normal
    toggleSidenav: PropTypes.func, // prop to know if the sidenav is mini or normal
    sidenavOpen: PropTypes.bool
};

export default Sidebar;
