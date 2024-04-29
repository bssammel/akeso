import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useModal } from '../../context/Modal';
import { addNewTreatment } from '../../store/treatments';
import { getPatientDetails } from '../../store/patients';

function AddTreatmentModal(props) {
  const dispatch = useDispatch();
  const { conditionArr } = props.state;

  let ptDetailsObj = useSelector((state) => state.patient.patientDetails ? state.patient.patientDetails : null)

  let patientId = useSelector((state) => state.patient.patientDetails.id ? state.patient.patientDetails.id : 0)

  if(ptDetailsObj) patientId = parseInt(ptDetailsObj.id)


  const [name, setName] = useState("");
//   const [showDosage, setShowDosage] = useState(false);
  const [conditionIdForTtmnt, setConditionIdForTtmnt] = useState(null)
  const [dosageNum, setDosageNum] = useState(null);
  const [dosageUnit, setDosageUnit] = useState(null);
  const [frequencyQuantity, setFrequencyQuantity] = useState(null);
  const [frequencyPeriod, setFrequencyPeriod] = useState(null);
//   hour day, week, month, year
// long term other option
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  let dosage;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if(dosageNum && dosageUnit) dosage = dosageNum + " " + dosageUnit;

    const conditionId = conditionIdForTtmnt;

    return await dispatch(addNewTreatment({
        name, dosage, frequencyQuantity, frequencyPeriod
    }, conditionId))
    .then(() => dispatch(getPatientDetails(patientId)))
    .then(closeModal)
    .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  const frequencyPeriodArr = ["--", "hour", "day", "week", "month", "year", "as needed"]
  const dosageUnits = ["--","mg", "mcg", "IU", "g", "mL"]
//   const conditionIdArr = conditionArr.map((conditionObj) => conditionObj.id)
//   const conditionNameArr = conditionArr.map((conditionObj) => conditionObj.name)

  return (
    <>
      <h1>Add Treatment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Treatment Name
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
        {/* <label>
          Treatment has dosage
          <input
            type="checkbox"
            value={showDosage}
            onChange={setShowDosage(!showDosage)}
          />
        </label> */}
        <label>
          Primarily Treats
          <select
          name='condition' id='condition' className='select'
          value={conditionIdForTtmnt}
          onChange={(e) => setConditionIdForTtmnt(e.target.value)}
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
            type="number"
            value={dosageNum}
            onChange={(e) => setDosageNum(e.target.value)}
          />
          {errors.dosageNum && <p>{errors.dosageNum}</p>}
          <select
          name='dosageUnit' id='dosageUnit' className='select'
          value={dosageUnit}
          onChange={(e) => setDosageUnit(e.target.value)}
          >
            {dosageUnits.map((dosageUnit) => (
                  <option key={dosageUnit} value={dosageUnit}>{dosageUnit}
                  </option>))}
          </select>
          {errors.dosageUnit && <p>{errors.dosageUnit}</p>}
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
          {/* {errors.frequencyQuantity && <p>{errors.frequencyQuantity}</p>} */}
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
          
        <div className='submit'><button type="submit">Add Treatment</button></div>
        </form>
    </>
  );
}

export default AddTreatmentModal;
