import { fetch_get, API_BASE_URL } from "../utils";
import * as actionType from "./constants";

export const getTenants = data => ({
  type: actionType.GET_TENANTS,
  data
});

export function fetchTenants(cancelLoad) {
  return function(dispatch) {
    return fetch_get(`${API_BASE_URL}/tenants/`)
      .then(data => !cancelLoad && dispatch(getTenants(data)))
      .catch(error => console.error("An error occurred.", error));
  };
}
