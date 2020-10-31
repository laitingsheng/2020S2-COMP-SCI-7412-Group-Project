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

import Header from "./Header";
import FirebaseContext from "../../context/FirebaseContext";

export default class Candidates extends React.Component {
    static contextType = FirebaseContext;

    state = {};

    componentDidMount() {
        this.unsub_curr = this.unsub_curr = this.context.firestore.collection("elections").doc("current").onSnapshot(
            current => {
                /**
                 * @type {firebase.firestore.DocumentReference}
                 */
                const ref = current.get("year");
                this.setState({ ref });
                if (this.unsub_ref)
                    this.unsub_ref();
                this.unsub_ref = ref.onSnapshot(
                    config => this.setState({ year: config.id, parties: config.get("parties"), partiesCount: config.get("partiesCount"), seats: config.get("seats") }),
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
     * @param {{ id: number, doc?: firebase.firestore.DocumentSnapshot }} props
     */
    CandidateCard = props => {
        const { id, doc } = props;

        /**
         * @param {ChangeEvent} e
         */
        const onchange = e => {
            this.setState(prev => {
                const record = prev[id] ?? {};
                record[e.target.name] = e.target.value;
                return { [id]: record };
            });
        };
        /**
         * @param {FormEvent} e
         */
        const submit = e => {
            e.preventDefault();

            this.state.ref.collection("candidates").doc(id.toString()).set(this.state[id], { merge: true }).catch(console.log);
        };

        return <Card>
            <CardHeader>
                <h3 className="mb-0">
                    Candidate {id + 1}
                </h3>
            </CardHeader>
            <CardBody>
                <Form onSubmit={submit}>
                    <div className="form-row">
                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor={`${id}-name`}>
                                    Name
                                </label>
                                <Input type="text" defaultValue={doc?.get("name")} id={`${id}-name`} name="name" placeholder="Name" required onChange={onchange} />
                            </FormGroup>
                        </Col>
                        <Col className="mb-3" md="6">
                            <FormGroup>
                                <label className="form-control-label" htmlFor={`${id}-party`}>
                                    Party
                                </label>
                                <CustomInput type="select" defaultValue={doc?.get("party") ?? ""} id={`${id}-party`} name="party" required onChange={onchange}>
                                    <option disabled value="">Party</option>
                                    {_.map(this.state.parties, (key, value) => <option key={key}>{value}</option>)}
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
    };

    /**
     * @param {FormEvent} e
     */
    addParty = e => {
        e.preventDefault();

        const parties = this.state.parties ?? {};
        let partiesCount = this.state.partiesCount ?? 0;
        const { party } = this.state;
        if (!(party in parties)) {
            parties[party] = partiesCount;
            ++partiesCount;
        }
        this.state.ref.set({ parties, partiesCount }, { merge: true }).catch(console.log);
    }

    render() {
        const { candidatesSnapshot, year, parties, seats } = this.state;
        if (candidatesSnapshot && year) {
            const exists = _.keyBy(candidatesSnapshot.docs, doc => doc.id);
            return <>
                <Header name={`Candidates (Current: ${year})`}/>
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
                                            {_.map(parties, (key, party) => <ListGroupItem key={key}>{party}</ListGroupItem>)}
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
                                {_.range(seats).map(id => <this.CandidateCard id={id} doc={exists[id]} key={id} />)}
                            </div>
                        </div>
                    </Row>
                </Container>
            </>;
        }
        return null;
    }
}
