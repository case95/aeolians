import React from "react";

import { Link } from "react-router-dom";

import { Col, Row } from "react-bootstrap";

import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Button from "../../customComponents/Button/Button";

const AdminPanel = () => {
  return (
    <div className="my-background">
      <PageTitle
        title="Admin Panel"
        undertitle="Manage and retrieve data from your platform."
      />
      <Row>
        <Col className="text-center">
          <Link to={`/manageaccommodations`} className="booking-button">
            <Button as="link" child="Manage Accommodations" />
          </Link>
        </Col>
        <Col className="text-center">
          <Link to={`/newsletter`} className="booking-button">
            <Button child="Subscribers List" />
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default AdminPanel;
