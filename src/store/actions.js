import {
  fetch_get,
  fetch_delete,
  fetch_put,
  fetch_post,
  API_BASE_URL
} from "../utils";
import * as actionType from "./constants";

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

export const getPhoneNumbersByTenantId = data => ({
  type: actionType.GET_PHONE_NUMBERS,
  data
});

export const getAdminsByTenantId = data => ({
  type: actionType.GET_ADMINS_TENANT,
  data
});

export const getGroupById = data => ({
  type: actionType.GET_GROUP,
  data
});

export const getUsersByGroupId = data => ({
  type: actionType.GET_USERS,
  data
});

export const getPhoneNumbersByGroupId = data => ({
  type: actionType.GET_PHONE_NUMBERS_BY_GROUP_ID,
  data
});

export const getLicensesByGroupId = data => ({
  type: actionType.GET_LICENSES_BY_GROUP_ID,
  data
});

export const getDevicesByGroupId = data => ({
  type: actionType.GET_DEVICES_BY_GROUP_ID,
  data
});

export const getUserByName = data => ({
  type: actionType.GET_USER,
  data
});

export const getTrunkByGroupID = data => ({
  type: actionType.GET_TRUNK_BY_GROUP_ID,
  data
});

export const getAvailableNumbersByGroupID = data => ({
  type: actionType.GET_AVAILABLE_NUMBERS_BY_GROUP_ID,
  data
});

export const getAdminsByGroupId = data => ({
  type: actionType.GET_ADMINS_GROUP,
  data
});

export const postCreateGroupAdmin = data => ({
  type: actionType.POST_CREATE_GROUP_ADMIN,
  data
});

export const postCreateGroupAdminError = error => ({
  type: actionType.POST_CREATE_GROUP_ADMIN_ERROR,
  error
});

export const putUpdateUser = data => ({
  type: actionType.PUT_UPDATE_USER,
  data
});

export const putUpdateGroupDetails = data => ({
  type: actionType.PUT_UPDATE_GROUP_DETAILS,
  data
});

export const deleteTenant = Id => ({
  type: actionType.DELETE_TENANT,
  Id
});

export const deleteTenantAdmin = () => ({
  type: actionType.DELETE_TENANT_ADMIN
});

export const deleteGroupDevice = () => ({
  type: actionType.DELETE_GROUP_DEVICE
});

export const deleteGroupAdmin = () => ({
  type: actionType.DELETE_GROUP_ADMIN
});

export function fetchGetTenants(cancelLoad) {
  return function(dispatch) {
    return fetch_get(`${API_BASE_URL}/tenants/`)
      .then(data => !cancelLoad && dispatch(getTenants(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetTenantById(Id) {
  return function(dispatch) {
    return fetch_get(`${API_BASE_URL}/tenants/${Id}`)
      .then(data => dispatch(getTenantById(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetGroupsByTenantId(Id) {
  return function(dispatch) {
    return fetch_get(`${API_BASE_URL}/tenants/${Id}/groups`)
      .then(data => dispatch(getGroupsByTenantId(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetPhoneNumbersByTenantId(Id) {
  return function(dispatch) {
    return fetch_get(`${API_BASE_URL}/tenants/${Id}/numbers`)
      .then(data => dispatch(getPhoneNumbersByTenantId(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetAdminsByTenantId(Id) {
  return function(dispatch) {
    return fetch_get(`${API_BASE_URL}/tenants/${Id}/admins`)
      .then(data => dispatch(getAdminsByTenantId(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetGroupById(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(`${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}`)
      .then(data => dispatch(getGroupById(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetUsersByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/users`
    )
      .then(data => dispatch(getUsersByGroupId(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetPhoneNumbersByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/numbers?assignement=true`
    )
      .then(data => dispatch(getPhoneNumbersByGroupId(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetLicensesByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/licenses`
    )
      .then(data => dispatch(getLicensesByGroupId(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetDevicesByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/access_devices`
    )
      .then(data => dispatch(getDevicesByGroupId(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetAdminsByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/admins`
    )
      .then(data => dispatch(getAdminsByGroupId(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetUserByName(tenantId, groupId, userName) {
  return function(dispatch) {
    return fetch_get(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/users/${userName}`
    )
      .then(data => dispatch(getUserByName(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetTrunkByGroupID(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/features/trunk_groups`
    )
      .then(data => dispatch(getTrunkByGroupID(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchGetAvailableNumbersByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/numbers?available=true`
    )
      .then(data => dispatch(getAvailableNumbersByGroupID(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchPostCreateGroupAdmin(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_post(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/admins/`,
      data
    )
      .then(data => dispatch(postCreateGroupAdmin(data)))
      .catch(errors => dispatch(postCreateGroupAdminError(errors)));
  };
}

export function fetchPutUpdateUser(tenantId, groupId, userName, data) {
  return function(dispatch) {
    return fetch_put(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/users/${userName}/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateUser(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchPutUpdateGroupDetails(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_put(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateGroupDetails(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}

export function fetchDeleteTenant(ID) {
  return function(dispatch) {
    return fetch_delete(`${API_BASE_URL}/tenants/${ID}`).then(data =>
      dispatch(deleteTenant(ID))
    );
  };
}

export function fetchDeleteTenantAdmin(tenantId, adminId) {
  return function(dispatch) {
    return fetch_delete(
      `${API_BASE_URL}/tenants/${tenantId}/admins/${adminId}`
    ).then(data => dispatch(deleteTenantAdmin()));
  };
}

export function fetchDeleteGroupDevice(tenantId, groupId, deviceName) {
  return function(dispatch) {
    return fetch_delete(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/access_devices/${deviceName}`
    ).then(data => dispatch(deleteGroupDevice()));
  };
}

export function fetchDeleteGroupAdmin(tenantId, groupId, adminId) {
  return function(dispatch) {
    return fetch_delete(
      `${API_BASE_URL}/tenants/${tenantId}/groups/${groupId}/admins/${adminId}`
    ).then(data => dispatch(deleteGroupAdmin()));
  };
}
