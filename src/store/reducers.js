import * as actionType from "./constants";

const initialState = {
  tenants: [],
  tenant: {},
  groups: [],
  phoneNumbers: [],
  admins: [],
  group: {},
  users: [],
  phoneNumbersByGroup: [],
  licensesByGroup: [],
  servicePacks: [],
  groupServices: []
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
    case actionType.GET_ADMINS: {
      return {
        ...state,
        admins: action.data.admins
      };
    }
    case actionType.GET_GROUP: {
      return {
        ...state,
        group: action.data
      };
    }
    case actionType.GET_USERS: {
      const users = action.data.users.map(user => ({
        ...user,
        type: user.inTrunkGroup ? "trunk" : "normal",
        userChecked: false
      }));
      return {
        ...state,
        users
      };
    }
    case actionType.GET_PHONE_NUMBERS_BY_GROUP_ID: {
      const phoneNumbers = action.data.assigned_numbers.map(phone => ({
        ...phone,
        rangeStart: phone.phoneNumber.includes("-")
          ? phone.phoneNumber.split(" - ").slice(0)[0]
          : phone.phoneNumber,
        rangeEnd: phone.phoneNumber.includes("-")
          ? phone.phoneNumber.split(" - ").slice(-1)[0]
          : "",
        phoneChecked: false
      }));
      return {
        ...state,
        phoneNumbersByGroup: phoneNumbers
      };
    }
    case actionType.GET_LICENSES_BY_GROUP_ID: {
      const groupServices = action.data.groupServices
        .filter(
          group =>
            group.name === "Auto Attendant" ||
            group.name === "Auto Attendant - Video" ||
            group.name === "Auto Attendant - Standard" ||
            group.name === "Call Pickup" ||
            group.name === "Find-me/Follow-me" ||
            group.name === "Group Paging" ||
            group.name === "Hunt Group" ||
            group.name === "Meet-me Conferencing" ||
            group.name === "Route Point" ||
            group.name === "Series Completion" ||
            group.name === "VoiceXML"
        )
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      return {
        ...state,
        servicePacks: action.data.servicePacks,
        groupServices
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
