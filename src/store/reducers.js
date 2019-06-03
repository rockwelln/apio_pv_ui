import * as actionType from "./constants";

const initialState = {
  tenants: [],
  tenant: {},
  groups: []
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_TENANTS: {
      return {
        ...state,
        tenants: action.data.tenants
      };
    }
    case actionType.GET_TENANT: {
      return {
        ...state,
        tenant: action.data
      };
    }
    case actionType.GET_GROUPS: {
      return {
        ...state,
        groups: action.data.groups
      };
    }
    case actionType.DELETE_TENANT: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}

export default mainReducer;
