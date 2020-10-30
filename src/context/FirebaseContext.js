import React from "react";

/**
 * @type {React.Context<{
 *     auth: firebase.auth.Auth,
 *     firestore: firebase.firestore.Firestore
 *     user?: firebase.User,
 *     userSnapshot?: firebase.firestore.DocumentSnapshot,
 *     adminSnapshot?: firebase.firestore.DocumentSnapshot,
 *     userRef?: firebase.firestore.DocumentReference,
 *     adminRef?: firebase.firestore.DocumentReference
 * } | null>}
 */
const FirebaseContext = React.createContext(null);

export default FirebaseContext;
