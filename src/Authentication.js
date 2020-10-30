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
import owasp from "owasp-password-strength-test";
import React from "react";
import { Redirect } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";

import FirebaseContext from "./context/FirebaseContext";

export default class Authentication extends React.Component {
    static contextType = FirebaseContext;

    state = {};

    /**
     * @param {string} password
     */
    checkPassword(password) {
        const result = owasp.test(password);
        return result.strong ? 2 : result.requiredTestErrors.length <= result.optionalTestsPassed ? 1 : 0;
    };

    componentDidMount() {
        document.body.classList.add("bg-default");
    }

    componentWillUnmount() {
        document.body.classList.remove("bg-default");
    }

    /**
     * @param {ChangeEvent} e
     */
    onchange = e => this.setState({ [e.target.name]: e.target.value });

    /**
     * @param {ChangeEvent} e
     */
    check = e => {
        const password = e.target.value;
        this.setState({
            password,
            strength: this.checkPassword(password)
        });
    };

    /**
     * @param {FormEvent} e
     */
    tryLogin = e => {
        e.preventDefault();

        this.context.auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(
            () => this.setState({ state: 2 }),
            e => {
                if (e.code === "auth/user-not-found")
                    this.setState(prev => ({ state: 1, strength: this.checkPassword(prev.password) }));
                console.log(e);
            }
        );
    };

    /**
     * @param {FormEvent} e
     */
    register = e => {
        e.preventDefault();

        this.context.auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(
            ({ user }) => {
                const { firstName, lastName } = this.state;
                user.updateProfile({ displayName: `${firstName} ${lastName}` }).catch(console.log);

                this.context.firestore.collection("users").doc(user.uid).set({ firstName, lastName }).catch(console.log);
            },
            console.log
        );
    };

    /**
     * @returns {JSX.Element}
     */
    renderStrength() {
        switch (this.state.strength) {
            case 1:
                return <span className="text-warning font-weight-700">Medium</span>;
            case 2:
                return <span className="text-success font-weight-700">Strong</span>;
            default:
                return <span className="text-danger font-weight-700">Weak</span>;
        }
    }

    /**
     * @returns {JSX.Element}
     */
    SignupForm = () => {
        return <Form role="form" onSubmit={this.register}>
            <FormGroup className={classnames({ focused: this.state.focusedEmail })}>
                <InputGroup className="input-group-merge input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-email-83" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" name="email" defaultValue={this.state.email} required onFocus={() => this.setState({ focusedEmail: true })} onBlur={() => this.setState({ focusedEmail: false })} onChange={this.onchange} />
                </InputGroup>
            </FormGroup>
            <FormGroup className={classnames({ focused: this.state.focusedPassword })}>
                <InputGroup className="input-group-merge input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" name="password" defaultValue={this.state.password} required onFocus={() => this.setState({ focusedPassword: true }) } onBlur={() => this.setState({ focusedPassword: false }) } onChange={this.check} />
                </InputGroup>
            </FormGroup>
            <FormGroup className={classnames({ focused: this.state.focusedFirstName })}>
                <InputGroup className="input-group-merge input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-hat-3" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="First Name" type="text" name="firstName" required onFocus={() => this.setState({ focusedFirstName: true })} onBlur={() => this.setState({ focusedFirstName: false })} onChange={this.onchange} />
                </InputGroup>
            </FormGroup>
            <FormGroup className={classnames({ focused: this.state.focusedLastName })}>
                <InputGroup className="input-group-merge input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="ni ni-hat-3" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Last Name" type="text" name="lastName" required onFocus={() => this.setState({ focusedLastName: true })} onBlur={() => this.setState({ focusedLastName: false })} onChange={this.onchange} />
                </InputGroup>
            </FormGroup>
            <div className="text-muted font-italic">
                <small>
                    Password Strength: {this.renderStrength()}
                </small>
            </div>
            <div className="text-center">
                <Button className="mt-4" color="info" type="submit" disabled={this.state.strength < 2 || !this.state.checked}>
                    Create Account
                </Button>
            </div>
        </Form>;
    };

    /**
     * @returns {JSX.Element}
     */
    LoginForm = () => {
        return <Form role="form" onSubmit={this.tryLogin}>
            <FormGroup className={classnames("mb-3", { focused: this.state.focusedEmail })}>
                <InputGroup className="input-group-merge input-group-alternative">
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
                    <Input placeholder="Password" type="password" name="password" required onFocus={() => this.setState({ focusedPassword: true }) } onBlur={() => this.setState({ focusedPassword: false }) } onChange={this.onchange} />
                </InputGroup>
            </FormGroup>
            <div className="text-center">
                <Button className="my-4" color="info" type="submit">
                    Proceed
                </Button>
            </div>
        </Form>;
    };

    render() {
        const { LoginForm, SignupForm } = this;
        return this.state.state === 2 || this.context.user ? <Redirect to="/dashboard" /> : <>
            <div className="header bg-gradient-info py-7 py-lg-8 pt-lg-9">
                <Container>
                    <div className="header-body text-center mb-7">
                        <Row className="justify-content-center">
                            <Col className="px-5" lg="6" md="8" xl="5">
                                <h1 className="text-white">
                                    Sign in | Sign up
                                </h1>
                                <p className="text-lead text-white">
                                    Sign in if you have an account, or create one otherwise.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <div className="separator separator-bottom separator-skew zindex-100">
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="fill-default" points="2560 0 2560 100 0 100" />
                    </svg>
                </div>
            </div>
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                    <Col lg="5" md="7">
                        <Card className="bg-secondary border-0 mb-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                {this.state.state === 1 ? <SignupForm /> : <LoginForm />}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>;
    }
}
