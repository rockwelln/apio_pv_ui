export const GET_TENANTS = "GET_TENANTS";
export const GET_TENANT = "GET_TENANT";
export const GET_GROUPS = "GET_GROUPS";
export const GET_PHONE_NUMBERS = "GET_PHONE_NUMBERS";
export const GET_ADMINS_TENANT = "GET_ADMINS_TENANT";
export const GET_GROUP = "GET_GROUP";
export const GET_USERS = "GET_USERS";
export const GET_PHONE_NUMBERS_BY_GROUP_ID = "GET_PHONE_NUMBERS_BY_GROUP_ID";
export const GET_LICENSES_BY_GROUP_ID = "GET_LICENSES_BY_GROUP_ID";
export const GET_DEVICES_BY_GROUP_ID = "GET_DEVICES_BY_GROUP_ID";
export const GET_USER = "GET_USER";
export const GET_TRUNK_BY_GROUP_ID = "GET_TRUNK_BY_GROUP_ID";
export const GET_AVAILABLE_NUMBERS_BY_GROUP_ID =
  "GET_AVAILABLE_NUMBERS_BY_GROUP_ID";
export const GET_ADMINS_GROUP = "GET_ADMINS_GROUP";
export const GET_GROUP_ADMIN_BY_ADMIN_ID = "GET_GROUP_ADMIN_BY_ADMIN_ID";
export const GET_TENANT_ADMIN_BY_ADMIN_ID = "GET_TENANT_ADMIN_BY_ADMIN_ID";
export const GET_USER_SERVICES_BY_USER_ID = "GET_USER_SERVICES_BY_USER_ID";
export const GET_TEMPLATES_OF_TENANT = "GET_TEMPLATES_OF_TENANT";
export const GET_ACCESS_DEVICE_BY_NAME = "GET_ACCESS_DEVICE_BY_NAME";
export const GET_TEMPLATES_OF_GROUP = "GET_TEMPLATES_OF_GROUP";
export const GET_CATEGORIES_OF_TEMPLATE = "GET_CATEGORIES_OF_TEMPLATE";
export const GET_CATEGORY_BY_NAME = "GET_CATEGORY_BY_NAME";
export const GET_TRUNKS_GROUPS_BY_GROUP = "GET_TRUNKS_GROUPS_BY_GROUP";
export const GET_TRUNK_GROUP_BY_NAME = "GET_TRUNK_GROUP_BY_NAME";
export const GET_USERS_BY_TRUNK_GROUP = "GET_USERS_BY_TRUNK_GROUP";
export const GET_BACKUP_BY_TRUNK_GROUP = "GET_BACKUP_BY_TRUNK_GROUP";
export const GET_TEMPLATE_DETAILS = "GET_TEMPLATE_DETAILS";
export const GET_PHONE_TYPES = "GET_PHONE_TYPES";
export const GET_PHONE_TYPES_DETAILS = "GET_PHONE_TYPES_DETAILS";
export const GET_APPLICATIONS = "GET_APPLICATIONS";
export const GET_KEYS_BY_APPLICATIONS = "GET_KEYS_BY_APPLICATIONS";
export const GET_VALUE_OF_KEY = "GET_VALUE_OF_KEY";
export const GET_TRUNKS_GROUPS_BY_GROUP_FAIL =
  "GET_TRUNKS_GROUPS_BY_GROUP_FAIL";
export const GET_LOCAL_USERS = "GET_LOCAL_USERS";
export const GET_LOCAL_USER = "GET_LOCAL_USER";
export const GET_AVAILABLE_NUMBERS_BY_TENANT_ID =
  "GET_AVAILABLE_NUMBERS_BY_TENANT_ID";
export const GET_SEARCH_USERS = "GET_SEARCH_USERS";
export const GET_SEARCH_GROUPS = "GET_SEARCH_GROUPS";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const GET_TENANT_LICENSES = "GET_TENANT_LICENSES";
export const GET_TRUNK_BY_TENANT_ID = "GET_TRUNK_BY_TENANT_ID";

