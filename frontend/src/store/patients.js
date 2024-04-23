import { csrfFetch } from "./csrf";

// const CREATE_PATIENT = "patients/createPatient";
const LOAD_PATIENT_DETAILS = "patients/loadPatientDetails";
// const EDIT_PATIENT = "patients/editPatient";
// const LOAD_PT_CONDITIONS = 'patients/loadConditions'
// const LOAD_PT_TREATMENTS = "patients/loadTreatments"



export const loadPatientDetails = (patientDetails) => {
    return {
      type: LOAD_PATIENT_DETAILS,
      patientDetails,
    };
  };



  export const getPatientDetails = (patientId) => async (dispatch) => {
    const res = await csrfFetch(`api/patients/${patientId}`);
    if (res.ok){
        const patientDetails = await res.json();
        dispatch(loadPatientDetails(patientDetails));
    }
  }

  const patientReducer = (state = {}, action) => {
    switch (action.type){
        case LOAD_PATIENT_DETAILS: {
            return {...state, [action.patientDetails.id] : action.patientDetails}
        }
        default:
            return state;
    }
  }


  export default patientReducer;
