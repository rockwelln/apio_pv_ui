import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import {
  fetchGetLocalUser,
  fetchPutUpdateLocalUser
} from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

import { USERTYPES } from "../../constants";

export class UpdateLocalUserPage extends Component {
  state = {
    user: {},
    emailIsValid: null,
    firstNameError: null,
    lastNameError: null,
    passwordError: null,
    buttonName: "Update",
    password: "",
    confirmPassword: "",
    confirmPasswordError: null
  };

  fetchReq() {
    this.props
      .fetchGetLocalUser(this.props.match.params.localUserName)
      .then(() =>
        this.setState({ user: this.props.localUser, isLoading: false })
      );
  }

  componentDidMount() {
    this.fetchReq();
  }

  render() {
    const {
      emailIsValid,
      firstNameError,
      lastNameError,
      password,
      passwordError,
      buttonName,
      confirmPassword,
      confirmPasswordError
    } = this.state;

    const {
      emailAddress,
      firstName,
      lastName,
      language,
      username,
      userType
    } = this.state.user;
    console.log(this.state.user);
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Add a new local user`}</div>
        </div>
        <div className={"panel-body"}>
          <Row>
            <Col md={8}>
              <Form horizontal className={"margin-1"}>
                <FormGroup controlId="addUser">
                  <FormGroup controlId="new-userId">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Username
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="text"
                        placeholder="Username"
                        autoComplete="new-userId"
                        defaultValue={username}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup
                    controlId="userEmail"
                    validationState={emailIsValid}
                  >
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Email
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="email"
                        placeholder="Email"
                        defaultValue={emailAddress}
                        onChange={e =>
                          this.setState({
                            user: {
                              ...this.state.user,
                              emailAddress: e.target.value
                            },
                            emailIsValid: null
                          })
                        }
                      />
                      {emailIsValid && <HelpBlock>Invalid format</HelpBlock>}
                    </Col>
                  </FormGroup>
                  <FormGroup
                    controlId="firstName"
                    validationState={firstNameError}
                  >
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      First Name
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="text"
                        placeholder="First Name"
                        defaultValue={firstName}
                        onChange={e =>
                          this.setState({
                            user: {
                              ...this.state.user,
                              firstName: e.target.value
                            },
                            firstNameError: null
                          })
                        }
                      />
                      {firstNameError && (
                        <HelpBlock>Field is required</HelpBlock>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup
                    controlId="lastName"
                    validationState={lastNameError}
                  >
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Last Name
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="text"
                        placeholder="Last Name"
                        defaultValue={lastName}
                        onChange={e =>
                          this.setState({
                            user: {
                              ...this.state.user,
                              lastName: e.target.value
                            },
                            lastNameError: null
                          })
                        }
                      />
                      {lastNameError && (
                        <HelpBlock>Field is required</HelpBlock>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup
                    controlId="new-user-password"
                    validationState={passwordError}
                  >
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Password
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        defaultValue={password}
                        onChange={e =>
                          this.setState({
                            password: e.target.value,
                            passwordError: null
                          })
                        }
                      />
                      {passwordError && (
                        <HelpBlock>
                          Field is required and min length 8 characters
                        </HelpBlock>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup
                    controlId="new-user-password2"
                    validationState={passwordError}
                  >
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Confirm password
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        defaultValue={confirmPassword}
                        onChange={e =>
                          this.setState({
                            confirmPassword: e.target.value,
                            confirmPasswordError: null
                          })
                        }
                      />
                      {confirmPasswordError && (
                        <HelpBlock>Passwords not match</HelpBlock>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="language">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Language
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="text"
                        placeholder="Language"
                        defaultValue={language}
                        disabled
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="userType">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      User type
                    </Col>
                    <Col md={9}>
                      <FormControl
                        componentClass="select"
                        value={userType}
                        onChange={e =>
                          this.setState({
                            user: {
                              ...this.state.user,
                              userType: e.target.value
                            }
                          })
                        }
                      >
                        {USERTYPES.map(type => (
                          <option key={`${type.value}`} value={type.value}>
                            {type.name}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </FormGroup>
                </FormGroup>
                <Row>
                  <Col md={12} className={"padding-0"}>
                    <div className="button-row">
                      <div className="pull-right">
                        <Button
                          onClick={this.addUser}
                          type="submit"
                          className="btn-primary"
                          disabled={buttonName === "Updating..."}
                        >
                          <Glyphicon glyph="glyphicon glyphicon-ok" />{" "}
                          {buttonName}
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
  validateEmail = elementValue => {
    var emailPattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    return emailPattern.test(elementValue);
  };

  addUser = e => {
    e.preventDefault();
    const { password, confirmPassword } = this.state;

    const {
      emailAddress,
      firstName,
      lastName,
      language,
      username,
      userType
    } = this.state.user;

    const data = {
      emailAddress,
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
      language,
      userType
    };

    if (!this.validateEmail(emailAddress)) {
      this.setState({ emailIsValid: "error" });
      return;
    }
    const clearData = removeEmpty(data);
    this.setState({ buttonName: "Updating..." }, () =>
      this.props
        .fetchPutUpdateLocalUser(
          this.props.match.params.localUserName,
          clearData
        )
        .then(res => this.setState({ buttonName: "Update" }))
    );
  };
}

const mapStateToProps = state => ({
  localUser: state.localUser
});

const mapDispatchToProps = { fetchGetLocalUser, fetchPutUpdateLocalUser };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateLocalUserPage)
);
