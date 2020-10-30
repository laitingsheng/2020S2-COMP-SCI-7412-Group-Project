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

import { contextPropTypes, FirebaseContext, wrapWithContext } from "FirebaseClient";
import SimpleHeader from "view/component/header/SimpleHeader";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

class BallotImpl extends React.Component {
    static propTypes = Object.assign({}, contextPropTypes);

    state = {};

    render() {
        const { user } = this.props;
        return user ? <>
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
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </> : null;
    }
}

const Ballot = wrapWithContext(BallotImpl);

export default Ballot;
