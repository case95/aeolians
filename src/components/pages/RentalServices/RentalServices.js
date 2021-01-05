import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";

//Redux imports
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";

//importing custom components
import Button from "../../customComponents/Button/Button";
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Container from "../../customComponents/Container/Container";

import "./RentalServices.css";

const RentalServices = (props) => {
  const language = useSelector((state) => state.i18n.language);

  const { slides } = props;

  useFirestoreConnect([{ collection: "rental_services" }]);

  const listSlides = () => {
    return (
      slides &&
      Object.values(slides).map((slide, index) => {
        return (
          <Carousel.Item className="carousel-image-container" key={index}>
            <img
              className="carousel-image"
              src={slide.picture}
              alt="First slide"
            />
            {/* <div className="carousel-band d-none d-md-block">
              <Carousel.Caption>
                <p>{slide.description[`description${language}`]}</p>
              </Carousel.Caption>
            </div> */}
          </Carousel.Item>
        );
      })
    );
  };
  if (!slides) {
    return <p>There was a problem.</p>;
  } else {
    return (
      <div className="my-background">
        <Row className="mx-0">
          <PageTitle
            title={
              language === "_eng" ? "RENTAL SERVICES" : "SERVIZI DI AFFITTO"
            }
            undertitle={
              language === "_eng"
                ? "Come and discovery our beautiful cost from Capo d’Orlando Marina, we provide daily boat trip."
                : "Vieni a visitare la bellezza della nostra costa da Capo d’Orlando Marina, forniamo escursioni giornaliere."
            }
          ></PageTitle>
        </Row>
        <Row className="mx-0">
          <Container
            styleNumber={1}
            child={
              <Carousel className="carousel-container">{listSlides()}</Carousel>
            }
          ></Container>
        </Row>
        <Row className="mx-0">
          <Col className="col-12 px-0 pr-lg-3">
            <p>
              {language === "_eng"
                ? "We renting lovely boat to our guest for experience and discovery  the wonderful Aeolians Island and the north coast of Sicily,daily trip to Vulcano e Lipari and on request to other islands. From the new and beautiful Capo d’Orlando Marina, only takes 40 minutes to get in Vulcano o Lipari."
                : "Proponiamo  per i nostri clienti escursioni giornaliere alle Meravigliosa isole Eolie, vulcano e Lipari , su richieste anche visite alle altre isole dell ‘Arcipelago Eoliano. Dal bellissimo porto di Capo d’Orlando Marina si impiega 40 minuti per arrivare a destinazione"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 px-0 flex-column flex-md-row d-flex justify-content-center">
            <Button
              child={
                <a href="tel:00393801761005" className="contact-button">
                  <i className="fas fa-phone"></i> 0039 380 176 1005
                </a>
              }
              className="mb-3 mx-auto mx-md-3 my-md-0"
            />
            <Button
              child={
                <a
                  href="mailto:aeoliansholidayapartments@outlook.com"
                  className="contact-button"
                >
                  <i className="far fa-envelope"></i>{" "}
                  aeoliansholidayapartments@outlook.com
                </a>
              }
              className="my-0 mx-auto mx-md-3 my-md-0"
            />
          </Col>
        </Row>
      </div>
    );
  }
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    slides: state.firestore.ordered.rental_services,
  }))
);

export default enhance(RentalServices);
