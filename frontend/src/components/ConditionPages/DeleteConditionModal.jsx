import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteConditionById } from "../../store/conditions";
import { getPatientDetails } from "../../store/patients";
import "./ConditionsView.css";

function DeleteConditionModal(props) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { conditionId, patientId } = props.state;
  const { closeModal } = useModal();

  console.log("patientId: ", patientId)

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleteConditionMsg = await dispatch(deleteConditionById(conditionId));

    if (deleteConditionMsg.message) {
      console.log("line 18 in delete modal jsx")
      dispatch(getPatientDetails(patientId)).then(closeModal);
      // .then(navigate(`/conditions/current`));
      
    }
  };

  return (
    <>
      <section id="delete-modal">
        <div id="modal-text">
          <h1>Confirm Delete</h1>
          <h3>Are you sure you want to remove this condition from this patient?</h3>
          <h5>It will also delete any treatments associated to this condition.</h5>
        </div>
        <div className="delete-buttons">
          <button
            className="delete-buttons delete-button"
            id="yes-delete"
            onClick={handleDelete}
          >
            {"Yes (Delete Condition)"}
          </button>
          <button
            className="delete-buttons"
            id="no-delete"
            onClick={closeModal}
          >
            {"No (Keep Condition)"}
          </button>
        </div>
      </section>
    </>
  );
}

export default DeleteConditionModal;
