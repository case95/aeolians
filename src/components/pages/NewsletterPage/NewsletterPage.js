import React, { useState, useEffect } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";

import PageTitle from "../../customComponents/PageTitle/PageTitle";

const NewsletterPage = (props) => {
  useFirestoreConnect([{ collection: "emails" }]);
  const { emails } = props;

  const [emailList, setEmailList] = useState([""]);

  useEffect(() => {
    emails.map((email, index) => {
      const newArray = emailList;
      newArray[index] = email.email;
      return setEmailList([...newArray]);
    });
  }, []);

  return (
    <div className="my-background">
      <PageTitle
        title="You Subscribers"
        undertitle="Copy the emails from this list and paste them in your email recipient."
        className="mb-3"
      />
      <p className="text-center">{emailList.join(", ")}</p>
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
