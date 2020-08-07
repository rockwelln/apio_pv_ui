export const pages = Object.freeze({
  //////////////////// Base APIO Core
  requests_nprequests: 0, // Base APIO Core
  not_common_page: 2, // Not found what it is for in PRA code, assumed Based APIo COre
  requests_startup_events: 4, // Base APIO Core
  requests_workflow_editor: 5, // Base APIO Core
  data_tenants: 6, // Base APIO Core
  system_users: 12, // Base APIO Core
  system_config: 14, // Base APIO Core
  system_gateways: 15, // Base APIO Core
  system_databases: 16, // Base APIO Core
  system_reporting: 17, // Base APIO Core
  requests: 19, // Base APIO Core
  data: 20, // Base APIO Core
  system: 21, // Base APIO Core
  ///////////////// PRA : Access to main pages
  access_common_page: 200, // Access to the commane base pages i.e. the Enterprises and sub-pages
  access_statistics : 50,
  access_iad_reboot_pages: 51, // Access to IAD Reboot page (and menu entry)
  access_reconciliations: 52, // Access to the Reconciliation pages
  access_config_pages: 300, // Config page (and menu entry)


  ///////////////// PRA : Entreprise related
  add_enterprises: 204, // Add Enterprise
  delete_enterprises: 205, // Delete Enterprise
  edit_enterprise: 126, // Edit Enterprise details


  ///////////////// PRA : Group related
  create_group: 206, // Create a Group
  delete_group: 207, //Delete Group
  edit_group_details: 127, // Edit Group  details
  edit_group_product: 301, // Edit Group Product tab, all editable fields except service_type
  edit_group_product_service_type: 128, // Edit Group, Product tab, Service Type field
  edit_group_channels_number_of_channels: 129, // Edit Group, Channels tab, Number of Channels field
  edit_group_channels_other_fields: 130, // Edit Group, Channels tab, all fields except Number of Channels field
  edit_group_services: 131, // Edit Group, Services tab
  edit_group_number_formating_tab: 132,// Edit Group, Number Formating tab
  create_group_routing_number: 212,  // Edit Group, Numbers Routing tab, allow create
  delete_group_routing_number: 213, // Edit Group, Numbers Routing tab, allow delete
  edit_group_routing_numbers_rex_red: 133, // Edit Group, Numbers Routing tab, Config tab, Route Exhausted parameters
  edit_group_routing_numbers_other: 134, // Edit Group, Numbers Routing tab, Config tab, all other parameters
  edit_group_routing_numbers_numbers: 302, // Edit Group, Numbers Routing tab, Numbers tab
  group_numbers_refresh_selected: 203, // Edit Group, Numbers tab, allow the refresh selected button
  group_numbers_refresh_all: 210, // Edit Group, Numbers tab, allow the refresh all button
  group_numbers_other_actions: 211, // Edit Group, Numbers tab, all actions except the 2 refresh buttons


  ///////////////// PRA : IAD related
  create_iad: 208, // Group / IADs tab, add button
  delete_iad: 209, // Group / IADs tab, delete button; Group, IAD, Details, delete button
  edit_iad_details: 135, // Group, IAD, Details : edit button
  edit_iad_details_mac: 303, // Group, IAD, Details, mac address field
  edit_iad_details_main_nbr: 304, // Group, IAD, Details, main number field
  edit_iad_edu: 136, // Group, IAD, EDU tab: edit
  edit_iad_site_service_override: 137, // Group, IAD, Sites Services Override tab: edit
  edit_iad_ip_addressing: 138, // Group, IAD, IP Addressing tab: edit
  edit_iad_pra_info_tpid: 101, // Group, IAD, PRA Info tab: field tpid
  edit_iad_pra_info_circuit_id: 102, // Group, IAD, PRA Info tab: field circuit_id
  edit_iad_pra_info_pra_port: 103, // Group, IAD, PRA Info tab: field pra_port
  edit_iad_pra_info_enabled: 104, // Group, IAD, PRA Info tab: field enabled
  edit_iad_advanced_options: 140, // Group, IAD, Adanced tab, Options tab
  edit_iad_advanced_customized_tags: 141, // Group, IAD, Adanced tab, Customized Tags tab (new feature still to develop)
  access_iad_advanced_destination_numbers: 214, // Group, IAD, Adanced tab, access to Destination numbers tab


  ///////////////// PRA: Other pages
  delete_reconciliation_anomaly:305, // Reconciliation, Anomalies, can delete
  add_config_reconciliation_team: 201, //Config , Reconciliation team, can create
  delete_config_reconciliation_team: 202, //Config , Reconciliation team, can delete


  /////////////////////////////////////////
  edit_group_iad_advanced_clock_master: 100,

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



  //////////////////////////////////////////////////





  //




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
    [pages.access_common_page]: true,
    [pages.access_reconciliations]: false,
    [pages.delete_reconciliation_anomaly]: false,
    [pages.access_config_pages]: false,
    [pages.add_config_reconciliation_team]: false,
    [pages.delete_config_reconciliation_team]: false,
    [pages.access_iad_reboot_pages]: false,
    [pages.access_statistics]: true,
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
    [pages.delete_iad]: false,
    [pages.create_iad]: false,
    [pages.edit_iad_details]: false,
    [pages.edit_iad_details_mac]: false,
    [pages.edit_iad_details_main_nbr]: false,
    [pages.edit_iad_edu]: false,
    [pages.edit_iad_site_service_override]: false,
    [pages.edit_iad_ip_addressing]: false,
    [pages.edit_iad_pra_info_tpid]: false,
    [pages.edit_iad_pra_info_circuit_id]: false,
    [pages.edit_iad_pra_info_pra_port]: false,
    [pages.edit_iad_pra_info_enabled]: false,
    [pages.access_iad_advanced_destination_numbers]: false,
    [pages.edit_iad_advanced_options]: false,
    [pages.edit_iad_advanced_customized_tags]: false,



  },


  HelpDesk3: { // Tech Support User
    [pages.access_common_page]: true,
    [pages.access_reconciliations]: true,
    [pages.delete_reconciliation_anomaly]: false,
    [pages.access_config_pages]: false,
    [pages.add_config_reconciliation_team]: false,
    [pages.delete_config_reconciliation_team]: false,
    [pages.access_iad_reboot_pages]: false,
    [pages.access_statistics]: true,
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
    [pages.delete_iad]: false,
    [pages.create_iad]: true,
    [pages.edit_iad_details]: true,
    [pages.edit_iad_details_mac]: true,
    [pages.edit_iad_details_main_nbr]: true,
    [pages.edit_iad_edu]: false,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing]: true,
    [pages.edit_iad_pra_info_tpid]: true,
    [pages.edit_iad_pra_info_circuit_id]: true,
    [pages.edit_iad_pra_info_pra_port]: true,
    [pages.edit_iad_pra_info_enabled]: true,
    [pages.access_iad_advanced_destination_numbers]: false,
    [pages.edit_iad_advanced_options]: true,
    [pages.edit_iad_advanced_customized_tags]: false,





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




  },

  CPM: { // Admin User
    [pages.access_common_page]: true,
    [pages.access_reconciliations]: true,
    [pages.delete_reconciliation_anomaly]: true,
    [pages.access_config_pages]: false,
    [pages.add_config_reconciliation_team]: true,
    [pages.delete_config_reconciliation_team]: false,
    [pages.access_iad_reboot_pages]: false,
    [pages.access_statistics]: true,
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
    [pages.delete_iad]: true,
    [pages.create_iad]: true,
    [pages.edit_iad_details]: true,
    [pages.edit_iad_details_mac]: true,
    [pages.edit_iad_details_main_nbr]: true,
    [pages.edit_iad_edu]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing]: true,
    [pages.edit_iad_pra_info_tpid]: true,
    [pages.edit_iad_pra_info_circuit_id]: true,
    [pages.edit_iad_pra_info_pra_port]: true,
    [pages.edit_iad_pra_info_enabled]: true,
    [pages.access_iad_advanced_destination_numbers]: false,
    [pages.edit_iad_advanced_options]: true,
    [pages.edit_iad_advanced_customized_tags]: false,





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





  },

  VoiceOps: { // Super Admin Users, now same as VoiceEng
    [pages.access_common_page]: true,
    [pages.access_reconciliations]: true,
    [pages.delete_reconciliation_anomaly]: true,
    [pages.access_config_pages]: true,
    [pages.edit_iad_advanced_customized_tags]: true,
    [pages.delete_config_reconciliation_team]: true,
    [pages.access_iad_reboot_pages]: true,
    [pages.access_statistics]: true,
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
    [pages.delete_iad]: true,
    [pages.create_iad]: true,
    [pages.edit_iad_details]: true,
    [pages.edit_iad_details_mac]: true,
    [pages.edit_iad_details_main_nbr]: true,
    [pages.edit_iad_edu]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing]: true,
    [pages.edit_iad_pra_info_tpid]: true,
    [pages.edit_iad_pra_info_circuit_id]: true,
    [pages.edit_iad_pra_info_pra_port]: true,
    [pages.edit_iad_pra_info_enabled]: true,
    [pages.access_iad_advanced_destination_numbers]: true,
    [pages.edit_iad_advanced_options]: true,








    [pages.edit_group_iad_advanced_clock_master]: true,
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


    [pages.add_config_reconciliation_team]: true,




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
