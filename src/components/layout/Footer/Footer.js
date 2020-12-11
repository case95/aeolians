import React, { Fragment, useState } from "react";
import { Row, Col, InputGroup, Form } from "react-bootstrap";

//custom components
import Button from "../../customComponents/Button/Button";
import Input from "../../customComponents/Input/Input";

//Redux imports
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";

//Router
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = ({ logo, emails }) => {
  //Database listener, it listens for the table we pass as an argumet. it also detects changes
  useFirestoreConnect("emails");

  const language = useSelector((state) => state.i18n.language);

  const firestore = useFirestore();

  const [userEmail, setUserEmail] = useState({ email: "" });

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const onChange = (e) => {
    setUserEmail({ email: e.target.value });
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    firestore
      .collection("emails")
      .doc(`${userEmail.email}`)
      .set(userEmail)
      .then(async () => {
        setError("");
        setSuccess("You have succesfully Subscribed!");
        await sleep(3000);
        setSuccess("");
      })
      .catch((err) => {
        setSuccess("");
        setError("There was an error in the Subscription.");
        console.log("ERROR:", err);
      });
  };

  return (
    <Fragment>
      <Row className="my-footer mx-0">
        <Col className=" col-12 col-md-4 my-footer-col-1">
          <ul>
            <li>
              <Link to="/" className="my-footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/accommodations" className="my-footer-link">
                {language === "_eng" ? `Accomodations` : `Alloggi`}
              </Link>
            </li>
            <li>
              <Link to="/rentals" className="my-footer-link">
                {language === "_eng" ? `Rental Services` : `Servizi di Affitto`}
              </Link>
            </li>
            <li>
              <Link to="/tours" className="my-footer-link">
                {language === "_eng" ? `Daily Tours` : `Tour Organizzati`}
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="my-footer-link">
                {language === "_eng" ? `Contact Us` : `Contattaci`}
              </Link>
            </li>
            <li>
              <Link to="/termsofservice" className="my-footer-link">
                {language === "_eng"
                  ? `Terms of Service`
                  : `Termini di Servizio`}
              </Link>
            </li>
          </ul>
        </Col>

        <Col className=" col-12 col-md-4 my-footer-col-2">
          <p className="footer-title mb-0">
            {language === "_eng" ? `Follow Us on:` : `Seguici Su:`}
          </p>
          <div className="icons-social">
            <a href="www.instagram.com">
              <i className="fab fa-instagram mr-3"></i>
            </a>
            <a href="www.facebook.com">
              <i className="fab fa-facebook-square"></i>
            </a>
          </div>
        </Col>

        <Col className="col-12 col-md-4 my-footer-col-3">
          <p className="footer-title mb-0 text-md-left">
            {language === "_eng"
              ? `Subscribe to the Newsletter!`
              : `Iscriviti alla Newsletter!`}
          </p>
          <Form className="newsletter-form" onSubmit={(e) => onSubmit(e)}>
            <Input
              className="newsletter-input"
              prepend={true}
              required={true}
              spacer={false}
              value={userEmail.email}
              onChange={(e) => onChange(e)}
              type="email"
              id="subscribe"
              child={
                <InputGroup.Append>
                  <Button
                    type="submit"
                    append={true}
                    className="newsletter-button"
                    child={language === "_eng" ? `Submit` : `Invia`}
                  />
                </InputGroup.Append>
              }
            ></Input>
          </Form>
          {success && (
            <p className="text-success text-center text-md-left">{success}</p>
          )}
          {error && (
            <p className="text-danger text-center text-md-left">{error}</p>
          )}
        </Col>
      </Row>
      <Row className="mx-0">
        <Col className="col-12 text-center bottom-bar">
          <Link as={Link} to="/aeolians_admin" className="login-link">
            Admin Log-in
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
};
const enhance = compose(
  withFirestore,
  connect((state) => ({
    emails: state.firestore.ordered.emails,
  }))
);

export default enhance(Footer);
