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

import classnames from "classnames";
import React from "react";
import {
    Badge,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

import SimpleHeader from "view/component/header/SimpleHeader.js";
import { FirebaseContext } from "FirebaseClient";

export default class Profile extends React.Component {
    state = {
        customStyles: {
            firstName: "Mark",
            firstNameState: null,
            lastName: "Otto",
            lastNameState: null,
            username: "",
            usernameState: null,
            city: "",
            cityState: null,
            state: "",
            stateState: null,
            zip: "",
            zipState: null,
            checkbox: false,
            checkboxState: null
        },
        validity: {}
    };
    validateCustomStylesForm = () => {
        let newState = this.state.customStyles;
        if (newState.firstName === "") {
            newState.firstNameState = "invalid";
        } else {
            newState.firstNameState = "valid";
        }
        if (newState.lastName === "") {
            newState.lastNameState = "invalid";
        } else {
            newState.lastNameState = "valid";
        }
        if (newState.username === "") {
            newState.usernameState = "invalid";
        } else {
            newState.usernameState = "valid";
        }
        if (newState.city === "") {
            newState.cityState = "invalid";
        } else {
            newState.cityState = "valid";
        }
        if (newState.state === "") {
            newState.stateState = "invalid";
        } else {
            newState.stateState = "valid";
        }
        if (newState.zip === "") {
            newState.zipState = "invalid";
        } else {
            newState.zipState = "valid";
        }
        if (newState.checkbox === false) {
            newState.checkboxState = "invalid";
        } else {
            newState.checkboxState = "valid";
        }
        this.setState({
                          customStyles: newState
                      });
    };
    customStylesForm = (e, stateName) => {
        let newState = this.state.customStyles;
        newState[stateName] = e.target.value;
        if (stateName === "checkbox") {
            if (e.target.value) {
                newState.checkboxState = "valid";
            } else {
                newState.checkboxState = "invalid";
            }
        } else {
            if (e.target.value === "") {
                newState[stateName + "State"] = "invalid";
            } else {
                newState[stateName + "State"] = "valid";
            }
        }
        this.setState({
                          customStyles: newState
                      });
    };
    render() {
        return <FirebaseContext.Consumer>
            {({ user, doc }) => user && doc ? <>
                <SimpleHeader name="Profile" />
                    <Container className="mt--6" fluid>
                        <Row>
                            <div className="col">
                                <div className="card-wrapper">
                                    <Card>
                                        <CardHeader>
                                            <h3 className="mb-0">Personal Information</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                {user.email ? <Col lg="8">
                                                    <p className="mb-0">
                                                        Email Verified: {user.emailVerified ? <Badge color="success">Verified</Badge> : <Badge color="danger">Unverified</Badge>}
                                                    </p>
                                                </Col> : null}
                                            </Row>
                                            <hr />
                                            <Form>
                                                <div className="form-row">
                                                    <Col className="mb-3" md="4">
                                                        <FormGroup className="has-success">
                                                            <label className="form-control-label" htmlFor="validationServer01">
                                                                First name
                                                            </label>
                                                            <Input className="is-valid" type="text" defaultValue={doc.get("firstName")} id="validationServer01" placeholder="First Name" required />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="mb-3" md="4">
                                                        <FormGroup className="has-success">
                                                            <label className="form-control-label" htmlFor="validationServer02">
                                                                Last Name
                                                            </label>
                                                            <Input className="is-valid" defaultValue={doc.get("lastName")} id="validationServer02" placeholder="Last name" required type="text" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="mb-3" md="4">
                                                        <FormGroup className="has-danger">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="validationServerUsername"
                                                            >
                                                                Username
                                                            </label>
                                                            <Input
                                                                aria-describedby="inputGroupPrepend3"
                                                                className="is-invalid"
                                                                id="validationServerUsername"
                                                                placeholder="Username"
                                                                required
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </div>
                                                <div className="form-row">
                                                    <Col className="mb-3" md="6">
                                                        <FormGroup className="has-danger">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="validationServer03"
                                                            >
                                                                City
                                                            </label>
                                                            <Input
                                                                className="is-invalid"
                                                                id="validationServer03"
                                                                placeholder="City"
                                                                required
                                                                type="text"
                                                            />
                                                            <div className="invalid-feedback">
                                                                Please provide a valid city.
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="mb-3" md="3">
                                                        <FormGroup className="has-danger">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="validationServer04"
                                                            >
                                                                State
                                                            </label>
                                                            <Input
                                                                className="is-invalid"
                                                                id="validationServer04"
                                                                placeholder="State"
                                                                required
                                                                type="text"
                                                            />
                                                            <div className="invalid-feedback">
                                                                Please provide a valid state.
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col className="mb-3" md="3">
                                                        <FormGroup className="has-danger">
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="validationServer05"
                                                            >
                                                                Zip
                                                            </label>
                                                            <Input
                                                                className="is-invalid"
                                                                id="validationServer05"
                                                                placeholder="Zip"
                                                                required
                                                                type="text"
                                                            />
                                                            <div className="invalid-feedback">
                                                                Please provide a valid zip.
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                </div>
                                                <FormGroup className="has-danger">
                                                    <div className="custom-control custom-checkbox mb-3">
                                                        <input
                                                            className="custom-control-input is-invalid"
                                                            defaultValue=""
                                                            id="invalidCheck3"
                                                            required
                                                            type="checkbox"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="invalidCheck3"
                                                        >
                                                            Agree to terms and conditions
                                                        </label>
                                                        <div className="invalid-feedback">
                                                            You must agree before submitting.
                                                        </div>
                                                    </div>
                                                </FormGroup>
                                                <Button color="primary" type="submit">
                                                    Submit form
                                                </Button>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </> : null}
        </FirebaseContext.Consumer>;
    }
}
