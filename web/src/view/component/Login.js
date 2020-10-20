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
import React from "react";
import { Link, Redirect } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
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
    Col,
    NavLink
} from "reactstrap";
import ReCAPTCHA from "react-google-recaptcha";

// core components
import { auth } from "../../firebase.js";
import AuthHeader from "./header/AuthHeader.js";

class Login extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @type {React.RefObject<ReCAPTCHA>}
         */
        this.recaptcha = React.createRef();
    }

    /**
     * @type {Object<string, any>}
     */
    state = { user: auth.currentUser };

    /**
     *
     * @param {React.MouseEvent<any, MouseEvent>} e
     */
    login(e) {
        e.preventDefault();

        this.setState({ captcha: false });

        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(c => this.setState({ user: c.user })).catch(() => this.recaptcha.current.reset());
    }

    render() {
        return this.state.user ? <Redirect to="/panel" /> : <>
            <AuthHeader title="Online Voting System" lead="Please sign in with your account" />
            <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                    <Col lg="5" md="7">
                        <Card className="bg-secondary border-0 mb-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <Form role="form">
                                    <FormGroup className={classnames("mb-3", { focused: this.state.focusedEmail })}>
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-email-83" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Email" type="email" onFocus={() => this.setState({ focusedEmail: true })} onBlur={() => this.setState({ focusedEmail: false })} onChange={e => this.setState({ email: e.target.value })} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className={classnames({ focused: this.state.focusedPassword })}>
                                        <InputGroup className="input-group-merge input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Password" type="password" onFocus={() => this.setState({ focusedPassword: true }) } onBlur={() => this.setState({ focusedPassword: false }) } onChange={e => this.setState({ password: e.target.value })} />
                                        </InputGroup>
                                    </FormGroup>
                                    <ReCAPTCHA theme="light" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={ () => this.setState({ captcha: true }) } onExpired={() => this.setState({ captcha: false })} ref={this.recaptcha} />
                                    <div className="text-center">
                                        <Button className="my-4" color="info" type="button" onClick={e => this.login(e)} disabled={!(this.state.email?.length && this.state.password?.length && this.state.captcha)}>
                                            Sign in
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                        <Row className="mt-3">
                            <Col xs="6" />
                            <Col className="text-right" xs="6">
                                <NavLink className="text-light" to="/register" tag={Link}>
                                    <small>Create new account</small>
                                </NavLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>;
    }
}

export default Login;
