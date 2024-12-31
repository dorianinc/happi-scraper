import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import { addProductThunk } from "../../store/productsReducer";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./TopBar.css";

const TopBar = () => {
  const name =
    "Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan)";
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { searching, setSearching, setMessage } = useGeneral();
  const [productName, setProductName] = useState(name);
  const [activeLink, setActiveLink] = useState("/");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
    setSearching(true);
    const res = await dispatch(addProductThunk({ name: productName }));
    setSearching(false);
    if (res.success) {
      navigate(`products/${res.payload.id}`);
    } else {
      setMessage(
        "No matches found for your search. Please try again with different keywords."
      );
    }
  };

  const handleKeyDown = async (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      if (productName.length > 1) {
        handleSubmit(e);
      }
    }
  };

  return (
    <Navbar expand="lg" className={`navbar ${darkMode ? "dark-mode " : ""}`}>
      <Container fluid>
        {/* Logo on the left */}
        <Navbar.Brand href="#">
          <img
            className="logo"
            alt="logo"
            width="50"
            height="40"
            src={
              darkMode
                ? "../public/images/happi-owl-head-white.png"
                : "../public/images/happi-owl-head-brown.png"
            }
          />
        </Navbar.Brand>

        {/* Links on the right */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to="/"
              className={`nav-links ${
                activeLink === "/" || activeLink.startsWith("/products")
                  ? "active"
                  : ""
              }`}
              disabled={searching}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/history"
              className={`nav-links ${
                activeLink.startsWith("/history") ? "active" : ""
              }`}
              disabled={searching}
            >
              History
            </Nav.Link>
            <NavDropdown
              className={`${darkMode ? "dark-mode " : ""}`}
              title="Settings"
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item
                as={Link}
                to="settings/general"
                className={`${darkMode ? "dark-mode" : ""}`}
              >
                General
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="settings/scriptBuilder"
                className={`${darkMode ? "dark-mode" : ""}`}
              >
                Script Builder
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex search-bar">
            <Form.Control
              type="search"
              className={`me-2 ${darkMode ? "dark-mode" : ""}`}
              aria-label="Search"
              placeholder="Search..."
              value={productName}
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Button
              variant="outline-success"
              type="submit"
              style={{ color: "#ffffff" }}
              className={`search-button ${darkMode ? "dark-mode" : ""}`}
              onClick={(e) => handleSubmit(e)}
              disabled={searching}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopBar;
