import React from "react";

import PageTitle from "../../customComponents/PageTitle/PageTitle";

import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="my-background">
      <PageTitle
        title="Contact us"
        undertitle="Lorem ipsum dolor sit"
        text="Mollit est occaecat dolor cillum eiusmod veniam non elit laborum duis irure cupidatat tempor dolore. Id labore anim Lorem duis amet incididunt ullamco enim non in eiusmod. Voluptate amet est quis velit cupidatat est Lorem culpa non aliqua reprehenderit nisi. Culpa reprehenderit ea occaecat reprehenderit do eu proident irure eiusmod elit enim fugiat consequat."
      />
      <a href="tel:0402112221" className="contact-link">
        <i className="fas fa-phone"></i> 0402112221
      </a>

      <a href="mailto:hello@aeolians.com" className="contact-link">
        <i className="far fa-envelope"></i> hello@aeolians.com
      </a>
    </div>
  );
};

export default ContactUs;
