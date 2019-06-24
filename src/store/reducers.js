import * as actionType from "./constants";

const initialState = {
  tenants: [],
  tenant: {},
  groups: [],
  phoneNumbers: [],
  adminsTenant: [],
  group: {},
  users: [],
  phoneNumbersByGroup: [],
  licensesByGroup: [],
  servicePacks: [],
  groupServices: [],
  devices: [],
  user: {},
  trunkGroups: {},
  availableNumbers: [],
  adminsGroup: [],
  errorMassage: "",
  shouldRedirect: false,
  groupAdmin: {},
  tenantAdmin: {},
  userServices: [],
  userServicePacks: []
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
        tenant: action.data,
        shouldRedirect: false,
        errorMassage: ""
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
    case actionType.GET_ADMINS_TENANT: {
      return {
        ...state,
        adminsTenant: action.data.admins
      };
    }
    case actionType.GET_GROUP: {
      return {
        ...state,
        group: action.data,
        shouldRedirect: false,
        errorMassage: ""
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
      const groupServicesShown = action.data.groupServices
        .filter(
          group =>
            group.name === "Auto Attendant" ||
            group.name === "Auto Attendant - Standard" ||
            group.name === "Call Pickup" ||
            group.name === "Hunt Group" ||
            group.name === "Meet-me Conferencing"
        )
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      const groupServicesHide = action.data.groupServices
        .filter(
          group =>
            group.name === "Auto Attendant - Video" ||
            group.name === "Find-me/Follow-me" ||
            group.name === "Group Paging" ||
            group.name === "Route Point" ||
            group.name === "Series Completion" ||
            group.name === "VoiceXML"
        )
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      const groupServices = [...groupServicesShown, ...groupServicesHide];
      return {
        ...state,
        servicePacks: action.data.servicePacks,
        groupServices: {
          groups: groupServices,
          countShown: groupServicesShown.length
        }
      };
    }
    case actionType.GET_DEVICES_BY_GROUP_ID: {
      return {
        ...state,
        devices: action.data.access_devices
      };
    }
    case actionType.GET_USER: {
      return {
        ...state,
        user: action.data
      };
    }
    case actionType.GET_TRUNK_BY_GROUP_ID: {
      return {
        ...state,
        trunkGroups: action.data
      };
    }
    case actionType.GET_AVAILABLE_NUMBERS_BY_GROUP_ID: {
      return {
        ...state,
        availableNumbers: action.data.available_numbers
      };
    }
    case actionType.GET_ADMINS_GROUP: {
      return {
        ...state,
        adminsGroup: action.data.admins
      };
    }
    case actionType.GET_GROUP_ADMIN_BY_ADMIN_ID: {
      return {
        ...state,
        groupAdmin: action.data
      };
    }
    case actionType.GET_TENANT_ADMIN_BY_ADMIN_ID: {
      return {
        ...state,
        tenantAdmin: action.data
      };
    }
    case actionType.GET_USER_SERVICES_BY_USER_ID: {
      const userServices = action.data.assignementStatus.services.map(
        service => ({
          ...service,
          serviceChecked: service.assigned
        })
      );
      const userServicePacks = action.data.assignementStatus.servicePacks.map(
        service => ({
          ...service,
          serviceChecked: service.assigned
        })
      );
      return {
        ...state,
        userServices,
        userServicePacks
      };
    }
    case actionType.POST_CREATE_GROUP_ADMIN: {
      return {
        ...state,
        shouldRedirect: true
      };
    }
    case actionType.POST_CREATE_GROUP_ADMIN_ERROR: {
      const errorMassage = action.error.errors[0].details.errors["0"].summary;
      return {
        ...state,
        errorMassage
      };
    }
    case actionType.POST_CREATE_TENANT_ADMIN: {
      return {
        ...state,
        shouldRedirect: true
      };
    }
    case actionType.POST_CREATE_TENANT_ADMIN_ERROR: {
      const errorMassage = action.error.errors[0].details.errors["0"].summary;
      return {
        ...state,
        errorMassage
      };
    }
    case actionType.PUT_UPDATE_USER: {
      return {
        ...state,
        user: action.data
      };
    }
    case actionType.PUT_UPDATE_GROUP_DETAILS: {
      return {
        ...state,
        group: action.data
      };
    }
    case actionType.PUT_UPDATE_GROUP_ADMIN: {
      return {
        ...state,
        groupAdmin: action.data
      };
    }
    case actionType.PUT_UPDATE_TENANT_ADMIN: {
      return {
        ...state,
        tenantAdmin: action.data
      };
    }
    case actionType.DELETE_TENANT: {
      return {
        ...state
      };
    }
    case actionType.DELETE_TENANT_ADMIN: {
      return {
        ...state
      };
    }
    case actionType.DELETE_GROUP_DEVICE: {
      return {
        ...state
      };
    }
    case actionType.DELETE_GROUP_ADMIN: {
      return {
        ...state
      };
    }
    case actionType.CLEAR_ERROR_MASSAGE: {
      return {
        ...state,
        errorMassage: ""
      };
    }
    default:
      return state;
  }
}

export default mainReducer;
