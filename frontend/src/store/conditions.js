import { csrfFetch } from "./csrf";

const CREATE_CONDITION = "conditions/createCondition";
// const LOAD_CONDITION_DETAILS = "conditions/loadConditionDetails";
// const LOAD_CONDITION_DETAILS_USERID = "conditions/loadConditionUserDetails"


export const createCondition = (newCondition) => {
  return {
    type: CREATE_CONDITION,
    newCondition
  }
}

// export const loadConditionDetails = (conditionDetails) => {
//     return {
//       type: LOAD_CONDITION_DETAILS,
//       conditionDetails,
//     };
//   };

//   export const loadConditionUserDetails = (conditionUserDetails) => {
//     // let conditionId = conditionUserDetails.id;
//     return {
//       type: LOAD_CONDITION_DETAILS_USERID,
//       conditionUserDetails,
//     };
//   };


export const addNewCondition = (newConditionData) => async (dispatch) =>{
  const res = await csrfFetch(`/api/conditions`, {
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

//   export const getConditionDetails = (conditionId) => async (dispatch) => {

//     // console.log("####################################")


//     const res = await csrfFetch(`/api/conditions/${conditionId}`);

//     // console.log("####################################")
//     // console.log(res)
//     if (!res.ok) {
//       return res;
//     } else if (res.ok){
//         const conditionDetails = await res.json();
//         dispatch(loadConditionDetails(conditionDetails));
//     }
//   }

//   export const getConditionUserDetails = (userId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/users/${userId}`);
//     // console.log(res)
//     if (!res.ok) {
//       return res;
//     } else if (res.ok){
//         const conditionUserDetails = await res.json();
//         dispatch(loadConditionUserDetails(conditionUserDetails));
//     }
//   }

  const conditionReducer = (state = {}, action) => {
    switch (action.type){
        case CREATE_CONDITION: {
          return {...state, "newCondition" : action.newCondition}
        }
        // case LOAD_CONDITION_DETAILS: {
        //   const ptDetailObj = action.conditionDetails;
        //   for (const dataKey in ptDetailObj.User) {
        //     if (Object.hasOwnProperty.call(ptDetailObj.User, dataKey)) {
        //       const dataValue = ptDetailObj.User[dataKey];
        //       if(dataKey !== "id"){
        //         ptDetailObj[dataKey] = dataValue;
        //         delete ptDetailObj.User[dataKey];
        //       }
        //     }
        //   }
        //   delete ptDetailObj.User;
        //   return {...state, "conditionDetails" : ptDetailObj}
        // }
        // case LOAD_CONDITION_DETAILS_USERID: {
        //   const ptUserDetailObj = action.conditionUserDetails;
        //   delete ptUserDetailObj.id;
        //   // reformatting object so that the same component can be use regardless of how the condition details are fetched
        //   for (const dataKey in ptUserDetailObj.Condition) {
        //     if (Object.hasOwnProperty.call(ptUserDetailObj.Condition, dataKey)) {
        //         const dataValue = ptUserDetailObj.Condition[dataKey];
        //         ptUserDetailObj[dataKey] = dataValue;
        //         delete ptUserDetailObj.Condition[dataKey];
        //     }
        //   }
        //   delete ptUserDetailObj.Condition;
        //   return {
        //     ...state,
        //     "conditionDetails" : ptUserDetailObj
        //   }
        // }
        default:
            return state;
    }
  }


  export default conditionReducer;
