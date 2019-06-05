import * as actionType from "./constants";

const initialState = {
  tenants: [],
  tenant: {},
  groups: [],
  phoneNumbers: []
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
    case actionType.GET_PHONE_NUMBERS: {
      const phoneNumbers = action.data.assignement_phoneNumbers.map(phone => ({
        ...phone,
        rangeStart:
          (phone.phoneNumbers && phone.phoneNumbers.split(" - ").slice(0)[0]) ||
          phone.phoneNumber ||
          "",
        rangeEnd:
          (phone.phoneNumbers &&
            phone.phoneNumbers.split(" - ").slice(-1)[0]) ||
          "",
        phoneChecked: false
      }));
      return {
        ...state,
        phoneNumbers
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
