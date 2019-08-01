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

import {
  fetchGetCategoryByName,
  fetchPostCreateUserToGroup,
  fetchGetGroupById
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
    language: "English",
    emailIsValid: null,
    firstNameError: null,
    lastNameError: null,
    userIdError: null,
    userId: "",
    password: "",
    passwordError: null,
    templateName: "",
    buttonName: "Create",
    isLoadingGroup: true
  };

  componentDidMount = () => {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoadingGroup: false }));
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
      buttonName
    } = this.state;

    if (isLoadingGroup || isLoadingTemplates) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Add new user to group ${
            this.props.match.params.groupId
          }`}</div>
        </div>
        <div className={"panel-body"}>
          <div className="alert alert-info" role="alert">
            To add users in bulk, please use the bulk tool
          </div>
          <Row>
            <Col md={8}>
              <Form horizontal className={"margin-1"}>
                <FormGroup controlId="addUser">
                  <FormGroup
                    controlId="new-userId"
                    validationState={userIdError}
                  >
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      User ID
                    </Col>
                    <Col md={9}>
                      <InputGroup>
                        <FormControl
                          type="text"
                          placeholder="User ID"
                          autoComplete="new-userId"
                          defaultValue={userId}
                          onChange={e =>
                            this.setState({
                              userId: e.target.value,
                              userIdError: null
                            })
                          }
                        />
                        <InputGroup.Addon>{`@${
                          this.props.group.defaultDomain
                        }`}</InputGroup.Addon>
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
                      First Name
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
                      Last Name
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
                          CLI First Name
                        </Col>
                        <Col md={9}>
                          <FormControl
                            type="text"
                            placeholder="CLI First Name"
                            defaultValue={cliFirstName}
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
                          CLI Last Name
                        </Col>
                        <Col md={9}>
                          <FormControl
                            type="text"
                            placeholder="CLI Last Name"
                            defaultValue={cliLastName}
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
                        <HelpBlock>Field is required</HelpBlock>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup controlId="template">
                    <Col
                      componentClass={ControlLabel}
                      md={3}
                      className={"text-left"}
                    >
                      Template
                    </Col>
                    <Col md={9}>
                      <FormControl
                        componentClass="select"
                        placeholder="Template"
                        defaultValue={templateName}
                        onChange={e =>
                          this.setState({
                            templateName: e.target.value
                          })
                        }
                      >
                        <option key={"none"} value="">
                          none
                        </option>
                        {this.props.category.templates.map(template => (
                          <option
                            key={`${template.name}`}
                            value={template.name}
                          >
                            {template.name}
                          </option>
                        ))}
                        ))}
                      </FormControl>
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
      useSameName,
      emailAddress,
      firstName,
      lastName,
      cliFirstName,
      cliLastName,
      templateName,
      userId,
      password,
      language
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
    if (!password) {
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
      templateName,
      password,
      language
    };
    const clearData = removeEmpty(data);
    console.log(clearData);

    this.setState({ buttonName: "Creating..." }, () =>
      this.props
        .fetchPostCreateUserToGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          clearData
        )
        .then(res =>
          this.setState(
            { buttonName: "Create" },
            () =>
              res &&
              this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/tenants/${
                  this.props.match.params.tenantId
                }/groups/${this.props.match.params.groupId}/users/${
                  this.props.createdUserInGroup.userId
                }`
              )
          )
        )
    );
  };
}

const mapStateToProps = state => ({
  category: state.category,
  group: state.group,
  createdUserInGroup: state.createdUserInGroup
});

const mapDispatchToProps = {
  fetchGetCategoryByName,
  fetchPostCreateUserToGroup,
  fetchGetGroupById
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddUserPage)
);