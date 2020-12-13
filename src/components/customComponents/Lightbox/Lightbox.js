import React, { useState } from "react";

import { Modal, Button, Carousel } from "react-bootstrap";

import "./Lightbox.css";

const Lightbox = ({ activate, accommodationDetails, language }) => {
  const { pictures } = accommodationDetails;

  const listSlides = () => {
    return Object.values(pictures).map((slide, index) => {
      return (
        <Carousel.Item className="modal-carousel-image-container" key={index}>
          <img
            className="modal-carousel-image"
            src={slide}
            alt={`Slide number ${index}`}
          />
        </Carousel.Item>
      );
    });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!accommodationDetails) {
    return <p>There was a problem.</p>;
  } else {
    return (
      <>
        <div className="activate-lightbox" onClick={handleShow}>
          {activate}
        </div>

        <Modal show={show} onHide={handleClose} style={{ paddingRight: "0" }}>
          <Modal.Header
            closeButton
            className="d-block d-sm-none"
          ></Modal.Header>
          <Modal.Body>
            <Carousel interval={null} className="modal-carousel-container">
              {listSlides()}
            </Carousel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {language === "_eng" ? "Close" : "Chiudi"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
};

export default Lightbox;
