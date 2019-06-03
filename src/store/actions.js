import { fetch_get, fetch_delete, API_BASE_URL } from "../utils";
import * as actionType from "./constants";

export const getTenants = data => ({
  type: actionType.GET_TENANTS,
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

export function fetchDeleteTenant(ID) {
  return function(dispatch) {
    return fetch_delete(`${API_BASE_URL}/tenants/${ID}`).then(data =>
      dispatch(deleteTenant(ID))
    );
  };
}
