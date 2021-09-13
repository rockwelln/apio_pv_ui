import * as actionType from "./constants";
import defaultConfig from "../config.json";
import deepMerge from "../components/deepMerge";

const initialState = {
  tenants: [],
  tenant: {},
  groups: [],
  group: {},
  phoneNumbersByGroup: [],
  trunkGroups: {},
  createdTenant: {},
  createdGroup: {},
  addedNumbersToGroup: {},
  iads: { iads: [], praByIad: {}, iadType: "None" },
  config: {
    tenant: {
      group: { iad: { iadType: [] } },
    },
    iad_reboot: {
      iadType: [],
    },
  },
  createdIad: {},
  iad: {},
  iadForUpdate: {},
  enterpriseTrunks: [],
  iadsByTrunk: {},
  phoneNumbersByGroupNotTP: [],
  tenantEnterpriseTrunks: [],
  listOfIads: { main_iads_available: [], other_iads_available: [] },
  numbersByEnterpriseTrunk: { enterprise_trunk_numbers: [], group_numbers: [] },
  emergencyRouting: [],
  reconciliationTeams: [],
  createdReconciliationTeam: [],
  team: { users: [] },
  anomalies: [],
  anomaly: {},
  iadTimer: [],
  searchedIADs: [],
  transferedIADs: [],
  validationGroup: {},
  validationGroupError: "",
  iadSpecialCustomTags: [],
  statistics: {},
  numbersAsCSV: { content: "" },
  addedNumbers: {
    warning: [],
    added: [],
    rejected: [],
  },
  certifiedPBX: [],
};

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_IADS: {
      const iadWithType = action.data.iads.map((el) => {
        const iadType = state.config.tenant.group.iad.iadType.filter(
          (type) => type.value === el.iadType
        );
        return { ...el, type: iadType[0].label };
      });
      return {
        ...state,
        iads: {
          ...action.data,
          iads: iadWithType,
          iadType: action.data.iads.length
            ? action.data.iads[0].iadType
            : "None",
        },
      };
    }
    case actionType.GET_TENANTS: {
      return {
        ...state,
        tenants: action.data.tenants,
      };
    }
    case actionType.GET_TENANT: {
      return {
        ...state,
        tenant: action.data,
        shouldRedirect: false,
      };
    }
    case actionType.GET_GROUPS: {
      return {
        ...state,
        groups: action.data.groups,
      };
    }
    case actionType.GET_GROUP: {
      return {
        ...state,
        group: action.data,
        shouldRedirect: false,
      };
    }
    case actionType.GET_PHONE_NUMBERS_BY_GROUP_ID: {
      const phoneNumbers = action.data.numbers
        .map((phone) => ({
          ...phone,
          rangeStart: phone.phoneNumber.includes("-")
            ? phone.phoneNumber.split(" - ").slice(0)[0]
            : phone.phoneNumber,
          phoneChecked: false,
          preActive: phone.status === "preActive" ? true : false,
          active: phone.status === "active" ? true : false,
          isChanged: false,
        }))
        .sort((a, b) => {
          if (a.rangeStart < b.rangeStart) return -1;
          if (a.rangeStart > b.rangeStart) return 1;
          return 0;
        });
      let count = 1;
      const phoneNumbersWithRange = phoneNumbers.reduce(
        (arrPN, phone, index) => {
          if (
            arrPN.length &&
            arrPN[arrPN.length - 1].prevNum - phone.phoneNumber === -1 &&
            arrPN[arrPN.length - 1].main_number === phone.main_number &&
            arrPN[arrPN.length - 1].maintenance_number ===
              phone.maintenance_number &&
            arrPN[arrPN.length - 1].preActive === phone.preActive &&
            arrPN[arrPN.length - 1].active === phone.active &&
            arrPN[arrPN.length - 1].zipCode === phone.zipCode &&
            count !== 100
          ) {
            if (count === 1) {
              arrPN[arrPN.length - 1] = {
                ...phone,
                rangeStart: phoneNumbers[index - 1].rangeStart,
                rangeEnd: phone.phoneNumber,
                prevNum: phone.phoneNumber,
                phoneNumbers: [],
              };

              arrPN[arrPN.length - 1].phoneNumbers.unshift({
                ...phoneNumbers[index - 1],
                inRange: true,
              });

              arrPN[arrPN.length - 1].phoneNumbers.push({
                ...phone,
                inRange: true,
              });
            } else {
              arrPN[arrPN.length - 1] = {
                ...arrPN[arrPN.length - 1],
                prevNum: phone.phoneNumber,
                rangeEnd: phone.phoneNumber,
              };
              arrPN[arrPN.length - 1].phoneNumbers.push({
                ...phone,
                inRange: true,
              });
            }
            count++;
            arrPN = [...arrPN];
          } else {
            count = 1;
            arrPN = [...arrPN, { ...phone, prevNum: phone.phoneNumber }];
          }
          return arrPN;
        },
        []
      );
      return {
        ...state,
        phoneNumbersByGroup: phoneNumbersWithRange,
        destinationNumbers: phoneNumbers,
      };
    }
    case actionType.GET_PHONE_NUMBERS_WITH_REFRESH_DB: {
      const phoneNumbers = action.data.numbers
        .map((phone) => ({
          ...phone,
          rangeStart: phone.phoneNumber.includes("-")
            ? phone.phoneNumber.split(" - ").slice(0)[0]
            : phone.phoneNumber,
          phoneChecked: false,
          preActive: phone.status === "preActive" ? true : false,
          active: phone.status === "active" ? true : false,
          isChanged: false,
        }))
        .sort((a, b) => {
          if (a.rangeStart < b.rangeStart) return -1;
          if (a.rangeStart > b.rangeStart) return 1;
          return 0;
        });
      let count = 1;
      const phoneNumbersWithRange = phoneNumbers.reduce(
        (arrPN, phone, index) => {
          if (
            arrPN.length &&
            arrPN[arrPN.length - 1].prevNum - phone.phoneNumber === -1 &&
            arrPN[arrPN.length - 1].main_number === phone.main_number &&
            arrPN[arrPN.length - 1].maintenance_number ===
              phone.maintenance_number &&
            arrPN[arrPN.length - 1].preActive === phone.preActive &&
            arrPN[arrPN.length - 1].active === phone.active &&
            arrPN[arrPN.length - 1].zipCode === phone.zipCode &&
            count !== 100
          ) {
            if (count === 1) {
              arrPN[arrPN.length - 1] = {
                ...phone,
                rangeStart: phoneNumbers[index - 1].rangeStart,
                rangeEnd: phone.phoneNumber,
                prevNum: phone.phoneNumber,
                phoneNumbers: [],
              };

              arrPN[arrPN.length - 1].phoneNumbers.unshift({
                ...phoneNumbers[index - 1],
                inRange: true,
              });

              arrPN[arrPN.length - 1].phoneNumbers.push({
                ...phone,
                inRange: true,
              });
            } else {
              arrPN[arrPN.length - 1] = {
                ...arrPN[arrPN.length - 1],
                prevNum: phone.phoneNumber,
                rangeEnd: phone.phoneNumber,
              };
              arrPN[arrPN.length - 1].phoneNumbers.push({
                ...phone,
                inRange: true,
              });
            }
            count++;
            arrPN = [...arrPN];
          } else {
            count = 1;
            arrPN = [...arrPN, { ...phone, prevNum: phone.phoneNumber }];
          }
          return arrPN;
        },
        []
      );
      return {
        ...state,
        phoneNumbersByGroup: phoneNumbersWithRange,
      };
    }
    case actionType.GET_TRUNK_BY_GROUP_ID: {
      return {
        ...state,
        trunkGroups: action.data,
      };
    }
    case actionType.GET_CONFIG: {
      return {
        ...state,
        config:
          deepMerge({ ...defaultConfig }, { ...action.data }) ||
          action.data ||
          defaultConfig,
      };
    }
    case actionType.GET_IAD_BY_ID: {
      return {
        ...state,
        iad: action.data,
      };
    }
    case actionType.GET_ENTERPRISE_TRUNKS_BY_GROUP: {
      return {
        ...state,
        enterpriseTrunks: action.data.enterpriseTrunks,
      };
    }
    case actionType.GET_IADS_BY_TRUNK: {
      const iadFromSite = [
        ...action.data.iads_from_main_site.map((el) => ({
          ...el,
          checked: true,
        })),
        ...action.data.main_iads_available.map((el) => ({
          ...el,
          checked: false,
        })),
      ];
      const iadNotFromSite = [
        ...action.data.iads_from_other_sites.map((el) => ({
          ...el,
          checked: true,
        })),
        ...action.data.other_iads_available.map((el) => ({
          ...el,
          checked: false,
        })),
      ];
      return {
        ...state,
        iadsByTrunk: { ...action.data, iadFromSite, iadNotFromSite },
      };
    }
    case actionType.GET_PHONE_NUMBERS_BY_GROUP_ID_NOT_TP: {
      return {
        ...state,
        phoneNumbersByGroupNotTP: action.data.numbers,
      };
    }
    case actionType.GET_ENTERPRISE_TRUNKS_BY_TENANT: {
      const colors = [
        "#fcece0",
        "#fff8e4",
        "#f0f7ed",
        "e6e3da",
        "e612da",
        "#21f8e4",
        "#fcece0",
        "#fff8e4",
        "#f0f7ed",
        "e6e3da",
        "e612da",
        "#21f8e4",
      ];
      let tenantEnterpriseTrunks = [];
      Object.keys(action.data.enterpriseTrunks).map((trunk, index) => {
        if (Array.isArray(action.data.enterpriseTrunks[trunk])) {
          //if (action.data.enterpriseTrunks[trunk].length) {
          action.data.enterpriseTrunks[trunk].map((el) => {
            tenantEnterpriseTrunks.push({
              ...el,
              color: colors[index],
              entTrunk: trunk,
            });
          });
          // } else {
          //   tenantEnterpriseTrunks.push({
          //     color: colors[index],
          //     entTrunk: trunk
          //   });
          //}
        }
        return 0;
      });
      return {
        ...state,
        tenantEnterpriseTrunks,
      };
    }
    case actionType.GET_NUMBERS_BY_ENTERPRISE_TRUNK: {
      return {
        ...state,
        numbersByEnterpriseTrunk: action.data,
      };
    }
    case actionType.GET_LIST_OF_IADS: {
      return {
        ...state,
        listOfIads: action.data,
      };
    }
    case actionType.GET_RECONCILIATION_TEAMS: {
      return {
        ...state,
        reconciliationTeams: action.data.teams,
      };
    }
    case actionType.GET_TEAM: {
      return {
        ...state,
        team: action.data,
      };
    }
    case actionType.GET_ANOMALIES: {
      // const event = state.config.reconciliation.anomaly.event.find(
      //   evnt => evnt.value === this.props.anomalies.anomaly_event
      // );
      // const status = state.config.reconciliation.anomaly.status.find(
      //   evnt => evnt.value === this.props.anomalies.anomaly_status
      // );
      // const result = state.config.reconciliation.anomaly.result.find(
      //   evnt => evnt.value === this.props.anomalies.result
      // );
      let anomalies = [];
      action.data.anomalies.forEach((anomaly) => {
        const event = state.config.reconciliation.anomaly.event.find(
          (evnt) => evnt.value === anomaly.anomaly_event
        );
        const status = state.config.reconciliation.anomaly.status.find(
          (evnt) => evnt.value === anomaly.anomaly_status
        );
        const result = state.config.reconciliation.anomaly.result.find(
          (evnt) => evnt.value === anomaly.result
        );
        const newAnomaly = {
          ...anomaly,
          event: typeof event === "object" ? event.label : "",
          status: typeof status === "object" ? status.label : "",
          resultText: typeof result === "object" ? result.label : "",
        };
        anomalies.push(newAnomaly);
      });
      return {
        ...state,
        anomalies,
      };
    }
    case actionType.GET_ANOMALY: {
      return {
        ...state,
        anomaly: action.data,
      };
    }
    case actionType.GET_TIMER_FOR_IAD: {
      return {
        ...state,
        iadTimer: action.data.timers,
      };
    }
    case actionType.GET_SEARCH_IADS: {
      const searchedIADs = action.data.results.map((iad) => ({
        iad: iad,
        checked: true,
      }));
      return {
        ...state,
        searchedIADs,
      };
    }
    case actionType.GET_VALIDATE_GROUP_UPDATE_SUCCESS: {
      return {
        ...state,
        validationGroup: action.data,
      };
    }
    case actionType.GET_VALIDATE_GROUP_UPDATE_ERROR: {
      return {
        ...state,
        validationGroupError: action.data.errors[0].details.reason,
      };
    }
    case actionType.GET_IAD_SPECIAL_CUSTOM_TAGS: {
      return {
        ...state,
        iadSpecialCustomTagsComment: action.data.comment,
        iadSpecialCustomTags: action.data.customTags,
      };
    }
    case actionType.GET_STATISTICS: {
      const { _record_internal_id, ...statistics } = action.data;
      return {
        ...state,
        statistics,
      };
    }
    case actionType.GET_DOWNLOAD_NUMBERS_AS_CSV: {
      return {
        ...state,
        numbersAsCSV: action.data,
      };
    }
    case actionType.GET_CERTIFIED_PBX: {
      return {
        ...state,
        certifiedPBX: [
          ...action.data.certifiedPBX,
          {
            brand: "Panasonic NS1000",
            version: "UNKNOWN",
            iad_type: "OneAccess",
            certified: true,
            cfu: "OK",
            cfb: "OK",
            cfnr: "OK",
            cfdiversion: "OK",
            cf302movetemp: "NOK",
            clip: "OK",
            clir: "OK",
            colp: "OK",
            colr: "OK",
            weergavenr: "OK",
            signaal2deoproep: "OK",
            gesprekmet3: "OK",
            calltransfer: "OK",
            blindcalltransfer: "OK",
            blindcalltransferwithrefer: "OK",
            aoc: "NA",
            fax: "OK",
          },
          {
            brand: "Aastra 415",
            version: "UNKNOWN",
            iad_type: "OneAccess",
            certified: true,
            cfu: "OK",
            cfb: "OK",
            cfnr: "OK",
            cfdiversion: "OK",
            cf302movetemp: "OK",
            clip: "OK",
            clir: "OK",
            colp: "OK",
            colr: "OK",
            weergavenr: "OK",
            signaal2deoproep: "OK",
            gesprekmet3: "OK",
            calltransfer: "OK",
            blindcalltransfer: "OK",
            blindcalltransferwithrefer: "OK",
            aoc: "NA",
            fax: "OK",
          },
          {
            brand: "Alcatel",
            version: "OmniPCX Office",
            iad_type: "AudioCodes",
            certified: true,
            cfu: "OK",
            cfb: "NA",
            cfnr: "NA",
            cfdiversion: "NA",
            cf302movetemp: "NA",
            clip: "OK",
            clir: "OK",
            colp: "OK",
            colr: "OK",
            weergavenr: "NA",
            signaal2deoproep: "NOK",
            gesprekmet3: "OK",
            calltransfer: "OK",
            blindcalltransfer: "OK",
            blindcalltransferwithrefer: "NA",
            aoc: "NA",
            fax: "NA",
          },
        ],
      };
    }
    case actionType.POST_CREATE_IAD: {
      return {
        ...state,
        createdIad: action.data,
      };
    }
    case actionType.POST_CREATE_TENANT: {
      return {
        ...state,
        createdTenant: action.data,
      };
    }
    case actionType.POST_CREATE_GROUP: {
      return {
        ...state,
        createdGroup: action.data,
      };
    }
    case actionType.POST_ASSIGN_PHONE_NUMBERS_TO_GROUP: {
      const warning = action.data.warning;
      const added = action.data.result.filter(
        (number) => number.status === "added"
      );
      const rejected = action.data.result.filter(
        (number) => number.status === "rejected"
      );
      return {
        ...state,
        addedNumbers: {
          warning,
          added,
          rejected,
        },
      };
    }
    case actionType.POST_CREATE_ENTERPRISE_TRUNK: {
      return {
        ...state,
      };
    }
    case actionType.POST_EMERGENCY_ROUTING: {
      return {
        ...state,
        emergencyRouting: action.data.results,
      };
    }
    case actionType.POST_CREATE_RECONCILIATION_TEAMS: {
      return {
        ...state,
        createdReconciliationTeam: action.data,
      };
    }
    case actionType.POST_ADD_IAD_SPECIAL_CUSTOM_TAGS: {
      return {
        ...state,
      };
    }
    case actionType.PUT_UPDATE_IAD: {
      return {
        ...state,
        iad: action.data,
      };
    }
    case actionType.PUT_UPDATE_GROUP_DETAILS: {
      return {
        ...state,
        group: action.data,
      };
    }
    case actionType.PUT_UPDATE_TENANT_DETAILS: {
      return {
        ...state,
      };
    }
    case actionType.PUT_UPDATE_NUMBERS_STATUS: {
      const phoneNumbers = action.data.numbers
        .map((phone) => ({
          ...phone,
          rangeStart: phone.phoneNumber.includes("-")
            ? phone.phoneNumber.split(" - ").slice(0)[0]
            : phone.phoneNumber,
          phoneChecked: false,
          preActive: phone.status === "preActive" ? true : false,
          active: phone.status === "active" ? true : false,
          isChanged: false,
        }))
        .sort((a, b) => {
          if (a.rangeStart < b.rangeStart) return -1;
          if (a.rangeStart > b.rangeStart) return 1;
          return 0;
        });
      let count = 1;
      const phoneNumbersWithRange = phoneNumbers.reduce(
        (arrPN, phone, index) => {
          if (
            arrPN.length &&
            arrPN[arrPN.length - 1].prevNum - phone.phoneNumber === -1 &&
            arrPN[arrPN.length - 1].main_number === phone.main_number &&
            arrPN[arrPN.length - 1].maintenance_number ===
              phone.maintenance_number &&
            arrPN[arrPN.length - 1].preActive === phone.preActive &&
            arrPN[arrPN.length - 1].active === phone.active &&
            arrPN[arrPN.length - 1].zipCode === phone.zipCode &&
            count !== 100
          ) {
            if (count === 1) {
              arrPN[arrPN.length - 1] = {
                ...phone,
                rangeStart: phoneNumbers[index - 1].rangeStart,
                rangeEnd: phone.phoneNumber,
                prevNum: phone.phoneNumber,
                phoneNumbers: [],
              };

              arrPN[arrPN.length - 1].phoneNumbers.unshift({
                ...phoneNumbers[index - 1],
                inRange: true,
              });

              arrPN[arrPN.length - 1].phoneNumbers.push({
                ...phone,
                inRange: true,
              });
            } else {
              arrPN[arrPN.length - 1] = {
                ...arrPN[arrPN.length - 1],
                prevNum: phone.phoneNumber,
                rangeEnd: phone.phoneNumber,
              };
              arrPN[arrPN.length - 1].phoneNumbers.push({
                ...phone,
                inRange: true,
              });
            }
            count++;
            arrPN = [...arrPN];
          } else {
            count = 1;
            arrPN = [...arrPN, { ...phone, prevNum: phone.phoneNumber }];
          }
          return arrPN;
        },
        []
      );
      return {
        ...state,
        phoneNumbersByGroup: phoneNumbersWithRange,
      };
    }
    case actionType.PUT_UPDATE_ENTERPRISE_TRNUK: {
      const iadFromSite = [
        ...action.data.iads_from_main_site.map((el) => ({
          ...el,
          checked: true,
        })),
        ...action.data.main_iads_available.map((el) => ({
          ...el,
          checked: false,
        })),
      ];
      const iadNotFromSite = [
        ...action.data.iads_from_other_sites.map((el) => ({
          ...el,
          checked: true,
        })),
        ...action.data.other_iads_available.map((el) => ({
          ...el,
          checked: false,
        })),
      ];
      return {
        ...state,
        iadsByTrunk: { ...action.data, iadFromSite, iadNotFromSite },
      };
    }
    case actionType.PUT_UPDATE_TEAM: {
      return {
        ...state,
        team: action.data,
      };
    }
    case actionType.PUT_UPDATE_ANOMALY: {
      return {
        ...state,
        anomaly: action.data,
      };
    }
    case actionType.PUT_UPDATE_IAD_CUSTOM_TAGS_COMMENT: {
      return {
        ...state,
      };
    }
    case actionType.PUT_UPDATE_IAD_CUSTOM_TAG: {
      return {
        ...state,
      };
    }
    case actionType.DELETE_TENANT: {
      return {
        ...state,
      };
    }
    case actionType.DELETE_GROUP_FROM_TENANT: {
      return {
        ...state,
      };
    }
    case actionType.DELETE_TRUNK_GROUP: {
      return {
        ...state,
      };
    }
    case actionType.DELETE_PHONE_FROM_GROUP: {
      return {
        ...state,
      };
    }
    case actionType.DELETE_ENTERPRISE_TRUNK: {
      return {
        ...state,
      };
    }
    case actionType.DELETE_ANOMALY: {
      return {
        ...state,
      };
    }
    case actionType.DELETE_SPECIAL_CUSTOM_TAG: {
      return {
        ...state,
      };
    }
    case actionType.CHANGE_IAD_FOR_UPDATE: {
      return {
        ...state,
        iadForUpdate: {
          ...state.iadForUpdate,
          [action.field]: action.value,
        },
      };
    }

    case actionType.CHANGE_IAD_OBJECT_FOR_UPDATE: {
      return {
        ...state,
        iadForUpdate: {
          ...state.iadForUpdate,
          [action.object]: {
            ...state.iadForUpdate[action.object],
            [action.field]: action.value,
          },
        },
      };
    }

    case actionType.CLEAR_CREATED_TENANT: {
      return {
        ...state,
        createdTenant: {},
      };
    }

    case actionType.CLEAR_IAD: {
      return {
        ...state,
        iad: {},
      };
    }

    case actionType.CLEAR_SEARCHED_IADS: {
      return {
        ...state,
        searchedIADs: [],
      };
    }

    case actionType.SET_TRANSFERED_IADS: {
      return {
        ...state,
        transferedIADs: action.data,
      };
    }

    case actionType.CLEAR_TRANSFERED_IADS: {
      return {
        ...state,
        transferedIADs: [],
      };
    }

    case actionType.CLEAR_VALIDATION_GROUP: {
      return {
        ...state,
        validationGroup: {},
        validationGroupError: "",
      };
    }

    default:
      return state;
  }
}

export default mainReducer;
