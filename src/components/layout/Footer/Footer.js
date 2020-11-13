import React from "react";
import { Row, Col, InputGroup, Form } from "react-bootstrap";

//custom components
import Button from "../../customComponents/Button/Button";
import Input from "../../customComponents/Input/Input";

//Router
import { Link } from "react-router-dom";

import "./Footer.css";

const onChange = (e) => {
  return;
};

const Footer = ({ logo }) => {
  return (
    <Row className="my-footer mx-0">
      <Col className=" col-12 col-md-4 my-footer-col-1">
        <ul>
          <li>
            <Link to="/" className="my-footer-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/accomodations" className="my-footer-link">
              Accomodations
            </Link>
          </li>
          <li>
            <Link to="/rentals" className="my-footer-link">
              Rental Services
            </Link>
          </li>
          <li>
            <Link to="/tours" className="my-footer-link">
              Daily Tours
            </Link>
          </li>
          <li>
            <Link to="/contacts" className="my-footer-link">
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/termsofservice" className="my-footer-link">
              Terms of Service
            </Link>
          </li>
        </ul>
      </Col>

      <Col className=" col-12 col-md-4 my-footer-col-2">
        <p className="footer-title mb-0">Follow Us on:</p>
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
        <p className="footer-title mb-0">Subscribe to the Newsletter!</p>
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
  );
};

export default Footer;
