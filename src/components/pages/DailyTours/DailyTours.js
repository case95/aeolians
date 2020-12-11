import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";

//importing custom components
import Button from "../../customComponents/Button/Button";
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Container from "../../customComponents/Container/Container";

//Redux imports
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";

import "./DailyTours.css";

const DailyTours = (props) => {
  const language = useSelector((state) => state.i18n.language);

  const { slides } = props;

  useFirestoreConnect([{ collection: "daily_tours" }]);

  const listSlides = () => {
    return Object.values(slides).map((slide, index) => {
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
              <p>{slide.description[`description${language}`]}</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      );
    });
  };
  if (!slides) {
    return <p>There was a problem.</p>;
  } else {
    return (
      <div className="my-background">
        <Row className="mx-0">
          <PageTitle
            title={language === "_eng" ? "DAILY TOURS" : "TOUR ORGANIZZATI"}
            undertitle={
              language === "_eng"
                ? "English Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt "
                : "Italiano Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt "
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
                ? "We offer trips to: Palermo, Cefalù, Taormina, Catania, Eolie Islands. Contact us for more informations and prices."
                : "IN ITALIANO - We offer trips to: Palermo, Cefalù, Taormina, Catania, Eolie Islands. Contact us for more informations and prices. "}
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
    slides: state.firestore.ordered.daily_tours,
  }))
);

export default enhance(DailyTours);
