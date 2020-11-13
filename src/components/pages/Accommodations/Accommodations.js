import React from "react";

import { Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

//Import custom components
import Container from "../../customComponents/Container/Container";
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Button from "../../customComponents/Button/Button";

//To get data from db
import AccommodationsServices from "../../../services/GetDataServices";

import PropTypes from "prop-types";

// Redux imports
import { compose } from "redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";

// Fake data for testing
import placeholderData from "../../../placeholderModel/placeholderModel";

import "./Accommodations.css";

const Accommodations = ({ accommodations }) => {
  //Database listener, it listens for the table we pass as an argumet. it also detects changes
  useFirestoreConnect("accommodations");

  const language = useSelector((state) => state.i18n.language);

  const { error, setError } = useState("");

  const listAccommodations = (arr) => {
    console.log(accommodations);
    return (
      accommodations &&
      accommodations.map((value) => {
        const { name, introduction, services, pictures, id } = value;
        return (
          <Container
            styleNumber={1}
            child={
              <Row className="mx-0 accommodation">
                <Col className="col-12 col-lg-4 custom-gutter-1 mb-3 mb-lg-0">
                  <div className="image-preview-container">
                    <img
                      src={pictures && pictures[1]}
                      className="image-preview"
                    />
                  </div>
                </Col>

                <Col className="col-12 col-lg-4 custom-gutter-2 mb-3 mb-lg-0 ">
                  <p className="accommodation-name">
                    {name[`name${language}`]}
                  </p>
                  <p className="accommodation-introduction m-0">
                    {introduction[`introduction${language}`]}
                  </p>
                </Col>

                <Col className="col-12 col-lg-4 custom-gutter-3">
                  <p className="services-title">
                    {language === "_eng" ? "Some services" : "Alcuni servizi"}
                  </p>
                  {
                    <ul className="service-icon-list p-0">
                      {services.icons.map((icon, index) => {
                        return (
                          <li className="service-icon" key={index}>
                            <i className={`fa ${icon}`}></i>
                          </li>
                        );
                      })}
                    </ul>
                  }
                  <Link to={`/accommodations/${id}`} className="booking-button">
                    <Button
                      child={language === "_eng" ? "Book now" : "Riserva ora"}
                    />
                  </Link>
                </Col>
              </Row>
            }
          />
        );
      })
    );
  };

  return (
    <div className="my-background">
      <Row className="mx-0">
        <PageTitle
          title={"OUR ACCOMMODATIONS"}
          undertitle={
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt "
          }
        ></PageTitle>
      </Row>
      <Row className="mx-0">{listAccommodations()}</Row>
    </div>
  );
};

Accommodations.propTypes = {
  firestore: PropTypes.object.isRequired,
  accommodations: PropTypes.array,
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    accommodations: state.firestore.ordered.accommodations,
  }))
);

export default enhance(Accommodations);
