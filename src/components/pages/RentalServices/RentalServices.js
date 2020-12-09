import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";

//Redux imports
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";

//importing custom components
import Button from "../../customComponents/Button/Button";
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Container from "../../customComponents/Container/Container";

import "./RentalServices.css";

const RentalServices = (props) => {
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
            <div className="carousel-band">
              <Carousel.Caption>
                {/*<h3>First slide label</h3>*/}
                <p>{slide.description}</p>
              </Carousel.Caption>
            </div>
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
            title={"RENTAL SERVICES"}
            undertitle={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt "
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
          <Col className="col-12 col-md-8 col-lg-10 px-0 pr-lg-3">
            <p>
              We renting lovely boat to our guest for experience and discovery
              the wonderful Aeolians Island and the north coast of Sicily,daily
              trip to Vulcano e Lipari and on request to other islands. From the
              new and beautiful Capo d’Orlando Marina, only takes 40 minutes to
              get in Vulcano o Lipari.
            </p>
          </Col>
          <Col className="col-12 col-md-4 col-lg-2 px-0">
            <Button
              child={
                <a href="tel:0402112221" className="contact-button">
                  <i className="fas fa-phone"></i> 0402112221
                </a>
              }
              className="mb-3"
            />
            <Button
              child={
                <a href="mailto:hello@aeolians.com" className="contact-button">
                  <i className="far fa-envelope"></i> hello@aeolians.com
                </a>
              }
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
