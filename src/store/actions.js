import {
  fetch_get,
  fetch_delete,
  fetch_put,
  fetch_post,
  ProvProxiesManager,
  NotificationsManager
} from "../utils";
import * as actionType from "./constants";
import { FormattedMessage } from "react-intl";
import React from "react";

export const getTenants = data => ({
  type: actionType.GET_TENANTS,
  data
});

export const getTenantById = data => ({
  type: actionType.GET_TENANT,
  data
});

export const getGroupsByTenantId = data => ({
  type: actionType.GET_GROUPS,
  data
});

export const getGroupById = data => ({
  type: actionType.GET_GROUP,
  data
});

export const getPhoneNumbersByGroupId = data => ({
  type: actionType.GET_PHONE_NUMBERS_BY_GROUP_ID,
  data
});

export const getTrunkByGroupID = data => ({
  type: actionType.GET_TRUNK_BY_GROUP_ID,
  data
});

export const getNumbersByEnterpriseTrunk = data => ({
  type: actionType.GET_NUMBERS_BY_ENTERPRISE_TRUNK,
  data
});

export const getIADs = data => ({
  type: actionType.GET_IADS,
  data
});

export const getConfig = data => ({
  type: actionType.GET_CONFIG,
  data
});

export const getIADById = data => ({
  type: actionType.GET_IAD_BY_ID,
  data
});

export const getEnterpriseTrunksByGroup = data => ({
  type: actionType.GET_ENTERPRISE_TRUNKS_BY_GROUP,
  data
});

export const getIADsByTrunk = data => ({
  type: actionType.GET_IADS_BY_TRUNK,
  data
});

export const getPhoneNumbersByGroupNotTP = data => ({
  type: actionType.GET_PHONE_NUMBERS_BY_GROUP_ID_NOT_TP,
  data
});

export const getPhoneNumbersWithRefreshDB = data => ({
  type: actionType.GET_PHONE_NUMBERS_WITH_REFRESH_DB,
  data
});

export const getEnterpriseTrunksByTenant = data => ({
  type: actionType.GET_ENTERPRISE_TRUNKS_BY_TENANT,
  data
});

export const getListOfIads = data => ({
  type: actionType.GET_LIST_OF_IADS,
  data
});

export const getReconciliationTeams = data => ({
  type: actionType.GET_RECONCILIATION_TEAMS,
  data
});

export const getTeam = data => ({
  type: actionType.GET_TEAM,
  data
});

export const getAnomalies = data => ({
  type: actionType.GET_ANOMALIES,
  data
});

export const getAnomaly = data => ({
  type: actionType.GET_ANOMALY,
  data
});

export const postCreateTenant = data => ({
  type: actionType.POST_CREATE_TENANT,
  data
});

export const postCreateGroup = data => ({
  type: actionType.POST_CREATE_GROUP,
  data
});

export const postAssignPhoneNumbersToGroup = data => ({
  type: actionType.POST_ASSIGN_PHONE_NUMBERS_TO_GROUP,
  data
});

export const postCreateReconciliationTeams = data => ({
  type: actionType.POST_CREATE_RECONCILIATION_TEAMS,
  data
});

export const postCreateIAD = data => ({
  type: actionType.POST_CREATE_IAD,
  data
});

export const postCreateEnterpriseTrunk = data => ({
  type: actionType.POST_CREATE_ENTERPRISE_TRUNK,
  data
});

export const postEmergencyRouting = data => ({
  type: actionType.POST_EMERGENCY_ROUTING,
  data
});

export const putUpdateEnterpriseTrunk = data => ({
  type: actionType.PUT_UPDATE_ENTERPRISE_TRNUK,
  data
});

export const putUpdateGroupDetails = data => ({
  type: actionType.PUT_UPDATE_GROUP_DETAILS,
  data
});

export const putUpdateTenantDetails = data => ({
  type: actionType.PUT_UPDATE_TENANT_DETAILS,
  data
});

export const putUpdateNumbersStatus = data => ({
  type: actionType.PUT_UPDATE_NUMBERS_STATUS,
  data
});

export const putUpdateIAD = data => ({
  type: actionType.PUT_UPDATE_IAD,
  data
});

export const putUpdateNumbersByEnterpriseTrunk = data => ({
  type: actionType.PUT_UPDATE_NUMBERS_BY_ENTERPRISE_TRUNK,
  data
});

export const putUpdateTeam = data => ({
  type: actionType.PUT_UPDATE_TEAM,
  data
});

export const putUpdateAnomaly = data => ({
  type: actionType.PUT_UPDATE_ANOMALY,
  data
});

