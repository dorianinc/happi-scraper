import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { useGeneral } from "../../context/GeneralContext";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  addProductThunk,
  getSingleProductThunk,
} from "../../store/productsReducer";
import "./SearchBar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const SearchBar = () => {
  const name =
    "Dragon Ball Z Solid Edge Works vol.5 (A: Super Saiyan 2 Son Gohan)";
  const { setCurrentId } = useProduct();
  const { darkMode } = useDarkMode();
  const { searching, setSearching, setMessage } = useGeneral();
  const [productName, setProductName] = useState(name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
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
    // <div
    //   className={`search-bar-container ${
    //     darkMode ? "dark-mode" : "light-mode"
    //   }`}
    // >
    //   <div className="search-bar">
    //     <input
    //       type="text"
    //       placeholder="Search..."
    //       className={`search-input ${darkMode ? "dark-mode" : "light-mode"}`}
    //       value={productName}
    //       onKeyDown={(e) => handleKeyDown(e)}
    //       onChange={(e) => setProductName(e.target.value)}
    //     />
    //     <button
    //       type="submit"
    //       className={`search-button ${darkMode ? "dark-mode" : "light-mode"}`}
    //       onClick={(e) => handleSubmit(e)}
    //       disabled={searching}
    //     >
    //       <i
    //         className={`fa-solid fa-magnifying-glass fa-lg ${
    //           darkMode ? "dark-mode" : "light-mode"
    //         }`}
    //       />
    //     </button>
    //   </div>
    // </div>
    // <Navbar className="bg-body-tertiary">
    //   <Container>
    //     <Navbar.Brand href="#home">
    //       <img
    //         className="logo"
    //         alt="logo"
    //         width="30"
    //         height="30"
    //         src={
    //           darkMode
    //             ? "../public/images/happi-supply-owl-dark.png"
    //             : "../public/images/happi-supply-owl.png"
    //         }
    //       />
    //     </Navbar.Brand>
    //   </Container>
    // </Navbar>
    <Navbar
      expand="lg"
      className={`${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
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
            <Link to="/" className="menu-link">
              <Nav.Link href="#action1" disabled={searching}>
                Home
              </Nav.Link>
            </Link>
            <Link to="/history" className="menu-link">
              <Nav.Link href="#action2" disabled={searching}>
                History
              </Nav.Link>
            </Link>
            <NavDropdown title="Settings" id="navbarScrollingDropdown">
              <Link to="/generalSettings" className="menu-link">
                <NavDropdown.Item href="#action3">General</NavDropdown.Item>
              </Link>
              <Link to="/scriptBuilder" className="menu-link">
                <NavDropdown.Item href="#action3">
                  Script Builder
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              className={`me-2 ${darkMode ? "dark-mode" : "light-mode"}`}
              aria-label="Search"
              placeholder="Search..."
              value={productName}
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Button
              variant="outline-success"
              type="submit"
              className={`search-button ${
                darkMode ? "dark-mode" : "light-mode"
              }`}
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

export default SearchBar;
