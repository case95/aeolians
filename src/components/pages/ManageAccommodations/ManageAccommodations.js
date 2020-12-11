import React, { Fragment } from "react";

import { Row, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

//Import custom components
import Container from "../../customComponents/Container/Container";
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Button from "../../customComponents/Button/Button";

import PropTypes from "prop-types";

// Redux imports
import { compose } from "redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";

import "./ManageAccommodations.css";

const ManageAccommodations = ({ accommodations }) => {
  //Database listener, it listens for the table we pass as an argumet. it also detects changes
  useFirestoreConnect("accommodations");

  const language = useSelector((state) => state.i18n.language);

  const photoPreviewer = (pics) => {
    return (
      accommodations &&
      pics.slice(0, 3).map((pic, index) => {
        return (
          <div className="image-preview-container mx-1" key={index}>
            <img
              src={pics && pic}
              alt={`preview-${index}`}
              className="image-preview"
            />
          </div>
        );
      })
    );
  };

  const listAccommodations = (arr) => {
    return (
      accommodations &&
      accommodations.map((value, index) => {
        const { name, pictures, id } = value;
        return (
          <Container
            key={index}
            styleNumber={1}
            child={
              <Fragment>
                <Row className="mx-0 m">
                  <Col className="col-12 col-lg-6 custom-gutter-1 mb-3 mb-lg-0">
                    <p className="accommodation-name m-0">
                      {name[`name${language}`]}
                    </p>

                    <div className="d-flex image-previews-edit">
                      {photoPreviewer(pictures)}
                    </div>
                  </Col>

                  <Col className="col-12 col-lg-6 my-auto text-center text-lg-left">
                    <Link to={`/editaccommodation/${id}`}>
                      <Button
                        child={
                          language === "_eng"
                            ? "Edit informations"
                            : "Modifica informazioni"
                        }
                      />
                    </Link>
                  </Col>
                </Row>
              </Fragment>
            }
          />
        );
      })
    );
  };

  return (
    <div className="my-background edit-accommodations">
      <Row className="mx-0">
        <Col>
          <PageTitle
            title={
              language === "_eng" ? "MANAGE ACCOMMODATIONS" : "GESTISCI ALLOGGI"
            }
            undertitle={
              language === "_eng"
                ? "Hello Valerio, here you can manage your accommodations, i wish you a good work and have fun!"
                : "Ciao Valerio, da qui potrai gestire i tuoi alloggi, buon lavoro e buon divertimento!"
            }
          ></PageTitle>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center pb-5">
          <Link to={`/addaccommodation`}>
            <Button
              className="bg-success"
              child={
                language === "_eng" ? "Add accommodation" : "Aggiungi alloggio"
              }
            />
          </Link>
        </Col>
      </Row>
      <Row className="mx-0">{listAccommodations()}</Row>
    </div>
  );
};

ManageAccommodations.propTypes = {
  firestore: PropTypes.object.isRequired,
  accommodations: PropTypes.array,
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    accommodations: state.firestore.ordered.accommodations,
  }))
);

export default enhance(ManageAccommodations);
