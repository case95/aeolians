import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";

//importing custom components
import Button from "../../customComponents/Button/Button";
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Container from "../../customComponents/Container/Container";

// Fake data for testing
import placeholderData from "../../../placeholderModel/placeholderModel";

import "./DailyTours.css";

const DailyTours = () => {
  const dailyTours = () => {
    return placeholderData.dailyTours;
  };

  const listSlides = () => {
    return (
      placeholderData &&
      Object.values(dailyTours()).map((slide, index) => {
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
          title={"DAILY TOURS"}
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
        <Col className="col-12 px-0 pr-lg-3">
          <p>
            We offer trips to: Palermo, Cefalù, Taormina, Catania, Eolie
            Islands. Contact us for more informations and prices.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="col-12 px-0 flex-column flex-md-row d-flex justify-content-center">
          <Button
            child={
              <a href="tel:0402112221" className="contact-button">
                <i className="fas fa-phone"></i> 0402112221
              </a>
            }
            className="mb-3 mx-auto mx-md-3 my-md-0"
          />
          <Button
            child={
              <a href="mailto:hello@aeolians.com" className="contact-button">
                <i className="far fa-envelope"></i> hello@aeolians.com
              </a>
            }
            className="my-0 mx-auto mx-md-3 my-md-0"
          />
        </Col>
      </Row>
    </div>
  );
};

export default DailyTours;
