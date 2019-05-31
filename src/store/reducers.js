import * as actionType from "./constants";

const initialState = {
  tenants: []
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_TENANTS: {
      return {
        ...state,
        tenants: action.data.tenants
      };
    }
    default:
      return state;
  }
}

export default mainReducer;
