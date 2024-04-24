import { csrfFetch } from "./csrf";

// const CREATE_PATIENT = "patients/createPatient";
const LOAD_PATIENT_DETAILS = "patients/loadPatientDetails";
const LOAD_PATIENT_DETAILS_USERID = "patients/loadPatientUserDetails"
// const EDIT_PATIENT = "patients/editPatient";
// const LOAD_PT_CONDITIONS = 'patients/loadConditions'
// const LOAD_PT_TREATMENTS = "patients/loadTreatments"



export const loadPatientDetails = (patientDetails) => {
    return {
      type: LOAD_PATIENT_DETAILS,
      patientDetails,
    };
  };

  export const loadPatientUserDetails = (patientUserDetails) => {
    // let patientId = patientUserDetails.id;
    return {
      type: LOAD_PATIENT_DETAILS_USERID,
      patientUserDetails,
    };
  };




  export const getPatientDetails = (patientId) => async (dispatch) => {
    const res = await csrfFetch(`api/patients/${patientId}`);
    if (res.ok){
        const patientDetails = await res.json();
        dispatch(loadPatientDetails(patientDetails));
    }
  }

  export const getPatientUserDetails = (userId) => async (dispatch) => {
    const res = await csrfFetch(`api/users/${userId}`);
    if (res.ok){
        const patientUserDetails = await res.json();
        dispatch(loadPatientUserDetails(patientUserDetails));
    }
  }

  const patientReducer = (state = {}, action) => {
    switch (action.type){
        case LOAD_PATIENT_DETAILS: {
            return {...state, "patientDetails" : action.patientDetails}
        }
        case LOAD_PATIENT_DETAILS_USERID: {
          // const userPatientDetailsState = { "patientDetails" : action.patientUserDetails}
          const ptUserDetailObj = action.patientUserDetails;
          delete ptUserDetailObj.id;
          // reformatting object so that the same component can be use regardless of how the patient details are fetched
          for (const dataKey in ptUserDetailObj.Patient) {
            if (Object.hasOwnProperty.call(ptUserDetailObj.Patient, dataKey)) {
                const dataValue = ptUserDetailObj.Patient[dataKey];
                ptUserDetailObj[dataKey] = dataValue;
                delete ptUserDetailObj.Patient[dataKey];
            }
          }
          delete ptUserDetailObj.Patient;
          // reformattedPtUserDtls = {...reformattedPtUserDtls, ptUserDetailObj}
          return {
            ...state,
            "patientDetails" : ptUserDetailObj
          }
        }
        default:
            return state;
    }
  }


  export default patientReducer;
