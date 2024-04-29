// leave the dosage as a string, don't split it will just be weird


import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useModal } from '../../context/Modal';
import { updateTreatment } from '../../store/treatments';
import { getPatientDetails } from '../../store/patients';

function EditTreatmentModal(props) {
  const dispatch = useDispatch();
  const {treatmentId, originalName, originalDosage, originalFrequencyQuantity, originalFrequencyPeriod, conditionArr } = props.state;

  let ptDetailsObj = useSelector((state) => state.patient.patientDetails ? state.patient.patientDetails : null)

  let patientId = useSelector((state) => state.patient.patientDetails.id ? state.patient.patientDetails.id : 0)


  if(ptDetailsObj) patientId = parseInt(ptDetailsObj.id)


  const [name, setName] = useState(originalName);
const [conditionIdForTtmnt, setConditionIdForTtmnt] = useState(null)


  const [dosage, setDosage] = useState(originalDosage);
    const [frequencyQuantity, setFrequencyQuantity] = useState(originalFrequencyQuantity);
    const [frequencyPeriod, setFrequencyPeriod] = useState(originalFrequencyPeriod);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();




  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    // const newConditionData = { name, description, status};
    const conditionId = conditionIdForTtmnt;

    return dispatch(updateTreatment({
        name, dosage, frequencyQuantity, frequencyPeriod, conditionId
    }, treatmentId))
    .then(() => dispatch(getPatientDetails(patientId)))
    .then(closeModal)
    .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

    const frequencyPeriodArr = ["--", "hour", "day", "week", "month", "year", "as needed"]
    // const conditionIdArr = conditionArr.map((conditionObj) => conditionObj.id)
    // const conditionNameArr = conditionArr.map((conditionObj) => conditionObj.name)

  return (
    <>
      <h1>Edit Treatment</h1>
      <form onSubmit={handleSubmit}>
        <label>
        Treatment Name (required)
          <input
            type="text"
            value={name}
            minLength="1" 
            maxLength="75"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
            Primarily Treats
            <select
            name='condition' id='condition' className='select'
            value={conditionIdForTtmnt}
            onChange={(e) => {setConditionIdForTtmnt(e.target.value)}
            }
            required
            > 
            <option value="">Please select the closest condition</option>
            {conditionArr.map((conditionObj) => (
                    <option key={conditionObj.id} value={conditionObj.id}>{conditionObj.name}
                    </option>))}
            </select>
            </label>
            <label id="dosage">
                Dosage
                <div id="dosage-fields">
                <input id='dosage-num'
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                />
                {errors.dosage && <p>{errors.dosage}</p>}
                </div>
            </label>
            <label>
                Frequency
                <div id='frequency-fields'>
                <input
                type="number"
                value={frequencyQuantity}
                onChange={(e) => setFrequencyQuantity(e.target.value)}
                />
                <p>times per</p>
                <select
                name='frequencyPeriod' id='frequencyPeriod' className='select'
                value={frequencyPeriod}
                onChange={(e) => setFrequencyPeriod(e.target.value)}
                >
                {frequencyPeriodArr.map((frequencyPeriod) => (
                        <option key={frequencyPeriod} value={frequencyPeriod}>{frequencyPeriod}
                        </option>))}
                </select>
                {errors.dosageUnit && <p>{errors.dosageUnit}</p>}
                </div>
            </label>
        <div className='submit'><button type="submit">Submit Edits</button></div>
        </form>
    </>
  );
}

export default EditTreatmentModal;
