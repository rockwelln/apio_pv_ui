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

export const getGroupAdminByAdminId = data => ({
  type: actionType.GET_GROUP_ADMIN_BY_ADMIN_ID,
  data
});

export const getTenantAdminByAdminId = data => ({
  type: actionType.GET_TENANT_ADMIN_BY_ADMIN_ID,
  data
});

export const getUserServicesByUserId = data => ({
  type: actionType.GET_USER_SERVICES_BY_USER_ID,
  data
});

export const getTamplatesOfTenant = data => ({
  type: actionType.GET_TEMPLATES_OF_TENANT,
  data
});

export const getAccessDeviceByName = data => ({
  type: actionType.GET_ACCESS_DEVICE_BY_NAME,
  data
});

export const getTamplatesOfGroup = data => ({
  type: actionType.GET_TEMPLATES_OF_GROUP,
  data
});

export const getCategoriesOfTemplate = data => ({
  type: actionType.GET_CATEGORIES_OF_TEMPLATE,
  data
});

export const getCategoryByName = data => ({
  type: actionType.GET_CATEGORY_BY_NAME,
  data
});

export const getTrunksGroupsByGroup = data => ({
  type: actionType.GET_TRUNKS_GROUPS_BY_GROUP,
  data
});

export const getTrunkGroupByName = data => ({
  type: actionType.GET_TRUNK_GROUP_BY_NAME,
  data
});

export const getUsersByTrunkGroup = data => ({
  type: actionType.GET_USERS_BY_TRUNK_GROUP,
  data
});

