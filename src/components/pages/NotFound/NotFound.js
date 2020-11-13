import React from "react";

import PageTitle from "../../customComponents/PageTitle/PageTitle";

import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <div className="my-background">
        <PageTitle title="Sorry, page not found." />
      </div>
    </div>
  );
};

export default NotFound;
