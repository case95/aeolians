import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

//Redux imports
import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";

//bootstrap components
import { Col, Row, Form, InputGroup } from "react-bootstrap";

//Custom components
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Container from "../../customComponents/Container/Container";
import Input from "../../customComponents/Input/Input";
import Button from "../../customComponents/Button/Button";

import "./AddAccommodation.css";

const AddAccommodation = (props) => {
  const language = useSelector((state) => state.i18n.language);

  const [accommodationDetails, setAccommodationDetails] = useState({
    name: { name_eng: "", name_ita: "" },
    introduction: { introduction_eng: "", introduction_ita: "" },
    description: {
      description_eng: "",
      description_ita: "",
    },
    services: {
      services_eng: [],
      services_ita: [],
      icons: [],
    },
    pictures: [],
    bookings: [{ link: "", icon: "" }],
  });

  const {
    name,
    introduction,
    description,
    services,
    pictures,
    bookings,
  } = accommodationDetails;

  const { name_eng, name_ita } = name;

  const { introduction_eng, introduction_ita } = introduction;

  const { description_eng, description_ita } = description;

  const { services_eng, services_ita, icons } = services;

  const firestore = useFirestore();
  const history = useHistory();
  //LOOKING FOR A SPECIFIC DOCUMENT IN A COLLECTION, WE PASS THE COLLECTION AND THE DOC ID
  useFirestoreConnect("accommodations");

  const { accommodations } = props;

  const onChange = (e) => {
    console.log("NOME EVENTO", e.target.name);
    if (e.target.name === "name_eng" || e.target.name === "name_ita") {
      setAccommodationDetails({
        ...accommodationDetails,
        name: { ...name, [e.target.name]: e.target.value },
      });
    }
    if (
      e.target.name === "introduction_eng" ||
      e.target.name === "introduction_ita"
    ) {
      setAccommodationDetails({
        ...accommodationDetails,
        introduction: { ...introduction, [e.target.name]: e.target.value },
      });
    }
    if (
      e.target.name === "description_eng" ||
      e.target.name === "description_ita"
    ) {
      setAccommodationDetails({
        ...accommodationDetails,
        description: { ...description, [e.target.name]: e.target.value },
      });
    }
    console.log(accommodationDetails);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newAccommodation = accommodationDetails;

    // add the new client to the database.
    firestore
      .collection("accommodations")
      .add(newAccommodation)
      .then(() => console.log("Accommodation added"));
    // redirect user to the dashboard after adding a client.
    history.push("/editaccommodations");
  };

  if (!accommodations) {
    return <p>There was a problem.</p>;
  } else {
    const accommodation = accommodations[0];
    return (
      <div className="my-background">
        <PageTitle title={accommodation.name[`name${language}`]}></PageTitle>
        <Container
          styleNumber={1}
          child={
            <Row>
              <Col className="col-12 col-lg-6 mb-3 mb-lg-0">
                <Form className="newsletter-form">
                  <div className="d-flex">
                    <Input
                      className={"newsletter-input"}
                      required={true}
                      spacer={true}
                      label={
                        language === "_eng" ? "English name" : "Nome inglese"
                      }
                      name="name_eng"
                      labelClassName="add-accommodation-input-label"
                      onChange={(e) => onChange(e)}
                    ></Input>
                    <Input
                      className={"newsletter-input"}
                      required={true}
                      spacer={true}
                      label={
                        language === "_eng" ? "Nome italiano" : "Italian name"
                      }
                      name="name_ita"
                      labelClassName="add-accommodation-input-label"
                      onChange={(e) => onChange(e)}
                    ></Input>
                  </div>
                  <div className="d-flex">
                    <Input
                      className={"newsletter-input"}
                      required={true}
                      spacer={true}
                      label={
                        language === "_eng"
                          ? "Introduction in english"
                          : "Introduzione in inglese"
                      }
                      name="introduction_eng"
                      labelClassName="add-accommodation-input-label"
                      onChange={(e) => onChange(e)}
                    ></Input>
                    <Input
                      className={"newsletter-input"}
                      required={true}
                      spacer={true}
                      label={
                        language === "_eng"
                          ? "Introduction in italian"
                          : "Introduzione in italiano"
                      }
                      name="introduction_ita"
                      labelClassName="add-accommodation-input-label"
                      onChange={(e) => onChange(e)}
                    ></Input>
                  </div>

                  <div className="d-flex">
                    <Input
                      className={"newsletter-input"}
                      required={true}
                      spacer={true}
                      label={
                        language === "_eng"
                          ? "Description in english"
                          : "Descrizione in inglese"
                      }
                      name="description_eng"
                      labelClassName="add-accommodation-input-label"
                      onChange={(e) => onChange(e)}
                    ></Input>
                    <Input
                      className={"newsletter-input"}
                      required={true}
                      spacer={true}
                      label={
                        language === "_eng"
                          ? "Description in italian"
                          : "Descrizione in italiano"
                      }
                      name="description_ita"
                      labelClassName="add-accommodation-input-label"
                      onChange={(e) => onChange(e)}
                    ></Input>
                  </div>
                </Form>
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

export default enhance(AddAccommodation);
