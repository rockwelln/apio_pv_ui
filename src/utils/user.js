export const pages = Object.freeze({
  requests: 19,
  requests_nprequests: 0,
  requests_startup_events: 4,
  requests_workflow_editor: 5,
  data: 20,
  data_tenants: 6,
  system: 21,
  system_users: 12,
  system_config: 14,
  system_gateways: 15,
  system_databases: 16,
  system_reporting: 17
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
  }
};

export function isAllowed(profile, page, requested_level, requested_privilege) {
  // system access all pages
  if (profile === "system") return true; //if (profile === "user") return true; //
  // deny access for unknown profiles
  if (definition[profile] === undefined) return false;
  // deny access to non-explicit page access
  if (definition[profile][page] === undefined) return false;

  const page_access = definition[profile][page];
  if (page_access === true) return true;

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

export function is_admin(profile) {
  return profile === "admin" || profile === "system";
}
