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
  fetchPostCreateLocalUser,
  fetchGetLanguages
} from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

import Loading from "../../common/Loading";

import { USERTYPES } from "../../constants";

export class AddLocalUserPage extends Component {
  state = {
    username: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    language: "",
    userNameError: null,
    emailIsValid: null,
    firstNameError: null,
    lastNameError: null,
    password: "",
    passwordError: null,
    buttonName: "Create",
    userType: "",
    confirmPassword: "",
    confirmPasswordError: null,
    isLoading: true
  };

  componentDidMount() {
    this.props.fetchGetLanguages().then(() =>
      this.setState({
        isLoading: false,
        language: this.props.languages.defaultLangue
      })
    );
  }

  render() {
    const {
      username,
      emailAddress,
      firstName,
      lastName,
      emailIsValid,
      firstNameError,
      lastNameError,
      userNameError,
      password,
      passwordError,
      buttonName,
      confirmPassword,
      confirmPasswordError
    } = this.state;

    if (this.state.isLoading) {
      return <Loading />;
    }

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
                  <FormGroup
                    controlId="new-userId"
                    validationState={userNameError}
                  >
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Username{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="text"
                        placeholder="Username"
                        autoComplete="new-userId"
                        defaultValue={username}
                        onChange={e =>
                          this.setState({
                            username: e.target.value,
                            userNameError: null
                          })
                        }
                      />
                      {userNameError && (
                        <HelpBlock>
                          Field is required and min length 6 characters
                        </HelpBlock>
                      )}
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
                      Email{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="email"
                        placeholder="Email"
                        defaultValue={emailAddress}
                        onChange={e =>
                          this.setState({
                            emailAddress: e.target.value,
                            emailIsValid: null
                          })
                        }
                      />
                      {emailIsValid && (
                        <HelpBlock>
                          Field is required or invalid format
                        </HelpBlock>
                      )}
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
                      First Name{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="text"
                        placeholder="First Name"
                        defaultValue={firstName}
                        onChange={e =>
                          this.setState({
                            firstName: e.target.value,
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
                      Last Name{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="text"
                        placeholder="Last Name"
                        defaultValue={lastName}
                        onChange={e =>
                          this.setState({
                            lastName: e.target.value,
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
                      Password{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="password"
                        placeholder="Password"
                        autoComplete="new-user-password"
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
                    controlId="new-user-password"
                    validationState={passwordError}
                  >
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Confirm password {"\u002a"}
                    </Col>
                    <Col md={9}>
                      <FormControl
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="new-user-password"
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
                      Language{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <FormControl
                        componentClass="select"
                        defaultValue={this.state.language}
                        onChange={e =>
                          this.setState({
                            language: e.target.value
                          })
                        }
                      >
                        {this.props.languages.availableLanguages.map(lang => (
                          <option key={`${lang.locale}`} value={lang.name}>
                            {lang.name}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="userType">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      User type{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <FormControl
                        componentClass="select"
                        defaultValue={this.state.userType}
                        onChange={e =>
                          this.setState({
                            userType: e.target.value
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
                          disabled={buttonName === "Creating..."}
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
    const {
      emailAddress,
      firstName,
      lastName,
      username,
      password,
      language,
      userType,
      confirmPassword
    } = this.state;

    if (!username || username.length < 8) {
      this.setState({ userNameError: "error" });
      return;
    }
    if (!emailAddress || !this.validateEmail(emailAddress)) {
      this.setState({ emailIsValid: "error" });
      return;
    }
    if (!firstName) {
      this.setState({ firstNameError: "error" });
      return;
    }
    if (!lastName) {
      this.setState({ lastNameError: "error" });
      return;
    }
    if (!password || password.length < 6) {
      this.setState({ passwordError: "error" });
      return;
    }
    if (password !== confirmPassword) {
      this.setState({ confirmPasswordError: "error" });
      return;
    }

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

    const clearData = removeEmpty(data);
    this.setState({ buttonName: "Creating..." }, () =>
      this.props
        .fetchPostCreateLocalUser(clearData)
        .then(res =>
          this.setState(
            { buttonName: "Create" },
            () =>
              res &&
              this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/localusers`
              )
          )
        )
    );
  };
}

const mapStateToProps = state => ({
  languages: state.languages
});

const mapDispatchToProps = { fetchPostCreateLocalUser, fetchGetLanguages };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddLocalUserPage)
);
