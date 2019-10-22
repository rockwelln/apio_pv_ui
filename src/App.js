import "babel-polyfill";
import "url-polyfill";
import "isomorphic-fetch";
import React, { Component } from "react";

import Alert from "react-bootstrap/lib/Alert";
import Col from "react-bootstrap/lib/Col";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NotificationSystem from "react-notification-system";

import { withCookies } from "react-cookie";
import { FormattedMessage } from "react-intl";

import {
  API_URL_PREFIX,
  fetch_get,
  checkStatus,
  parseJSON,
  NotificationsManager
} from "./utils";
import { isAllowed, pages } from "./utils/user";
import { ResetPasswordPage, RESET_PASSWORD_PREFIX } from "./reset_password";

import AsyncApioNavBar from "./components/Header";
import LoginPage from "./components/LoginPage";
import Tenants from "./components/Tenants";
import AddEntreprises from "./components/AddEntreprises";
import AddGroup from "./components/AddGroup";
import EntreprisesPage from "./components/EntreprisesPage";
import AddIAD from "./components/AddIAD";
import AddPhoneToGroup from "./components/AddPhoneNumbersToGroup";
import IADPage from "./components/IADPage";
import EnterpriseTrunkPage from "./components/EnterpriseTrunkPage";

import TenantPage from "./components/TenantPage";
import GroupPage from "./components/GroupPage";
import UserPage from "./components/UserPage";
import CreateAdmin from "./components/CreateAdmin";
import UpdateAdmin from "./components/UpdateAdmin";
import CreateTenant from "./components/CreateTenant";
import CreateGroup from "./components/CreateGroup";
import AddPhoneNumberTenant from "./components/AddPhoneNumberTenant";
import CategoryPage from "./components/CategoryPage";
import AddUser from "./components/AddUser";
import TrunkGroupPage from "./components/TrunkGroupPage";
import ConfigPage from "./components/Configs";
import TemplatePage from "./components/TemplatePage";
import LocalUsers from "./components/LocalUsers";
import AddLocalUsers from "./components/AddLocalUser";
import UpdateLocalUser from "./components/UpdateLocalUser";
import AddPhoneNumberGroup from "./components/AddPhoneNumberGroup";
import SearchPage from "./components/SearchPage";

import "./App.css";
import loading from "./loading.gif";

const Loading = () => (
  <div>
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <img src={loading} width="200" height="200" alt="please wait..." />
    </div>
  </div>
);

const NotFound = ({ match }) => (
  <div>
    <FormattedMessage
      id="app.route.notFound"
      defaultMessage="Sorry, this page doesn't exist (yet)!"
    />
  </div>
);

