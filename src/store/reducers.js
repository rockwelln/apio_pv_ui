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
  userServicePacks: [],
  groupTrunkErrorMassage: "",
  createTenantStep: "Basic",
  createTenant: {
    tenantId: "",
    type: "",
    defaultDomain: "",
    useCustomRoutingProfile: false,
    name: "",
    contact: {
      name: "",
      phoneNumber: "",
      emailAddress: ""
    },
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      stateDisplayName: "",
      postalCode: "",
      country: ""
    },
    useTenantLanguages: false,
    templateName: "",
    accessDevice: {}
  },
  templatesOfTenant: [],
  createdTenant: {},
  createGroupStep: "Basic",
  createGroup: {
    groupId: "",
    groupName: "",
    userLimit: "",
    defaultDomain: "",
    cliName: "",
    cliPhoneNumber: "",
    timeZone: "",
    contact: {
      name: "",
      phoneNumber: "",
      emailAddress: ""
    },
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      stateDisplayName: "",
      postalCode: "",
      country: ""
    },
    templateName: ""
  },
  templatesOfGroup: [],
  createdGroup: {},
  addPhoneTenantStep: "Basic",
  validatedNumbersTenant: null,
  addedNumbersToTenant: {},
  phoneDeleted: false,
  categoriesOfTemplate: [],
  category: {},
  createdUserInGroup: {},
  trunksGroups: [],
  trunkGroup: {},
  trunkGroupUsers: [],
  trunkGroupBackup: {},
  templateDetails: {},
  phoneTypes: [],
  phoneTypesDetails: {},
  applications: [],
  applicationKeys: [],
  keyValue: {},
  fetchTrunksGroupsFail: false,
  localUsers: []
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
        users: users.filter(user => user.type !== "trunk")
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
            group.name === "Group Paging" ||
            group.name === "Meet-me Conferencing" ||
            group.name === "Trunk Group"
        )
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
      const groupServicesHide = action.data.groupServices
        .filter(
          group =>
            group.name !== "Auto Attendant" &&
            group.name !== "Auto Attendant - Standard" &&
            group.name !== "Call Pickup" &&
            group.name !== "Hunt Group" &&
            group.name !== "Group Paging" &&
            group.name !== "Meet-me Conferencing" &&
            group.name !== "Trunk Group"
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
        trunkGroups: action.data,
        fetchTrunksGroupsFail: true
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
          serviceChecked: service.assigned,
          status: action.data.summary.userServices.reduce(
            (prev, userService) => {
              if (service.name === userService.name) {
                if (userService.active) {
                  prev = "Active";
                  return prev;
                } else {
                  prev = "Not active";
                  return prev;
                }
              } else return prev;
            },
            "N/A"
          )
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
    case actionType.GET_TEMPLATES_OF_TENANT: {
      return {
        ...state,
        templatesOfTenant: action.data.templates
      };
    }
    case actionType.GET_ACCESS_DEVICE_BY_NAME: {
      return {
        ...state,
        accessDevice: action.data
      };
    }
    case actionType.GET_TEMPLATES_OF_GROUP: {
      return {
        ...state,
        templatesOfGroup: action.data.templates
      };
    }
    case actionType.GET_CATEGORIES_OF_TEMPLATE: {
      return {
        ...state,
        categoriesOfTemplate: action.data.categories
      };
    }
    case actionType.GET_CATEGORY_BY_NAME: {
      return {
        ...state,
        category: action.data
      };
    }
    case actionType.GET_TRUNKS_GROUPS_BY_GROUP: {
      return {
        ...state,
        trunksGroups: action.data.trunks
      };
    }
    case actionType.GET_TRUNK_GROUP_BY_NAME: {
      return {
        ...state,
        trunkGroup: action.data
      };
    }
    case actionType.GET_USERS_BY_TRUNK_GROUP: {
      const users = action.data.users.map(user => ({
        ...user,
        type: "trunk",
        userChecked: false
      }));
      return {
        ...state,
        trunkGroupUsers: users
      };
    }
    case actionType.GET_BACKUP_BY_TRUNK_GROUP: {
      return {
        ...state,
        trunkGroupBackup: action.data
      };
    }
    case actionType.GET_TEMPLATE_DETAILS: {
      return {
        ...state,
        templateDetails: action.data
      };
    }
    case actionType.GET_PHONE_TYPES: {
      return {
        ...state,
        phoneTypes: action.data.phoneTypes
      };
    }
    case actionType.GET_PHONE_TYPES_DETAILS: {
      return {
        ...state,
        phoneTypesDetails: action.data
      };
    }
    case actionType.GET_APPLICATIONS: {
      return {
        ...state,
        applications: action.data.applications
      };
    }
    case actionType.GET_KEYS_BY_APPLICATIONS: {
      return {
        ...state,
        applicationKeys: action.data.applicationKeys
      };
    }
    case actionType.GET_VALUE_OF_KEY: {
      return {
        ...state,
        keyValue: action.data
      };
    }
    case actionType.GET_TRUNKS_GROUPS_BY_GROUP_FAIL: {
      return {
        ...state,
        fetchTrunksGroupsFail: false
      };
    }
    case actionType.GET_LOCAL_USERS: {
      return {
        ...state,
        localUsers: action.data.local_users
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
    case actionType.POST_ASSIGN_USER_SERVICES: {
      return {
        ...state
      };
    }
    case actionType.POST_ASSIGN_USER_SERVICE_PACKS: {
      return {
        ...state
      };
    }
    case actionType.POST_CREATE_TENANT: {
      return {
        ...state,
        createdTenant: action.data
      };
    }
    case actionType.POST_CREATE_GROUP: {
      return {
        ...state,
        createdGroup: action.data
      };
    }
    case actionType.POST_ADD_PHONE_NUMBERS_TO_TENANT: {
      const warning = action.data.warning;
      const added = action.data.result.filter(
        number => number.status === "added"
      );
      const rejected = action.data.result.filter(
        number => number.status === "rejected"
      );
      return {
        ...state,
        addedNumbersToTenant: {
          warning,
          added,
          rejected
        }
      };
    }
    case actionType.POST_CREATE_USER_TO_GROUP: {
      return {
        ...state,
        createdUserInGroup: action.data
      };
    }
    case actionType.POST_ADD_GROUP_SERVICES_TO_GROUP: {
      return {
        ...state
      };
    }
    case actionType.POST_ADD_KEY_TO_APPLICATION: {
      return {
        ...state
      };
    }
    case actionType.POST_CREATE_LOCAL_USER: {
      return {
        ...state
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
    case actionType.PUT_UPDATE_TRUNK_BY_GROUP_ID: {
      return {
        ...state,
        trunkGroups: action.data
      };
    }
    case actionType.PUT_UPDATE_TRUNK_BY_GROUP_ID_ERROR: {
      const groupTrunkErrorMassage =
        action.data.errors[0].details.errors["0"].summary;
      return {
        ...state,
        groupTrunkErrorMassage
      };
    }
    case actionType.PUT_UPDATE_SERVICE_PACKS_BY_GROUP_ID: {
      return {
        ...state
      };
    }
    case actionType.PUT_UPDATE_GROUP_SERVICES_BY_GROUP_ID: {
      return {
        ...state
      };
    }
    case actionType.PUT_UPDATE_TENANT_DETAILS: {
      return {
        ...state
      };
    }
    case actionType.PUT_UPDATE_KEY: {
      return {
        ...state,
        keyValue: action.data
      };
    }
    case actionType.PUT_UPDATE_TRUNK_GROUP: {
      return {
        ...state,
        trunkGroup: action.data
      };
    }
    case actionType.PUT_UPDATE_BACKUP_BY_TRUNK_GROUP: {
      return {
        ...state,
        trunkGroupBackup: action.data
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
    case actionType.DELETE_DEASSIGN_USER_SERVICES: {
      return {
        ...state
      };
    }
    case actionType.DELETE_DEASSIGN_USER_SERVICE_PACKS: {
      return {
        ...state
      };
    }
    case actionType.DELETE_PHONE_FROM_TENANT: {
      return {
        ...state,
        phoneDeleted: !state.phoneDeleted
      };
    }
    case actionType.DELETE_USER_FROM_GROUP: {
      return {
        ...state
      };
    }
    case actionType.DELETE_GROUP_FROM_TENANT: {
      return {
        ...state
      };
    }
    case actionType.DELETE_TRUNK_GROUP: {
      return {
        ...state
      };
    }
    case actionType.DELETE_KEY: {
      return {
        ...state
      };
    }
    case actionType.CLEAR_ERROR_MASSAGE: {
      return {
        ...state,
        errorMassage: "",
        groupTrunkErrorMassage: ""
      };
    }
    case actionType.CHANGE_STEP_OF_CREATE_TENANT: {
      return {
        ...state,
        createTenantStep: action.data
      };
    }
    case actionType.CHANGE_TYPE_OF_TENANT: {
      return {
        ...state,
        createTenant: {
          ...state.createTenant,
          type: action.data
        }
      };
    }
    case actionType.CHANGE_ID_OF_TENANT: {
      return {
        ...state,
        createTenant: {
          ...state.createTenant,
          tenantId: action.data
        }
      };
    }
    case actionType.CHANGE_NAME_OF_TENANT: {
      return {
        ...state,
        createTenant: {
          ...state.createTenant,
          name: action.data
        }
      };
    }
    case actionType.CHANGE_ADDRESS_OF_TENANT: {
      return {
        ...state,
        createTenant: {
          ...state.createTenant,
          address: {
            ...state.createTenant.address,
            addressLine1: action.data
          }
        }
      };
    }
    case actionType.CHANGE_ZIP_OF_TENANT: {
      return {
        ...state,
        createTenant: {
          ...state.createTenant,
          address: {
            ...state.createTenant.address,
            postalCode: action.data
          }
        }
      };
    }
    case actionType.CHANGE_CITY_OF_TENANT: {
      return {
        ...state,
        createTenant: {
          ...state.createTenant,
          address: {
            ...state.createTenant.address,
            city: action.data
          }
        }
      };
    }
    case actionType.CHANGE_TAMPLATE_OF_TENANT: {
      return {
        ...state,
        createTenant: {
          ...state.createTenant,
          templateName: action.data
        }
      };
    }
    case actionType.REFUSE_CREATE_TENANT: {
      return {
        ...state,
        createTenantStep: "Basic",
        createTenant: {
          tenantId: "",
          type: "",
          defaultDomain: "",
          useCustomRoutingProfile: false,
          name: "",
          contact: {
            name: "",
            phoneNumber: "",
            emailAddress: ""
          },
          address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            stateDisplayName: "",
            postalCode: "",
            country: ""
          },
          useTenantLanguages: false,
          templateName: ""
        }
      };
    }
    case actionType.CHANGE_DOMAIN_OF_TENANT: {
      return {
        ...state,
        createTenant: {
          ...state.createTenant,
          defaultDomain: action.data
        }
      };
    }
    case actionType.REFUSE_CREATE_GROUP: {
      return {
        ...state,
        createGroupStep: "Basic",
        createGroup: {
          groupId: "",
          groupName: "",
          userLimit: "",
          defaultDomain: "",
          cliName: "",
          cliPhoneNumber: "",
          timeZone: "",
          contact: {
            name: "",
            phoneNumber: "",
            emailAddress: ""
          },
          address: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            stateDisplayName: "",
            postalCode: "",
            country: ""
          },
          templateName: ""
        }
      };
    }
    case actionType.CHANGE_ID_OF_GROUP: {
      return {
        ...state,
        createGroup: {
          ...state.createGroup,
          groupId: action.data
        }
      };
    }
    case actionType.CHANGE_NAME_OF_GROUP: {
      return {
        ...state,
        createGroup: {
          ...state.createGroup,
          groupName: action.data
        }
      };
    }
    case actionType.CHANGE_DOMAIN_OF_GROUP: {
      return {
        ...state,
        createGroup: {
          ...state.createGroup,
          defaultDomain: action.data
        }
      };
    }
    case actionType.CHANGE_USER_LIMIT_OF_GROUP: {
      return {
        ...state,
        createGroup: {
          ...state.createGroup,
          userLimit: action.data
        }
      };
    }
    case actionType.CHANGE_ADDRESS_OF_GROUP: {
      return {
        ...state,
        createGroup: {
          ...state.createGroup,
          address: {
            ...state.createGroup.address,
            addressLine1: action.data
          }
        }
      };
    }
    case actionType.CHANGE_ZIP_OF_GROUP: {
      return {
        ...state,
        createGroup: {
          ...state.createGroup,
          address: {
            ...state.createGroup.address,
            postalCode: action.data
          }
        }
      };
    }
    case actionType.CHANGE_CITY_OF_GROUP: {
      return {
        ...state,
        createGroup: {
          ...state.createGroup,
          address: {
            ...state.createGroup.address,
            city: action.data
          }
        }
      };
    }
    case actionType.CHANGE_STEP_OF_CREATE_GROUP: {
      return {
        ...state,
        createGroupStep: action.data
      };
    }
    case actionType.CHANGE_TAMPLATE_OF_GROUP: {
      return {
        ...state,
        createGroup: {
          ...state.createGroup,
          templateName: action.data
        }
      };
    }
    case actionType.CHANGE_STEP_OF_ADD_PHONE_TENANT: {
      return {
        ...state,
        addPhoneTenantStep: action.data
      };
    }
    case actionType.REFUSE_ADD_PHONE_TO_TENANT: {
      return {
        ...state,
        addPhoneTenantStep: "Basic",
        validatedNumbersTenant: null
      };
    }
    case actionType.SAVE_VALIDATED_NUMBERS_TENANT: {
      return {
        ...state,
        validatedNumbersTenant: action.data
      };
    }
    case actionType.REMOVE_SUCCESFUL_VALID_PHONE_TENANT: {
      const indexToDelete = state.validatedNumbersTenant.ok.findIndex(
        phone => phone.line === action.data
      );
      const newArray = [...state.validatedNumbersTenant.ok];
      newArray.splice(indexToDelete, 1);
      return {
        ...state,
        validatedNumbersTenant: {
          ...state.validatedNumbersTenant,
          ok: newArray
        }
      };
    }
    default:
      return state;
  }
}

export default mainReducer;
