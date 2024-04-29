import { csrfFetch } from "./csrf";

const CREATE_TREATMENT = "treatments/createTreatment";
const EDIT_TREATMENT = "treatments/editTreatment";
const DELETE_TREATMENT = "treatments/deleteTreatment";

export const createTreatment = (newTreatment) => {
  return {
    type: CREATE_TREATMENT,
    newTreatment
  }
}

export const editTreatment = (updatedTreatment) => {
  return {
    type: EDIT_TREATMENT,
    updatedTreatment,
  };
};


export const deleteTreatment = (treatment) => {
  return {
    type: DELETE_TREATMENT,
    treatment,
  };
};

export const addNewTreatment = (newTreatmentData, conditionId) => async (dispatch) => {
  const res = await csrfFetch(`/api/conditions/${conditionId}/treatments`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTreatmentData),
  });
  if (!res.ok) {
    return res;
  } else if (res.ok) {
    const createdTreatment = await res.json();
    dispatch(createTreatment(newTreatmentData));
    return createdTreatment;
  }
};

export const updateTreatment = (treatmentDataForUpdate, treatmentId) => async (dispatch) => {
  console.log("delete thunk")
  console.log(treatmentId)
  const res = await csrfFetch(`/api/treatments/${treatmentId}/update`, {
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(treatmentDataForUpdate),
  });
  if (!res.ok) {
    return res;
  } else if (res.ok) {
    const updatedTreatment = await res.json();
    dispatch(editTreatment(treatmentDataForUpdate));
    return updatedTreatment;
  }
};

export const deleteTreatmentById = (treatmentId) => async (dispatch) => {
  // console.log("Delete thunk running")
  const res = await csrfFetch(`/api/treatments/${treatmentId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const deleteTreatmentMsg = await res.json();
    dispatch(deleteTreatment(treatmentId));
    return deleteTreatmentMsg;
  }
  return res;
};


  const treatmentReducer = (state = {}, action) => {
    switch (action.type){
        case CREATE_TREATMENT: {
          return {...state, "newTreatment" : action.newTreatment}
        }
        case EDIT_TREATMENT:{
          const newState = { ...state }
          return {...newState }
        }
        case DELETE_TREATMENT: {         
          return {...state }
        }
        
        default:
            return state;
    }
  }


  export default treatmentReducer;
