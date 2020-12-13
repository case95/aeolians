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
import ProgressBar from "../../layout/ProgressBar/ProgressBar";

import "./EditAccommodation.css";

const EditAccommodation = (props) => {
  const language = useSelector((state) => state.i18n.language);

  const redirect = useHistory();

  const firestore = useFirestore();

  const { accommodations, booking_logos } = props;

  const [bookingState, setBookingState] = useState([]);

  const [accommodationDetails, setAccommodationDetails] = useState({});

  const placeholderImage =
    "https://firebasestorage.googleapis.com/v0/b/aeolians-86d4b.appspot.com/o/placeholder-image.png?alt=media&token=4bc0a867-22fa-4e42-9028-090de0543b08";

  useEffect(() => {
    return (
      accommodations &&
      setAccommodationDetails({
        ...accommodations.find((obj) => obj.id === id),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accommodations]);

  useFirestoreConnect([
    { collection: "accommodations" },
    { collection: "booking_logos" },
  ]);

  const {
    name,
    introduction,
    description,
    services,
    pictures,
    bookings,
  } = accommodationDetails;

  useEffect(() => {
    if (booking_logos && bookings) {
      const newBookings = [...bookings];
      booking_logos.map((bookingService, index) => {
        const newBookingState = bookingState;
        const controller = bookings.some(
          (booking) => bookingService.logo === booking.logo
        );
        if (controller === false) {
          newBookings.splice(index, 0, undefined);
        }
        newBookingState[index] = !controller;
        setAccommodationDetails({
          ...accommodationDetails,
          bookings: newBookings,
        });
        return setBookingState(newBookingState);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking_logos]);

  const [showDelete, setShowDelete] = useState(false);

  const [error, setError] = useState();

  const id = props.match.params.id;

  const deleteCheck = (e) => {
    e.preventDefault();
    setShowDelete(!showDelete);
  };

  const deleteAccommodation = (e) => {
    firestore.collection("accommodations").doc(id).delete();
    console.log("ACCOMMODATION DELETED");
    redirect.push("/manageaccommodations");
  };

  const types = ["image/jpg", "image/jpeg"];

  const [pictureFiles, setPictureFiles] = useState([]);

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
        const selected = e.target.files[0];
        if (selected) {
          if (types.includes(selected.type)) {
            const newArray = [...pictureFiles];
            newArray[index] = selected;
            setPictureFiles([...newArray]);

            const reader = new FileReader();
            reader.onload = () => {
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
          const newPicturesArray = [...pictures];
          newPicturesArray[index] = placeholderImage;
          setAccommodationDetails({
            ...accommodationDetails,
            pictures: newPicturesArray,
          });

          const newArray = [...pictureFiles];
          newArray[index] = undefined;
          setPictureFiles([...newArray]);
        }
        break;
      case "link":
        const newLinksArray = [...bookings];
        newLinksArray[index] = {
          ...newLinksArray[index],
          [e.target.name]: e.target.value,
        };
        setAccommodationDetails({
          ...accommodationDetails,
          bookings: newLinksArray,
        });
        break;
      case "logo":
        const newLogosArray = [...bookings];
        const newBookingState = [...bookingState];

        newBookingState[index] = !newBookingState[index];
        setBookingState([...newBookingState]);

        if (e.target.checked) {
          newLogosArray[index] = {
            ...newLogosArray[index],
            logo_active: booking_logos[index].logo_active,
            [e.target.name]: e.target.value,
          };
          setAccommodationDetails({
            ...accommodationDetails,
            bookings: newLogosArray,
          });
        } else {
          newLogosArray[index] = undefined;
          setAccommodationDetails({
            ...accommodationDetails,
            bookings: newLogosArray,
          });
        }
        break;
      default:
        break;
    }
  };

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (trigger) {
      const areFilesUploaded = pictures.every((picture) =>
        picture.includes("https://firebasestorage.googleapis.com")
      );
      if (areFilesUploaded) {
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
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictures]);

  const [cleanDetails, setCleanDetails] = useState({});

  useEffect(() => {
    if (Object.keys(cleanDetails).length > 0) {
      try {
        firestore.collection("accommodations").doc(id).update(cleanDetails);
        console.log("ACCOMMODATION UPDATED");
        redirect.push("/manageaccommodations");
      } catch (err) {
        console.log("ERROR:", err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanDetails]);

  const [errors, setErrors] = useState([""]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (pictures.includes(placeholderImage)) {
      const newErrors = errors;
      pictures.map((picture, index) => {
        if (picture === placeholderImage) {
          setError("There are empty fields in Pictures.");
          return (newErrors[index] = "Select an image.");
        } else {
          return (newErrors[index] = "");
        }
      });

      setErrors(newErrors);
      console.log(errors);
      return;
    } else {
      if (
        pictureFiles.length === 0 ||
        pictureFiles.every((picture) => picture === undefined)
      ) {
        const newBookings = bookings.filter((booking) => booking !== undefined);
        setCleanDetails({
          ...accommodationDetails,
          bookings: newBookings,
        });
        return;
      } else {
        const newBookings = bookings.filter((booking) => booking !== undefined);
        setAccommodationDetails({
          ...accommodationDetails,
          bookings: newBookings,
        });
        setError("");
        setTrigger(true);
        return;
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
    if (Array.isArray(pictures) && pictures.length > 4 && value === "picture") {
      const newArray = [...pictures];
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

  if (
    !booking_logos ||
    (Object.keys(accommodationDetails).length === 0 &&
      accommodationDetails.constructor === Object)
  ) {
    return <p>There was a problem.</p>;
  } else {
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
              <div>
                <div>
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
                        placeholder={name.name_eng}
                        type="string"
                        value={name.name_eng}
                        name="name_eng"
                        onChange={(e) => onChange(e)}
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
                        placeholder={name.name_ita}
                        type="string"
                        value={name.name_ita}
                        name="name_ita"
                        onChange={(e) => onChange(e)}
                      />
                    </Col>
                  </Row>
                </div>

                <div>
                  <p className="m-0 h1">
                    {language === "_eng" ? "Introduction" : "Introduzione"}
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
                        placeholder={introduction.introduction_eng}
                        type="string"
                        value={introduction.introduction_eng}
                        name="introduction_eng"
                        onChange={(e) => onChange(e)}
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
                            ? `Introduction in italian`
                            : `Introduzione in italiano`
                        }
                        placeholder={introduction.introduction_ita}
                        type="string"
                        value={introduction.introduction_ita}
                        name="introduction_ita"
                        onChange={(e) => onChange(e)}
                      />
                    </Col>
                  </Row>
                </div>
                <div>
                  <p className="m-0 h1">
                    {language === "_eng" ? "Description" : "Descrizione"}
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
                        placeholder={description.description_eng}
                        type="string"
                        value={description.description_eng}
                        name="description_eng"
                        onChange={(e) => onChange(e)}
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
                        placeholder={description.description_ita}
                        type="string"
                        value={description.description_ita}
                        name="description_ita"
                        onChange={(e) => onChange(e)}
                      />
                    </Col>
                  </Row>
                </div>

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
                  {services.map((val, index) => {
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
                            label={language === "_eng" ? "Icon" : "Icona"}
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
                            checked={!bookingState[index]}
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
                  <Row>
                    <Col className="text-center">
                      <Button
                        type="submit"
                        className="bg-success py-3"
                        child={
                          <div className="m-0 d-inline-block">
                            {trigger && (
                              <div
                                className="spinner-border text-light mr-2"
                                role="status"
                              >
                                <span className="sr-only">Loading..</span>
                              </div>
                            )}
                            {language === "_eng" ? "Submit" : "Conferma"}
                          </div>
                        }
                      ></Button>
                      {error && <p className="text-danger p-2">{error}</p>}
                    </Col>
                  </Row>
                </div>
              </div>
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

export default enhance(EditAccommodation);
