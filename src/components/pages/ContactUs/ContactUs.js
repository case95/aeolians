import React from "react";
import { useSelector } from "react-redux";

import PageTitle from "../../customComponents/PageTitle/PageTitle";

import "./ContactUs.css";

const ContactUs = () => {
  const language = useSelector((state) => state.i18n.language);

  return (
    <div className="my-background">
      <PageTitle
        title={language === "_eng" ? "CONTACT US" : "CONTATTACI"}
        text={
          language === "_eng"
            ? "We provide holiday house service on the northern coast of Sicily , in the beautiful Capo d’Orlando. Our attention to details will provide you a superb holiday. The “Guest House” are managed from our professional staff. We are completely available for any information. Please contact us!"
            : "Scegliete come trascorrere al meglio le vostre prossime vacanze, nella parte settentrionale della Sicilia , di fronte alle isole Eolie. Le strutture sono Gestite direttamente dal nostro personale qualificato, siamo a tua completa disposizione per eventuali informazioni. Contattaci!"
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
