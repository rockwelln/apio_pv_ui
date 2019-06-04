import "babel-polyfill";
import "url-polyfill";
import "isomorphic-fetch";
import React, { Component } from "react";

import Alert from "react-bootstrap/lib/Alert";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Grid from "react-bootstrap/lib/Grid";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NotificationSystem from "react-notification-system";

import { withCookies } from "react-cookie";
import { FormattedMessage } from "react-intl";

import { NumbersManagement } from "./data_apio/numbers";
import { API_URL_PREFIX, fetch_get, checkStatus, parseJSON } from "./utils";
import { isAllowed, pages } from "./utils/user";
import { ResetPasswordPage, RESET_PASSWORD_PREFIX } from "./reset_password";

import AsyncApioNavBar from "./components/Header";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";
import LoginPage from "./components/LoginPage";
import Tenants from "./components/Tenants";
import TenantPage from "./components/TenantPage";

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

    this.getUserInfo = this.getUserInfo.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.logout = this.logout.bind(this);
  }

  getUserInfo(auth_token) {
    fetch_get("/api/v01/system/users/local", auth_token)
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

  componentWillUpdate() {
    if (
      this.isAuthenticated() &&
      !this.state.user_info &&
      this.state.auth_token
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
          <Grid>
            <Row>
              <Col md={12}>
                <Breadcrumb />
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Sidebar />
              </Col>
              <Col md={10} style={{ borderLeft: "2px solid #dddddd" }}>
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
                    path="/provisioning/broadsoft_xsp1_as1/tenants"
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
                    path="/provisioning/broadsoft_xsp1_as1/tenants/:tenantId"
                    component={props =>
                      isAllowed(ui_profile, pages.data_tenants) ? (
                        <TenantPage />
                      ) : (
                        <NotAllowed />
                      )
                    }
                    exact
                  />
                  <Route
                    path="/data/tenants/:tenantId/groups/:siteId/numbers"
                    component={props =>
                      isAllowed(ui_profile, pages.data_tenants) ? (
                        <NumbersManagement
                          auth_token={auth_token}
                          notifications={this._notificationSystem.current}
                          {...props}
                        />
                      ) : (
                        <NotAllowed />
                      )
                    }
                    exact
                  />
                  <Route path="/" exact>
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route component={NotFound} />
                </Switch>
              </Col>
            </Row>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default withCookies(App);
