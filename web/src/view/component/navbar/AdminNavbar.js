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
import PropTypes from "prop-types";
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
import { auth, UserContext } from "FirebaseClient";

export default class AdminNavbar extends React.Component {
    static propTypes = {
        toggleSidenav: PropTypes.func,
        sidenavOpen: PropTypes.bool
    };

    state = {};

    logout = e => {
        e.preventDefault();

        auth.signOut().catch(console.log);
    }

    render() {
        return <UserContext.Consumer>{user => <>
            <Navbar className="navbar-top navbar-expand border-bottom navbar-dark bg-info">
                <Container fluid>
                    <Collapse navbar isOpen={true}>
                        <Nav className="align-items-center ml-md-auto" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="nav-link" color="" tag="a">
                                    <i className="ni ni-bell-55"/>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-xl py-0 overflow-hidden" right>
                                    <div className="px-3 py-3">
                                        <h6 className="text-sm text-muted m-0">
                                            You have <strong className="text-info">0</strong> notifications.
                                        </h6>
                                    </div>
                                    <ListGroup flush/>

                                    <DropdownItem className="text-center text-info font-weight-bold py-3" href="#pablo"
                                                  onClick={e => e.preventDefault()}>
                                        View all
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="nav-link" color="" tag="a">
                                    <i className="ni ni-ungroup"/>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-lg dropdown-menu-dark bg-default" right>
                                    <Row className="shortcuts px-4">
                                        <Col className="shortcut-item" href="#pablo" onClick={e => e.preventDefault()} xs="4" tag="a">
                                            <span className="shortcut-media avatar rounded-circle bg-gradient-red">
                                                <i className="ni ni-calendar-grid-58"/>
                                            </span>
                                            <small>Calendar</small>
                                        </Col>
                                    </Row>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <Nav className="align-items-center ml-auto ml-md-0" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                    <Media className="align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <img src={user?.photoURL}/>
                                        </span>
                                        <Media className="ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm font-weight-bold">{user?.displayName}</span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem href="#pablo" onClick={this.logout}>
                                        <i className="ni ni-user-run" />
                                        <span>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>}</UserContext.Consumer>;
    }
}
