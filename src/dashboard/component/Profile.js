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
    CustomInput,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";

import Header from "./Header";
import FirebaseContext from "../../context/FirebaseContext";

export default class Profile extends React.Component {
    static contextType = FirebaseContext;

    state = {};

    onchange = e => this.setState({ [e.target.name]: e.target.value });

    /**
     * @param {FormEvent} e
     * @param {firebase.firestore.DocumentReference} userRef
     */
    modify = e => {
        e.preventDefault();

        const {
            checked,
            ...data
        } = this.state;
        this.context.userRef.set(data, { merge: true }).catch(console.log);
        this.setState({ checked: false });
    };

    /**
     * @returns {JSX.Element}
     */
    GeneralCard = () => {
        const { user, docSnapshot, adminSnapshot } = this.context;
        return user && docSnapshot && adminSnapshot ? <Card>
            <CardHeader>
                <h3 className="mb-0">
                    Personal Information
                </h3>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col lg="8">
                        <Badge color="info">
                            {
                                adminSnapshot && adminSnapshot.exists
                                    ? `Staff (ID: ${adminSnapshot.get("staffid")}, Level: ${adminSnapshot.get("level")})`
                                    : "Electoral Roll Enrolled"
                            }
                        </Badge>
                        {user.email ? user.emailVerified ? <Badge color="success">Email Verified</Badge> : <Badge color="danger">Email Not Verified</Badge> : null}
                    </Col>
                </Row>
                <Row>
                    <Col lg="8">
                        <Badge color="info">Created: {new Date(user.metadata.creationTime).toString()}</Badge>
                    </Col>
                </Row>
                <Row>
                    <Col lg="8">
                        <Badge color="info">Last Login: {new Date(user.metadata.lastSignInTime).toString()}</Badge>
                    </Col>
                </Row>
                <hr />
                <Form onSubmit={this.modify}>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="firstName">
                                    First Name
                                </label>
                                <Input type="text" defaultValue={docSnapshot.get("firstName")} id="firstName" name="firstName" placeholder="First Name" required onChange={this.onchange} />
                            </FormGroup>
                        </Col>
                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="lastName">
                                    Last Name
                                </label>
                                <Input type="text" defaultValue={docSnapshot.get("lastName")} id="lastName" name="lastName" placeholder="Last Name" required onChange={this.onchange} />
                            </FormGroup>
                        </Col>
                    </div>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor="gender">
                                    Gender
                                </label>
                                <CustomInput type="select" defaultValue={docSnapshot.get("gender") ?? ""} id="gender" name="gender" placeholder="Gender" required onChange={this.onchange}>
                                    <option disabled value="">Gender</option>
                                    <option>Female</option>
                                    <option>Male</option>
                                </CustomInput>
                            </FormGroup>
                        </Col>
                        <Col className="mb-3" md="6">
                            <FormGroup className="has-danger">
                                <label className="form-control-label" htmlFor="birthday">
                                    Date of Birth
                                </label>
                                <Input type="date" defaultValue={docSnapshot.get("birthday")} id="birthday" name="birthday" required onChange={this.onchange} />
                            </FormGroup>
                        </Col>
                    </div>
                    <FormGroup className="has-danger">
                        <div className="custom-control custom-checkbox mb-3">
                            <Input type="checkbox" className={classnames("custom-control-input", { "is-invalid": !this.state.checked })} id="agreement" required onChange={() => this.setState(prev => ({ checked: !prev.checked }))} />
                            <label className="custom-control-label" htmlFor="agreement">
                                Agree to modify the personal information.
                            </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                    </FormGroup>
                    <Button color="primary" type="submit">
                        Modify
                    </Button>
                </Form>
            </CardBody>
        </Card> : null;
    };

    render() {
        return <>
            <Header name="Profile" />
            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <div className="card-wrapper">
                            <this.GeneralCard />
                        </div>
                    </div>
                </Row>
            </Container>
        </>;
    }
}
