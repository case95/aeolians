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
import Container from "../../customComponents/Container/Container";
import Input from "../../customComponents/Input/Input";
import Button from "../../customComponents/Button/Button";
import ProgressBar from "../../layout/ProgressBar/ProgressBar";

import "./AddAccommodation.css";

const AddAccommodation = (props) => {
  const language = useSelector((state) => state.i18n.language);

  const placeholderImage =
    "https://firebasestorage.googleapis.com/v0/b/aeolians-86d4b.appspot.com/o/placeholder-image.png?alt=media&token=4bc0a867-22fa-4e42-9028-090de0543b08";

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
    pictures: [placeholderImage],
    bookings: [],
  });

  const {
    name,
    introduction,
    description,
    services,
    pictures,
    bookings,
  } = accommodationDetails;

  const [pictureFiles, setPictureFiles] = useState([""]);

  const firestore = useFirestore();
  const history = useHistory();
  //LOOKING FOR A SPECIFIC DOCUMENT IN A COLLECTION, WE PASS THE COLLECTION AND THE DOC ID
  useFirestoreConnect([
    { collection: "accommodations" },
    { collection: "booking_logos" },
  ]);

  const { accommodations, booking_logos } = props;

  const types = ["image/jpg", "image/jpeg"];

  const [errors, setErrors] = useState([""]);

  const [error, setError] = useState("");

  const [bookingState, setBookingState] = useState([]);

  useEffect(() => {
    if (booking_logos) {
      const newBookingState = Array(booking_logos.length).fill(true);
      setBookingState(newBookingState);
    }
  }, [booking_logos]);

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
      const selected = e.target.files[0];
      if (selected) {
        if (types.includes(selected.type)) {
          const newArray = [...pictureFiles];
          newArray[index] = selected;
          setPictureFiles([...newArray]);

          const reader = new FileReader();
          reader.onload = () => {
            console.log("READER", reader);
            if (reader.readyState === 2) {
              const passArray = [...pictures];
              passArray[index] = reader.result;
              setAccommodationDetails({
                ...accommodationDetails,
                pictures: passArray,
              });
            }

            if (errors[index]) {
              const errorsArray = [...errors];
              errorsArray[index] = "";
              setErrors([...errorsArray]);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        } else {
          const errorsArray = [...errors];
          errorsArray[index] =
            language === "_eng"
              ? "Choose an image with .jpg or jpeg extension."
              : "Scegli un immagine con un estensione .jpg o .jpeg.";

          setErrors([...errorsArray]);
        }
      } else {
        const newArray = [...pictureFiles];
        newArray[index] = placeholderImage;
        setPictureFiles([...newArray]);

        const passArray = [...pictures];
        passArray[index] = placeholderImage;
        setAccommodationDetails({
          ...accommodationDetails,
          pictures: passArray,
        });
      }
    }
    if (e.target.name === "link") {
      const newArray = bookings;
      newArray[index] = { ...newArray[index], [e.target.name]: e.target.value };
      setAccommodationDetails({
        ...accommodationDetails,
        bookings: newArray,
      });
    }
    if (e.target.name === "logo") {
      const newArray = bookings;
      const newBookingState = bookingState;

      newBookingState[index] = !newBookingState[index];
      setBookingState([...newBookingState]);

      if (e.target.checked) {
        newArray[index] = {
          ...newArray[index],
          logo_active: booking_logos[index].logo_active,
          [e.target.name]: e.target.value,
        };
        setAccommodationDetails({
          ...accommodationDetails,
          bookings: newArray,
        });
      } else {
        newArray[index] = undefined;
        setAccommodationDetails({
          ...accommodationDetails,
          bookings: newArray,
        });
      }
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
        pictures: [...pictures, placeholderImage],
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

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const areFilesUploaded = pictures.every(
      (picture) =>
        picture.includes("https://firebasestorage.googleapis.com") &&
        !picture.includes(placeholderImage)
    );
    if (areFilesUploaded) {
      firestore
        .collection("accommodations")
        .add(accommodationDetails)
        .then(() => console.log("ACCOMMODATION ADDED"));
      // redirect user to the dashboard after adding a client.
      history.push("/manageaccommodations");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictures]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (pictureFiles.length >= 4 && bookings.length >= 1) {
      const newBookings = bookings.filter((x) => x !== null);
      setAccommodationDetails({
        ...accommodationDetails,
        bookings: newBookings,
      });
      setError("");
      setTrigger(true);
    } else {
      setError("Upload at least four images");
    }
  };

  if (!accommodations || !booking_logos) {
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
              className="add-accommodation-form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(e);
              }}
            >
              <Row className="mb-5">
                <Col className="col-12">
                  <p className="m-0 h1">
                    {language === "_eng" ? "Name" : "Nome"}
                  </p>
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
                  <p className="m-0 h1">
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
                  <p className="m-0 h1">
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

              <div>
                <p className="m-0 h1">
                  {language === "_eng" ? `Pictures` : `Immagini`}
                </p>
                {pictures.map((picture, index) => {
                  return (
                    <Row key={index} className="mb-3">
                      <Col className="col-12">
                        <p className="h3">
                          {language === "_eng"
                            ? `Picture N.${index + 1}`
                            : `Foto N.${index + 1}`}
                        </p>
                      </Col>
                      <Col className="col-12 col-md-6  mb-1 pb-md-0 edit-image-preview-container">
                        <img
                          src={picture}
                          alt={`preview-${index}`}
                          className="edit-image-preview"
                        />
                      </Col>
                      <Col className="col-12 col-md-6 mb-3 mb-lg-0">
                        <Input
                          className="add-accommodation-input p-0"
                          type="file"
                          key={index}
                          required={true}
                          spacer={true}
                          name="pictures"
                          labelClassName="add-accommodation-input-label"
                          onChange={(e) => onChange(e, index)}
                        ></Input>
                        {trigger &&
                          pictureFiles[index] &&
                          pictureFiles[index] !== "" && (
                            <ProgressBar
                              file={pictureFiles[index]}
                              accommodationDetails={accommodationDetails}
                              setAccomodationDetails={setAccommodationDetails}
                              index={index}
                            />
                          )}
                        {errors[index] && (
                          <p className="text-danger">{errors[index]}</p>
                        )}
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
                        language === "_eng" ? "Add Photo" : "Aggiungi Foto"
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
              <div>
                <p className="m-0 h1">
                  {language === "_eng" ? `Services` : `Servizi`}
                </p>
                {services.map((service, index) => {
                  return (
                    <Row className="mb-3" key={`service-${index}`}>
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
              <div>
                <p className="mb-0 h1">
                  {language === "_eng"
                    ? `Booking methods`
                    : `Metodi di prenotazione`}
                </p>
                {booking_logos.map((booking, index) => {
                  return (
                    <Row key={index}>
                      <Col className="col-12">
                        <p className="h3">{booking.name}</p>
                      </Col>
                      <Col className="col-8 col-sm-3 col-md-2 edit-logo-preview-container mx-auto text-center mb-3">
                        <img
                          src={booking.logo}
                          alt={`preview-${index}`}
                          className="edit-logo-preview"
                        />
                      </Col>

                      <Col className="col-4 col-sm-3 col-md-2 mb-3 mb-lg-0">
                        <Input
                          type="checkbox"
                          className="mr-3 add-accommodation-input logo-checkbox"
                          spacer={true}
                          label={language === "_eng" ? "Enable" : "Attiva"}
                          name="logo"
                          labelClassName="add-accommodation-input-label"
                          value={booking.logo}
                          onChange={(e) => onChange(e, index)}
                        ></Input>
                      </Col>

                      <Col className="col-12 col-sm-6 col-md-8 mb-3 mb-lg-0">
                        <Input
                          id={`booking-link-${index}`}
                          className="mr-3 add-accommodation-input"
                          required={true}
                          spacer={true}
                          label="Link"
                          name="link"
                          disabled={bookingState[index]}
                          labelClassName="add-accommodation-input-label"
                          value={
                            bookings[index] === undefined
                              ? ""
                              : bookings[index].link
                          }
                          onChange={(e) => onChange(e, index)}
                        ></Input>
                      </Col>
                    </Row>
                  );
                })}
              </div>

              <Row>
                <Col className="text-center">
                  <Button
                    type="submit"
                    className="bg-success py-3"
                    child={
                      <p className="m-0 d-inline-block">
                        {trigger && (
                          <div
                            className="spinner-border text-light mr-2"
                            role="status"
                          >
                            <span className="sr-only">Loading..</span>
                          </div>
                        )}
                        {language === "_eng"
                          ? "Add accommodation"
                          : "Aggiungi alloggio"}
                      </p>
                    }
                  ></Button>
                  {error && <p className="text-danger p-2">{error}</p>}
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
    booking_logos: state.firestore.ordered.booking_logos,
  }))
);

export default enhance(AddAccommodation);
