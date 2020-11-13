import React from "react";
import { Navbar, Nav, NavDropdown, Dropdown, Button } from "react-bootstrap";

//Router
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import "./Header.css";

const Header = ({ logo }) => {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.i18n.language);

  const handleOnClick = (value) => {
    console.log(value);
    dispatch({
      type: "SET_LANGUAGE",
      payload: value,
    });
  };

  return (
    <div>
      <Navbar bg="white" expand="lg" className="my-navbar">
        <Navbar.Brand>
          <Link to="/" className="navbar-brand my-nav-logo d-md-none">
            PICCOLO
          </Link>
          <Link
            to="/"
            className="navbar-brand my-nav-logo-md d-none d-md-block"
          >
            MEDI0
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" id="my-nav-id">
            <Nav.Link as={Link} to="/" className="my-nav-link">
              Home
            </Nav.Link>

            <NavDropdown
              title="Accommodations"
              id="basic-nav-dropdown"
              className="d-lg-none"
            >
              <NavDropdown.Item
                as={Link}
                to="/accommodations"
                className="my-nav-link"
              >
                All Accommodations
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/accommodations/1"
                className="my-nav-link"
              >
                N7
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/accommodations/2"
                className="my-nav-link"
              >
                Villa on the Beach
              </NavDropdown.Item>

              <NavDropdown.Item
                as={Link}
                to="/accommodations/3"
                className="my-nav-link"
              >
                Beach View
              </NavDropdown.Item>
            </NavDropdown>

            <div className="my-nav-dropdown d-none d-lg-block">
              <Nav.Link as={Link} to="/accommodations" className="my-nav-link">
                Accommodations <i className="fa fa-sort-down"></i>
              </Nav.Link>

              <div className="my-nav-dropdown-menu">
                <Nav.Link
                  as={Link}
                  to="/accommodations/1"
                  className="my-nav-link"
                >
                  Apartment N7
                </Nav.Link>

                <Dropdown.Divider className="my-nav-divider" />

                <Nav.Link
                  as={Link}
                  to="/accommodations/2"
                  className="my-nav-link"
                >
                  Villa on the Beach
                </Nav.Link>

                <Dropdown.Divider className="my-nav-divider" />

                <Nav.Link
                  as={Link}
                  to="/accommodations/3"
                  className="my-nav-link"
                >
                  Beach View Apartment
                </Nav.Link>
              </div>
            </div>

            <Nav.Link as={Link} to="/rentals" className="my-nav-link">
              Rental Services
            </Nav.Link>

            <Nav.Link as={Link} to="/tours" className="my-nav-link">
              Daily Tours
            </Nav.Link>

            <Nav.Link as={Link} to="/contacts" className="my-nav-link">
              Contact Us
            </Nav.Link>

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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
