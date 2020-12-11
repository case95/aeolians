import React, { useState, useEffect, Fragment } from "react";
import { Navbar, Nav, NavDropdown, Dropdown, Button } from "react-bootstrap";

//Router
import { Link, useHistory } from "react-router-dom";

// Redux imports
import { compose } from "redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";
import { connect, useDispatch, useSelector } from "react-redux";

import "./Header.css";

const Header = ({ accommodations, firebase, auth }, logo) => {
  //Database listener, it listens for the table we pass as an argumet. it also detects changes
  useFirestoreConnect("accommodations");

  const redirect = useHistory();

  const dispatch = useDispatch();

  const language = useSelector((state) => state.i18n.language);

  const logout = () => {
    console.log("LOGGED OUT");
    firebase.auth().signOut();
    redirect.push("/");
  };

  //usestate to store names n id of accommodations and useeffect to load data in the state onMounted accommodations have to be > 1

  const [navAccommodations, setNavAccommodations] = useState([]);

  useEffect(() => {
    if (Array.isArray(accommodations) && accommodations.length > 1) {
      setNavAccommodations([...accommodations]);
    }
  }, [accommodations]);

  const dropdownItems = () => {
    return navAccommodations.map((accommodation, index) => {
      const { id, name } = accommodation;
      return (
        <NavDropdown.Item
          key={`dropdown-item-${index}`}
          as={Link}
          to={`/accommodations/${id}`}
          className="my-nav-link"
        >
          {language === "_eng" ? name.name_eng : name.name_ita}
        </NavDropdown.Item>
      );
    });
  };

  const dropdownItemsLG = () => {
    return navAccommodations.map((accommodation, index) => {
      const { id, name } = accommodation;
      return (
        <Fragment>
          <Nav.Link
            key={`dropdown-itaem-${index}-lg`}
            as={Link}
            to={`/accommodations/${id}`}
            className="my-nav-link"
          >
            {language === "_eng" ? name.name_eng : name.name_ita}
          </Nav.Link>
          {index < navAccommodations.length - 1 ? (
            <Dropdown.Divider className="my-nav-divider" />
          ) : null}
        </Fragment>
      );
    });
  };

  const handleOnClick = (value) => {
    dispatch({
      type: "SET_LANGUAGE",
      payload: value,
    });
  };

  const loggedOut = () => {
    return (
      <Fragment>
        <Nav.Link as={Link} to="/" className="my-nav-link">
          Home
        </Nav.Link>

        {/*ACCOMMODATIONS DROPDOWN SM/MD*/}
        <NavDropdown
          title={language === "_eng" ? `Accomodations` : `Alloggi`}
          id="basic-nav-dropdown"
          className="d-lg-none"
        >
          <NavDropdown.Item
            as={Link}
            to="/accommodations"
            className="my-nav-link"
          >
            {language === "_eng" ? `Accomodations` : `Tutti gli Alloggi`}
          </NavDropdown.Item>
          {Array.isArray(navAccommodations) && navAccommodations.length > 1 ? (
            dropdownItems()
          ) : (
            <NavDropdown.Item
              key={`dropdown-wait`}
              as={Button}
              className="my-nav-link"
            >
              {language === "_eng" ? "Wait.." : "Attendi.."}
            </NavDropdown.Item>
          )}
        </NavDropdown>

        {/*ACCOMMODATIONS DROPDOWN LG*/}
        <div className="my-nav-dropdown d-none d-lg-block">
          <Nav.Link as={Link} to="/accommodations" className="my-nav-link">
            {language === "_eng" ? `Accomodations` : `Tutti gli Alloggi`}{" "}
            <i className="fa fa-sort-down"></i>
          </Nav.Link>

          <div className="my-nav-dropdown-menu">
            {Array.isArray(navAccommodations) &&
            navAccommodations.length > 1 ? (
              dropdownItemsLG()
            ) : (
              <Nav.Link
                key={`dropdown-wait-LG`}
                as={Button}
                className="my-nav-link"
              >
                {language === "_eng" ? "Wait.." : "Attendi.."}
              </Nav.Link>
            )}
          </div>
        </div>

        <Nav.Link as={Link} to="/rentals" className="my-nav-link">
          {language === "_eng" ? `Rental Services` : `Servizi di Affitto`}
        </Nav.Link>

        <Nav.Link as={Link} to="/tours" className="my-nav-link">
          {language === "_eng" ? `Daily Tours` : `Tour Organizzati`}
        </Nav.Link>

        <Nav.Link as={Link} to="/contacts" className="my-nav-link">
          {language === "_eng" ? `Contact Us` : `Contattaci`}
        </Nav.Link>
        {/*LANGUAGE DROPDOWN SM/MD*/}
        <NavDropdown
          className="d-lg-none"
          title={language === "_eng" ? "Language" : "Lingua"}
          id="languages-nav-dropdown"
        >
          <NavDropdown.Item
            as={Button}
            onClick={() => handleOnClick("_ita")}
            id="nav-dropdown-ita"
          >
            Italian
          </NavDropdown.Item>
          <NavDropdown.Item
            as={Button}
            onClick={() => handleOnClick("_eng")}
            id="nav-dropdown-eng"
          >
            English
          </NavDropdown.Item>
        </NavDropdown>

        {/*LANGUAGE DROPDOWN LG*/}
        <div className="my-nav-dropdown d-none d-lg-block">
          <Nav.Link id="languages-nav-dropdown" as={Button}>
            {language === "_eng" ? "Language" : "Lingua"}{" "}
            <i className="fa fa-sort-down"></i>
          </Nav.Link>

          <div className="my-nav-dropdown-menu">
            <Nav.Link
              as={Button}
              onClick={() => handleOnClick("_eng")}
              id="nav-dropdown-eng"
            >
              English
            </Nav.Link>

            <Dropdown.Divider className="my-nav-divider" />
            <Nav.Link
              as={Button}
              onClick={() => handleOnClick("_ita")}
              id="nav-dropdown-ita"
            >
              Italian
            </Nav.Link>
          </div>
        </div>
      </Fragment>
    );
  };

  const loggedIn = () => {
    return (
      <Fragment>
        <Nav.Link as={Link} to="/adminpanel" className="my-nav-link">
          Admin Panel
        </Nav.Link>
        <Nav.Link as={Link} to="/manageaccommodations" className="my-nav-link">
          Accommodations
        </Nav.Link>

        <Nav.Link as={Link} to="/newsletter" className="my-nav-link">
          Subscribers
        </Nav.Link>

        {/*LANGUAGE DROPDOWN SM/MD*/}
        <NavDropdown
          className="d-lg-none"
          title={language === "_eng" ? "Language" : "Lingua"}
          id="languages-nav-dropdown"
        >
          <NavDropdown.Item
            as={Button}
            onClick={() => handleOnClick("_ita")}
            id="nav-dropdown-ita"
          >
            Italian
          </NavDropdown.Item>
          <NavDropdown.Item
            as={Button}
            onClick={() => handleOnClick("_eng")}
            id="nav-dropdown-eng"
          >
            English
          </NavDropdown.Item>
        </NavDropdown>

        {/*LANGUAGE DROPDOWN LG*/}
        <div className="my-nav-dropdown d-none d-lg-block">
          <Nav.Link id="languages-nav-dropdown" as={Button}>
            {language === "_eng" ? "Language" : "Lingua"}{" "}
            <i className="fa fa-sort-down"></i>
          </Nav.Link>

          <div className="my-nav-dropdown-menu">
            <Nav.Link
              as={Button}
              onClick={() => handleOnClick("_eng")}
              id="nav-dropdown-eng"
            >
              English
            </Nav.Link>

            <Dropdown.Divider className="my-nav-divider" />
            <Nav.Link
              as={Button}
              onClick={() => handleOnClick("_ita")}
              id="nav-dropdown-ita"
            >
              Italian
            </Nav.Link>
          </div>
        </div>

        <Nav.Link
          as={Button}
          className="my-nav-link text-white"
          onClick={() => logout()}
        >
          Log Out
        </Nav.Link>
      </Fragment>
    );
  };

  return (
    <div>
      <Navbar
        bg="white"
        expand="lg"
        className="my-navbar py-2 flex-column flex-sm-row "
      >
        <Navbar.Brand className=" p-0 m-0">
          <Link to="/" className="navbar-brand p-0 m-0 my-nav-logo d-sm-none">
            <div className="logo-small"></div>
          </Link>
          <Link
            to="/"
            className="navbar-brand p-0 my-nav-logo-md d-none d-sm-block"
          >
            <div className="logo"></div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" id="my-nav-id">
            {auth.uid !== undefined ? loggedIn() : loggedOut()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    accommodations: state.firestore.ordered.accommodations,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }))
);

export default enhance(Header);
