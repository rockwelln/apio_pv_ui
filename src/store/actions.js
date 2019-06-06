import { fetch_get, fetch_delete, API_BASE_URL } from "../utils";
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
  type: actionType.GET_ADMINS,
  data
});

export const deleteTenant = Id => ({
  type: actionType.DELETE_TENANT,
  Id
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

export function fetchDeleteTenant(ID) {
  return function(dispatch) {
    return fetch_delete(`${API_BASE_URL}/tenants/${ID}`).then(data =>
      dispatch(deleteTenant(ID))
    );
  };
}
