// import { csrfFetch } from "./csrf";

// const LOAD_USER_INFO = "patients/loadPatientDetails";


// export const loadPatientDetails = (patientDetails) => {
//     return {
//       type: LOAD_PATIENT_DETAILS,
//       patientDetails,
//     };
//   };



//   export const getPatientDetails = (patientId) => async (dispatch) => {
//     const res = await csrfFetch(`api/patients/${patientId}`);
//     if (res.ok){
//         const patientDetails = await res.json();
//         dispatch(loadPatientDetails(patientDetails));
//     }
//   }

//   const patientReducer = (state = {}, action) => {
//     switch (action.type){
//         case LOAD_PATIENT_DETAILS: {
//             return {...state, [action.patientDetails.id] : action.patientDetails}
//         }
//         default:
//             return state;
//     }
//   }


//   export default patientReducer;
