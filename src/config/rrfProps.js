// React-redux-firebase props
// This is used in our firebase provider
import { createFirestoreInstance } from "redux-firestore";
import { firebaseApp as firebase } from "./db";
import rrfConfig from "./rrfConfig";
import store from "../store";

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //needed if using firestore
};

export default rrfProps;
