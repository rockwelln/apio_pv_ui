export const pages = Object.freeze({
  requests_nprequests: 0, // Base APIO Core
  iad_reboot_pages: 1, // Access to IAD Reboot page (and menu entry)
  not_common_page: 2, // Not found what it is for in PRA code
  requests_startup_events: 4, // Base APIO Core
  requests_workflow_editor: 5, // Base APIO Core
  data_tenants: 6, // Base APIO Core
  system_users: 12, // Base APIO Core
  system_config: 14, // Base APIO Core
  system_gateways: 15, // Base APIO Core
  system_databases: 16, // Base APIO Core
  system_reporting: 17, // Base APIO Core
  reconciliations: 18, // Access to the Reconciliation pages
  requests: 19, // Base APIO Core
  data: 20, // Base APIO Core
  system: 21, // Base APIO Core
  /////////////////////////////////////////
  edit_group_iad_advanced_clock_master: 100,
  edit_group_iad_pra_info_tpid: 101,
  edit_group_iad_pra_info_circuit_id: 102,
  edit_group_iad_pra_info_pra_port: 103,
  edit_group_iad_pra_info_enabled: 104,
  edit_group_iad_ip1_rtpPortRange: 111,
  edit_group_iad_ip1_mode: 112,
  edit_group_iad_ip1_ipv4Address: 113,
  edit_group_iad_ip1_ipv4Netmask: 114,
  edit_group_iad_ip1_ipv6Address: 115,
  edit_group_iad_ip1_ipv6Netmask: 116,
  edit_group_iad_pbx_IPAddress: 117,
  edit_group_iad_pbx_port: 118,
  edit_group_dtmf: 119,
  edit_group_iad_services_dtmf: 120,
  edit_group_iad_advanced_sysLogIp: 121,
  edit_group_iad_advanced_sysLogEnabled: 122,
  edit_group_iad_advanced_isdnTerminationSide: 123,
  edit_group_iad_advanced_dual_power: 124,
  edit_group_iad_transportMode: 125,
  edit_enterprise: 126, // Edit Enterprise details
  edit_group_details: 127, // Edit Group  details
  edit_group_product_service_type: 128, // Edit Group, Product tab, Service Type field
  edit_group_channels_number_of_channels: 129, // Edit Group, Channels tab, Number of Channels field
  edit_group_channels_other_fields: 130, // Edit Group, Channels tab, all fields except Number of Channels field
  edit_group_services: 131, // Edit Group, Services tab
  edit_group_number_formating_tab: 132,// Edit Group, Number Formating tab
  edit_group_routing_numbers_rex_red: 133, // Edit Group, Numbers Routing tab, Config tab, Route Exhausted parameters
  edit_group_routing_numbers_other: 134, // Edit Group, Numbers Routing tab, Config tab, all other parameters
  edit_iad_details: 135,
  edit_iad_edu: 136,
  edit_iad_site_service_override: 137,
  edit_iad_ip_addressing_edit: 138,
  edit_iad_pra_lines_configuration: 139,
  edit_iad_advanced_options: 140,
  edit_iad_advanced_customized_tags: 141,
  //////////////////////////////////////////////////
  common_page_access: 200, // Access to the commane base pages i.e. the Enterprises and sub-pages
  add_access: 201,
  delete_access: 202,
  group_numbers_refresh_selected: 203, // Edit Group, Numbers tab, allow the refresh selected button
  add_enterprises: 204, // Add Enterprise
  delete_enterprises: 205, // Delete Enterprise
  create_group: 206, // Create a Group
  delete_group: 207,
  create_iad: 208,
  delete_iad: 209,
  group_numbers_refresh_all: 210, // Edit Group, Numbers tab, allow the refresh all button
  group_numbers_other_actions: 211, // Edit Group, Numbers tab, all actions except the 2 refresh buttons
  create_group_routing_number: 212,  // Edit Group, Numbers Routing tab, allow create
  delete_group_routing_number: 213, // Edit Group, Numbers Routing tab, allow delete
  access_to_iad_advanced_destination_numbers: 214,

  //
  config_pages: 300, // Config page (and menu entry)
  edit_group_product: 301, // Edit Group Product tab
  edit_group_routing_numbers_numbers: 302, // Edit Group, Numbers Routing tab, Numbers tab
});

