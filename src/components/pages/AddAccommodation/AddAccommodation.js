import React, { useState } from "react";

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
import { Col, Row, Form } from "react-bootstrap";

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
    services: [
      {
        service_eng: "",
        service_ita: "",
        icon: "",
      },
    ],
    pictures: [""],
    bookings: [{ link: "", logo: "" }],
  });

  const {
    name,
    introduction,
    description,
    services,
    pictures,
    bookings,
  } = accommodationDetails;

  const firestore = useFirestore();
  const history = useHistory();
  //LOOKING FOR A SPECIFIC DOCUMENT IN A COLLECTION, WE PASS THE COLLECTION AND THE DOC ID
  useFirestoreConnect("accommodations");

  const { accommodations } = props;

  const onChange = (e, index) => {
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
    if (
      e.target.name === "service_eng" ||
      e.target.name === "service_ita" ||
      e.target.name === "icon"
    ) {
      const newArray = services;
      newArray[index] = { ...newArray[index], [e.target.name]: e.target.value };
      setAccommodationDetails({
        ...accommodationDetails,
        services: newArray,
      });
    }
    if (e.target.name === "pictures") {
      const newArray = pictures;
      newArray[index] = e.target.value;
      setAccommodationDetails({
        ...accommodationDetails,
        pictures: newArray,
      });
    }
    if (e.target.name === "link" || e.target.name === "logo") {
      const newArray = bookings;
      newArray[index] = { ...newArray[index], [e.target.name]: e.target.value };
      setAccommodationDetails({
        ...accommodationDetails,
        bookings: newArray,
      });
    }
  };

  const addInput = (value) => {
    if (Array.isArray(services) && value === "service") {
      setAccommodationDetails({
        ...accommodationDetails,
        services: [...services, { service_eng: "", service_ita: "", icon: "" }],
      });
    }
    if (Array.isArray(services) && value === "picture") {
      setAccommodationDetails({
        ...accommodationDetails,
        pictures: [...pictures, ""],
      });
    }
    if (Array.isArray(bookings) && value === "booking") {
      setAccommodationDetails({
        ...accommodationDetails,
        bookings: [...bookings, { link: "", logo: "" }],
      });
    }
  };

  const removeInput = (value) => {
    if (Array.isArray(services) && services.length > 1 && value === "service") {
      const newArray = services;
      newArray.pop();
      setAccommodationDetails({
        ...accommodationDetails,
        services: newArray,
      });
    }
    if (Array.isArray(pictures) && pictures.length > 1 && value === "picture") {
      const newArray = pictures;
      newArray.pop();
      setAccommodationDetails({
        ...accommodationDetails,
        pictures: newArray,
      });
      return;
    }
    if (Array.isArray(bookings) && bookings.length > 1 && value === "booking") {
      const newArray = bookings;
      newArray.pop();
      setAccommodationDetails({
        ...accommodationDetails,
        bookings: newArray,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newAccommodation = accommodationDetails;

    // add the new client to the database.
    firestore
      .collection("accommodations")
      .add(newAccommodation)
      .then(() => console.log("ACCOMMODATION ADDED"));
    // redirect user to the dashboard after adding a client.
    history.push("/manageaccommodations");
  };

  if (!accommodations) {
    return <p>There was a problem.</p>;
  } else {
    return (
      <div className="my-background">
        <PageTitle
          title={
            language === "_eng" ? "ADD ACCOMMODATION" : "AGGIUNGI ALLOGGIO"
          }
        ></PageTitle>
        <Container
          styleNumber={1}
          child={
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
              }}
            >
              <Row className="mb-5">
                <Col className="col-12">
                  <p className="h3">{language === "_eng" ? "Name" : "Nome"}</p>
                </Col>
                <Col className="col-12 col-md-6 mb-3 mb-lg-0">
                  <Input
                    required={true}
                    spacer={true}
                    label={
                      language === "_eng" ? "English name" : "Nome inglese"
                    }
                    name="name_eng"
                    labelClassName="add-accommodation-input-label"
                    onChange={(e) => onChange(e)}
                  />
                </Col>
                <Col className="col-12 col-md-6 mb-3 mb-lg-0">
                  <Input
                    required={true}
                    spacer={true}
                    label={
                      language === "_eng" ? "Italian name" : "Nome italiano"
                    }
                    name="name_ita"
                    labelClassName="add-accommodation-input-label"
                    onChange={(e) => onChange(e)}
                  />
                </Col>
              </Row>

              <Row className="mb-5">
                <Col className="col-12">
                  <p className="h3">
                    {language === "_eng" ? "Introduction" : "Introduzione"}
                  </p>
                </Col>
                <Col className="col-12 col-md-6 mb-3 mb-lg-0">
                  <Input
                    as="textarea"
                    rows={5}
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
                </Col>
                <Col className="col-12 col-md-6 mb-3 mb-lg-0">
                  <Input
                    as="textarea"
                    rows={5}
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
                </Col>
              </Row>

              <Row className="mb-5">
                <Col className="col-12">
                  <p className="h3">
                    {language === "_eng" ? "Description" : "Descrizione"}
                  </p>
                </Col>
                <Col className="col-12 col-md-6 mb-3 mb-lg-0">
                  <Input
                    as="textarea"
                    rows={5}
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
                </Col>
                <Col className="col-12 col-md-6 mb-3 mb-lg-0">
                  <Input
                    as="textarea"
                    rows={5}
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
                </Col>
              </Row>

              {services.map((service, index) => {
                return (
                  <Row key={index}>
                    <Col className="col-12">
                      <p className="h3">
                        {language === "_eng"
                          ? `Service N.${index + 1}`
                          : `Servizio N.${index + 1}`}
                      </p>
                    </Col>
                    <Col className="col-12 col-lg-4 mb-3 mb-lg-0">
                      <Input
                        className="mr-3 add-accommodation-input"
                        required={true}
                        spacer={true}
                        label={
                          language === "_eng"
                            ? "Service in english"
                            : "Servizio in inglese"
                        }
                        name="service_eng"
                        labelClassName="add-accommodation-input-label"
                        value={service.service_eng}
                        onChange={(e) => onChange(e, index)}
                      ></Input>
                    </Col>
                    <Col className="col-12 col-lg-4 mb-3 mb-lg-0">
                      <Input
                        className="mr-3 add-accommodation-input"
                        required={true}
                        spacer={true}
                        label={
                          language === "_eng"
                            ? "Service in italian"
                            : "Servizio in italiano"
                        }
                        name="service_ita"
                        labelClassName="add-accommodation-input-label"
                        value={service.service_ita}
                        onChange={(e) => onChange(e, index)}
                      ></Input>
                    </Col>
                    <Col className="col-12 col-lg-4 mb-3 mb-lg-0">
                      <Input
                        className="add-accommodation-input"
                        key={index}
                        required={true}
                        spacer={true}
                        label={
                          language === "_eng"
                            ? "Service icon"
                            : "Icona del servizio"
                        }
                        name="icon"
                        labelClassName="add-accommodation-input-label"
                        value={service.icon}
                        onChange={(e) => onChange(e, index)}
                      ></Input>
                    </Col>
                  </Row>
                );
              })}
              <Row className="mb-5">
                <Col>
                  <Button
                    type="button"
                    className="add-remove-button"
                    child={
                      language === "_eng" ? "Add Service" : "Aggiungi Servizio"
                    }
                    onClick={() => addInput("service")}
                  ></Button>
                </Col>
                <Col>
                  <Button
                    type="button"
                    className="add-remove-button bg-danger"
                    child={
                      language === "_eng"
                        ? "Remove Last Service"
                        : "Rimuovi Ultimo Servizio"
                    }
                    onClick={() => removeInput("service")}
                  ></Button>
                </Col>
              </Row>

              {pictures.map((picture, index) => {
                return (
                  <Row key={index}>
                    <Col className="col-12">
                      <p className="h3">
                        {language === "_eng"
                          ? `Photo N.${index + 1}`
                          : `Foto N.${index + 1}`}
                      </p>
                    </Col>
                    <Col className="mb-3 mb-lg-0">
                      <Input
                        className="add-accommodation-input"
                        key={index}
                        required={true}
                        spacer={true}
                        label={language === "_eng" ? "Photo URL" : "URL foto"}
                        name="pictures"
                        labelClassName="add-accommodation-input-label"
                        value={pictures[index]}
                        onChange={(e) => onChange(e, index)}
                      ></Input>
                    </Col>
                  </Row>
                );
              })}
              <Row className="mb-5">
                <Col>
                  <Button
                    type="button"
                    className="add-remove-button"
                    child={language === "_eng" ? "Add Photo" : "Aggiungi Foto"}
                    onClick={() => addInput("picture")}
                  ></Button>
                </Col>
                <Col>
                  <Button
                    type="button"
                    className="bg-danger add-remove-button"
                    child={
                      language === "_eng"
                        ? "Remove Last Photo"
                        : "Rimuovi Ultima Foto"
                    }
                    onClick={() => removeInput("picture")}
                  ></Button>
                </Col>
              </Row>
              {bookings.map((booking, index) => {
                return (
                  <Row key={index}>
                    <Col className="col-12">
                      <p className="h3">
                        {language === "_eng"
                          ? `Booking method N.${index + 1}`
                          : `Metodo di prenotazione N.${index + 1}`}
                      </p>
                    </Col>
                    <Col className="col-12 col-lg-6 mb-3 mb-lg-0">
                      <Input
                        className="mr-3 add-accommodation-input"
                        required={true}
                        spacer={true}
                        label={
                          language === "_eng"
                            ? "Link to the page"
                            : "Link alla pagina"
                        }
                        name="link"
                        labelClassName="add-accommodation-input-label"
                        value={booking.link}
                        onChange={(e) => onChange(e, index)}
                      ></Input>
                    </Col>
                    <Col className="col-12 col-lg-6 mb-3 mb-lg-0">
                      <Input
                        className="mr-3 add-accommodation-input"
                        required={true}
                        spacer={true}
                        label={
                          language === "_eng"
                            ? "Website Icon"
                            : "Icona Del Sito"
                        }
                        name="logo"
                        labelClassName="add-accommodation-input-label"
                        value={booking.icon}
                        onChange={(e) => onChange(e, index)}
                      ></Input>
                    </Col>
                  </Row>
                );
              })}
              <Row className="mb-5">
                <Col>
                  <Button
                    type="button"
                    className="add-remove-button"
                    child={
                      language === "_eng"
                        ? "Add Booking Method"
                        : "Aggiungi Metodo Prenotazione"
                    }
                    onClick={() => addInput("booking")}
                  ></Button>
                </Col>
                <Col>
                  <Button
                    type="button"
                    className="bg-danger add-remove-button"
                    child={
                      language === "_eng"
                        ? "Remove Booking Method"
                        : "Rimuovi Metodo Prenotazione"
                    }
                    onClick={() => removeInput("booking")}
                  ></Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Button
                    type="submit"
                    className="bg-success py-5"
                    child={
                      language === "_eng"
                        ? "Add accommodation"
                        : "Aggiungi alloggio"
                    }
                  ></Button>
                </Col>
              </Row>
            </Form>
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
