
import { csrfFetch } from "./csrf";

const CREATE_PROVIDER = "providers/createProvider";
const LOAD_ABBV_PTS_PVDR = "providers/loadAbbvPtsPvdr"



export const createProvider = (newProvider) => {
    return {
      type: CREATE_PROVIDER,
      newProvider,
    };
  };

  export const loadAbbvPtsPvdr = (abbvPtsByPvdr) => {
    return {
      type: LOAD_ABBV_PTS_PVDR,
      abbvPtsByPvdr,
    };
  };

export const addNewProvider = (newProviderData) => async (dispatch) => {
  const res = await csrfFetch(`/api/providers`, {
      method: "POST",
      headers:{
          "Content-Type": "application/json",
      },
      body: JSON.stringify(newProviderData),
  });
  if (!res.ok) {
      return res;
  } else if (res.ok) {
    const createdPvdr = await res.json();
    dispatch(createProvider(newProviderData));
    return createdPvdr;
  }
}

export const getAbbvPtsByPvdr = () => async (dispatch) => {
  const res = await csrfFetch(`/api/providers/current/patients`);
  if(!res.ok){
    return res;
  } else if (res.ok){
    const abbvPtsByPvdr = await res.json();
    dispatch(loadAbbvPtsPvdr(abbvPtsByPvdr));
  }
}

const providerReducer = (state = {}, action) => {
  switch (action.type){
    case CREATE_PROVIDER: {
        console.log("future debugging: do we need to rename the state here and include the user fetch? thanks bye")
        return {...state, "newProvider" : action.newProvider, "providerPtArr":[]}
      }
    case LOAD_ABBV_PTS_PVDR:{
      // const newState = {...state}
      // newState["provider"]["providerPtArr"] = action.abbvPtsByPvdr;
      // return {...state, "providers": action.abbvPtsByPvdr }
      return  {...state, "providerPtArr": action.abbvPtsByPvdr}
    }
    default:
        return state;
  }
}


  export default providerReducer;
