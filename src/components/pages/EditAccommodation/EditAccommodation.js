import React, { useEffect, useState } from "react";

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
import Button from "../../customComponents/Button/Button";
import Container from "../../customComponents/Container/Container";
import Input from "../../customComponents/Input/Input";

import "./EditAccommodation.css";

const EditAccommodation = (props) => {
  const language = useSelector((state) => state.i18n.language);

  const redirect = useHistory();

  const firestore = useFirestore();

  const { accommodations } = props;

  const [accommodationDetails, setAccommodationDetails] = useState({});

  useEffect(() => {
    return (
      accommodations &&
      setAccommodationDetails({
        ...accommodations.find((obj) => obj.id === id),
      })
    );
  }, [accommodations]);

  const {
    name,
    introduction,
    description,
    services,
    pictures,
    bookings,
  } = accommodationDetails;

  const [showDelete, setShowDelete] = useState(false);

  const [error, setError] = useState();

  const id = props.match.params.id;

  const deleteCheck = (e) => {
    e.preventDefault();
    setShowDelete(!showDelete);
  };

  const deleteAccommodation = (e) => {
    firestore.collection("accommodations").doc(id).delete();
    console.log("aCCOMMODATION DELETED");
    redirect.push("/manageaccommodations");
  };

  const onChange = (e, index) => {
    switch (e.target.name) {
      case "name_eng":
      case "name_ita":
        return setAccommodationDetails({
          ...accommodationDetails,
          name: { ...name, [e.target.name]: e.target.value },
        });
      case "introduction_eng":
      case "introduction_ita":
        return setAccommodationDetails({
          ...accommodationDetails,
          introduction: { ...introduction, [e.target.name]: e.target.value },
        });
      case "description_eng":
      case "description_ita":
        return setAccommodationDetails({
          ...accommodationDetails,
          description: { ...description, [e.target.name]: e.target.value },
        });
      case "service_eng":
      case "service_ita":
      case "icon":
        const servicesArray = [...services];
        servicesArray[index] = {
          ...servicesArray[index],
          [e.target.name]: e.target.value,
        };
        return setAccommodationDetails({
          ...accommodationDetails,
          services: servicesArray,
        });
      case "pictures":
        const picturesArray = [...pictures];
        picturesArray[index] = e.target.value;
        return setAccommodationDetails({
          ...accommodationDetails,
          pictures: [...picturesArray],
        });
      case "logo":
      case "link":
        const bookingsArray = [...bookings];
        bookingsArray[index] = {
          ...bookingsArray[index],
          [e.target.name]: e.target.value,
        };
        return setAccommodationDetails({
          ...accommodationDetails,
          bookings: bookingsArray,
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      firestore
        .collection("accommodations")
        .doc(id)
        .update(accommodationDetails);
      console.log("ACCOMMODATION UPDATED");
      redirect.push("/manageaccommodations");
    } catch (err) {
      console.log("ERROR:", err);
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

  useFirestoreConnect([{ collection: "accommodations" }]);

  if (
    Object.keys(accommodationDetails).length === 0 &&
    accommodationDetails.constructor === Object
  ) {
    return <p>There was a problem.</p>;
  } else {
    const accommodation = accommodationDetails;

    return (
      <div className="my-background">
        <Row className="mx-0">
          <Col>
            <PageTitle
              className="edit-page-title"
              title={
                language === "_eng"
                  ? `EDIT ${name.name_eng}`
                  : `MODIFICA ${name.name_ita}`
              }
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="text-center">
            <Button
              type="button"
              child={
                language === "_eng"
                  ? "Delete Accommodation"
                  : "Elimina Alloggio"
              }
              className="bg-danger"
              onClick={(e) => deleteCheck(e)}
            ></Button>
          </Col>
        </Row>

        {showDelete && (
          <Row className="mb-3 mx-0">
            <Col className="mx-0 py-3 bg-warning">
              <p className="text-center">
                {language === "_eng"
                  ? "Do you really want to delete this accommodation?"
                  : "Vuoi davvero eliminare questo alloggio?"}
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  type="button"
                  child={"No"}
                  className="bg-danger mx-3"
                  onClick={(e) => deleteCheck(e)}
                ></Button>
                <Button
                  type="button"
                  child={language === "_eng" ? "Yes" : "Si"}
                  className="bg-danger mx-3"
                  onClick={(e) => deleteAccommodation(e)}
                ></Button>
              </div>
            </Col>
          </Row>
        )}

        <Container
          styleNumber={1}
          child={
            <Form
              className="edit-accommodation-form"
              onSubmit={(e) => {
                onSubmit(e);
              }}
            >
              {Object.entries(accommodationDetails).map(
                ([key, value], index) => {
                  switch (key) {
                    case "id":
                      break;
                    case "pictures":
                      return (
                        <div key={`${index}`}>
                          <p className="m-0 h1">
                            {language === "_eng" ? `Pictures` : `Immagini`}
                          </p>
                          {value.map((val, index) => {
                            return (
                              <Row className="mb-3" key={`picture-${index}`}>
                                <Col className="col-12 col-md-4  mb-1 mpb-md-0 edit-image-preview-container">
                                  <img
                                    src={val}
                                    alt={`preview-${index}`}
                                    className="edit-image-preview"
                                  />
                                </Col>
                                <Col className="col-12 col-md-8  mb-1">
                                  <Input
                                    className="YourProfileInput"
                                    required={true}
                                    label={
                                      language === "_eng"
                                        ? `Picture ${index + 1}`
                                        : `Immagine ${index + 1}`
                                    }
                                    placeholder={val}
                                    type="string"
                                    value={val}
                                    name="pictures"
                                    onChange={(e) => onChange(e, index)}
                                  />
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
                                    ? "Add Photo"
                                    : "Aggiungi Foto"
                                }
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
                        </div>
                      );
                    case "bookings":
                      return (
                        <div key={`${index}`}>
                          <p className="mb-0 h1">
                            {language === "_eng"
                              ? `Booking methods`
                              : `Metodi di prenotazione`}
                          </p>
                          {value.map((val, index) => {
                            return (
                              <Row className="mb-3" key={`booking-${index}`}>
                                <Col className="col-12 mb-2">
                                  <p className="m-0 h3">
                                    {language === "_eng"
                                      ? `Method ${index + 1}`
                                      : `Metodo ${index + 1}`}
                                  </p>
                                </Col>
                                <Col className="col-6 col-md-4 edit-logo-preview-container mx-auto text-center">
                                  <img
                                    src={val.logo}
                                    alt={`preview-${index}`}
                                    className="edit-logo-preview"
                                  />
                                </Col>
                                <Col className="col-12 col-md-4 mb-1">
                                  <Input
                                    className="YourProfileInput"
                                    required={true}
                                    label={
                                      language === "_eng" ? "Logo" : "Logo"
                                    }
                                    placeholder={val.logo}
                                    type="string"
                                    value={val.logo}
                                    name="logo"
                                    onChange={(e) => onChange(e, index)}
                                  />
                                </Col>
                                <Col className="col-12 col-md-4 mb-1">
                                  <Input
                                    className="YourProfileInput"
                                    required={true}
                                    label={
                                      language === "_eng" ? "Link" : "Link"
                                    }
                                    placeholder={val.link}
                                    type="string"
                                    value={val.link}
                                    name="link"
                                    onChange={(e) => onChange(e, index)}
                                  />
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
                        </div>
                      );
                    case "services":
                      return (
                        <div key={`${index}`}>
                          <p className="m-0 h1">
                            {language === "_eng" ? `Services` : `Servizi`}
                          </p>
                          {value.map((val, index) => {
                            return (
                              <Row className="mb-3" key={`service-${index}`}>
                                <Col className="col-12">
                                  <p className="m-0 h3">
                                    {language === "_eng"
                                      ? `Service ${index + 1}`
                                      : `Servizio ${index + 1}`}
                                  </p>
                                </Col>
                                <Col className="col-12 col-md-4 col-lg-3 mb-1">
                                  <Input
                                    className="YourProfileInput"
                                    required={true}
                                    label={
                                      language === "_eng" ? "Icon" : "Icona"
                                    }
                                    placeholder={val.icon}
                                    type="string"
                                    value={val.icon}
                                    name="icon"
                                    onChange={(e) => onChange(e, index)}
                                  />
                                </Col>
                                <Col className="col-12 col-md-4 col-lg-3 mb-1">
                                  <Input
                                    className="YourProfileInput"
                                    required={true}
                                    label={
                                      language === "_eng"
                                        ? "English name"
                                        : "Nome inglese"
                                    }
                                    placeholder={val.service_eng}
                                    type="string"
                                    value={val.service_eng}
                                    name="service_eng"
                                    onChange={(e) => onChange(e, index)}
                                  />
                                </Col>
                                <Col>
                                  <Input
                                    className="YourProfileInput"
                                    required={true}
                                    label={
                                      language === "_eng"
                                        ? "Italian name"
                                        : "Nome italiano"
                                    }
                                    placeholder={val.service_ita}
                                    type="string"
                                    value={val.service_ita}
                                    name="service_ita"
                                    onChange={(e) => onChange(e, index)}
                                  />
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
                                    ? "Add Service"
                                    : "Aggiungi Servizio"
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
                        </div>
                      );
                    case "introduction":
                      return (
                        <div key={`${index}`}>
                          <p className="m-0 h1">
                            {language === "_eng"
                              ? "Introduction"
                              : "Introduzione"}
                          </p>
                          <Row className="mb-3">
                            <Col className="col-12 col-md-6 mb-1">
                              <Input
                                as="textarea"
                                rows={5}
                                className="YourProfileInput"
                                required={true}
                                label={
                                  language === "_eng"
                                    ? `Introduction in english`
                                    : `Introduzione in inglese`
                                }
                                placeholder={value[`${key}_eng`]}
                                type="string"
                                value={value[`${key}_eng`]}
                                name="introduction_eng"
                                onChange={(e) => onChange(e, index)}
                              />
                            </Col>
                            <Col className="col-12 col-md-6 mb-1" key={index}>
                              <Input
                                as="textarea"
                                rows={5}
                                className="YourProfileInput"
                                required={true}
                                label={
                                  language === "_eng"
                                    ? `Introduction in italian`
                                    : `Introduzione in italiano`
                                }
                                placeholder={value[`${key}_ita`]}
                                type="string"
                                value={value[`${key}_ita`]}
                                name="introduction_ita"
                                onChange={(e) => onChange(e, index)}
                              />
                            </Col>
                          </Row>
                        </div>
                      );
                    case "name":
                      return (
                        <div key={`${index}`}>
                          <p className="m-0 h1">
                            {language === "_eng" ? "Name" : "Nome"}
                          </p>
                          <Row className="mb-3">
                            <Col className="col-12 col-md-6 mb-1">
                              <Input
                                className="YourProfileInput"
                                required={true}
                                label={
                                  language === "_eng"
                                    ? `Name in english`
                                    : `Nome in inglese`
                                }
                                placeholder={value[`${key}_eng`]}
                                type="string"
                                value={value[`${key}_eng`]}
                                name="name_eng"
                                onChange={(e) => onChange(e, index)}
                              />
                            </Col>
                            <Col className="col-12 col-md-6 mb-1">
                              <Input
                                className="YourProfileInput"
                                required={true}
                                label={
                                  language === "_eng"
                                    ? `Name in italian`
                                    : `Nome in italiano`
                                }
                                placeholder={value[`${key}_ita`]}
                                type="string"
                                value={value[`${key}_ita`]}
                                name="name_ita"
                                onChange={(e) => onChange(e, index)}
                              />
                            </Col>
                          </Row>
                        </div>
                      );
                    case "description":
                      return (
                        <div key={`${index}`}>
                          <p className="m-0 h1">
                            {language === "_eng"
                              ? "Description"
                              : "Descrizione"}
                          </p>
                          <Row className="mb-3">
                            <Col className="col-12 col-md-6 mb-1">
                              <Input
                                as="textarea"
                                rows={5}
                                className="YourProfileInput"
                                required={true}
                                label={
                                  language === "_eng"
                                    ? `Description in english`
                                    : `Descrizione in inglese`
                                }
                                placeholder={value[`${key}_eng`]}
                                type="string"
                                value={value[`${key}_eng`]}
                                name="description_eng"
                                onChange={(e) => onChange(e, index)}
                              />
                            </Col>
                            <Col className="col-12 col-md-6 mb-1">
                              <Input
                                as="textarea"
                                rows={5}
                                className="YourProfileInput"
                                required={true}
                                label={
                                  language === "_eng"
                                    ? `Description in italian`
                                    : `Descrizione in italiano`
                                }
                                placeholder={value[`${key}_ita`]}
                                type="string"
                                value={value[`${key}_ita`]}
                                name="description_ita"
                                onChange={(e) => onChange(e, index)}
                              />
                            </Col>
                          </Row>
                        </div>
                      );
                  }
                }
              )}
              {error && <div className="text-danger mb-3">{error}</div>}
              <Button
                child={language === "_eng" ? "Submit" : "Conferma"}
              ></Button>
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

export default enhance(EditAccommodation);
