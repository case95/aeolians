import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";

//importing custom components
import Button from "../../customComponents/Button/Button";
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Container from "../../customComponents/Container/Container";

// Fake data for testing
import placeholderData from "../../../placeholderModel/placeholderModel";

import "./RentalServices.css";

const RentalServices = () => {
  const listSlides = () => {
    return (
      placeholderData &&
      Object.values(placeholderData.rentalServices).map((slide, index) => {
        return (
          <Carousel.Item className="carousel-image-container" key={index}>
            <img
              className="carousel-image"
              src={slide.image}
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
            <Carousel className="carousel-container">
              {placeholderData && listSlides()}
            </Carousel>
          }
        ></Container>
      </Row>
      <Row className="mx-0">
        <Col className="col-12 col-md-8 col-lg-10 px-0 pr-lg-3">
          <p>
            We renting lovely boat to our guest for experience and discovery the
            wonderful Aeolians Island and the north coast of Sicily,daily trip
            to Vulcano e Lipari and on request to other islands. From the new
            and beautiful Capo d’Orlando Marina, only takes 40 minutes to get in
            Vulcano o Lipari.
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
};

export default RentalServices;
