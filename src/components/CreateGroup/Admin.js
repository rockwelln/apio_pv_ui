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
  refuseCreateGroup,
  fetchPostCreateGroupAdmin,
  changeStepOfCreateGroup
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
    emptyFieldError: "",
    creating: false
  };

  render() {
    return (
      <React.Fragment>
        {/* PANEL HEADER */}
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>Add admin to tenant</div>
            </Col>
          </Row>
        </div>

        {/* PANEL HEADER */}
        <div className={"panel-body"}>
          {/* EXPLANATION */}
          <Row>
            <Col md={12}>
              <p>Add an administrator who can manage this group</p>
            </Col>
          </Row>

          {/* FORM */}

          {/* USER-ID */}
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
                  <InputGroup.Addon>{`@${this.props.createdGroup.defaultDomain}`}</InputGroup.Addon>
                </InputGroup>
                {this.state.userIdError && (
                  <HelpBlock>
                    Must be greater than 6 and less than 80 characters
                  </HelpBlock>
                )}
              </Col>
            </FormGroup>
          </Row>

          {/* FIRST & LAST NAME */}
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

          {/* E-MAIL */}
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

          {/* PASSWORD */}
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

          {/* PASSWORD CONFIRMATION */}
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

          {/* SEND WELCOME EMAIL FLAG */}
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

          {/* BUTTONS */}
          <Row>
            <Col md={12}>
              <div class="button-row">
                <div class="pull-left">
                  {/* BACK BUTTON */}
                  <Button
                    className={"btn-success"}
                    onClick={() => this.props.changeStepOfCreateGroup("Limits")}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-backward" />
                    &nbsp; Back
                  </Button>
                </div>

                <div class="pull-right">
                  {/* CREATE & FINISH */}
                  <Button
                    onClick={() => this.createAdmin()}
                    className={"btn-primary"}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    {this.state.creating ? "Creating..." : "Create"}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div class="button-row">
                <div class="pull-right">
                  <Link
                    to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.createdTenant.tenantId}`}
                  >
                    {/* SKIP & FINISH */}
                    <Button
                      onClick={() => this.props.refuseCreateGroup()}
                      className={"btn-warning"}
                    >
                      <Glyphicon glyph="glyphicon glyphicon-stop" />
                      &nbsp; Skip
                    </Button>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
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

    this.setState({ creating: true }, () =>
      this.props
        .fetchPostCreateGroupAdmin(
          this.props.match.params.tenantId,
          this.props.createdGroup.groupId,
          this.state.createAdminData
        )
        .then(() => {
          this.props.history.push(
            `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`
          );
          this.props.refuseCreateGroup();
        })
    );
  };
}

const mapStateToProps = state => ({
  createdTenant: state.createdTenant,
  createdGroup: state.createdGroup
});

const mapDispatchToProps = {
  fetchPostCreateGroupAdmin,
  changeStepOfCreateGroup,
  refuseCreateGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Admin)
);
