import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteTreatmentById } from "../../store/treatments";
import { getPatientDetails } from "../../store/patients";
import "./TreatmentsView.css";

function DeleteTreatmentModal(props) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { treatmentId, patientId } = props.state;
  const { closeModal } = useModal();


  const handleDelete = async (e) => {
    e.preventDefault();
    const deleteTreatmentMsg = await dispatch(deleteTreatmentById(treatmentId));

    if (deleteTreatmentMsg.message) {
      dispatch(getPatientDetails(patientId)).then(closeModal);      
    }
  };

  return (
    <>
      <section id="delete-modal">
        <div id="modal-text">
          <h1>Confirm Delete</h1>
          <h3>Are you sure you want to remove this treatment from this patient?</h3>
        </div>
        <div className="delete-buttons">
          <button
            className="delete-buttons delete-button"
            id="yes-delete"
            onClick={handleDelete}
          >
            {"Yes (Delete Treatment)"}
          </button>
          <button
            className="delete-buttons"
            id="no-delete"
            onClick={closeModal}
          >
            {"No (Keep Treatment)"}
          </button>
        </div>
      </section>
    </>
  );
}

export default DeleteTreatmentModal;
