import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  addProductThunk,
  getSingleProductThunk,
} from "../../store/productsReducer";
import "./TopBar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const TopBar = () => {
  const name =
    "Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan)";
  const location = useLocation();
  const { setCurrentId } = useProduct();
  const { darkMode } = useDarkMode();
  const { searching, setSearching, setMessage } = useGeneral();
  const [productName, setProductName] = useState(name);
  const [activeLink, setActiveLink] = useState("/");
  console.log("🖥️  activeLink: ", activeLink);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigation("/");
    setSearching(true);
    const res = await dispatch(addProductThunk({ name: productName }));
    setSearching(false);
    if (res.id) {
      const product = await dispatch(getSingleProductThunk(res.id));
      if (product.id) {
        setCurrentId(product.id);
      }
    } else {
      setMessage(
        "No matches found for your search. Please try again with a different keywords."
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
    <Navbar expand="lg" className={` navbar ${darkMode ? "dark-mode " : ""}`}>
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
            <Link to="/" className="nav-links">
              <Nav.Link
                href="#action1"
                className={`${activeLink === "/" ? "active" : ""}`}
                disabled={searching}
              >
                Home
              </Nav.Link>
            </Link>
            <Link to="/history" className="nav-links">
              <Nav.Link
                href="#action2"
                className={`${
                  activeLink.startsWith("/history") ? "active" : ""
                }`}
                disabled={searching}
              >
                History
              </Nav.Link>
            </Link>
            <NavDropdown
              className={`${darkMode ? "dark-mode " : ""}`}
              title="Settings"
              id="navbarScrollingDropdown"
            >
              <Link to="settings/general">
                <NavDropdown.Item
                  href="#action3"
                  className={`${darkMode ? "dark-mode" : ""}`}
                >
                  General
                </NavDropdown.Item>
              </Link>
              <Link to="settings/scriptBuilder">
                <NavDropdown.Item
                  href="#action3"
                  className={`${darkMode ? "dark-mode" : ""}`}
                >
                  Script Builder
                </NavDropdown.Item>
              </Link>
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
              style={{color: "#ffffff"}}
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
