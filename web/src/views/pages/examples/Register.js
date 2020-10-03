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
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
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
  Col,
  NavLink
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import ReCAPTCHA from "react-google-recaptcha";


// Router
import { Link } from "react-router-dom";

import Login from "./Login";
// //firebase
// import firebaseConfig from "config/firebaseConfig";

class Register extends React.Component {
  state = {};
  render() {
    return (
      <>
        <AuthHeader
          title="Create an account"
          lead="Use these awesome forms to login or create new account in your project for free."
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              <Card className="bg-secondary border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Sign up with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedPassword: false })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-muted font-italic">
                      <small>
                        password strength:{" "}
                        <span className="text-success font-weight-700">
                          strong
                        </span>
                      </small>
                    </div>
                    <ReCAPTCHA theme="light" className="my-3" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"/>
                    
                    {/* Not for use currently */}
                    <NavLink to="/auth/login" tag={Link}>
                      <div className="text-center">
                        <Button className="mt-4" color="info" type="button">
                          Create account
                        </Button>
                      </div>
                  </NavLink>
                    
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

export default Register;
