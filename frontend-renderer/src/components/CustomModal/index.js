
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDarkMode } from "../../context/DarkModeContext";


function CustomModal({ show, setShow, modalContent }) {
  const { darkMode } = useDarkMode();
  const handleClose = () => setShow(false);
  

  return (
    <>
      <Modal show={show} onHide={handleClose}  centered closeButton>
        <Modal.Body className={darkMode ? "dark-mode": ""}>{modalContent}</Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
