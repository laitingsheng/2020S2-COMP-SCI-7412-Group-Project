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
import React , { useState } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Collapse,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  NavLink,
  UncontrolledCollapse
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import ReCAPTCHA from "react-google-recaptcha";

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import Select from 'react-select';
import 'react-dropdown/style.css';

// Router
import { Link } from "react-router-dom";

import Login from "./Login";

const options = [
  { value: 'Pt', label: 'Passport' },
  { value: 'DL', label: 'Driver License' },
];

const AuStates = [
  {value:'NSW' , label: 'New South Wales'},
  {value:'QLD' , label: 'Queensland'},
  {value:'NT' , label: 'Northern Territory'},
  {value:'WA' , label: 'Western Australia'},
  {value:'SA' , label: 'South Australia'},
  {value:'VIC' , label: 'Victoria'},
  {value:'ACT' , label: 'Australian Capital Territory'},
  {value:'TAS' , label: 'Tasmania'}
]



class Register extends React.Component {
  state = {
    selectedOption: '',
    selectedState: '',
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  handleChangeState = selectedState => {
    this.setState({ selectedState });
  };

  render() {
    const { selectedOption, selectedState } = this.state;
    let details;
    let inputField;

    if(selectedOption.value === 'Pt'){
      details = '';

      inputField = <FormGroup
      className={classnames({
        focused: this.state.focusedPT
      })}
    >
      <InputGroup className="input-group-merge input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-collection" />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Passport Number"
          type="PT"
          onFocus={() => this.setState({ focusedPT: true })}
          onBlur={() => this.setState({ focusedPT: false })}
        />
      </InputGroup>
    </FormGroup>;
    }else if(selectedOption.value === "DL"){
      details =
      <Select
      value={selectedState}
      onChange={this.handleChangeState}
      options={AuStates}
      />;
      inputField = <FormGroup
      className={classnames({
        focused: this.state.focusedDL
      })}
    >
      <InputGroup className="input-group-merge input-group-alternative mb-3">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="ni ni-bus-front-12" />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Driver License Number"
          type="DL"
          onFocus={() => this.setState({ focusedDL: true })}
          onBlur={() => this.setState({ focusedDL: false })}
        />
      </InputGroup>
    </FormGroup>;
    }else{
      details = '';

    }

    return (

      <>
        <AuthHeader
          title="Create an account"
          lead="And start voting"
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
                        focused: this.state.focusedName
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Name"
                          type="name"
                          onFocus={() => this.setState({ focusedName: true })}
                          onBlur={() => this.setState({ focusedName: false })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedGender
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-satisfied" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Gender"
                          type="gender"
                          onFocus={() => this.setState({ focusedGender: true })}
                          onBlur={() => this.setState({ focusedGender: false })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedDOB
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-calendar-grid-58" />
                          </InputGroupText>
                        </InputGroupAddon>
                        {/* <Input
                          disabled
                          placeholder="Date of birth"
                          type="DOB"
                          onFocus={() => this.setState({ focusedDOB: true })}
                          onBlur={() => this.setState({ focusedDOB: false })}
                        /> */}
                        <DayPickerInput
                          dayPickerProps={{
                            // month: new Date(2018, 10),
                            showWeekNumbers: true,
                            todayButton: 'Today',
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
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
                    <FormGroup>
                    <div>
                      <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                        Document Verification(Optional)
                      </Button>
                      <UncontrolledCollapse toggler="#toggler">

                        <Card className="bg-secondary border-0">

                          <CardBody className="px-lg-5 py-lg-5">

                            <Form role="form">
                              <FormGroup> Please fill in the following details: </FormGroup>
                              <FormGroup>

                              <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                              />
                              </FormGroup>
                              <FormGroup>
                                {details}
                              </FormGroup>
                              <FormGroup>
                                {inputField}
                              </FormGroup>

                            </Form>
                          </CardBody>
                        </Card>
                      </UncontrolledCollapse>
                    </div>
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
              <Row className="mt-3">
                <Col xs="6">

                </Col>
                    <Col className="text-right" xs="6">
                      <NavLink className="text-light" to="/auth/login" tag={Link}>
                          <small>Already have an account</small>
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

export default Register;
