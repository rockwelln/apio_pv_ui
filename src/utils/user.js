export const pages = Object.freeze({
  requests_nprequests: 0,
  config_iad_reboot_pages: 1,
  not_common_page: 2,
  requests_startup_events: 4,
  requests_workflow_editor: 5,
  data_tenants: 6,
  system_users: 12,
  system_config: 14,
  system_gateways: 15,
  system_databases: 16,
  system_reporting: 17,
  reconciliations: 18,
  requests: 19,
  data: 20,
  system: 21,
  /////////////////////////////////////////
  edit_group_iad_advanced_clock_master: 100,
  edit_group_iad_pra_info_tpid: 101,
  edit_group_iad_pra_info_circuit_id: 102,
  edit_group_iad_pra_info_pra_port: 103,
  edit_group_iad_pra_info_enabled: 104,
  edit_pra_nat_dst: 105,
  edit_pra_nat_src: 106,
  edit_pra_int_src: 107,
  edit_sip_nat_dst: 108,
  edit_sip_nat_src: 109,
  edit_sip_int_src: 110,
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
  edit_enterprise: 126,
  edit_group_details: 127,
  edit_group_product_type: 128,
  edit_group_channels_number_of_channels: 129,
  edit_group_channels_other_fields: 130,
  edit_group_services: 131,
  edit_group_number_formating_tab: 132,
  edit_group_routing_numbers_rex_red: 133,
  edit_group_routing_numbers_other: 134,
  edit_iad_details: 135,
  edit_iad_edu: 136,
  edit_iad_site_service_override: 137,
  edit_iad_ip_addressing_edit: 138,
  edit_iad_pra_lines_configuration: 139,
  edit_iad_advanced_options: 140,
  edit_iad_advanced_customized_tags: 141,
  //////////////////////////////////////////////////
  common_page_access: 200,
  add_access: 201,
  delete_access: 202,
  refresh_info_phonenumbers: 203,
  add_enterprises: 204,
  delete_enterprises: 205,
  create_group: 206,
  delete_group: 207,
  create_iad: 208,
  delete_iad: 209,
  group_numbers_refresh_all: 210,
  group_numbers_other_actions: 211,
  create_group_routing_number: 212,
  delete_group_routing_number: 213,
  access_to_iad_advanced_destination_numbers: 214
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

  CPM: {
    [pages.common_page_access]: true,
    [pages.reconciliations]: true,
    [pages.not_common_page]: true,
    [pages.edit_group_iad_pra_info_tpid]: true,
    [pages.edit_group_iad_pra_info_circuit_id]: true,
    [pages.edit_group_iad_pra_info_pra_port]: true,
    [pages.edit_group_iad_pra_info_enabled]: true,
    [pages.edit_pra_nat_dst]: true,
    [pages.edit_pra_nat_src]: true,
    [pages.edit_pra_int_src]: true,
    [pages.edit_sip_nat_dst]: true,
    [pages.edit_sip_nat_src]: true,
    [pages.edit_sip_int_src]: true,
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
    [pages.edit_enterprise]: true,
    [pages.edit_group_details]: true,
    [pages.edit_group_product_type]: true,
    [pages.edit_group_channels_number_of_channels]: true,
    [pages.edit_group_channels_other_fields]: true,
    [pages.edit_group_services]: true,
    [pages.edit_group_number_formating_tab]: true,
    [pages.edit_group_routing_numbers_rex_red]: true,
    [pages.edit_group_routing_numbers_other]: true,
    [pages.edit_iad_details]: true,
    [pages.edit_iad_edu]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing_edit]: true,
    [pages.edit_iad_pra_lines_configuration]: true,
    [pages.edit_iad_advanced_options]: true,
    [pages.add_access]: true,
    [pages.delete_access]: true,
    [pages.add_enterprises]: true,
    [pages.delete_enterprises]: true,
    [pages.create_group]: true,
    [pages.delete_group]: true,
    [pages.create_iad]: true,
    [pages.delete_iad]: true,
    [pages.create_group_routing_number]: true,
    [pages.delete_group_routing_number]: true
  },

  HelpDesk1: { [pages.common_page_access]: true },

  HelpDesk2: {
    [pages.common_page_access]: true,
    [pages.reconciliations]: true,
    [pages.not_common_page]: true,
    [pages.edit_group_iad_pra_info_tpid]: true,
    [pages.edit_group_iad_pra_info_circuit_id]: true,
    [pages.edit_pra_nat_dst]: true,
    [pages.edit_pra_nat_src]: true,
    [pages.edit_pra_int_src]: true,
    [pages.edit_sip_nat_dst]: true,
    [pages.edit_sip_nat_src]: true,
    [pages.edit_sip_int_src]: true,
    [pages.edit_group_iad_ip1_mode]: true,
    [pages.edit_group_iad_ip1_ipv4Address]: true,
    [pages.edit_group_iad_ip1_ipv4Netmask]: true,
    [pages.edit_group_iad_ip1_ipv6Address]: true,
    [pages.edit_group_iad_ip1_ipv6Netmask]: true,
    [pages.edit_group_iad_pbx_IPAddress]: true,
    [pages.edit_group_iad_pbx_port]: true,
    [pages.edit_group_iad_advanced_isdnTerminationSide]: true,
    [pages.edit_group_iad_transportMode]: true,
    [pages.edit_enterprise]: true,
    [pages.edit_group_details]: true,
    [pages.edit_group_product_type]: true,
    [pages.edit_group_channels_other_fields]: true,
    [pages.edit_group_services]: true,
    [pages.edit_group_number_formating_tab]: true,
    [pages.edit_group_routing_numbers_rex_red]: true,
    [pages.edit_iad_details]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing_edit]: true,
    [pages.edit_iad_pra_lines_configuration]: true,
    [pages.edit_iad_advanced_options]: true,
    [pages.create_iad]: true,
    [pages.group_numbers_other_actions]: true
  },

  HelpDesk3: {
    [pages.common_page_access]: true,
    [pages.reconciliations]: true,
    [pages.not_common_page]: true,
    [pages.edit_group_iad_pra_info_tpid]: true,
    [pages.edit_group_iad_pra_info_circuit_id]: true,
    [pages.edit_group_iad_pra_info_pra_port]: true,
    [pages.edit_group_iad_pra_info_enabled]: true,
    [pages.edit_pra_nat_dst]: true,
    [pages.edit_pra_nat_src]: true,
    [pages.edit_pra_int_src]: true,
    [pages.edit_sip_nat_dst]: true,
    [pages.edit_sip_nat_src]: true,
    [pages.edit_sip_int_src]: true,
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
    [pages.edit_enterprise]: true,
    [pages.edit_group_details]: true,
    [pages.edit_group_product_type]: true,
    [pages.edit_group_channels_other_fields]: true,
    [pages.edit_group_services]: true,
    [pages.edit_group_number_formating_tab]: true,
    [pages.edit_group_routing_numbers_rex_red]: true,
    [pages.edit_iad_details]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing_edit]: true,
    [pages.edit_iad_advanced_options]: true,
    [pages.add_access]: true,
    [pages.delete_access]: true,
    [pages.create_iad]: true,
    [pages.group_numbers_other_actions]: true
  },

  VoiceOps: {
    [pages.common_page_access]: true,
    [pages.reconciliations]: true,
    [pages.not_common_page]: true,
    [pages.config_iad_reboot_pages]: true,
    [pages.edit_group_iad_advanced_clock_master]: true,
    [pages.edit_group_iad_pra_info_tpid]: true,
    [pages.edit_group_iad_pra_info_circuit_id]: true,
    [pages.edit_group_iad_pra_info_pra_port]: true,
    [pages.edit_group_iad_pra_info_enabled]: true,
    [pages.edit_pra_nat_dst]: true,
    [pages.edit_pra_nat_src]: true,
    [pages.edit_pra_int_src]: true,
    [pages.edit_sip_nat_dst]: true,
    [pages.edit_sip_nat_src]: true,
    [pages.edit_sip_int_src]: true,
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
    [pages.edit_enterprise]: true,
    [pages.edit_group_details]: true,
    [pages.edit_group_product_type]: true,
    [pages.edit_group_channels_number_of_channels]: true,
    [pages.edit_group_channels_other_fields]: true,
    [pages.edit_group_services]: true,
    [pages.edit_group_number_formating_tab]: true,
    [pages.edit_group_routing_numbers_rex_red]: true,
    [pages.edit_group_routing_numbers_other]: true,
    [pages.edit_iad_details]: true,
    [pages.edit_iad_edu]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing_edit]: true,
    [pages.edit_iad_advanced_options]: true,
    [pages.edit_iad_advanced_customized_tags]: true,
    [pages.add_access]: true,
    [pages.delete_access]: true,
    [pages.refresh_info_phonenumbers]: true,
    [pages.add_enterprises]: true,
    [pages.delete_enterprises]: true,
    [pages.create_group]: true,
    [pages.delete_group]: true,
    [pages.create_iad]: true,
    [pages.delete_iad]: true,
    [pages.group_numbers_refresh_all]: true,
    [pages.group_numbers_other_actions]: true,
    [pages.create_group_routing_number]: true,
    [pages.delete_group_routing_number]: true,
    [pages.access_to_iad_advanced_destination_numbers]: true
  },

  VoiceEng: {
    [pages.common_page_access]: true,
    [pages.reconciliations]: true,
    [pages.config_iad_reboot_pages]: true,
    [pages.not_common_page]: true,
    [pages.edit_group_iad_advanced_clock_master]: true,
    [pages.edit_group_iad_pra_info_tpid]: true,
    [pages.edit_group_iad_pra_info_circuit_id]: true,
    [pages.edit_group_iad_pra_info_pra_port]: true,
    [pages.edit_group_iad_pra_info_enabled]: true,
    [pages.edit_pra_nat_dst]: true,
    [pages.edit_pra_nat_src]: true,
    [pages.edit_pra_int_src]: true,
    [pages.edit_sip_nat_dst]: true,
    [pages.edit_sip_nat_src]: true,
    [pages.edit_sip_int_src]: true,
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
    [pages.edit_enterprise]: true,
    [pages.edit_group_details]: true,
    [pages.edit_group_product_type]: true,
    [pages.edit_group_channels_number_of_channels]: true,
    [pages.edit_group_channels_other_fields]: true,
    [pages.edit_group_services]: true,
    [pages.edit_group_number_formating_tab]: true,
    [pages.edit_group_routing_numbers_rex_red]: true,
    [pages.edit_group_routing_numbers_other]: true,
    [pages.edit_iad_details]: true,
    [pages.edit_iad_edu]: true,
    [pages.edit_iad_site_service_override]: true,
    [pages.edit_iad_ip_addressing_edit]: true,
    [pages.edit_iad_advanced_options]: true,
    [pages.edit_iad_advanced_customized_tags]: true,
    [pages.add_access]: true,
    [pages.delete_access]: true,
    [pages.refresh_info_phonenumbers]: true,
    [pages.add_enterprises]: true,
    [pages.delete_enterprises]: true,
    [pages.create_group]: true,
    [pages.delete_group]: true,
    [pages.create_iad]: true,
    [pages.delete_iad]: true,
    [pages.group_numbers_refresh_all]: true,
    [pages.group_numbers_other_actions]: true,
    [pages.create_group_routing_number]: true,
    [pages.delete_group_routing_number]: true,
    [pages.access_to_iad_advanced_destination_numbers]: true
  }
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

let globalProfile = "";

export function is_admin(cryptedProfile) {
  const profile = decodingUserProfile(cryptedProfile);
  return profile === "admin" || profile === "system";
}

export function encryptionUserProfile(profile) {
  globalProfile = profile;
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