export const POST_CREATE_GROUP_ADMIN = "POST_CREATE_GROUP_ADMIN";
export const POST_CREATE_GROUP_ADMIN_ERROR = "POST_CREATE_GROUP_ADMIN_ERROR";
export const POST_CREATE_TENANT_ADMIN = "POST_CREATE_TENANT_ADMIN";
export const POST_CREATE_TENANT_ADMIN_ERROR = "POST_CREATE_TENANT_ADMIN_ERROR";
export const POST_ASSIGN_USER_SERVICES = "POST_ASSIGN_USER_SERVICES";
export const POST_ASSIGN_USER_SERVICE_PACKS = "POST_ASSIGN_USER_SERVICE_PACKS";
export const POST_CREATE_TENANT = "POST_CREATE_TENANT";
export const POST_CREATE_GROUP = "POST_CREATE_GROUP";
export const POST_ADD_PHONE_NUMBERS_TO_TENANT =
  "POST_ADD_PHONE_NUMBERS_TO_TENANT";
export const POST_CREATE_USER_TO_GROUP = "POST_CREATE_USER_TO_GROUP";
export const POST_ADD_GROUP_SERVICES_TO_GROUP =
  "POST_ADD_GROUP_SERVICES_TO_GROUP";
export const POST_ADD_KEY_TO_APPLICATION = "POST_ADD_KEY_TO_APPLICATION";
export const POST_CREATE_LOCAL_USER = "POST_CREATE_LOCAL_USER";
export const POST_ASSIGN_PHONE_NUMBERS_TO_GROUP =
  "POST_ASSIGN_PHONE_NUMBERS_TO_GROUP";

export const PUT_UPDATE_USER = "PUT_UPDATE_USER";
export const PUT_UPDATE_GROUP_DETAILS = "PUT_UPDATE_GROUP_DETAILS";
export const PUT_UPDATE_GROUP_ADMIN = "PUT_UPDATE_GROUP_ADMIN";
export const PUT_UPDATE_TENANT_ADMIN = "PUT_UPDATE_TENANT_ADMIN";
export const PUT_UPDATE_TRUNK_BY_GROUP_ID = "PUT_UPDATE_TRUNK_BY_GROUP_ID";
export const PUT_UPDATE_TRUNK_BY_GROUP_ID_ERROR =
  "PUT_UPDATE_TRUNK_BY_GROUP_ID_ERROR";
export const PUT_UPDATE_SERVICE_PACKS_BY_GROUP_ID =
  "PUT_UPDATE_SERVICE_PACKS_BY_GROUP_ID";
export const PUT_UPDATE_GROUP_SERVICES_BY_GROUP_ID =
  "PUT_UPDATE_GROUP_SERVICES_BY_GROUP_ID";
export const PUT_UPDATE_TENANT_DETAILS = "PUT_UPDATE_TENANT_DETAILS";
export const PUT_UPDATE_KEY = "PUT_UPDATE_KEY";
export const PUT_UPDATE_TRUNK_GROUP = "PUT_UPDATE_TRUNK_GROUP";
export const PUT_UPDATE_BACKUP_BY_TRUNK_GROUP =
  "PUT_UPDATE_BACKUP_BY_TRUNK_GROUP";
export const PUT_UPDATE_LOCAL_USER = "PUT_UPDATE_LOCAL_USER";
export const PUT_UPDATE_TRUNK_BY_TENANT_ID = "PUT_UPDATE_TRUNK_BY_TENANT_ID";
export const PUT_UPDATE_GROUP_SERVICES_BY_TENANT_ID =
  "PUT_UPDATE_GROUP_SERVICES_BY_TENANT_ID";

