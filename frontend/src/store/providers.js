
// import { csrfFetch } from "./csrf";

// const CREATE_PROVIDER = "providers/createProvider";



// export const createProvider = (newProvider) => {
//     return {
//       type: CREATE_PROVIDER,
//       newProvider,
//     };
//   };

//   export const createNewProvider = (newProviderData, userId) => async (dispatch) => {

//     const res = await csrfFetch(`/api/providers/${providerId}`);

//     console.log(res)
//     if (res.ok){
//         const providerDetails = await res.json();
//         dispatch(loadProviderDetails(providerDetails));
//     }
//   }

//   export const getProviderUserDetails = (userId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/users/${userId}`);
//     console.log(res)
//     if (res.ok){
//         const providerUserDetails = await res.json();
//         dispatch(loadProviderUserDetails(providerUserDetails));
//     }
//   }

//   const providerReducer = (state = {}, action) => {
//     switch (action.type){
//         case LOAD_PROVIDER_DETAILS: {
//           // console.log("hitting reducer for provider details by provider")
            
//           const ptDetailObj = action.providerDetails;
//           // delete ptDetailObj.id;
//           for (const dataKey in ptDetailObj.User) {
//             if (Object.hasOwnProperty.call(ptDetailObj.User, dataKey)) {
//               const dataValue = ptDetailObj.User[dataKey];
//               if(dataKey !== "id"){
//                 ptDetailObj[dataKey] = dataValue;
//                 delete ptDetailObj.User[dataKey];
//               }
//             }
//           }
//           delete ptDetailObj.User;
//           return {...state, "providerDetails" : ptDetailObj}
//         }
//         case LOAD_PROVIDER_DETAILS_USERID: {
//           // const userProviderDetailsState = { "providerDetails" : action.providerUserDetails}
//           const ptUserDetailObj = action.providerUserDetails;
//           delete ptUserDetailObj.id;
//           // reformatting object so that the same component can be use regardless of how the provider details are fetched
//           for (const dataKey in ptUserDetailObj.Provider) {
//             if (Object.hasOwnProperty.call(ptUserDetailObj.Provider, dataKey)) {
//                 const dataValue = ptUserDetailObj.Provider[dataKey];
//                 ptUserDetailObj[dataKey] = dataValue;
//                 delete ptUserDetailObj.Provider[dataKey];
//             }
//           }
//           delete ptUserDetailObj.Provider;
//           // reformattedPtUserDtls = {...reformattedPtUserDtls, ptUserDetailObj}
//           return {
//             ...state,
//             "providerDetails" : ptUserDetailObj
//           }
//         }
//         default:
//             return state;
//     }
//   }


//   export default providerReducer;
