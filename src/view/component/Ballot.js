/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim
* Edited by Hongyi Zheng, Tinson Lai

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";

import SimpleHeader from "dashboard/component/Header";
import { Card, CardBody, CardHeader, Col, Collapse, Container, Row } from "reactstrap";

export default class Ballot extends React.Component {
    state = {};

    render() {
        return <>
            <SimpleHeader name="Ballot" />
            <Container className="mt--6" fluid>
                <Row>
                    <Col>
                        <div className="card-wrapper">
                            <Card>
                                <CardHeader>
                                    <h3 className="mb-0">
                                        Ballot
                                    </h3>
                                </CardHeader>
                                <CardBody>
                                    <label className="custom-toggle mr-1" htmlFor="above-switch">
                                        <input type="checkbox" onChange={() => this.setState(prev => ({ above: !prev.above }))} />
                                        <span className="custom-toggle-slider rounded-circle" />
                                    </label>
                                    <p id="above-switch">
                                        Use this switch to change the way you want to vote (<em>below</em> vs <em>above</em>).
                                    </p>
                                    <Collapse isOpen={!this.state.above}>
                                    </Collapse>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>;
    }
}