export const privileges = Object.freeze({});

export const access_levels = Object.freeze({
  read: 0,
  modify: 1 // include read
});

const definition = {
  // give access to all pages for the admin
  admin: Object.keys(pages).reduce(
    (o, page) => Object.assign(o, { [pages[page]]: true }),
    {}
  ),

  user: {
    [pages.data]: true,
    [pages.requests]: true,
    [pages.requests_nprequests]: true
  },

  HelpDesk1: { // Read Only
    [pages.common_page_access]: true,
    [pages.reconciliations]: false,
    [pages.config_pages]: false,
    [pages.iad_reboot_pages]: false,
    [pages.not_common_page]: false,
    [pages.add_enterprises]: false,
    [pages.edit_enterprise]: false,
    [pages.delete_enterprises]: false,
    [pages.create_group]: false,
    [pages.edit_group_details]: false,
    [pages.delete_group]: false,
    [pages.edit_group_product]: false,
    [pages.edit_group_product_service_type]: false,
    [pages.edit_group_channels_number_of_channels]: false,
    [pages.edit_group_channels_other_fields]: false,
    [pages.edit_group_services]: false,
    [pages.group_numbers_refresh_all]: false,
    [pages.group_numbers_other_actions]: false,
    [pages.group_numbers_refresh_selected]: false,
    [pages.edit_group_number_formating_tab]: false,
    [pages.create_group_routing_number]: false,
    [pages.delete_group_routing_number]: false,
    [pages.edit_group_routing_numbers_rex_red]: false,
    [pages.edit_group_routing_numbers_other]: false,
    [pages.edit_group_routing_numbers_numbers]: false,

  },


  HelpDesk3: { // Tech Support User
    [pages.common_page_access]: true,
    [pages.reconciliations]: true,
    [pages.config_pages]: false,
    [pages.iad_reboot_pages]: false,
    [pages.not_common_page]: true,
    [pages.add_enterprises]: false,
    [pages.edit_enterprise]: true,
    [pages.delete_enterprises]: false,
    [pages.create_group]: false,
    [pages.edit_group_details]: true,
    [pages.delete_group]: false,
    [pages.edit_group_product]: false,
    [pages.edit_group_product_service_type]: false,
    [pages.edit_group_channels_number_of_channels]: false,
    [pages.edit_group_channels_other_fields]: true,
    [pages.edit_group_services]: true,
    [pages.group_numbers_refresh_all]: false,
    [pages.group_numbers_other_actions]: true,
    [pages.group_numbers_refresh_selected]: true,
    [pages.edit_group_number_formating_tab]: true,
    [pages.create_group_routing_number]: false,
    [pages.delete_group_routing_number]: false,
    [pages.edit_group_routing_numbers_rex_red]: true,
    [pages.edit_group_routing_numbers_other]: false,
    [pages.edit_group_routing_numbers_numbers]: false,


    [pages.edit_group_iad_pra_info_tpid]: true,
    [pages.edit_group_iad_pra_info_circuit_id]: true,
    [pages.edit_group_iad_pra_info_pra_port]: true,
    [pages.edit_group_iad_pra_info_enabled]: true,

    [pages.edit_group_iad_ip1_rtpPortRange]: true,
    [pages.edit_group_iad_ip1_mode]: true,
    [pages.edit_group_iad_ip1_ipv4Address]: true,
    [pages.edit_group_iad_ip1_ipv4Netmask]: true,
    [pages.edit_group_iad_ip1_ipv6Address]: true,
    [pages.edit_group_iad_ip1_ipv6Netmask]: true,
    [pages.edit_group_iad_pbx_IPAddress]: true,
    [pages.edit_group_iad_pbx_port]: true,
    [pages.edit_group_dtmf]: true,
    [pages.edit_group_iad_services_dtmf]: true,
    [pages.edit_group_iad_advanced_isdnTerminationSide]: true,
    [pages.edit_group_iad_advanced_dual_power]: true,
    [pages.edit_group_iad_transportMode]: true,




    [pages.edit_iad_details]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing_edit]: true,
    [pages.edit_iad_advanced_options]: true,
    [pages.add_access]: true,
    [pages.delete_access]: true,
    [pages.create_iad]: true,

  },

  CPM: { // Admin User
    [pages.common_page_access]: true,
    [pages.config_pages]: false,
    [pages.iad_reboot_pages]: false,
    [pages.reconciliations]: true,
    [pages.not_common_page]: true,
    [pages.add_enterprises]: true,
    [pages.edit_enterprise]: true,
    [pages.delete_enterprises]: true,
    [pages.create_group]: true,
    [pages.edit_group_details]: true,
    [pages.delete_group]: true,
    [pages.edit_group_product]: true,
    [pages.edit_group_product_service_type]: true,
    [pages.edit_group_channels_number_of_channels]: true,
    [pages.edit_group_channels_other_fields]: true,
    [pages.edit_group_services]: true,
    [pages.group_numbers_refresh_all]: false,
    [pages.group_numbers_other_actions]: true,
    [pages.group_numbers_refresh_selected]: true,
    [pages.edit_group_number_formating_tab]: true,
    [pages.create_group_routing_number]: true,
    [pages.delete_group_routing_number]: true,
    [pages.edit_group_routing_numbers_rex_red]: true,
    [pages.edit_group_routing_numbers_other]: true,
    [pages.edit_group_routing_numbers_numbers]: true,



    [pages.edit_group_iad_pra_info_tpid]: true,
    [pages.edit_group_iad_pra_info_circuit_id]: true,
    [pages.edit_group_iad_pra_info_pra_port]: true,
    [pages.edit_group_iad_pra_info_enabled]: true,

    [pages.edit_group_iad_ip1_rtpPortRange]: true,
    [pages.edit_group_iad_ip1_mode]: true,
    [pages.edit_group_iad_ip1_ipv4Address]: true,
    [pages.edit_group_iad_ip1_ipv4Netmask]: true,
    [pages.edit_group_iad_ip1_ipv6Address]: true,
    [pages.edit_group_iad_ip1_ipv6Netmask]: true,
    [pages.edit_group_iad_pbx_IPAddress]: true,
    [pages.edit_group_iad_pbx_port]: true,
    [pages.edit_group_dtmf]: true,
    [pages.edit_group_iad_services_dtmf]: true,
    [pages.edit_group_iad_advanced_isdnTerminationSide]: true,
    [pages.edit_group_iad_advanced_dual_power]: true,
    [pages.edit_group_iad_transportMode]: true,

    [pages.edit_iad_details]: true,
    [pages.edit_iad_edu]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing_edit]: true,
    [pages.edit_iad_pra_lines_configuration]: true,
    [pages.edit_iad_advanced_options]: true,
    [pages.add_access]: true,
    [pages.delete_access]: true,
    [pages.create_iad]: true,
    [pages.delete_iad]: true,

  },

  VoiceOps: { // Super Admin Users, now same as VoiceEng
    [pages.common_page_access]: true,
    [pages.reconciliations]: true,
    [pages.config_pages]: true,
    [pages.iad_reboot_pages]: true,
    [pages.not_common_page]: true,
    [pages.add_enterprises]: true,
    [pages.edit_enterprise]: true,
    [pages.delete_enterprises]: true,
    [pages.create_group]: true,
    [pages.edit_group_details]: true,
    [pages.delete_group]: true,
    [pages.edit_group_product]: true,
    [pages.edit_group_product_service_type]: true,
    [pages.edit_group_channels_number_of_channels]: true,
    [pages.edit_group_channels_other_fields]: true,
    [pages.edit_group_services]: true,
    [pages.group_numbers_refresh_all]: true,
    [pages.group_numbers_other_actions]: true,
    [pages.group_numbers_refresh_selected]: true,
    [pages.edit_group_number_formating_tab]: true,
    [pages.create_group_routing_number]: true,
    [pages.delete_group_routing_number]: true,
    [pages.edit_group_routing_numbers_rex_red]: true,
    [pages.edit_group_routing_numbers_other]: true,
    [pages.edit_group_routing_numbers_numbers]: true,



    [pages.edit_group_iad_advanced_clock_master]: true,
    [pages.edit_group_iad_pra_info_tpid]: true,
    [pages.edit_group_iad_pra_info_circuit_id]: true,
    [pages.edit_group_iad_pra_info_pra_port]: true,
    [pages.edit_group_iad_pra_info_enabled]: true,

    [pages.edit_group_iad_ip1_rtpPortRange]: true,
    [pages.edit_group_iad_ip1_mode]: true,
    [pages.edit_group_iad_ip1_ipv4Address]: true,
    [pages.edit_group_iad_ip1_ipv4Netmask]: true,
    [pages.edit_group_iad_ip1_ipv6Address]: true,
    [pages.edit_group_iad_ip1_ipv6Netmask]: true,
    [pages.edit_group_iad_pbx_IPAddress]: true,
    [pages.edit_group_iad_pbx_port]: true,
    [pages.edit_group_dtmf]: true,
    [pages.edit_group_iad_services_dtmf]: true,
    [pages.edit_group_iad_advanced_sysLogIp]: true,
    [pages.edit_group_iad_advanced_sysLogEnabled]: true,
    [pages.edit_group_iad_advanced_isdnTerminationSide]: true,
    [pages.edit_group_iad_advanced_dual_power]: true,
    [pages.edit_group_iad_transportMode]: true,




    [pages.edit_iad_details]: true,
    [pages.edit_iad_edu]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing_edit]: true,
    [pages.edit_iad_advanced_options]: true,
    [pages.edit_iad_advanced_customized_tags]: true,
    [pages.add_access]: true,
    [pages.delete_access]: true,

    [pages.create_iad]: true,
    [pages.delete_iad]: true,

    [pages.access_to_iad_advanced_destination_numbers]: true,
  },

};

