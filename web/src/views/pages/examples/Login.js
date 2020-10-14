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
// Router
import { Link } from "react-router-dom";
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
// recaptcha
import ReCAPTCHA from "react-google-recaptcha";

import Register from "./Register";

import fire from "./firebase";

class Login extends React.Component {

 
    login = this.login.bind(this);
    handleChange = this.handleChange.bind(this);
    state = {
      email:"",
      password:""
    }

  handleChange(e){
    // console.log(e.target.name+" " +e.target.value)
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  login(e){
    console.log(this.state.email);
    console.log(this.state.password);
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
      console.log(u);
    }).catch((err)=>{
      console.log(err);
    })
  }

  render() {
    return (
      
      <>
        <AuthHeader
          title="Online voting System"
          lead="Please sign in with your account OR sign up for a new account"
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Sign in with credentials</small>
                  </div>
                  
                  <Form role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                        name="email"
                        id="email"
                        placeholder="Email" 
                        type="email"
                        onChange={this.handleChange}
                        value={this.state.email}
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
                          name="password"
                          id="password"
                          placeholder="Password"
                          type="password"
                          onChange = {this.handleChange}
                          value={this.state.password}
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedPassword: false })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                     {/* Test Google Recapcha */}
                     <ReCAPTCHA theme="light" className="my-3" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"/>
 
                    <div className="text-center">
                    <NavLink className="text-light" to="/admin/dashboard" tag={Link}>
                      <Button className="my-4" color="info" type="button" 
                      onClick={this.login}
                      >Sign in</Button>
                      </NavLink>
                    </div>
                    </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
                    <Col className="text-right" xs="6">
                      <NavLink className="text-light" to="/auth/register" tag={Link}>
                          <small>Create new account</small>
                        </NavLink>
                    </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );

    
  }
  
}

export default Login;