export const getBackupByTrunkGroup = data => ({
  type: actionType.GET_BACKUP_BY_TRUNK_GROUP,
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

export const postCreateTenantAdmin = data => ({
  type: actionType.POST_CREATE_TENANT_ADMIN,
  data
});

export const postCreateTenantAdminError = error => ({
  type: actionType.POST_CREATE_TENANT_ADMIN_ERROR,
  error
});

export const postAssignUserServices = () => ({
  type: actionType.POST_ASSIGN_USER_SERVICES
});

export const postAssignUserServicePacks = () => ({
  type: actionType.POST_ASSIGN_USER_SERVICE_PACKS
});

export const postCreateTenant = data => ({
  type: actionType.POST_CREATE_TENANT,
  data
});

export const postCreateGroup = data => ({
  type: actionType.POST_CREATE_GROUP,
  data
});

export const postAddPhoneNumbersToTenant = data => ({
  type: actionType.POST_ADD_PHONE_NUMBERS_TO_TENANT,
  data
});

export const postCreateUserToGroup = data => ({
  type: actionType.POST_CREATE_USER_TO_GROUP,
  data
});

export const postAddGroupServicesToGroup = data => ({
  type: actionType.POST_ADD_GROUP_SERVICES_TO_GROUP,
  data
});

export const putUpdateUser = data => ({
  type: actionType.PUT_UPDATE_USER,
  data
});

export const putUpdateGroupDetails = data => ({
  type: actionType.PUT_UPDATE_GROUP_DETAILS,
  data
});

export const putUpdateGroupAdmin = data => ({
  type: actionType.PUT_UPDATE_GROUP_ADMIN,
  data
});

export const putUpdateTenantAdmin = data => ({
  type: actionType.PUT_UPDATE_TENANT_ADMIN,
  data
});

export const putUpdateTrunkByGroupId = data => ({
  type: actionType.PUT_UPDATE_TRUNK_BY_GROUP_ID,
  data
});

export const putUpdateTrunkByGroupIdError = data => ({
  type: actionType.PUT_UPDATE_TRUNK_BY_GROUP_ID_ERROR,
  data
});

export const putUpdateServicePacksByGroupId = data => ({
  type: actionType.PUT_UPDATE_SERVICE_PACKS_BY_GROUP_ID,
  data
});

export const putUpdateGroupServicesByGroupId = data => ({
  type: actionType.PUT_UPDATE_GROUP_SERVICES_BY_GROUP_ID,
  data
});

export const putUpdateTenantDetails = data => ({
  type: actionType.PUT_UPDATE_TENANT_DETAILS,
  data
});

export const deleteTenant = data => ({
  type: actionType.DELETE_TENANT,
  data
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

export const deleteAssignUserServices = () => ({
  type: actionType.DELETE_DEASSIGN_USER_SERVICES
});

export const deleteAssignUserServicePacks = () => ({
  type: actionType.DELETE_DEASSIGN_USER_SERVICE_PACKS
});

export const deletePhoneFromTenant = () => ({
  type: actionType.DELETE_PHONE_FROM_TENANT
});

export const deleteUserFromGroup = () => ({
  type: actionType.DELETE_USER_FROM_GROUP
});

export const deleteGroupFromTenant = data => ({
  type: actionType.DELETE_GROUP_FROM_TENANT,
  data
});

export const clearErrorMassage = () => ({
  type: actionType.CLEAR_ERROR_MASSAGE
});

export const changeStepOfCreateTenant = data => ({
  type: actionType.CHANGE_STEP_OF_CREATE_TENANT,
  data
});

export const changeTypeOfTenant = data => ({
  type: actionType.CHANGE_TYPE_OF_TENANT,
  data
});

export const changeIdOfTenant = data => ({
  type: actionType.CHANGE_ID_OF_TENANT,
  data
});

export const changeNameOfTenant = data => ({
  type: actionType.CHANGE_NAME_OF_TENANT,
  data
});

export const changeAddressOfTenant = data => ({
  type: actionType.CHANGE_ADDRESS_OF_TENANT,
  data
});

export const changeZIPOfTenant = data => ({
  type: actionType.CHANGE_ZIP_OF_TENANT,
  data
});

export const changeCityOfTenant = data => ({
  type: actionType.CHANGE_CITY_OF_TENANT,
  data
});

export const changeTemplateOfTenant = data => ({
  type: actionType.CHANGE_TAMPLATE_OF_TENANT,
  data
});

export const refuseCreateTenant = () => ({
  type: actionType.REFUSE_CREATE_TENANT
});

export const changeDomainOfTenant = data => ({
  type: actionType.CHANGE_DOMAIN_OF_TENANT,
  data
});

export const refuseCreateGroup = () => ({
  type: actionType.REFUSE_CREATE_GROUP
});

export const changeIdOfGroup = data => ({
  type: actionType.CHANGE_ID_OF_GROUP,
  data
});

export const changeNameOfGroup = data => ({
  type: actionType.CHANGE_NAME_OF_GROUP,
  data
});

export const changeDomainOfGroup = data => ({
  type: actionType.CHANGE_DOMAIN_OF_GROUP,
  data
});

export const changeUserLimitOfGroup = data => ({
  type: actionType.CHANGE_USER_LIMIT_OF_GROUP,
  data
});

export const changeAddressOfGroup = data => ({
  type: actionType.CHANGE_ADDRESS_OF_GROUP,
  data
});

export const changeZIPOfGroup = data => ({
  type: actionType.CHANGE_ZIP_OF_GROUP,
  data
});

export const changeCityOfGroup = data => ({
  type: actionType.CHANGE_CITY_OF_GROUP,
  data
});

export const changeStepOfCreateGroup = data => ({
  type: actionType.CHANGE_STEP_OF_CREATE_GROUP,
  data
});

export const changeTemplateOfGroup = data => ({
  type: actionType.CHANGE_TAMPLATE_OF_GROUP,
  data
});

export const changeStepOfAddPhoneTenant = data => ({
  type: actionType.CHANGE_STEP_OF_ADD_PHONE_TENANT,
  data
});

export const refuseAddPhoneToTenant = () => ({
  type: actionType.REFUSE_ADD_PHONE_TO_TENANT
});

export const saveValidatedNumbersTenant = data => ({
  type: actionType.SAVE_VALIDATED_NUMBERS_TENANT,
  data
});

export const removeSuccesfulValidPhoneTenant = data => ({
  type: actionType.REMOVE_SUCCESFUL_VALID_PHONE_TENANT,
  data
});

export function fetchGetTenants(cancelLoad) {
  return function(dispatch) {
    return fetch_get(`${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/`)
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
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${Id}`
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

export function fetchGetGroupsByTenantId(Id) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${Id}/groups`
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

export function fetchGetPhoneNumbersByTenantId(Id) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${Id}/numbers`
    )
      .then(data => dispatch(getPhoneNumbersByTenantId(data)))
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

export function fetchGetAdminsByTenantId(Id) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${Id}/admins`
    )
      .then(data => dispatch(getAdminsByTenantId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-admins-failed"
            defaultMessage="Failed to fetch admins!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetGroupById(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}`
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

export function fetchGetUsersByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users`
    )
      .then(data => dispatch(getUsersByGroupId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-users-failed"
            defaultMessage="Failed to fetch users!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetPhoneNumbersByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/numbers?assignement=true`
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

export function fetchGetLicensesByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/licenses`
    )
      .then(data => dispatch(getLicensesByGroupId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-licenses-failed"
            defaultMessage="Failed to fetch licenses!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetDevicesByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/access_devices`
    )
      .then(data => dispatch(getDevicesByGroupId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-devices-failed"
            defaultMessage="Failed to fetch devices!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetAdminsByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/admins`
    )
      .then(data => dispatch(getAdminsByGroupId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-group-admins-failed"
            defaultMessage="Failed to fetch group admins!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetUserByName(tenantId, groupId, userName) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/${userName}`
    )
      .then(data => dispatch(getUserByName(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-user-failed"
            defaultMessage="Failed to fetch user details!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTrunkByGroupID(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/features/trunk_groups`
    )
      .then(data => dispatch(getTrunkByGroupID(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-trunk-failed"
            defaultMessage="Failed to fetch trunk!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetAvailableNumbersByGroupId(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/numbers?available=true`
    )
      .then(data => dispatch(getAvailableNumbersByGroupID(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-avail-numbers-failed"
            defaultMessage="Failed to fetch available numbers!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetGroupAdminByAdminId(tenantId, groupId, adminId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/admins/${adminId}`
    )
      .then(data => dispatch(getGroupAdminByAdminId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-admin-failed"
            defaultMessage="Failed to fetch admin details!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTenantAdminByAdminId(tenantId, adminId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/admins/${adminId}`
    )
      .then(data => dispatch(getTenantAdminByAdminId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-admin-failed"
            defaultMessage="Failed to fetch admin details!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetUserServicesByUserId(tenantId, groupId, userId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/${userId}/services?assignementStatus=true&summary=true`
    )
      .then(data => dispatch(getUserServicesByUserId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-user-services-failed"
            defaultMessage="Failed to fetch user services!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTamplatesOfTenant() {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/configs/templates/categories/tenant/`
    )
      .then(data => dispatch(getTamplatesOfTenant(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-tenant-tamplates-failed"
            defaultMessage="Failed to fetch tenant tamplates!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetAccessDeviceByName(tenantId, groupId, deviceName) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/access_devices/${deviceName}`
    )
      .then(data => dispatch(getAccessDeviceByName(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-access-device-failed"
            defaultMessage="Failed to fetch access device!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTamplatesOfGroup() {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/configs/templates/categories/group/`
    )
      .then(data => dispatch(getTamplatesOfGroup(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-tenant-templates-failed"
            defaultMessage="Failed to fetch tenant templates!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetCategoriesOfTemplate() {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/configs/templates/categories/`
    )
      .then(data => dispatch(getCategoriesOfTemplate(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-categories-of-tamplates-failed"
            defaultMessage="Failed to fetch categories of templates!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetCategoryByName(category) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/configs/templates/categories/${category}`
    )
      .then(data => dispatch(getCategoryByName(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-category-failed"
            defaultMessage="Failed to fetch category!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTrunkGroupByName(tenantId, groupId, trunkGroupName) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/services/trunk_groups/${trunkGroupName}/`
    )
      .then(data => dispatch(getTrunkGroupByName(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-trunk-group-failed"
            defaultMessage="Failed to fetch trunk group!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetUsersByTrunkGroup(tenantId, groupId, trunkGroupName) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/services/trunk_users/${trunkGroupName}/`
    )
      .then(data => dispatch(getUsersByTrunkGroup(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-users-failed"
            defaultMessage="Failed to fetch users!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetTrunksGroupsByGroup(tenantId, groupId) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/services/trunk_groups/`
    )
      .then(data => dispatch(getTrunksGroupsByGroup(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-trunk-groups-failed"
            defaultMessage="Failed to fetch trunk groups!"
          />,
          error.message
        )
      );
  };
}

export function fetchGetBackupByTrunkGroup(tenantId, groupId, trunkGroupName) {
  return function(dispatch) {
    return fetch_get(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/services/trunk_groups/${trunkGroupName}/backup`
    )
      .then(data => dispatch(getBackupByTrunkGroup(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="fetch-backup-by-trunk-groups-failed"
            defaultMessage="Failed to fetch backup!"
          />,
          error.message
        )
      );
  };
}

export function fetchPostCreateGroupAdmin(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/admins/`,
      data
    )
      .then(resp => resp.json())
      .then(data => dispatch(postCreateGroupAdmin(data)))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          return dispatch(postCreateGroupAdminError(error));
        } else {
          NotificationsManager.error(
            <FormattedMessage
              id="create-group-admin-failed"
              defaultMessage="Failed to create group admin!"
            />,
            error.message
          );
        }
      });
  };
}

export function fetchPostCreateTenantAdmin(tenantId, data) {
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/admins/`,
      data
    )
      .then(resp => resp.json())
      .then(data => dispatch(postCreateTenantAdmin(data)))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          return dispatch(postCreateTenantAdminError(error));
        } else {
          NotificationsManager.error(
            <FormattedMessage
              id="create-group-admin-failed"
              defaultMessage="Failed to create group admin!"
            />,
            error.message
          );
        }
      });
  };
}

export function fetchPostAssignUserServices(tenantId, groupId, userName, data) {
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/${userName}/services/`,
      data
    )
      .then(resp => resp.json())
      .then(data => dispatch(postAssignUserServices(data)))
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-assign-services"
            defaultMessage="Failed to assign services!"
          />,
          error.message
        );
      });
  };
}

export function fetchPostAssignUserServicePacks(
  tenantId,
  groupId,
  userName,
  data
) {
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/${userName}/services/`,
      data
    )
      .then(resp => resp.json())
      .then(data => dispatch(postAssignUserServicePacks(data)))
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-assign-service-packs"
            defaultMessage="Failed to assign services packs!"
          />,
          error.message
        );
      });
  };
}

export function fetchPostCreateTenant(data) {
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/`,
      data
    )
      .then(resp => resp.json())
      .then(data => dispatch(postCreateTenant(data)))
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
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(postCreateGroup(data)))
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

export function fetchPostAddPhoneNumbersToTenant(tenantId, data) {
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/numbers/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(postAddPhoneNumbersToTenant(data)))
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-add-phone-numbers"
            defaultMessage="Failed to add phone numbers!"
          />,
          error.message
        );
      });
  };
}

export function fetchPostCreateUserToGroup(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(postCreateUserToGroup(data)))
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-create-user"
            defaultMessage="Failed create user!"
          />,
          error.message
        );
      });
  };
}

export function fetchPostAddGroupServicesToGroup(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_post(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/services/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(postAddGroupServicesToGroup(data)))
      .catch(error => {
        NotificationsManager.error(
          <FormattedMessage
            id="failed-add-group-services"
            defaultMessage="Failed add group services!"
          />,
          error.message
        );
      });
  };
}

export function fetchPutUpdateUser(tenantId, groupId, userName, data) {
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/${userName}/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateUser(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-user-failed"
            defaultMessage="Failed to update user!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateGroupDetails(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateGroupDetails(data)))
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

export function fetchPutUpdateGroupAdmin(tenantId, groupId, adminId, data) {
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/admins/${adminId}/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateGroupAdmin(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-group-admin-failed"
            defaultMessage="Failed to update group admin!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateTenantAdmin(tenantId, adminId, data) {
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/admins/${adminId}/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateTenantAdmin(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-tenant-admin-failed"
            defaultMessage="Failed to update tenant admin!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateTrunkByGroupId(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/features/trunk_groups/`,
      data
    )
      .then(resp => resp.json())
      .then(data => dispatch(putUpdateTrunkByGroupId(data)))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          return dispatch(putUpdateTrunkByGroupIdError(error));
        } else {
          NotificationsManager.error(
            <FormattedMessage
              id="update-trunk-failed"
              defaultMessage="Failed to update trunk!"
            />,
            error.message
          );
        }
      });
  };
}

export function fetchPutUpdateServicePacksByGroupId(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/licenses/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateServicePacksByGroupId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-service-packs-failed"
            defaultMessage="Failed to update service packs!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateGroupServicesByGroupId(tenantId, groupId, data) {
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/licenses/`,
      data
    )
      .then(res => res.json())
      .then(data => dispatch(putUpdateGroupServicesByGroupId(data)))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="update-services-failed"
            defaultMessage="Failed to update services!"
          />,
          error.message
        )
      );
  };
}

export function fetchPutUpdateTenantDetails(tenantId, data) {
  return function(dispatch) {
    return fetch_put(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}`,
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

export function fetchDeleteTenant(ID) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${ID}`
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

export function fetchDeleteTenantAdmin(tenantId, adminId) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/admins/${adminId}`
    )
      .then(data => {
        dispatch(deleteTenantAdmin());
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="delete-tenant-admin-failed"
            defaultMessage="Failed to delete tenant admin!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteGroupDevice(tenantId, groupId, deviceName) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/access_devices/${deviceName}`
    )
      .then(data => dispatch(deleteGroupDevice()))
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="delete-group-device-failed"
            defaultMessage="Failed to delete group device!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteGroupAdmin(tenantId, groupId, adminId) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/admins/${adminId}`
    )
      .then(data => {
        dispatch(deleteGroupAdmin());
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="delete-group-admin-failed"
            defaultMessage="Failed to delete group admin!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteAssignUserServices(
  tenantId,
  groupId,
  userName,
  data
) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/${userName}/services/`,
      data
    )
      .then(data => {
        dispatch(deleteAssignUserServices());
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-deassign-user-services"
            defaultMessage="Failed to deassign user services!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteAssignUserServicePacks(
  tenantId,
  groupId,
  userName,
  data
) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/${userName}/services/`,
      data
    )
      .then(data => {
        dispatch(deleteAssignUserServicePacks());
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-deassign-user-services"
            defaultMessage="Failed to deassign user services!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeletePhoneFromTenant(tenantId, data) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/numbers/`,
      data
    )
      .then(data => {
        dispatch(deletePhoneFromTenant());
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-delete-number"
            defaultMessage="Failed to delete number!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteUserFromGroup(tenantId, groupId, userName) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/users/${userName}/`
    )
      .then(data => {
        dispatch(deleteUserFromGroup());
      })
      .catch(error =>
        NotificationsManager.error(
          <FormattedMessage
            id="failed-to-delete-user"
            defaultMessage="Failed to delete user!"
          />,
          error.message
        )
      );
  };
}

export function fetchDeleteGroupFromTenant(tenantId, groupId) {
  return function(dispatch) {
    return fetch_delete(
      `${ProvProxiesManager.getCurrentUrlPrefix()}/tenants/${tenantId}/groups/${groupId}/`
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
