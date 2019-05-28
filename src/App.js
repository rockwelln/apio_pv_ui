import "babel-polyfill";
import "url-polyfill";
import "isomorphic-fetch";
import React, { Component } from "react";
import { connect } from "react-redux";

import Alert from "react-bootstrap/lib/Alert";
import Button from "react-bootstrap/lib/Button";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Form from "react-bootstrap/lib/Form";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Panel from "react-bootstrap/lib/Panel";
import Row from "react-bootstrap/lib/Row";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
//import Breadcrumb from "react-bootstrap/lib/Breadcrumb";
import Grid from "react-bootstrap/lib/Grid";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import NotificationSystem from "react-notification-system";

import { withCookies } from "react-cookie";
import { FormattedMessage } from "react-intl";

import { TenantsManagement } from "./data_apio/tenants";
import { GroupsManagement } from "./data_apio/groups";
import { NumbersManagement } from "./data_apio/numbers";
import { API_URL_PREFIX, fetch_get, checkStatus, parseJSON } from "./utils";
import { isAllowed, pages } from "./utils/user";
import { ResetPasswordPage, RESET_PASSWORD_PREFIX } from "./reset_password";

import AsyncApioNavBar from "./components/Header";
import Sidebar from "./components/Sidebar";
import Breadcrumb from "./components/Breadcrumb";

import "./App.css";
import apio_logo from "./images/logo.png";
import loading from "./loading.gif";

const ListItemLink = ({ to, children }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li role="presentation" className={match ? "active" : ""}>
        <Link to={to} role="button">
          {children}
        </Link>
      </li>
    )}
  />
);

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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onResetPassword = this.onResetPassword.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    fetch(API_URL_PREFIX + "/api/v01/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(data => this.props.updateToken(data.token))
      .catch(() => {
        this.setState({
          error: {
            message: (
              <div>
                <h4>
                  <FormattedMessage id="Oh snap! You failed to login!" />
                </h4>
                <p>
                  <FormattedMessage id="Invalid username or password." />
                </p>
              </div>
            )
          }
        });
        setTimeout(() => this.setState({ error: undefined }), 3000);
      });
  }

  onResetPassword(e) {
    fetch(API_URL_PREFIX + "/api/v01/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username
      })
    })
      .then(checkStatus)
      .then(() => {
        this.setState({ reset_sent: true });
        setTimeout(() => this.setState({ reset_sent: undefined }), 3000);
      })
      .catch(error => {
        this.setState({ error: error });
        setTimeout(() => this.setState({ error: undefined }), 3000);
      });
  }

  render() {
    return (
      <Form horizontal>
        {this.state.error && (
          <Alert bsStyle="danger">{this.state.error.message}</Alert>
        )}
        {this.state.reset_sent && (
          <Alert bsStyle="success">
            <FormattedMessage
              id="password-reset-mail-sent"
              defaultMessage="A mail to reset your password has been sent to your mailbox."
            />
          </Alert>
        )}
        <FormGroup
          validationState={this.state.errors === undefined ? null : "error"}
        >
          <Col componentClass={ControlLabel} sm={3}>
            <FormattedMessage id="username" defaultMessage="Username" />
          </Col>

          <Col sm={8}>
            <FormControl
              type="text"
              value={this.state.username}
              onChange={e =>
                this.setState({ username: e.target.value, errors: undefined })
              }
            />
          </Col>
        </FormGroup>
        <FormGroup
          validationState={this.state.errors === undefined ? null : "error"}
        >
          <Col componentClass={ControlLabel} sm={3}>
            <FormattedMessage id="password" defaultMessage="Password" />
          </Col>

          <Col sm={8}>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={e =>
                this.setState({ password: e.target.value, errors: undefined })
              }
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={3} sm={10}>
            <ButtonToolbar>
              <Button type="submit" onClick={this.onSubmit}>
                <FormattedMessage id="sign-in" defaultMessage="Sign in" />
              </Button>
              <Button onClick={this.onResetPassword} bsStyle="link">
                <FormattedMessage
                  id="reset-password"
                  defaultMessage="Reset password"
                />
              </Button>
            </ButtonToolbar>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

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

const LoginPage = ({ updateToken, error_msg, standby_alert }) => (
  <div>
    <Row style={{ height: "20px", display: "block" }} />
    <Row style={{ height: "100%", display: "block" }}>
      <Col xsOffset={1} xs={10} mdOffset={4} md={4}>
        {standby_alert}
        <Panel>
          <Panel.Body>
            <Row>
              <Col xsOffset={3} xs={6} mdOffset={3} md={7}>
                <img
                  src={apio_logo}
                  width={"100%"}
                  height={"100%"}
                  style={{ padding: 0 }}
                  alt="apio"
                />
              </Col>
            </Row>
            <Row>
              <Col xsOffset={1} xs={10} mdOffset={0} md={12}>
                {error_msg && (
                  <Alert bsStyle="danger">
                    <p>{error_msg}</p>
                  </Alert>
                )}
                {/* <LoginOpenIdConnect /> */}
                <hr />
                <LoginForm updateToken={updateToken} />
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </Col>
    </Row>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: this.props.cookies.get("auth_token"),
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
    //this.getDatabaseStatus();
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

    console.log("this.props", this.props);

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
              <Col mdOffset={1} md={10}>
                <Breadcrumb mdOffset={1} md={10} />
              </Col>
            </Row>
            <Row>
              <Col mdOffset={1} md={2}>
                <Sidebar />
              </Col>
              <Col md={8} style={{ borderLeft: "2px solid #dddddd" }}>
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
                    path="/apio/tenants"
                    component={props =>
                      isAllowed(ui_profile, pages.data_tenants) ? (
                        <TenantsManagement
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
                  <Route
                    path="/apio/tenants/:tenantId/groups"
                    component={props =>
                      isAllowed(ui_profile, pages.data_tenants) ? (
                        <GroupsManagement
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
                  <Route
                    path="/apio/tenants/:tenantId/groups/:siteId/numbers"
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

const mapStateToProps = state => {
  return {
    state: state
  };
};

export default withCookies(connect(mapStateToProps)(App));
