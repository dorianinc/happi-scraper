import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDarkMode } from "../../context/DarkModeContext";

function CustomModal({ show, setShow, modalContent }) {
  const { darkMode } = useDarkMode();
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        centered
        closeButton
        className={darkMode ? "dark-mode" : ""}
      >
        <Modal.Body className={darkMode ? "dark-mode" : ""}>
          {modalContent}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
