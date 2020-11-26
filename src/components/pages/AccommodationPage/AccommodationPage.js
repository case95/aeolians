import React from "react";

//Redux imports
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import {
  withFirestore,
  useFirestoreConnect,
  // useFirestore,
} from "react-redux-firebase";

//bootstrap components
import { Col, Row } from "react-bootstrap";

//Custom components
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Container from "../../customComponents/Container/Container";

import "./AccommodationPage.css";

const AccommodationPage = (props) => {
  const language = useSelector((state) => state.i18n.language);

  const id = props.match.params.id;
  // const firestore = useFirestore();

  //LOOKING FOR A SPECIFIC DOCUMENT IN A COLLECTION, WE PASS THE COLLECTION AND THE DOC ID
  useFirestoreConnect([{ collection: "accommodations" }]);

  const { accommodations } = props;

  const photoPreviewer = (acc) => {
    return (
      accommodations &&
      acc.pictures.slice(0, 4).map((pic, index) => {
        return (
          <li className="image-preview-container" key={index}>
            <img src={pic} alt={`preview-${index}`} className="image-preview" />
          </li>
        );
      })
    );
  };

  if (!accommodations) {
    return <p>There was a problem.</p>;
  } else {
    const accommodation = accommodations.find((obj) => obj.id === id);
    return (
      <div className="my-background">
        <PageTitle title={accommodation.name[`name${language}`]}></PageTitle>
        <Container
          styleNumber={1}
          child={
            <Row>
              <Col className="col-12 col-lg-6 mb-3 mb-lg-0">
                <ul className="image-previewer">
                  {photoPreviewer(accommodation)}
                </ul>
              </Col>
              <Col className="col-12 col-lg-6">
                <p className="description ">
                  {accommodation.description[`description${language}`]}
                </p>
                <p className="section-title m-0">
                  {language === "_eng" ? "SERVICES" : "SERVIZI"}
                </p>
                <ul className="services p-0">
                  {accommodations &&
                    accommodation.services.map((service, index) => {
                      return (
                        <li className="service" key={index}>
                          {language === "_eng"
                            ? service.service_eng
                            : service.service_ita}
                        </li>
                      );
                    })}
                </ul>
                <p className="section-title m-0">
                  {language === "_eng" ? "BOOK ON" : "PRENOTA CON"}
                </p>
                <ul className="booking-sites p-0">
                  {accommodations &&
                    accommodation.bookings.map((booking, index) => {
                      return (
                        <li key={index} className="booking-method">
                          <a
                            href={`http://${booking.link}`}
                            target="_blank"
                            className="booking-link"
                          >
                            <img
                              src={booking.logo}
                              alt={`booking method ${index}`}
                              className="booking-icon"
                            />
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </Col>
            </Row>
          }
        />
      </div>
    );
  }
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    accommodations: state.firestore.ordered.accommodations,
  }))
);

export default enhance(AccommodationPage);
