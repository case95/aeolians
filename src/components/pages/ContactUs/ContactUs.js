import React from "react";
import { useSelector } from "react-redux";

import PageTitle from "../../customComponents/PageTitle/PageTitle";

import "./ContactUs.css";

const ContactUs = () => {
  const language = useSelector((state) => state.i18n.language);

  return (
    <div className="my-background">
      <PageTitle
        title={language === "_eng" ? "CONSTACT US" : "CONTATTACI"}
        undertitle={
          language === "_eng"
            ? "ENGLISH - Lorem ipsum dolor sit"
            : "ITALIAN - Lorem ipsum dolor sit"
        }
        text={
          language === "_eng"
            ? "ENGLISH - Mollit est occaecat dolor cillum eiusmod veniam non elit laborum duis irure cupidatat tempor dolore. Id labore anim Lorem duis amet incididunt ullamco enim non in eiusmod. Voluptate amet est quis velit cupidatat est Lorem culpa non aliqua reprehenderit nisi. Culpa reprehenderit ea occaecat reprehenderit do eu proident irure eiusmod elit enim fugiat consequat."
            : "ITALIAN - Mollit est occaecat dolor cillum eiusmod veniam non elit laborum duis irure cupidatat tempor dolore. Id labore anim Lorem duis amet incididunt ullamco enim non in eiusmod. Voluptate amet est quis velit cupidatat est Lorem culpa non aliqua reprehenderit nisi. Culpa reprehenderit ea occaecat reprehenderit do eu proident irure eiusmod elit enim fugiat consequat."
        }
      />
      <a href="tel:00393801761005" className="contact-link">
        <i className="fas fa-phone"></i> 0039 380 176 1005
      </a>

      <a
        href="mailto:aeoliansholidayapartments@outlook.com"
        className="contact-link"
      >
        <i className="far fa-envelope"></i>{" "}
        aeoliansholidayapartments@outlook.com
      </a>
    </div>
  );
};

export default ContactUs;
