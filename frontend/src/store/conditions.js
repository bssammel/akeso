import { csrfFetch } from "./csrf";

const CREATE_CONDITION = "conditions/createCondition";
const EDIT_CONDITION = "conditions/editCondition";
const DELETE_CONDITION = "conditions/deleteCondition";

export const createCondition = (newCondition) => {
  return {
    type: CREATE_CONDITION,
    newCondition
  }
}

export const editCondition = (updatedCondition) => {
  return {
    type: EDIT_CONDITION,
    updatedCondition,
  };
};


export const deleteCondition = (condition) => {
  return {
    type: DELETE_CONDITION,
    condition,
  };
};

export const addNewCondition = (newConditionData, patientId) => async (dispatch) => {
  const res = await csrfFetch(`/api/patients/conditions/${patientId}`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newConditionData),
  });
  if (!res.ok) {
    return res;
  } else if (res.ok) {
    const createdCondition = await res.json();
    dispatch(createCondition(newConditionData));
    return createdCondition;
  }
};

export const updateCondition = (conditionDataForUpdate, conditionId) => async (dispatch) => {
  console.log("delete thunk")
  console.log(conditionId)
  const res = await csrfFetch(`/api/conditions/${conditionId}/update`, {
    method: "PUT",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(conditionDataForUpdate),
  });
  if (!res.ok) {
    return res;
  } else if (res.ok) {
    const updatedCondition = await res.json();
    dispatch(editCondition(conditionDataForUpdate));
    return updatedCondition;
  }
};

export const deleteConditionById = (conditionId) => async (dispatch) => {
  // console.log("Delete thunk running")
  const res = await csrfFetch(`/api/conditions/${conditionId}/delete`, {
    method: "DELETE",
  });
  if (res.ok) {
    const deleteConditionMsg = await res.json();
    dispatch(deleteCondition(conditionId));
    return deleteConditionMsg;
  }
  return res;
};


  const conditionReducer = (state = {}, action) => {
    switch (action.type){
        case CREATE_CONDITION: {
          return {...state, "newCondition" : action.newCondition}
        }
        case EDIT_CONDITION:{
          const newState = { ...state }
          return {...newState }
        }
        case DELETE_CONDITION: {
          // const newState = { ...state }
          // let conditionArr = newState.patient.patientDetails.Conditions
          // for (let i = 0; i < conditionArr.length; i++) {
          //   const condition = conditionArr[i];
          //   if(condition.id === action.conditionId){
          //     conditionArr.splice(i, 1);
          //   }
          // }          
          return {...state }
        }
        
        default:
            return state;
    }
  }


  export default conditionReducer;
