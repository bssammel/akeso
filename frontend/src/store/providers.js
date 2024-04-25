
import { csrfFetch } from "./csrf";

const CREATE_PROVIDER = "providers/createProvider";



export const createProvider = (newProvider) => {
    return {
      type: CREATE_PROVIDER,
      newProvider,
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

  

  const providerReducer = (state = {}, action) => {
    switch (action.type){
        case CREATE_PROVIDER: {
            console.log("future debugging: do we need to rename the state here and include the user fetch? thanks bye")
            return {...state, "newProvider" : action.newProvider}
          }
        default:
            return state;
    }
  }


  export default providerReducer;
