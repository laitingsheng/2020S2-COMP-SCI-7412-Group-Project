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

import md5 from "md5";
import PropTypes from "prop-types";
import React from "react";
import {
    Col,
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ListGroup,
    Media,
    Nav,
    Navbar,
    Row,
    UncontrolledDropdown
} from "reactstrap";

import FirebaseContext from "../context/FirebaseContext";

export default class DashboardNavbar extends React.Component {
    static propTypes = {
        toggleSidenav: PropTypes.func,
        sidenavOpen: PropTypes.bool
    };

    static contextType = FirebaseContext;

    state = {};

    logout = e => {
        e.preventDefault();

        this.context.auth.signOut().catch(console.log);
    }

    render() {
        const { user } = this.context;
        return user ? <>
            <Navbar className="navbar-top navbar-expand border-bottom navbar-dark bg-info">
                <Container fluid>
                    <Collapse navbar isOpen={true}>
                        <Nav className="align-items-center ml-auto ml-md-auto" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                    <Media className="align-items-center">
                                    <span className="avatar avatar-sm rounded-circle">
                                        <img src={user.photoURL ?? `https://www.gravatar.com/avatar/${md5(user.email)}?d=mp`} />
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
            </Navbar>
        </> : null;
    }
}
