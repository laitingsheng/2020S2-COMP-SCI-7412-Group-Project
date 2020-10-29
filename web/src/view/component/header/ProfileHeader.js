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

import firebase from "firebase";
import PropTypes from "prop-types";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";

import background from "assets/img/theme/profile-cover.jpg";

export default class ProfileHeader extends React.Component {
    static propTypes = {
        /**
         * @type {firebase.User}
         */
        user: PropTypes.instanceOf(firebase.User).isRequired
    };

    render() {
        return <>
            <div className="header pb-6 d-flex align-items-center" style={{ minHeight: "500px", backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center top" }}>
                <span className="mask bg-gradient-info opacity-8"/>
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="7" md="10">
                            <h1 className="display-2 text-white">Hello {this.props.user.displayName}</h1>
                            <p className="text-white mt-0 mb-5">
                                This is your profile page. You can edit your personal information here. You might, however, need to contact the support team to edit some of the information.
                            </p>
                            <Button className="btn-neutral" color="default" href="#pablo" onClick={e => e.preventDefault()}>Edit profile</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>;
    }
}
