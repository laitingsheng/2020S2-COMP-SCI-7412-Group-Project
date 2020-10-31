/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim
* Edited by Hongyi Zheng, Tinson Lai

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
    Collapse,
    Container,
    CustomInput,
    Form,
    FormGroup,
    Row, Table
} from "reactstrap";

import FirebaseContext from "../../context/FirebaseContext";
import Header from "./Header";

export default class Ballot extends React.Component {
    static contextType = FirebaseContext;

    state = {};

    componentDidMount() {
        this.unsub_curr = this.context.firestore.collection("elections").doc("current").onSnapshot(
            current => {
                /**
                 * @type {firebase.firestore.DocumentReference}
                 */
                const ref = current.get("year");
                this.setState({ ref });
                if (this.unsub_ref)
                    this.unsub_ref();
                this.unsub_ref = ref.onSnapshot(
                    config => this.setState({ year: config.id, parties: config.get("parties"), partiesCount: config.get("partiesCount") }),
                    console.log
                );
                if (this.unsub_cands)
                    this.unsub_cands();
                this.unsub_cands = ref.collection("candidates").onSnapshot(
                    candidatesSnapshot => this.setState({ candidatesSnapshot }),
                    console.log
                );
                if (this.unsub_ballot)
                    this.unsub_ballot();
                const ballotRef = ref.collection("ballots").doc(this.context.user.uid);
                this.setState({ ballotRef });
                this.unsub_ballot = ballotRef.onSnapshot(
                    ballotSnapshot => this.setState({ ballotSnapshot }),
                    console.log
                )
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
        if (this.unsub_ballot) {
            this.unsub_ballot();
            delete this.unsub_ballot;
        }
    }

    updatePartyPreferences(party, pref) {
        this.setState(prev => {
            const p = prev.partyPreferences ?? new Array(prev.partiesCount);
            p[pref - 1] = party;
            return { partyPreferences: p };
        });
    }

    updateCandidatePreference(party, candidate, pref) {
        this.setState(prev => {
            const p = prev.candidatePreferences ?? new Array(prev.candidatesSnapshot.size);
            p[pref - 1] = `${candidate.get("name")} (${party})`;
            return { candidatePreferences: p };
        });
    }

    /**
     * @param {FormEvent} e
     */
    submitParties = e => {
        e.preventDefault();

        this.state.ballotRef.set({ type: "Per Party", preferences: this.state.partyPreferences }).catch(console.log);
    }

    /**
     * @param {FormEvent} e
     */
    submitCandidates = e => {
        e.preventDefault();

        this.state.ballotRef.set({ type: "Per Candidate", preferences: this.state.candidatePreferences }).catch(console.log);
    }

    /**
     * @returns {JSX.Element}
     */
    Form = () => {
        const { parties, partiesCount, candidatesSnapshot } = this.state, categorised = {};
        if (parties && candidatesSnapshot) {
            for (const k in parties)
                categorised[k] = [];
            for (const doc of candidatesSnapshot.docs)
                categorised[doc.get("party")].push(doc);

            return <>
                <Collapse isOpen={!this.state.below}>
                    <Form role="form" onSubmit={this.submitParties}>
                        <FormGroup>
                            <Col>
                                <Row>
                                    {_.map(parties, (key, party) => <Col key={key}>
                                        <Row>
                                            {party}
                                        </Row>
                                        <hr />
                                        <Row>
                                            <CustomInput type="select" defaultValue="" id={`${party}-preference`} required onChange={e => this.updatePartyPreferences(party, e.target.value)}>
                                                <option disabled value="">Preference</option>
                                                {_.range(partiesCount).map(key => <option disabled={this.state.partyPreferences?.[key]} key={key}>{key + 1}</option>)}
                                            </CustomInput>
                                        </Row>
                                    </Col>)}
                                </Row>
                            </Col>
                        </FormGroup>
                        <Button color="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Collapse>
                <Collapse isOpen={this.state.below}>
                    <Form role="form" onSubmit={this.submitCandidates}>
                        <FormGroup>
                            <Col>
                                <Row>
                                    {_.map(parties, (key, party) => <Col key={key}>
                                        <Row>
                                            {party}
                                        </Row>
                                        <hr />
                                        {categorised[party].map((candidate, key) => <Row key={key}>
                                            <label htmlFor={`${party}-${candidate.get("name")}-preference`}>
                                                {candidate.get("name")}
                                            </label>
                                            <CustomInput type="select" defaultValue="" id={`${party}-${candidate.get("name")}-preference`} required onChange={e => this.updateCandidatePreference(party, candidate, e.target.value)}>
                                                <option disabled value="">Preference</option>
                                                {_.range(candidatesSnapshot.size).map(key => <option key={key} disabled={this.state.candidatePreferences?.[key]}>{key + 1}</option>)}
                                            </CustomInput>
                                        </Row>)}
                                    </Col>)}
                                </Row>
                            </Col>
                        </FormGroup>
                        <Button color="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Collapse>
            </>
        }
        return null;
    };

    render() {
        const { year, ballotSnapshot } = this.state;
        const submitted = ballotSnapshot && ballotSnapshot.exists;
        return <>
            <Header name="Ballot" />
            <Container className="mt--6" fluid>
                <Row>
                    <Col>
                        <div className="card-wrapper">
                            <Card>
                                <CardHeader>
                                    <h3 className="mb-0">
                                        {submitted ? "Submitted ": ""}Ballot ({year} Election)
                                    </h3>
                                </CardHeader>
                                {submitted ? <CardBody>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>{ballotSnapshot.get("type")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ballotSnapshot.get("preferences").map((value, key) => <tr>
                                                <th scope="row" key={key}>{key + 1}</th>
                                                <td>{value}</td>
                                            </tr>)}
                                        </tbody>
                                    </Table>
                                </CardBody> : <>
                                    <CardBody>
                                        <label className="custom-toggle mr-1">
                                            <input type="checkbox" onChange={() => this.setState(prev => ({ below: !prev.below }))} />
                                            <span className="custom-toggle-slider rounded-circle" />
                                        </label>
                                        <p>
                                            Use this switch to change the way you want to vote (<em>above</em> vs <em>below</em>).
                                        </p>
                                    </CardBody>
                                    <CardBody>
                                        <this.Form />
                                    </CardBody>
                                </>}
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>;
    }
}
