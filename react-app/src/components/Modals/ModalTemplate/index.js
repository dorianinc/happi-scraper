import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";

function DeleteSpotModal({ spotId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleClick = async (e, id) => {
    e.preventDefault();
    if (id) await dispatch(deleteSpotThunk(id));
    closeModal();
  };

  return (
    <>
      <h1>Confirm Delete</h1>
      <p style={{"margin-bottom": "15px"}}>Are you sure you want to remove this spot from the listings?</p>
      <form className="loginForm">
        <button className="pink-button confirm" onClick={(e) => handleClick(e, spotId)}>
          Yes (Delete Spot)
        </button>
        <button className="grey-button reject" onClick={(e) => handleClick(e)}>
          No (Keep Spot)
        </button>
      </form>
    </>
  );
}

export default DeleteSpotModal;