export const DELETE_TENANT = "DELETE_TENANT";
export const DELETE_TENANT_ADMIN = "DELETE_TENANT_ADMIN";
export const DELETE_GROUP_DEVICE = "DELETE_GROUP_DEVICE";
export const DELETE_GROUP_ADMIN = "DELETE_GROUP_ADMIN";
export const DELETE_DEASSIGN_USER_SERVICES = "DELETE_DEASSIGN_USER_SERVICES";
export const DELETE_DEASSIGN_USER_SERVICE_PACKS =
  "DELETE_DEASSIGN_USER_SERVICE_PACKS";
export const DELETE_PHONE_FROM_TENANT = "DELETE_PHONE_FROM_TENANT";
export const DELETE_USER_FROM_GROUP = "DELETE_USER_FROM_GROUP";
export const DELETE_GROUP_FROM_TENANT = "DELETE_GROUP_FROM_TENANT";
export const DELETE_TRUNK_GROUP = "DELETE_TRUNK_GROUP";
export const DELETE_KEY = "DELETE_KEY";
export const DELETE_LOCAL_USER = "DELETE_LOCAL_USER";

export const CLEAR_ERROR_MASSAGE = "CLEAR_ERROR_MASSAGE";
export const CHANGE_STEP_OF_CREATE_TENANT = "CHANGE_STEP_OF_CREATE_TENANT";
export const CHANGE_TYPE_OF_TENANT = "CHANGE_TYPE_OF_TENANT";
export const CHANGE_ID_OF_TENANT = "CHANGE_ID_OF_TENANT";
export const CHANGE_NAME_OF_TENANT = "CHANGE_NAME_OF_TENANT";
export const CHANGE_ADDRESS_OF_TENANT = "CHANGE_ADDRESS_OF_TENANT";
export const CHANGE_ZIP_OF_TENANT = "CHANGE_ZIP_OF_TENANT";
export const CHANGE_CITY_OF_TENANT = "CHANGE_CITY_OF_TENANT";
export const CHANGE_TAMPLATE_OF_TENANT = "CHANGE_TAMPLATE_OF_TENANT";
export const REFUSE_CREATE_TENANT = "REFUSE_CREATE_TENANT";
export const CHANGE_DOMAIN_OF_TENANT = "CHANGE_DOMAIN_OF_TENANT";
export const REFUSE_CREATE_GROUP = "REFUSE_CREATE_GROUP";
export const CHANGE_ID_OF_GROUP = "CHANGE_ID_OF_GROUP";
export const CHANGE_NAME_OF_GROUP = "CHANGE_NAME_OF_GROUP";
export const CHANGE_DOMAIN_OF_GROUP = "CHANGE_DOMAIN_OF_GROUP";
export const CHANGE_USER_LIMIT_OF_GROUP = "CHANGE_USER_LIMIT_OF_GROUP";
export const CHANGE_ADDRESS_OF_GROUP = "CHANGE_ADDRESS_OF_GROUP";
export const CHANGE_ZIP_OF_GROUP = "CHANGE_ZIP_OF_GROUP";
export const CHANGE_CITY_OF_GROUP = "CHANGE_CITY_OF_GROUP";
export const CHANGE_STEP_OF_CREATE_GROUP = "CHANGE_STEP_OF_CREATE_GROUP";
export const CHANGE_TAMPLATE_OF_GROUP = "CHANGE_TAMPLATE_OF_GROUP";
export const CHANGE_STEP_OF_ADD_PHONE_TENANT =
  "CHANGE_STEP_OF_ADD_PHONE_TENANT";
export const REFUSE_ADD_PHONE_TO_TENANT = "REFUSE_ADD_PHONE_TO_TENANT";
export const SAVE_VALIDATED_NUMBERS_TENANT = "SAVE_VALIDATED_NUMBERS_TENANT";
export const REMOVE_SUCCESFUL_VALID_PHONE_TENANT =
  "REMOVE_SUCCESFUL_VALID_PHONE_TENANT";
