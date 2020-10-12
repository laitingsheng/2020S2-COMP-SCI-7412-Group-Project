/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {Button, Container, Row, Col, Card} from "reactstrap";

class ProfileHeader extends React.Component {
    render() {
        return (
            <>
                <div
                    className="header pb-6 d-flex align-items-center"
                    style={{
                        minHeight: "500px",
                        backgroundImage:
                            'url("' + require("assets/img/theme/aec-background.jpg") + '")',
                        backgroundSize: "cover",
                        backgroundPosition: "center top"
                    }}
                >
                    {/*<span className="mask bg-gradient-info opacity-8" />*/}

                    <Container className="d-flex align-items-center" fluid>
                        <Row>
                            <Col lg="7" md="10">
                                <h1 className="display-2 text-white">Hello AEC Orgniser</h1>
                                <p className="text-white mt-0 mb-5">
                                    This is the Information entry interface page. You can see the progress you've
                                    made with your work and manage
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default ProfileHeader;
