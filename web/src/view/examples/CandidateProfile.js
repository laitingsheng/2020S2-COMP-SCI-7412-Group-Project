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
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardImg,
    CardTitle,
    FormGroup,
    Form,
    Input,
    ListGroupItem,
    ListGroup,
    Progress,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import { firestore as db } from "FirebaseClient";
import AuthHeader from "view/component/header/AuthHeader";
import CandidateProfileHeader from "view/component/header/CandidateProfileHeader";
import {string} from "prop-types";

class CandidateProfile extends React.Component {

    render() {
        return (
            <>
                <CandidateProfileHeader />
                <Container className="mt--6" fluid>
                    <Row>
                        <Col className="order-xl-1" xl="12">
                            <Card>
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Edit candidate profile</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={e => e.preventDefault()}
                                                size="md"
                                            >
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Candidate information
                                        </h6>
                                        <div className="pl-lg-4" id={1}>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-party"
                                                        >
                                                            Party
                                                        </label>
                                                        <Input
                                                            defaultValue="Party"
                                                            id="input-party"
                                                            placeholder="party"
                                                            type="text"
                                                            onBlur={this.analyse}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            id="input-email"
                                                            placeholder="***@example.com"
                                                            type="email"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            First name
                                                        </label>
                                                        <Input
                                                            defaultValue="First name"
                                                            id="input-first-name"
                                                            placeholder="First name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Last name
                                                        </label>
                                                        <Input
                                                            defaultValue="Last name"
                                                            id="input-last-name"
                                                            placeholder="Last name"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />

                                        <h6 className="heading-small text-muted mb-4">
                                            Contact information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Address
                                                        </label>
                                                        <Input
                                                            defaultValue="eg: The University of Adelaide, SA 5005, AUSTRALIA"
                                                            id="input-address"
                                                            placeholder="Home Address"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-city"
                                                        >
                                                            City
                                                        </label>
                                                        <Input
                                                            defaultValue="eg: Adelaide"
                                                            id="input-city"
                                                            placeholder="City"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-country"
                                                        >
                                                            Country
                                                        </label>
                                                        <Input
                                                            defaultValue="eg: Australia"
                                                            id="input-country"
                                                            placeholder="Country"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-country"
                                                        >
                                                            Postal code
                                                        </label>
                                                        <Input
                                                            id="input-postal-code"
                                                            placeholder="eg: 5000"
                                                            type="number"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                        <hr className="my-4" />

                                        <h6 className="heading-small text-muted mb-4">About Candidate</h6>
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label className="form-control-label">About Candidate</label>
                                                <Input
                                                    placeholder="A few words about you ..."
                                                    rows="4"
                                                    type="textarea"
                                                    defaultValue="Personal Profile. "
                                                />
                                            </FormGroup>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default CandidateProfile;
