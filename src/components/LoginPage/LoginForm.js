import React, { Component } from "react";

import Form from "react-bootstrap/lib/Form";
import Alert from "react-bootstrap/lib/Alert";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";
import Button from "react-bootstrap/lib/Button";
import ControlLabel from "react-bootstrap/lib/ControlLabel";

import { FormattedMessage } from "react-intl";

import { API_URL_PREFIX, checkStatus, parseJSON } from "../../utils";

export default class LoginForm extends Component {
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
            <FormattedMessage id="current-password" defaultMessage="Password" />
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
