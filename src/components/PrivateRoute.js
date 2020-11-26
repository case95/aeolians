import React from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component, auth, ...otherProps }) => {
  return auth.uid !== undefined ? (
    <Route {...otherProps} component={component} />
  ) : (
    <Redirect to="/aeolians_admin" />
  );
};
const enhance = compose(
  withFirestore,
  connect((state) => ({
    auth: state.firebase.auth,
  }))
);
export default enhance(PrivateRoute);
