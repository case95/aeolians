import React, { Fragment } from "react";
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

const onChange = (e) => {
  return;
};

const Footer = ({ logo, emails }) => {
  //Database listener, it listens for the table we pass as an argumet. it also detects changes
  useFirestoreConnect("emails");

  const language = useSelector((state) => state.i18n.language);

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
          <p className="footer-title mb-0">
            {language === "_eng"
              ? `Subscribe to the Newsletter!`
              : `Iscriviti alla Newsletter!`}
          </p>
          <Form className="newsletter-form">
            <Input
              className={"newsletter-input"}
              prepend={true}
              required={true}
              spacer={false}
              onChange={(e) => onChange(e)}
              child={
                <InputGroup.Append>
                  <Button append={true} className="newsletter-button"></Button>
                </InputGroup.Append>
              }
            ></Input>
          </Form>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col className="col-12 text-center bottom-bar">
          <Link as={Link} to="/aeolians_admin" className="login-link">
            {language === "_eng" ? `Admin Log-in` : `ADMIN LOGIN`}
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
