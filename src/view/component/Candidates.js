/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim
* Edited by Jiawei Zhu, Tinson Lai

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import _ from "lodash";
import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    CustomInput,
    Form,
    FormGroup,
    Input,
    InputGroup, InputGroupAddon,
    ListGroup,
    ListGroupItem,
    Row
} from "reactstrap";

import { firestore } from "FirebaseClient";
import SimpleHeader from "view/component/header/SimpleHeader";

export default class Candidates extends React.Component {
    state = {};

    componentDidMount() {
        this.unsub_curr = firestore.collection("elections").doc("current").onSnapshot(
            current => {
                /**
                 * @type {firebase.firestore.DocumentReference}
                 */
                const ref = current.get("year");
                this.setState({ ref });
                if (this.unsub_ref)
                    this.unsub_ref();
                this.unsub_ref = ref.onSnapshot(
                    config => this.setState({ config }),
                    console.log
                );
                if (this.unsub_cands)
                    this.unsub_cands();
                this.unsub_cands = ref.collection("candidates").onSnapshot(
                    candidatesSnapshot => this.setState({ candidatesSnapshot }),
                    console.log
                );
            },
            console.log
        );
    }

    componentWillUnmount() {
        this.unsub_curr();
        delete this.unsub_curr;
        if (this.unsub_ref) {
            this.unsub_ref();
            delete this.unsub_ref;
        }
        if (this.unsub_cands) {
            this.unsub_cands();
            delete this.unsub_cands;
        }
    }

    /**
     * @param {number} key
     * @param {firebase.firestore.QueryDocumentSnapshot?} doc
     */
    generate(key, doc) {
        /**
         * @param {ChangeEvent} e
         */
        const onchange = e => {
            this.setState(prev => {
                const record = prev[key] ?? {};
                record[e.target.name] = e.target.value;
                return { [key]: record };
            });
        };
        /**
         * @param {FormEvent} e
         */
        const submit = e => {
            e.preventDefault();

            this.state.ref.collection("candidates").doc(key.toString()).set(this.state[key], { merge: true }).catch(console.log);
        };

        return <Card key={key}>
            <CardHeader>
                <h3 className="mb-0">
                    Candidate {key + 1}
                </h3>
            </CardHeader>
            <CardBody>
                <Form onSubmit={submit}>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor={`${key}-name`}>
                                    Name
                                </label>
                                <Input type="text" defaultValue={doc?.get("name")} id={`${key}-name`} name="name" placeholder="Name" required onChange={onchange} />
                            </FormGroup>
                        </Col>
                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor={`${key}-gender`}>
                                    Gender
                                </label>
                                <CustomInput type="select" defaultValue={doc?.get("gender") ?? ""} id={`${key}-gender`} name="gender" placeholder="Gender" required onChange={onchange}>
                                    <option disabled value="">Gender</option>
                                    <option>Female</option>
                                    <option>Male</option>
                                </CustomInput>
                            </FormGroup>
                        </Col>
                    </div>
                    <Button color="primary" type="submit">
                        Modify
                    </Button>
                </Form>
            </CardBody>
        </Card>;
    }

    /**
     * @param {FormEvent} e
     */
    addParty = e => {
        e.preventDefault();

        const parties = this.state.config.get("parties") ?? {};
        let partiesCount = this.state.config.get("partiesCount") ?? 0;
        const { party } = this.state;
        if (!(party in parties)) {
            parties[party] = partiesCount;
            ++partiesCount;
        }
        this.state.ref.set({ parties, partiesCount }, { merge: true }).catch(console.log);
    }

    render() {
        const { candidatesSnapshot, config, ref } = this.state;
        if (ref && candidatesSnapshot && config) {
            const exists = _.keyBy(candidatesSnapshot.docs, doc => doc.id);
            return <>
                <SimpleHeader name={`Candidates (Current: ${config.id})`}/>
                <Container className="mt--6" fluid>
                    <Row>
                        <div className="col">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>
                                        <h3 className="mb-0">
                                            Parties
                                        </h3>
                                    </CardHeader>
                                    <CardBody>
                                        <ListGroup>
                                            {_.map(config.get("parties"), (key, party) => <ListGroupItem key={key}>{party}</ListGroupItem>)}
                                        </ListGroup>
                                        <hr />
                                        <Form onSubmit={this.addParty}>
                                            <div className="form-row">
                                                <Col className="mb-3" md="12">
                                                    <InputGroup>
                                                        <Input type="text" placeholder="Enter new party name here..." required onChange={e => this.setState({ party: e.target.value })} />
                                                        <InputGroupAddon addonType="append"><Button color="primary" type="submit">Add Party</Button></InputGroupAddon>
                                                    </InputGroup>
                                                </Col>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                                {_.range(0, config.get("seats")).map(key => key in exists ? this.generate(key, exists[key]) : this.generate(key))}
                            </div>
                        </div>
                    </Row>
                </Container>
            </>;
        }
        return null;
    }
}
