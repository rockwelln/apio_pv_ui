import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormGroup from "react-bootstrap/lib/FormGroup";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

import {
  refuseCreateTenant,
  fetchPostCreateTenantAdmin,
  changeStepOfCreateTenant
} from "../../store/actions";

export class Admin extends Component {
  state = {
    createAdminData: {
      userId: "",
      firstName: "",
      lastName: "",
      language: "English",
      password: ""
    },
    passwordConfirmation: "",
    passwordNotMatch: null,
    userIdError: null,
    passwordLenthError: null,
    emptyFieldError: ""
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <p className={"header"}>ADD TENANT: admin</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>Add an administrator who can manage this tenant</p>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <FormGroup
            controlId="passwordGroupAdmin"
            validationState={this.state.userIdError}
          >
            <Col componentClass={ControlLabel} md={2}>
              ID{"\u002a"}
            </Col>
            <Col md={10}>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Admin ID"
                  defaultValue={this.state.createAdminData.userId}
                  onChange={e => {
                    this.clearErrors();
                    this.setState({
                      createAdminData: {
                        ...this.state.createAdminData,
                        userId: e.target.value
                      }
                    });
                  }}
                />
                <InputGroup.Addon>{`@${
                  this.props.createdTenant.defaultDomain
                }`}</InputGroup.Addon>
              </InputGroup>
              {this.state.userIdError && (
                <HelpBlock>
                  Must be greater than 6 and less than 80 characters
                </HelpBlock>
              )}
            </Col>
          </FormGroup>
        </Row>
        <Row className={"margin-1"}>
          <Col componentClass={ControlLabel} md={2}>
            Name
          </Col>
          <Col md={5}>
            <FormControl
              type="text"
              placeholder="First Name"
              defaultValue={this.state.createAdminData.firstName}
              onChange={e => {
                this.clearErrors();
                this.setState({
                  createAdminData: {
                    ...this.state.createAdminData,
                    firstName: e.target.value
                  }
                });
              }}
            />
          </Col>
          <Col md={5}>
            <FormControl
              type="text"
              placeholder="Last Name"
              defaultValue={this.state.createAdminData.lastName}
              onChange={e => {
                this.clearErrors();
                this.setState({
                  createAdminData: {
                    ...this.state.createAdminData,
                    lastName: e.target.value
                  }
                });
              }}
            />
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col componentClass={ControlLabel} md={2}>
            E-mail{"\u002a"}
          </Col>
          <Col md={10}>
            <FormControl type="text" placeholder="E-mail" />
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col componentClass={ControlLabel} md={2} className={"text-left"}>
            Language
          </Col>
          <Col md={10}>
            <FormControl
              type="text"
              placeholder="Language"
              defaultValue={this.state.createAdminData.language}
              disabled
            />
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <FormGroup
            controlId="passwordGroupAdmin"
            validationState={
              this.state.passwordNotMatch || this.state.passwordLenthError
            }
          >
            <Col componentClass={ControlLabel} md={2} className={"text-left"}>
              Password{"\u002a"}
            </Col>
            <Col md={10}>
              <FormControl
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                defaultValue={this.state.createAdminData.password}
                onChange={e => {
                  this.clearErrors();
                  this.setState({
                    createAdminData: {
                      ...this.state.createAdminData,
                      password: e.target.value
                    }
                  });
                }}
              />
              {this.state.passwordLenthError && (
                <HelpBlock>
                  Must be greater than 6 and less than 80 characters
                </HelpBlock>
              )}
            </Col>
          </FormGroup>
        </Row>
        <Row className={"margin-1"}>
          <FormGroup
            controlId="passwordConfirmation"
            validationState={this.state.passwordNotMatch}
          >
            <Col componentClass={ControlLabel} md={2} className={"text-left"}>
              Password confirmation{"\u002a"}
            </Col>
            <Col md={10}>
              <FormControl
                type="password"
                placeholder="Password confirmation"
                autoComplete="new-password"
                defaultValue={this.state.passwordConfirmation}
                onChange={e => {
                  this.clearErrors();
                  this.setState({ passwordConfirmation: e.target.value });
                }}
              />
              {this.state.passwordNotMatch && (
                <HelpBlock>Passwords not match</HelpBlock>
              )}
            </Col>
          </FormGroup>
        </Row>
        <Row className={"margin-1"}>
          <Col md={12}>
            <Checkbox>Send welcome email</Checkbox>
          </Col>
        </Row>
        {this.state.emptyFieldError && (
          <Row className={"margin-1 color-error"}>
            <Col md={12}>
              <p>{this.state.emptyFieldError}</p>
            </Col>
          </Row>
        )}
        <Row className={"margin-1"}>
          <Col md={1}>
            <Button
              onClick={() => this.props.changeStepOfCreateTenant("Limits")}
            >
              <Glyphicon
                glyph="glyphicon glyphicon-backward"
                style={{ display: "flex", lineHeight: "20px" }}
              >
                <div
                  className={"margin-left-1"}
                  style={{
                    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                  }}
                >
                  BACK
                </div>
              </Glyphicon>
            </Button>
          </Col>
          <Col mdOffset={8} md={1}>
            <Link
              to={`/provisioning/${this.props.match.params.gwName}/tenants`}
            >
              <Button onClick={() => this.props.refuseCreateTenant()}>
                <Glyphicon
                  glyph="glyphicon glyphicon-forward"
                  style={{ display: "flex", lineHeight: "20px" }}
                >
                  <div
                    className={"margin-left-1"}
                    style={{
                      fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                    }}
                  >
                    SKIP
                  </div>
                </Glyphicon>
              </Button>
            </Link>
          </Col>
          <Col mdOffset={1} md={1}>
            <Button onClick={this.createAdmin}>
              <Glyphicon
                glyph="glyphicon glyphicon-ok"
                style={{ display: "flex", lineHeight: "20px" }}
              >
                <div
                  className={"margin-left-1"}
                  style={{
                    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                  }}
                >
                  ADD
                </div>
              </Glyphicon>
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  clearErrors = () => {
    this.setState({
      passwordNotMatch: null,
      userIdError: null,
      passwordLenthError: null,
      emptyFieldError: ""
    });
  };

  createAdmin = () => {
    const { createAdminData, passwordConfirmation } = this.state;
    if (createAdminData.userId < 6 || createAdminData.userId > 80) {
      this.setState({ userIdError: "error" });
      return;
    }
    if (createAdminData.password.length < 6) {
      this.setState({ passwordLenthError: "error" });
      return;
    }
    if (createAdminData.password !== passwordConfirmation) {
      this.setState({ passwordNotMatch: "error" });
      return;
    }
    if (!createAdminData.userId && !createAdminData.password) {
      this.setState({ emptyFieldError: "Id and Password is required fields" });
      return;
    }

    this.props
      .fetchPostCreateTenantAdmin(
        this.props.createdTenant.tenantId,
        this.state.createAdminData
      )
      .then(() => {
        this.props.history.push(
          `/provisioning/${this.props.match.params.gwName}/tenants`
        );
        this.props.refuseCreateTenant();
      });
  };
}

const mapStateToProps = state => ({
  createdTenant: state.createdTenant
});

const mapDispatchToProps = {
  fetchPostCreateTenantAdmin,
  refuseCreateTenant,
  changeStepOfCreateTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Admin)
);