export const deleteTenant = data => ({
  type: actionType.DELETE_TENANT,
  data
});

export const deleteGroupFromTenant = data => ({
  type: actionType.DELETE_GROUP_FROM_TENANT,
  data
});

export const deletePhoneFromGroup = data => ({
  type: actionType.DELETE_PHONE_FROM_GROUP,
  data
});

export const deleteEnterpriseTrunk = data => ({
  type: actionType.DELETE_ENTERPRISE_TRUNK,
  data
});

export const deleteTrunkGroup = data => ({
  type: actionType.DELETE_TRUNK_GROUP,
  data
});

export const deleteTeam = data => ({
  type: actionType.DELETE_TEAM,
  data
});

export const deleteAnomaly = data => ({
  type: actionType.DELETE_ANOMALY,
  data
});

export const changeIAD = (field, value) => ({
  type: actionType.CHANGE_IAD_FOR_UPDATE,
  field,
  value
});

export const changeObjectIAD = (object, field, value) => ({
  type: actionType.CHANGE_IAD_OBJECT_FOR_UPDATE,
  object,
  field,
  value
});

export const clearCreatedTenant = () => ({
  type: actionType.CLEAR_CREATED_TENANT
});

export function fetchGetNumbersByEnterpriseTrunk(tenantId, groupId, trunkId) {
  ////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/enterprise_trunks/${trunkId}/users/`
    )
      .then(data => dispatch(getNumbersByEnterpriseTrunk(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-numbers-by-ent-trunk"
            defaultMessage="Failed to fetch numbers by Enterprise trunks!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetIADsByTrunk(tenantId, groupId, trunkId) {
  ////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/enterprise_trunks/${trunkId}/`
    )
      .then(data => dispatch(getIADsByTrunk(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-iad-by-trunks-failed"
            defaultMessage="Failed to fetch iad by trunks!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetEnterpriseTrunksByTenant(tenantId) {
  ////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/enterprise_trunks/`
    )
      .then(data => dispatch(getEnterpriseTrunksByTenant(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-enterprise-trunks-failed"
            defaultMessage="Failed to fetch enterprise trunks!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetEnterpriseTrunksByGroup(tenantId, groupId) {
  ////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/enterprise_trunks/`
    )
      .then(data => dispatch(getEnterpriseTrunksByGroup(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-enterprise-trunks-failed"
            defaultMessage="Failed to fetch enterprise trunks!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetIADById(tenantId, groupId, iadId) {
  ////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/trunk_groups/${iadId}/`
    )
      .then(data => dispatch(getIADById(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-iad-failed"
            defaultMessage="Failed to fetch iad!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTenants(cancelLoad) {
  ////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/`
    )
      .then(data => !cancelLoad && dispatch(getTenants(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-tenants-failed"
            defaultMessage="Failed to fetch tenants!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTenantById(Id) {
  //////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${Id}/`
    )
      .then(data => dispatch(getTenantById(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-tenant-failed"
            defaultMessage="Failed to fetch tenant details!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetIADs(tenantId, groupId) {
  //////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/trunk_groups/`
    )
      .then(data => dispatch(getIADs(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-IADs-failed"
            defaultMessage="Failed to fetch IADs!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetConfig() {
  //////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/configs/applications/praGUI/config/`
    )
      .then(data => dispatch(getConfig(JSON.parse(JSON.parse(data.data)))))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-config-failed"
            defaultMessage="Failed to fetch config!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetGroupsByTenantId(Id) {
  ///////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${Id}/groups/`
    )
      .then(data => dispatch(getGroupsByTenantId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-groups-failed"
            defaultMessage="Failed to fetch groups!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetGroupById(tenantId, groupId) {
  ///////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/`
    )
      .then(data => dispatch(getGroupById(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-group-failed"
            defaultMessage="Failed to fetch group details!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetPhoneNumbersByGroupNotTP(tenantId, groupId) {
  ///////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/numbers/`
    )
      .then(data => dispatch(getPhoneNumbersByGroupNotTP(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-phone-numbers-failed"
            defaultMessage="Failed to fetch phone numbers!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetPhoneNumbersWithRefreshDB(tenantId, groupId, data) {
  ///////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/numbers?${data}`
    )
      .then(data => dispatch(getPhoneNumbersWithRefreshDB(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-phone-numbers-failed"
            defaultMessage="Failed to fetch phone numbers!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetPhoneNumbersByGroupId(tenantId, groupId, withStatus) {
  //////////////////////
  return function(dispatch) {
    return fetch_get(
      withStatus
        ? `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/numbers?status=true`
        : `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/numbers`
    )
      .then(data => dispatch(getPhoneNumbersByGroupId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-numbers-failed"
            defaultMessage="Failed to fetch phone numbers!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetListOfIads(tenantId, groupId) {
  /////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/enterprise_trunks/list_of_iads/`
    )
      .then(data => dispatch(getListOfIads(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-iads-failed"
            defaultMessage="Failed to fetch iads!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetReconciliationTeams() {
  /////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/system/reconciliation/teams/`
    )
      .then(data => dispatch(getReconciliationTeams(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-teams-failed"
            defaultMessage="Failed to fetch teams!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTeam(teamName) {
  /////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/system/reconciliation/teams/${teamName}`
    )
      .then(data => dispatch(getTeam(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-team-failed"
            defaultMessage="Failed to fetch team!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetAnomalies() {
  /////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/system/reconciliation/anomalies/`
    )
      .then(data => dispatch(getAnomalies(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-anomalies-failed"
            defaultMessage="Failed to fetch anomalies!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetAnomaly(hash) {
  /////////////////////////////////
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/system/reconciliation/anomalies/${hash}`
    )
      .then(data => dispatch(getAnomaly(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-anomaly-failed"
            defaultMessage="Failed to fetch anomaly!"
          />,
          error.message
        )
      );
  };
}

export function fetchPostEmergencyRouting(data) {
  /////////////////////////////////////
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/emergency_routing/`,
      data
    )
      .then(resp => resp.json())
      .then(data => {
        dispatch(postEmergencyRouting(data));
      })
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-emergency-routing"
            defaultMessage="Emergency Routing Failed"
          />,
          error.message
        );
      });
  };
}

export function fetchPostCreateTenant(data) {
  /////////////////////////////////////
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/`,
      data
    )
      .then(resp => resp.json())
      .then(data => {
        dispatch(postCreateTenant(data));
        return "created";
      })
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-create-tenant"
            defaultMessage="Failed to create tenant!"
          />,
          error.message
        );
      });
  };
}

export function fetchPostCreateGroup(tenantId, data) {
  ///////////////////////////////////
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(postCreateGroup(data));
        return "created";
      })
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-create-group"
            defaultMessage="Failed to create group!"
          />,
          error.message
        );
      });
  };
}

export function fetchPostCreateIAD(tenantId, groupId, data) {
  ///////////////////////////////////
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/trunk_groups/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(postCreateIAD(data));
        return "created";
      })
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-create-iad"
            defaultMessage="Failed to create IAD!"
          />,
          error.message
        );
      });
  };
}

export function fetchPostAssignPhoneNumbersToGroup(tenantId, groupId, data) {
  //////////////////////////////////////////////////
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/numbers/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(postAssignPhoneNumbersToGroup(data));
        return "success";
      })
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-add-phonenumbers"
            defaultMessage="Failed to add phone numbers!"
          />,
          error.message
        );
      });
  };
}

export function fetchPostCreateReconciliationTeams(data) {
  //////////////////////////////////////////////////
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/system/reconciliation/teams/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(postCreateReconciliationTeams(data));
        return "success";
      })
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-create-reconciliation-team"
            defaultMessage="Failed to create reconciliation team!"
          />,
          error.message
        );
      });
  };
}

export function fetchPutUpdateEnterpriseTrunk(
  tenantId,
  groupId,
  enterpriseTrunk,
  data
) {
  /////////////////////////////
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/enterprise_trunks/${enterpriseTrunk}/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(putUpdateEnterpriseTrunk(data));
        NotificationsManager.success(
          <FormattedMessage
            id="successfulEnterpriseTrunkUpdated"
            defaultMessage="Successful enterprise trunk update"
          />,
          "Updated"
        );
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-enterprise-trunk-failed"
            defaultMessage="Failed to update enterprise trunk!"
          />,
          error.message
        )
      );
  };
}

export function fetchPostCreateEnterpriseTrunk(tenantId, groupId, data) {
  //////////////////////////////////////////////////
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/enterprise_trunks/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(postCreateEnterpriseTrunk(data));
        return "created";
      })
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-create-enterprise-trunk"
            defaultMessage="Failed to create enterprise trunk!"
          />,
          error.message
        );
      });
  };
}

export function fetchPutUpdateNumbersByEnterpriseTrunk(
  tenantId,
  groupId,
  entTrunk,
  data
) {
  ///////////////////
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/enterprise_trunks/${entTrunk}/users/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(putUpdateNumbersByEnterpriseTrunk(data));
        NotificationsManager.success(
          <FormattedMessage
            id="successfulNumbersUpdate"
            defaultMessage="Successful Numbers update"
          />,
          "Updated"
        );
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-numbers-failed"
            defaultMessage="Failed to update numbers!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateIAD(tenantId, groupId, iadId, data) {
  ///////////////////
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/trunk_groups/${iadId}/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(putUpdateIAD(data));
        NotificationsManager.success(
          <FormattedMessage
            id="successfulIADUpdate"
            defaultMessage="Successful IAD update"
          />,
          "Updated"
        );
        return "successful";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-iad-failed"
            defaultMessage="Failed to update iad!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateGroupDetails(tenantId, groupId, data) {
  ///////////////////
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        NotificationsManager.success(
          <FormattedMessage
            id="successfulGroupUpdate"
            defaultMessage="Successful group update"
          />,
          "Updated"
        );
        dispatch(putUpdateGroupDetails(data));
        return "successful";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-group-failed"
            defaultMessage="Failed to update group details!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateTenantDetails(tenantId, data) {
  //////////////////////////////////////
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateTenantDetails(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-tenant-details-failed"
            defaultMessage="Failed to update tenant details!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateTeam(teamName, data) {
  //////////////////////////////////////
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/system/reconciliation/teams/${teamName}/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(putUpdateTeam(data));
        NotificationsManager.success(
          <FormattedMessage
            id="update-team-success"
            defaultMessage="Successfully updated team!"
          />,
          "Successfully updated team!"
        );
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-tenant-details-failed"
            defaultMessage="Failed to update tenant details!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateNumbersStatus(tenantId, groupId, data) {
  /////////////////////////////
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/numbers/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(putUpdateNumbersStatus(data));
        NotificationsManager.success(
          <FormattedMessage
            id="update-numbers-success"
            defaultMessage="Successfully updated numbers!"
          />,
          "Successfully updated numbers!"
        );
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-numbers-failed"
            defaultMessage="Failed to update numbers!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateAnomaly(hash, data) {
  /////////////////////////////
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/system/reconciliation/anomalies/${hash}/`,
      data
    )
      .then(res => res.json())
      .then(data => {
        dispatch(putUpdateAnomaly(data));
        NotificationsManager.success(
          <FormattedMessage
            id="update-anomaly-success"
            defaultMessage="Successfully updated anomaly!"
          />,
          "Successfully updated anomaly!"
        );
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-anomaly-failed"
            defaultMessage="Failed to update anomaly!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteTenant(ID) {
  ////////////////////////////////////
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${ID}/`
    )
      .then(data => {
        dispatch(deleteTenant(data));
        return "deleted";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="delete-tenant-failed"
            defaultMessage="Failed to delete tenant!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteGroupFromTenant(tenantId, groupId) {
  /////////////////////////
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/`
    )
      .then(data => {
        dispatch(deleteGroupFromTenant(data));
        return "deleted";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-delete-group"
            defaultMessage="Failed to delete group!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteTrunkGroup(tenantId, groupId, trunkName) {
  ///////////////////////////////////////////
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/trunk_groups/${trunkName}/`
    )
      .then(data => {
        dispatch(deleteTrunkGroup(data));
        return "deleted";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-delete-iad"
            defaultMessage="Failed to delete iad!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeletePhoneFromGroup(tenantId, groupId, data) {
  //////////////////////////////////
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/numbers/`,
      data
    )
      .then(data => {
        dispatch(deletePhoneFromGroup(data));
        return "deleted";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-delete-phone-number"
            defaultMessage="Failed to delete phone number!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteEnterpriseTrunk(tenantId, groupId, entTrunk) {
  /////////////////////////////////
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/tenants/${tenantId}/groups/${groupId}/enterprise_trunks/${entTrunk}`
    )
      .then(data => {
        dispatch(deleteEnterpriseTrunk(data));
        return "deleted";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-delete-enterprise-trunk"
            defaultMessage="Failed to delete enterprise trunk!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteTeam(teamName) {
  /////////////////////////////////
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra/system/reconciliation/teams/${teamName}/`
    )
      .then(data => {
        dispatch(deleteTeam(data));
        return "deleted";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-delete-team"
            defaultMessage="Failed to delete team!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteAnomaly(hash, data) {
  /////////////////////////////////
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/telenet_pra//system/reconciliation/anomalies/${hash}/`,
      data
    )
      .then(data => {
        dispatch(deleteTeam(data));
        return "deleted";
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-delete-anomaly"
            defaultMessage="Failed to delete anomaly!"
          />,
          error.message
        )
      );
  };
}
