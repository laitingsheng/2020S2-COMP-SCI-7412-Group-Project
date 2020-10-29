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

import PropTypes from "prop-types";
import React from "react";
import { Breadcrumb, BreadcrumbItem, Button, Col, Container, Row } from "reactstrap";

export default class TimelineHeader extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
    };

    render() {
        return <>
            <div className="header header-dark bg-info pb-6 content__title content__title--calendar">
                <Container fluid>
                    <div className="header-body">
                        <Row className="align-items-center py-4">
                            <Col lg="6" xs="7">
                                <h6 className="fullcalendar-title h2 text-white d-inline-block mb-0">
                                    {this.props.name}
                                </h6>
                                <Breadcrumb className="d-none d-md-inline-block ml-lg-4" listClassName="breadcrumb-links breadcrumb-dark">
                                    <BreadcrumbItem>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <i className="fas fa-home"/>
                                        </a>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem aria-current="page" className="active">
                                        {this.props.name}
                                    </BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>;
    }
}
