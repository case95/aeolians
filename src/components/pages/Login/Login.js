import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { compose } from "redux";
import { connect, useSelector } from "react-redux";
import { withFirestore } from "react-redux-firebase";

import Input from "../../customComponents/Input/Input";
import PageTitle from "../../customComponents/PageTitle/PageTitle";
import Container from "../../customComponents/Container/Container";
import Button from "../../customComponents/Button/Button";

import { Row, Col, Form } from "react-bootstrap";

import "./Login.css";

const Login = ({ firebase }) => {
  const redirect = useHistory();
  const language = useSelector((state) => state.i18n.language);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { email, password } = loginInfo;

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        if (res.user) {
          setError("");
          setSuccess("You Are Logged In!");
          await sleep(1000);
          redirect.push("/manageaccommodations");
        }
      })
      .catch((e) => {
        setSuccess("");
        setError("There was an error.");
      });
  };

  const onChange = (e) => {
    e.preventDefault();
    return setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-login-hero-image">
      <Row>
        <Container
          styleNumber={0}
          child={
            <div>
              <PageTitle
                title={
                  language === "_eng"
                    ? "Log-in as an admin"
                    : "Log-in come admin"
                }
              ></PageTitle>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit(e);
                }}
              >
                <Row>
                  <Col>
                    <Input
                      name="email"
                      value={email}
                      placeholder={
                        language === "_eng"
                          ? `Enter Your Email`
                          : `Inserisci La Tua Email`
                      }
                      required={true}
                      label={`Email`}
                      onChange={(e) => onChange(e)}
                      type="email"
                      id="email"
                    ></Input>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input
                      name="password"
                      value={password}
                      placeholder={
                        language === "_eng"
                          ? `Enter Your Password`
                          : `Inserisci La Tua Password`
                      }
                      required={true}
                      label={`Password`}
                      onChange={(e) => onChange(e)}
                      type="password"
                      id="password"
                    ></Input>
                  </Col>
                </Row>
                {error && <div className="text-danger mb-3">{error}</div>}
                {success && <div className="text-success mb-3">{success}</div>}
                <Button
                  child={language === "_eng" ? "Submit" : "Conferma"}
                ></Button>
              </Form>
            </div>
          }
        ></Container>
      </Row>
    </div>
  );
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }))
);

export default enhance(Login);
