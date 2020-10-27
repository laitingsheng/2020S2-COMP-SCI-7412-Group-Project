/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim
* Edited by Tinson Lai, Minhao Zhu

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import classnames from "classnames";
import owasp from "owasp-password-strength-test";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
    Button, Card, CardBody, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from "reactstrap";

import { ReCAPTCHA_key } from "Keys";
import { auth, firestore } from "FirebaseClient.js";
import AuthHeader from "view/component/header/AuthHeader";

export default class Register extends React.Component {
    state = {};

    /**
     * @type {React.RefObject<ReCAPTCHA>}
     */
    recaptcha = React.createRef();

    /**
     * @param {ChangeEvent} e
     */
    onchange = e => this.setState({ [e.target.name]: e.target.value })

    /**
     * @param {ChangeEvent} e
     */
    check = e => {
        const password = e.target.value;
        const result = owasp.test(password);
        this.setState({
            password,
            strength: result.strong ? 2 : result.requiredTestErrors.length <= result.optionalTestsPassed ? 1 : 0
        });
    }

    /**
     *
     * @param {firebase.User} user
     */
    postRegister = ({ user }) => {
        this.recaptcha.current.reset();
        this.setState({ checked: false });

        user.updateProfile({ displayName: this.state.name }).catch(console.log);

        firestore.collection("users").doc(user.uid).set({ name: this.state.name }).catch(console.log);
    }

    /**
     * @param {FormEvent} e
     */
    register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(
            this.postRegister,
            () => {
                this.recaptcha.current.reset();
                this.setState({ checked: false });
            }
        )
    }

    /**
     * @returns {JSX.Element}
     */
    renderStrength() {
        switch (this.state.strength) {
            default:
                return <span className={classnames("text-danger", "font-weight-700")}>Weak</span>;
            case 1:
                return <span className={classnames("text-warning", "font-weight-700")}>Medium</span>;
            case 2:
                return <span className={classnames("text-success", "font-weight-700")}>Strong</span>;
        }
    }

    render() {
        return <>
            <AuthHeader title="Create an account" lead="Create a new account for voting." />
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                    <Col lg="6" md="8">
                        <Card className="bg-secondary border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form" onSubmit={this.register}>
                                    <FormGroup className={classnames({ focused: this.state.focusedName })}>
                                        <InputGroup className="input-group-merge input-group-alternative mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-hat-3" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Name" type="text" name="name" required onFocus={() => this.setState({ focusedName: true })} onBlur={() => this.setState({ focusedName: false })} onChange={this.onchange} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className={classnames({ focused: this.state.focusedEmail })}>
                                        <InputGroup className="input-group-merge input-group-alternative mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Email" type="email" name="email" required onFocus={() => this.setState({ focusedEmail: true })} onBlur={() => this.setState({ focusedEmail: false })} onChange={this.onchange} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className={classnames({ focused: this.state.focusedPassword })}>
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Password" type="password" name="password" required onFocus={() => this.setState({ focusedPassword: true }) } onBlur={() => this.setState({ focusedPassword: false }) } onChange={this.check} />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="text-muted font-italic">
                                        <small>
                                            Password Strength: {this.renderStrength()}
                                        </small>
                                    </div>
                                    <ReCAPTCHA sitekey={ReCAPTCHA_key} ref={this.recaptcha} onChange={() => this.setState({ checked: true })} onExpired={() => this.setState({ checked: false })} />
                                    <div className="text-center">
                                        <Button className="mt-4" color="info" type="submit" disabled={this.state.strength < 2 || !this.state.checked}>Create Account</Button>
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
