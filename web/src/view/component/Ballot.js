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

import { FirebaseContext } from "FirebaseClient";
import SimpleHeader from "view/component/header/SimpleHeader";
import { Card, CardBody, CardHeader, Container, Row } from "reactstrap";

export default class Ballot extends React.Component {
    state = {};

    render() {
        return <FirebaseContext.Consumer>
            {({ user }) => user ? <>
                <SimpleHeader name="Ballot" />
                <Container className="mt--6" fluid>
                    <Row>
                        <div className="col">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>
                                        <h3 className="mb-0">
                                            Ballot
                                        </h3>
                                        <label className="custom-toggle mr-1">
                                            <input type="checkbox" />
                                            <span className="custom-toggle-slider rounded-circle" />
                                        </label>
                                    </CardHeader>
                                    <CardBody></CardBody>
                                </Card>
                            </div>
                        </div>
                    </Row>
                </Container>
            </> : null}
        </FirebaseContext.Consumer>;
    }
}
