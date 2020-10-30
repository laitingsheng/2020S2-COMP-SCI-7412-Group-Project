import firebase from "firebase";
import PropTypes from "prop-types";
import React from "react";

import { FirebaseContext, firestore } from "FirebaseClient";

class CandidatesImpl extends React.Component {
    static propTypes = {
        /**
         * @type {PropTypes.Validator<firebase.User>}
         */
        user: PropTypes.instanceOf(firebase.User).isRequired
    };

    state = {};

    componentDidMount() {
        this.unsub_curr = firestore.collection("elections").doc("current").onSnapshot(
            current => {
                /**
                 * @type {firebase.firestore.DocumentReference}
                 */
                const ref = current.get("year");
                if (this.unsub_ref)
                    this.unsub_ref();
                this.unsub_ref = ref.onSnapshot(
                    config => this.setState({ config }),
                    console.log
                );
                if (this.unsub_cands)
                    this.unsub_cands();
                this.unsub_cands = ref.collection("candidates").onSnapshot(
                    candidates => this.setState({ candidates }),
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
    }

    render() {
        return <div></div>;
    }
}

export default class Candidates extends React.Component {
    render() {
        return <FirebaseContext.Consumer>
            {({ user }) => <CandidatesImpl user={user} />}
        </FirebaseContext.Consumer>
    }
}
