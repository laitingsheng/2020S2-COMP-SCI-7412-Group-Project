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
import moment from "moment";
import owasp from "owasp-password-strength-test";
import React from "react";
import {
    Button,
    Card,
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

import { auth } from "../../firebase.js";
import AuthHeader from "./header/AuthHeader";

const options = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" }
]


class Register extends React.Component {
    state = {};

    render() {
        return <>
            <AuthHeader title="Create an account" lead="Create a new account for voting." />
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                    <Col lg="6" md="8">
                        <Card className="bg-secondary border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                    <FormGroup className={classnames({ focused: this.state.focusedName })}>
                                        <InputGroup className="input-group-merge input-group-alternative mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-hat-3" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Name" type="text" required onFocus={() => this.setState({ focusedName: true })} onBlur={() => this.setState({ focusedName: false })} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className={classnames({ focused: this.state.focusedGender })}>
                                        <InputGroup className="input-group-merge input-group-alternative mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-single-02" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="select" defaultValue="" required onFocus={() => this.setState({ focusedGender: true })} onBlur={() => this.setState( { focusedGender: false })}>
                                                <option value="" disabled hidden>Gender</option>
                                                <option value="FEMALE">Female</option>
                                                <option value="MALE">Male</option>
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className={classnames({ focused: this.state.focusedBirthday })}>
                                        <InputGroup className="input-group-merge input-group-alternative mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-world" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="date" required onFocus={() => this.setState({ focusedBirthday: true })} onBlur={() => this.setState( { focusedBirthday: false })} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className={classnames({ focused: this.state.focusedEmail })}>
                                        <InputGroup className="input-group-merge input-group-alternative mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Email" type="email" required onFocus={() => this.setState({ focusedEmail: true })} onBlur={() => this.setState({ focusedEmail: false })} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className={classnames({ focused: this.state.focusedPassword })}>
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Password" type="password" required onFocus={() => this.setState({ focusedPassword: true }) } onBlur={() => this.setState({ focusedPassword: false }) } />
                                        </InputGroup>
                                    </FormGroup>
                                        <div className="text-muted font-italic">
                                        <small>
                                            password strength: <span className="text-success font-weight-700">strong</span>
                                        </small>
                                    </div>
                                    <div className="text-center">
                                        <Button className="mt-4" color="info" type="submit">Create account</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>;
    }
}

export default Register;
