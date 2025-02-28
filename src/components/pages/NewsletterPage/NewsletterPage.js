import React, { useState, useEffect } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";

import { Row, Col } from "react-bootstrap";

import PageTitle from "../../customComponents/PageTitle/PageTitle";

const NewsletterPage = (props) => {
  useFirestoreConnect([{ collection: "emails" }]);

  const { emails } = props;

  const [emailList, setEmailList] = useState([""]);

  useEffect(() => {
    console.log("EMAILS", emails);
    emails &&
      emails.map((email, index) => {
        const newArray = emailList;
        newArray[index] = email.email;
        return setEmailList([...newArray]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emails]);

  return (
    <div className="my-background">
      <PageTitle
        title="You Subscribers"
        undertitle="Copy the emails from this list and paste them in your email recipient."
        className="mb-3"
      />
      {emails ? (
        <p className="text-center">{emailList.join(", ")}</p>
      ) : (
        <Row>
          <Col className="text-center">
            <p className="m-0 d-inline-block">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </p>
          </Col>
        </Row>
      )}
    </div>
  );
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    emails: state.firestore.ordered.emails,
  }))
);

export default enhance(NewsletterPage);
