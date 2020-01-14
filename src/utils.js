export const API_URL_PREFIX =
  process.env.NODE_ENV === "production"
    ? window.location.origin
    : "https://yaoh1.bxl.netaxis.be"; //"https://engo.netaxis.be"; //
export const API_URL_PROXY_PREFIX = "/api/v01/apio/sync";

export const API_BASE_URL = "/api/v01/p5";

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2)
    return parts
      .pop()
      .split(";")
      .shift();
}

class ProvisioningProxies {
  static proxies = [];

  fetchConfiguration(auth_token) {
    return fetch_get("/api/v01/apio/provisioning/gateways", auth_token).then(
      data =>
        (ProvisioningProxies.proxies = data.gateways.map(g => {
          g.id = g.name.toLowerCase().replace(/[. ]/g, "");
          return g;
        }))
    );
  }

  getCurrentUrlPrefix() {
    return "/api/v01/p5";
  }

  listProxies() {
    return ProvisioningProxies.proxies;
  }
}

export const ProvProxiesManager = new ProvisioningProxies();

class NotificationsHandler {
  static rootRef = null;

  setRef(ref_) {
    NotificationsHandler.rootRef = ref_;
  }

  error(title, message) {
    NotificationsHandler.rootRef &&
      NotificationsHandler.rootRef.current.addNotification({
        title: title,
        message: message,
        level: "error"
      });
  }

  success(title, message) {
    NotificationsHandler.rootRef &&
      NotificationsHandler.rootRef.current.addNotification({
        title: title,
        message: message,
        level: "success"
      });
  }
}

export const NotificationsManager = new NotificationsHandler();

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    console.log("the request was *not* authorized!");
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json().then(function(json) {
      let message;
      if (response.status !== 404) {
        message = json.errors[0].details.reason
          ? `${json.errors[0].details.reason}. Status Code: ${response.status}`
          : json.errors[0].message
          ? `${json.errors[0].message}. Status Code: ${response.status}`
          : response.statusText;
      } else {
        message = `Status Code: ${response.status}. Status Text: ${response.statusText}.`;
      } //Task - [PROV GUI] Provide more clear error codes
      let error = new Error(message);
      error.response = response;
      if (json.errors) {
        error.errors = json.errors;
      }
      throw error;
    });
  }

  let error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

export function fetch_get(url) {
  const full_url = url.href
    ? url
    : url.startsWith("http")
    ? url
    : API_URL_PREFIX + url;
  return fetch(full_url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("auth_token")}`
    }
  })
    .then(checkStatus)
    .then(parseJSON);
}

export function fetch_put(url, body) {
  const full_url = url.href
    ? url
    : url.startsWith("http")
    ? url
    : API_URL_PREFIX + url;
  return fetch(full_url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("auth_token")}`
    },
    body: JSON.stringify(body)
  }).then(checkStatus);
}

export function fetch_post(url, body) {
  return fetch_post_raw(url, JSON.stringify(body), "application/json");
}

export function fetch_post_raw(url, raw_body, content_type) {
  const full_url = url.href
    ? url
    : url.startsWith("http")
    ? url
    : API_URL_PREFIX + url;
  let headers = {
    Authorization: `Bearer ${getCookie("auth_token")}`
  };
  if (content_type) {
    headers["content-type"] = content_type;
  }
  return fetch(full_url, {
    method: "POST",
    headers: headers,
    body: raw_body
  }).then(checkStatus);
}

export function fetch_delete(url, body, token) {
  const full_url = url.href
    ? url
    : url.startsWith("http")
    ? url
    : API_URL_PREFIX + url;
  return fetch(full_url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("auth_token")}`
    },
    body: JSON.stringify(body)
  }).then(checkStatus);
}
