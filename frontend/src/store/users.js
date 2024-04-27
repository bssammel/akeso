// import { csrfFetch } from "./csrf";

// const LOAD_USER_PT_INFO = "users/loadUserPtDetails";


// export const loadUserDetails = (userDetails) => {
//     return {
//       type: userDetails,
//       userDetails,
//     };
//   };



//   export const getPatientDetails = (patientId) => async (dispatch) => {
//     const res = await csrfFetch(`api/patients/${patientId}`);
//     if (res.ok){
//         const patientDetails = await res.json();
//         dispatch(loadPtUserDetails(patientDetails));
//     }
//   }

//   const patientReducer = (state = {}, action) => {
//     switch (action.type){
//         case LOAD_USER_PT_INFO: {
//             return {...state, [action.patientDetails.id] : action.patientDetails}
//         }
//         default:
//             return state;
//     }
//   }


//   export default patientReducer;
