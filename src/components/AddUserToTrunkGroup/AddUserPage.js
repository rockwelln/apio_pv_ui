import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Checkbox from "react-bootstrap/lib/Checkbox";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import InputGroup from "react-bootstrap/lib/InputGroup";

import { FormattedMessage } from "react-intl";
import Select from "react-select";

import {
  fetchGetCategoryByName,
  fetchPostCreateUserToGroup,
  fetchGetGroupById,
  fetchGetAvailableNumbersByGroupId,
  fetchGetLanguages,
  fetchPostAssignPhoneNumbersToGroup
} from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

import Loading from "../../common/Loading";

export class AddUserPage extends Component {
  state = {
    user: [],
    isLoadingTemplates: true,
    useSameName: true,
    emailAddress: "",
    firstName: "",
    lastName: "",
    cliFirstName: "",
    cliLastName: "",
    language: "",
    emailIsValid: null,
    firstNameError: null,
    lastNameError: null,
    userIdError: null,
    userId: "",
    password: "",
    passwordError: null,
    templateName: { value: "", label: "none" },
    buttonName: "Create",
    isLoadingGroup: true,
    phoneNumber: { value: "", label: "none" },
    isLoadingLanguages: true,
    showMore: false,
    newPhoneNumber: ""
  };

  componentDidMount = () => {
    this.props.fetchGetLanguages().then(() =>
      this.setState({
        language: {
          value: this.props.languages.defaultLangue,
          label: this.props.languages.defaultLangue
        },
        isLoadingLanguages: false
      })
    );
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.props
          .fetchGetAvailableNumbersByGroupId(
            this.props.match.params.tenantId,
            this.props.match.params.groupId
          )
          .then(() => this.setState({ isLoadingGroup: false }))
      );
    this.props
      .fetchGetCategoryByName("user")
      .then(() => this.setState({ isLoadingTemplates: false }));
  };
  render() {
    const {
      isLoadingGroup,
      isLoadingTemplates,
      emailAddress,
      firstName,
      lastName,
      cliFirstName,
      cliLastName,
      language,
      emailIsValid,
      firstNameError,
      lastNameError,
      userIdError,
      userId,
      password,
      passwordError,
      templateName,
      buttonName,
      isLoadingLanguages
    } = this.state;

    if (isLoadingGroup || isLoadingTemplates || isLoadingLanguages) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div
            className={"header"}
          >{`Add a new user to ${this.props.match.params.groupId}`}</div>
        </div>
        <div className={"panel-body"}>
          <div className="alert alert-info" role="alert">
            To add users in bulk, please use the bulk tool
          </div>
          <Row>
            <Col md={8}>
              <Form horizontal className={"margin-1"}>
                <FormGroup controlId="addUser">
                  <FormGroup controlId="phonenumber">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Phone number{"\u002a"}
                    </Col>
                    <Col md={9}>
                      <Select
                        defaultValue={this.state.phoneNumber}
                        onChange={this.setPhoneNumber}
                        placeholder="phone number"
                        isSearchable
                        options={[
                          { value: "New number", label: "New number" },
                          { value: "", label: "none" },
                          ...this.props.availableNumbers.map(number => ({
                            value: number,
                            label: number
                          }))
                        ]}
                      />
                    </Col>
                  </FormGroup>
                  {this.state.phoneNumber === "New number" && (
                    <FormGroup controlId="newNumber">
                      <Col
                        componentClass={ControlLabel}
                        md={3}
                        className={"text-left"}
                      >
                        New number{"\u002a"}
                      </Col>
                      <Col md={9}>
                        <FormControl
                          type="number"
                          placeholder="New number"
                          value={this.state.newPhoneNumber}
                          onChange={this.setNewPhoneNumber}
                        />
                      </Col>
                    </FormGroup>
                  )}
                  <FormGroup controlId="template">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Template
                    </Col>
                    <Col md={9}>
                      <Select
                        defaultValue={templateName}
                        onChange={this.setTemplate}
                        placeholder="Template"
                        options={[
                          { value: "", label: "none" },
                          ...this.props.category.templates.map(template => ({
                            value: template.name,
                            label: template.name
                          }))
                        ]}
                      />
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
                      <Select
                        value={language}
                        onChange={this.setLanguage}
                        placeholder="Language"
                        options={[
                          ...this.props.languages.availableLanguages.map(
                            lang => ({
                              value: lang.name,
                              label: lang.name
                            })
                          )
                        ]}
                      />
                      {/* <FormControl
                        componentClass="select"
                        defaultValue={language}
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
                      </FormControl> */}
                    </Col>
                  </FormGroup>
                  {this.state.showMore && (
                    <React.Fragment>
                      <FormGroup
                        controlId="new-userId"
                        validationState={userIdError}
                      >
                        <Col
                          componentClass={ControlLabel}
                          md={3}
                          className={"text-left"}
                        >
                          User ID{"\u002a"}
                        </Col>
                        <Col md={9}>
                          <InputGroup>
                            <FormControl
                              type="text"
                              placeholder="User ID"
                              autoComplete="new-userId"
                              value={userId}
                              onChange={e =>
                                this.setState({
                                  userId: e.target.value,
                                  userIdError: null
                                })
                              }
                            />
                            <InputGroup.Addon>{`@${this.props.group.defaultDomain}`}</InputGroup.Addon>
                          </InputGroup>
                          {userIdError && (
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
                          Email
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
                          {emailIsValid && <HelpBlock>Invalid email</HelpBlock>}
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
                            value={firstName}
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
                            value={lastName}
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
                      <FormGroup controlId="lastName">
                        <Col mdOffset={3} md={9}>
                          <Checkbox
                            checked={this.state.useSameName}
                            onChange={e =>
                              this.setState({
                                useSameName: e.target.checked
                              })
                            }
                          >
                            Use same Name at CLI Name
                          </Checkbox>
                        </Col>
                      </FormGroup>
                      {!this.state.useSameName && (
                        <React.Fragment>
                          <FormGroup controlId="cliFirstName">
                            <Col
                              componentClass={ControlLabel}
                              md={3}
                              className={"text-left"}
                            >
                              CLI First Name{"\u002a"}
                            </Col>
                            <Col md={9}>
                              <FormControl
                                type="text"
                                placeholder="CLI First Name"
                                value={cliFirstName}
                                onChange={e =>
                                  this.setState({
                                    cliFirstName: e.target.value
                                  })
                                }
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup controlId="cliLastName">
                            <Col
                              componentClass={ControlLabel}
                              md={3}
                              className={"text-left"}
                            >
                              CLI Last Name{"\u002a"}
                            </Col>
                            <Col md={9}>
                              <FormControl
                                type="text"
                                placeholder="CLI Last Name"
                                value={cliLastName}
                                onChange={e =>
                                  this.setState({
                                    cliLastName: e.target.value
                                  })
                                }
                              />
                            </Col>
                          </FormGroup>
                        </React.Fragment>
                      )}
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
                            autoComplete="new-password"
                            value={password}
                            onChange={e =>
                              this.setState({
                                password: e.target.value,
                                passwordError: null
                              })
                            }
                          />
                          {passwordError && (
                            <HelpBlock>
                              Field is required and min length 6 characters
                            </HelpBlock>
                          )}
                        </Col>
                      </FormGroup>
                    </React.Fragment>
                  )}
                </FormGroup>
                <Row>
                  <Col md={12} className={"padding-0"}>
                    <div className="button-row">
                      <div className="pull-right">
                        <Button
                          onClick={() =>
                            this.setState({
                              showMore: !this.state.showMore
                            })
                          }
                          bsStyle="link"
                        >
                          <FormattedMessage
                            id="showMore"
                            defaultMessage={
                              this.state.showMore ? "Hide" : "Show more"
                            }
                          />
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className={"padding-0"}>
                    <div className="button-row">
                      <div className="pull-right">
                        <Button
                          onClick={this.addUserCheckLogic}
                          type="submit"
                          className="btn-primary"
                          disabled={
                            buttonName === "Creating..." ||
                            !this.state.phoneNumber.value ||
                            (this.state.phoneNumber.value === "New number" &&
                              !this.state.newPhoneNumber)
                          }
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

  generetePassword = () => {
    const numbers = "0123456789";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const exclMark = "!";
    const all = numbers + upperCase + lowerCase + exclMark;
    let password = "";
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    password += exclMark;
    for (let i = 0; i < 6; i++) {
      password += all.charAt(Math.floor(Math.random() * all.length));
    }
    return password;
  };

  setNewPhoneNumber = e => {
    const password = this.generetePassword();
    this.setState({
      newPhoneNumber: e.target.value,
      userId: e.target.value,
      firstName: e.target.value,
      lastName: e.target.value,
      cliFirstName: e.target.value,
      cliLastName: e.target.value,
      password
    });
  };

  setPhoneNumber = selected => {
    if (selected.value === "New number") {
      this.setState({ phoneNumber: selected });
      return;
    }

    const password = this.generetePassword();
    this.setState({
      phoneNumber: selected,
      userId: selected.value,
      firstName: selected.value,
      lastName: selected.value,
      cliFirstName: selected.value,
      cliLastName: selected.value,
      password
    });
  };

  setTemplate = selected => {
    this.setState({
      templateName: selected
    });
  };

  setLanguage = selected => {
    this.setState({
      language: selected
    });
  };

  validateEmail = elementValue => {
    var emailPattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    return emailPattern.test(elementValue);
  };

  addUserCheckLogic = e => {
    e.preventDefault();
    if (this.state.phoneNumber.value === "New number") {
      this.props
        .fetchPostAssignPhoneNumbersToGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          {
            numbers: [{ phoneNumber: this.state.newPhoneNumber }],
            auto_create: true
          }
        )
        .then(res => res === "success" && this.addUser());
      return;
    }
    this.addUser();
  };

  addUser = e => {
    const {
      useSameName,
      emailAddress,
      firstName,
      lastName,
      cliFirstName,
      cliLastName,
      templateName,
      userId,
      password,
      language,
      phoneNumber,
      newPhoneNumber
    } = this.state;

    if (emailAddress) {
      if (!this.validateEmail(emailAddress)) {
        this.setState({ emailIsValid: "error" });
        return;
      }
    }
    if (!userId || userId.length < 6) {
      this.setState({ userIdError: "error" });
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

    const data = {
      userId: `${userId}@${this.props.group.defaultDomain}`,
      emailAddress,
      firstName,
      lastName,
      cliFirstName: useSameName ? firstName : cliFirstName,
      cliLastName: useSameName ? lastName : cliLastName,
      templateName: templateName.value,
      password,
      language: language.value,
      trunkEndpoint: {
        trunkGroupDeviceEndpoint: {
          name:
            this.props.match.params.trunkGroupName &&
            this.props.match.params.trunkGroupName,
          linePort: `${userId}@${this.props.group.defaultDomain}`,
          isPilotUser: false
        }
      },
      phoneNumber:
        phoneNumber.value === "New number" ? newPhoneNumber : phoneNumber.value
    };

    const clearData = removeEmpty(data);

    this.setState({ buttonName: "Creating..." }, () =>
      this.props
        .fetchPostCreateUserToGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          clearData
        )
        .then(res =>
          res === "success"
            ? this.setState({ buttonName: "Create" }, () =>
                this.props.match.params.trunkGroupName
                  ? this.props.history.push(
                      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/trunkgroup/${this.props.match.params.trunkGroupName}/users/${this.props.createdUserInGroup.userId}`
                    )
                  : this.props.history.push(
                      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/users/${this.props.createdUserInGroup.userId}`
                    )
              )
            : this.setState({ buttonName: "Create" })
        )
    );
  };
}

const mapStateToProps = state => ({
  category: state.category,
  group: state.group,
  createdUserInGroup: state.createdUserInGroup,
  availableNumbers: state.availableNumbers,
  languages: state.languages
});

const mapDispatchToProps = {
  fetchGetCategoryByName,
  fetchPostCreateUserToGroup,
  fetchGetGroupById,
  fetchGetAvailableNumbersByGroupId,
  fetchGetLanguages,
  fetchPostAssignPhoneNumbersToGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddUserPage)
);
