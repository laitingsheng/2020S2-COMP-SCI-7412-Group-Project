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
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import {
    UncontrolledCollapse,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col
} from "reactstrap";

import routes from "routing/Auth";

class AuthNavbar extends React.Component {
    render() {
        return <>
            <Navbar className="navbar-horizontal navbar-main navbar-dark navbar-transparent" expand="lg" id="navbar-main">
                <Container>
                    <button aria-controls="navbar-collapse" aria-expanded={false} aria-label="Toggle navigation" className="navbar-toggler" data-target="#navbar-collapse" data-toggle="collapse" id="navbar-collapse" type="button">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <UncontrolledCollapse className="navbar-custom-collapse" navbar toggler="#navbar-collapse">
                        <div className="navbar-collapse-header">
                            <Row>
                                <Col className="collapse-close" xs="6">
                                    <button aria-controls="navbar-collapse" aria-expanded={false} aria-label="Toggle navigation" className="navbar-toggler" data-target="#navbar-collapse" data-toggle="collapse" id="navbar-collapse" type="button">
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav className="mr-auto" navbar>
                            {routes.map(({ path, name }, key) => <NavItem>
                                <NavLink to={`/auth/${path}`} tag={Link} key={key}>
                                    <span className="nav-link-inner--text">{name}</span>
                                </NavLink>
                            </NavItem>)}
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        </>;
    }
}

export default AuthNavbar;
