import React from "react";
import { useModal } from "../../context/ModalContext";

function ModalButton({
  nameOfClass,
  modalComponent, // component to render inside the modal
  buttonContent,
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = (e) => {
    e.stopPropagation();
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <div className={nameOfClass} onClick={handleClick}>
        {buttonContent}
      </div>
    </>
  );
}

export default ModalButton;