export function isAllowed(
  cryptedProfile,
  page,
  requested_level,
  requested_privilege
) {
  const profile = decodingUserProfile(cryptedProfile);
  // system access all pages
  if (profile === "user") return true; //if (profile === "system") return true;
  // deny access for unknown profiles
  if (definition[profile] === undefined) return false;
  // deny access to non-explicit page access
  if (definition[profile][page] === undefined) return false;

  const page_access = definition[profile][page];

  if (page_access) return true;

  if (requested_level === undefined && requested_privilege === undefined)
    return page_access.level >= access_levels.read;

  if (requested_level !== undefined) {
    return page_access.level >= requested_level;
  } else {
    return (
      page_access.privileges &&
      page_access.privileges.indexOf(requested_privilege) !== -1
    );
  }
}

export function is_admin(cryptedProfile) {
  const profile = decodingUserProfile(cryptedProfile);
  return profile === "admin" || profile === "system";
}

export function encryptionUserProfile(profile) {
  let crypted = [];
  for (let i = 0; i < profile.length; i++) {
    let code = profile.charCodeAt(i) ^ 32;
    crypted.push(code);
  }
  const string = crypted.join(" ");
  return string;
}

function decodingUserProfile(profile) {
  if (profile) {
    let decoded = "";
    let crypredArr = profile.split(" ");

    for (let j = 0; j < crypredArr.length; j++) {
      let code = crypredArr[j] ^ 32;
      decoded = decoded + String.fromCharCode(code);
    }
    return decoded;
  }
  return;
}