const NotAllowed = ({ match }) => (
  <div>
    <FormattedMessage
      id="app.route.notAllowed"
      defaultMessage="Sorry, you are not allowed to see this page!"
    />
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    const auth_token = props.cookies.get("auth_token");
    this.state = {
      auth_token,
      user_info: undefined,
      error_msg: undefined
    };
    this._notificationSystem = React.createRef();
    NotificationsManager.setRef(this._notificationSystem);

    this.getUserInfo = this.getUserInfo.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  getUserInfo(auth_token) {
    fetch_get("/api/v01/system/users/local")
      .then(data => {
        this.setState({ user_info: data });
        this.props.onLanguageUpdate(data.language);
      })
      .catch(error => {
        if (error.response !== undefined && error.response.status === 401) {
          // unauthorized
          auth_token && this.logout();
        } else {
          this.setState({
            error_msg: (
              <FormattedMessage
                id="app.no_connection"
                defaultMessage="Connection issue: Refresh the page or contact the site admin."
              />
            )
          });
        }
      });
  }

  getDatabaseStatus() {
    fetch_get("/api/v01/system/database/status")
      .then(
        data =>
          (!this.state.database_status ||
            data.is_master !== this.state.database_status.is_master) &&
          this.setState({ database_status: data })
      )
      .catch(console.error);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.isAuthenticated() &&
      !this.state.user_info &&
      this.state.auth_token &&
      prevState.auth_token
    ) {
      this.getUserInfo(this.state.auth_token);
    }
  }

  componentDidMount() {
    this.getDatabaseStatus();
  }

  updateToken(token, sso_auth) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.setState({ auth_token: token, error_msg: undefined });
    this.props.cookies.set("auth_token", token, {
      expires: tomorrow,
      path: "/"
    }); // maxAge = 24hours
    this.props.cookies.set("auth_sso", sso_auth ? "1" : "0", { path: "/" }); // maxAge = 24hours
  }

  logout() {
    this.setState({ auth_token: undefined, user_info: undefined });
    console.log("logout");
    this.props.cookies.remove("auth_token", { path: "/" });
    this.props.cookies.remove("auth_sso", { path: "/" });
    this.props.cookies.remove("user_language", { path: "/" });
  }

  ssoTokenToLocalToken(user) {
    if (this.state.auth_token) {
      return;
    }

    console.log(`user loaded`);
    return fetch(API_URL_PREFIX + "/api/v01/auth/login_oidc", {
      method: "post",
      content_type: "application/json",
      body: JSON.stringify({
        token_type: user.token_type,
        access_token: user.access_token
      })
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(r => {
        const internal_token = r.token;
        console.log("got access token");
        this.updateToken(internal_token, true);
        return r;
      })
      .then(r => this.getUserInfo(r.token))
      .catch(console.error);
  }

  isAuthenticated() {
    const local_auth = this.state.auth_token !== undefined;

    console.log(`local_auth status: ${local_auth}`);
    return local_auth;
  }

  render() {
    const { auth_token, database_status, error_msg, user_info } = this.state;
    const authenticated = this.isAuthenticated();
    const is_reset_password =
      window.location.pathname.substr(0, RESET_PASSWORD_PREFIX.length) ===
      RESET_PASSWORD_PREFIX;
    const standby_alert = database_status && !database_status.is_master && (
      <Alert bsStyle="danger">
        <FormattedMessage
          id="standby-db-alert"
          defaultMessage="You are working on a Standby database!"
        />
      </Alert>
    );

    // reset password
    if (is_reset_password) {
      return <ResetPasswordPage standby_alert={standby_alert} />;
    }

    // need to login first
    if (!authenticated || error_msg !== undefined) {
      return (
        <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route
              component={() => (
                <LoginPage
                  updateToken={this.updateToken}
                  error_msg={error_msg}
                  standby_alert={standby_alert}
                />
              )}
            />
          </Switch>
        </Router>
      );

      //return <LoginPage updateToken={this.updateToken} error_msg={error_msg} standby_alert={standby_alert}/>
    } else if (user_info === undefined) {
      // get the right level of the user (pages allowance)
      return <Loading />;
    }

    const ui_profile = user_info.ui_profile;

    return (
      <Router>
        <div className="App">
          <NotificationSystem ref={this._notificationSystem} />
          {standby_alert}
          <div className="App-header">
            <AsyncApioNavBar
              user_group={ui_profile}
              database_status={database_status}
              logoutUser={this.logout}
              auth_token={auth_token}
            />
          </div>
          <Col mdOffset={1} md={10}>
            <Switch>
              <Route
                path="/dashboard"
                component={props => (
                  <div
                    auth_token={auth_token}
                    notifications={this._notificationSystem.current}
                    {...props}
                  />
                )}
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <Tenants />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/add"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddEntreprises />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <EntreprisesPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/addgroup"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddGroup />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <GroupPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/addiad"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddIAD />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/addphone"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddPhoneToGroup />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/iad/:iadId"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <IADPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/enterprisetrunk/:entTrunkId"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <EnterpriseTrunkPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/modifyphone"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddPhoneToGroup />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />

              {/* <Route
                path="/provisioning/:gwName/search"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <SearchPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/localusers"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <LocalUsers />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/localusers/user/:localUserName"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <UpdateLocalUser />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/localusers/adduser"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddLocalUsers />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/configs"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <ConfigPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/templates/:categoryName"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <CategoryPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/templates/:categoryName/template/:templateName"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <TemplatePage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <Tenants
                      notifications={this._notificationSystem.current}
                      {...props}
                    />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/add"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <CreateTenant />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/addphone"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddPhoneNumberTenant />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/users/:userName"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <UserPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/addadmin"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <CreateAdmin />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/adduser"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddUser />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/addphone"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddPhoneNumberGroup />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/trunkgroup/:trunkGroupName"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <TrunkGroupPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/trunkgroup/:trunkGroupName/users/:userName"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <UserPage />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/trunkgroup/:trunkGroupName/adduser"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <AddUser />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/groups/:groupId/admins/:adminId"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <UpdateAdmin />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/addadmin"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <CreateAdmin />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              />
              <Route
                path="/provisioning/:gwName/tenants/:tenantId/admins/:adminId"
                component={props =>
                  isAllowed(ui_profile, pages.data_tenants) ? (
                    <UpdateAdmin />
                  ) : (
                    <NotAllowed />
                  )
                }
                exact
              /> */}
              <Route path="/" exact>
                <Redirect to="/dashboard" />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Col>
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
