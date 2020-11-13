import React from "react";

import { Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

//Import custom components
import Container from "../../customComponents/Container/Container";
import PageTitle from "../../customComponents/PageTitle/PageTitle";

import "./Home.css";

const Home = () => {
  const language = useSelector((state) => state.i18n.language);

  return (
    <div className="my-hero-image">
      <Row>
        <PageTitle
          title={"AEOLIANS"}
          undertitle={"Holiday Apartments"}
          text={
            language === "_eng"
              ? "Come to discover the beauty of the italian lifestyle in Capo d’Orlando."
              : "Vieni a scoprire la bellezza del sud italia a Capo d'Orlando!"
          }
        ></PageTitle>
      </Row>
      <Row>
        <Container
          styleNumber={0}
          child={
            <div>
              <PageTitle
                title={
                  language === "_eng"
                    ? "ENGLISH LOREM IPSUM"
                    : "ITALIAN LOREM IPSUM"
                }
                text={
                  language === "_eng"
                    ? "Aeolians Holiday Apartments was created to offer you the best apartments in northern Sicily for your every need. We carefully chose each apartment for its location and its amenities, all for a holiday of your dreams."
                    : " A Capo d’Orlando,Tra gli splendidi scenari delle coste siciliane, immersi nel fascino delle bellezze naturali e culturali del territorio,Aeolians Holiday Apartments vi da la possibilità di trascorrere giorni indimenticabili nelle nostre meravigliose strutture."
                }
              ></PageTitle>
              <Row>
                <Col className="my-container-link-col my-container-link-col-1">
                  <Link
                    to="/accommodations"
                    className="my-container-link my-auto"
                  >
                    {language === "_eng"
                      ? "DISCOVER ACCOMMODATIONS"
                      : "SCOPRI GLI ALLOGGI DISPONIBILI"}
                  </Link>
                </Col>
                <Col className="my-container-link-col my-container-link-col-2">
                  <Link to="/contacts" className="my-container-link my-auto">
                    {language === "_eng"
                      ? "CONTACT US FOR MORE INFOS"
                      : "CONTATTACI PER INFORMAZIONI"}
                  </Link>
                </Col>
              </Row>
            </div>
          }
        ></Container>
      </Row>
    </div>
  );
};

export default Home;
