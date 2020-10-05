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

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRn5Nf1_4JZggwEgF5ttKTePsAJg8qKe8",
    authDomain: "comp-sci-7412-group-project.firebaseapp.com",
    databaseURL: "https://comp-sci-7412-group-project.firebaseio.com",
    projectId: "comp-sci-7412-group-project",
    storageBucket: "comp-sci-7412-group-project.appspot.com",
    messagingSenderId: "915849829476",
    appId: "1:915849829476:web:6ef7b7b2b620d1cabf5371",
    measurementId: "G-D9QL9W718S"
  };
  // Initialize Firebase
  var defaultProject = firebase.initializeApp(firebaseConfig);
  // console.log(defaultProject.name);  // "[DEFAULT]"
  const auth = firebase.auth();
  const db = firebase.firestore();
  // //update firebase libary
  // firebase.firestore().settings({timestampsInSnapshots: true});
var firebaseui = require('firebaseui');


var ui = new firebaseui.auth.AuthUI(firebase.auth());


var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      // document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);


class Login extends React.Component {
  state = {};

  

//   componentDidMount(){
//     fsDB.collection("newsletters").get().then((querySnapshot) => {
//        querySnapshot.forEach((doc) => {
//           console.log(`${doc.id} => ${doc.data()}`);
//        });
//     });
//  }




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
                  
                  <Form role="form" method="POST">
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
                        id='firebaseui-auth-container'
                        placeholder="Email" 
                        type="email"
                        onFocus={() => this.setState({ focusedEmail: true })} 
                        onBlur={() => this.setState({ focusedEmail: false })}/>
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
                          id='upwd'
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
                      <Button className="my-4" color="info" type="button">Sign in</Button>
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
