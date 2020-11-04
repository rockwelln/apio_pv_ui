import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Panel from "react-bootstrap/lib/Panel";
import { Form } from "react-bootstrap";

import Loading from "../../../../common/Loading";
import {
  fetchGetUserByName,
  fetchPutUpdateUser,
  fetchGetAccessDeviceByName,
  fetchGetLanguages
} from "../../../../store/actions";

class Details extends Component {
  state = {
    user: [],
    isLoading: true,
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
    updateMassage: "",
    isLoadingLanguages: true,
    password: "",
    confirmPassword: ""
  };

  fetchRequest = () => {
    this.setState({ isLoadingLanguages: true, isLoading: true }, () => {
      this.props.fetchGetLanguages().then(() =>
        this.setState({
          isLoadingLanguages: false
        })
      );
      this.props
        .fetchGetUserByName(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          this.props.match.params.userName
        )
        .then(() => {
          this.props.user.accessDeviceEndpoint
            ? this.props
                .fetchGetAccessDeviceByName(
                  this.props.match.params.tenantId,
                  this.props.match.params.groupId,
                  this.props.user.accessDeviceEndpoint.accessDevice.name
                )
                .then(() =>
                  this.setState({
                    emailAddress: this.props.user.emailAddress,
                    firstName: this.props.user.firstName,
                    lastName: this.props.user.lastName,
                    cliFirstName: this.props.user.cliFirstName,
                    cliLastName: this.props.user.cliLastName,
                    accessDevice: this.props.accessDevice,
                    language: this.props.user.language,
                    isLoading: false
                  })
                )
            : this.setState({
                emailAddress: this.props.user.emailAddress,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                cliFirstName: this.props.user.cliFirstName,
                cliLastName: this.props.user.cliLastName,
                language: this.props.user.language,
                isLoading: false
              });
        });
    });
  };

  componentDidMount() {
    this.fetchRequest();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.refreshTab !== prevProps.refreshTab &&
      this.props.refreshTab
    ) {
      this.fetchRequest();
    }
  }

  render() {
    const {
      isLoading,
      emailAddress,
      firstName,
      lastName,
      cliFirstName,
      cliLastName,
      language,
      emailIsValid,
      firstNameError,
      lastNameError,
      updateMassage,
      isLoadingLanguages,
      password,
      confirmPassword,
      passwordsNotMatch
    } = this.state;

    if (isLoading || isLoadingLanguages) {
      return <Loading />;
    }

    return (
      <Col md={8}>
        <Form horizontal className={"margin-1"}>
          <FormGroup controlId="Details">
            <ControlLabel className={"margin-1"}>DETAILS</ControlLabel>
            {this.props.user.sync && (
              <FormGroup controlId="Sync">
                <Col
                  componentClass={ControlLabel}
                  md={3}
                  className={"text-left"}
                >
                  Sync
                </Col>
                <Col md={9}>
                  <div className={"sync-group"}>
                    <div className={"sync-group-item"}>
                      {this.props.user.sync.ldap}
                    </div>
                    <div className={"sync-group-item"}>
                      {this.props.user.sync.ou}
                    </div>
                    <div className={"sync-group-item"}>
                      {this.props.user.sync.dn}
                    </div>
                  </div>
                </Col>
              </FormGroup>
            )}
            <FormGroup controlId="userEmail" validationState={emailIsValid}>
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
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
            <FormGroup controlId="firstName" validationState={firstNameError}>
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
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
                {firstNameError && <HelpBlock>Field is required</HelpBlock>}
              </Col>
            </FormGroup>
            <FormGroup controlId="lastName" validationState={lastNameError}>
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
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
                {lastNameError && <HelpBlock>Field is required</HelpBlock>}
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
            <FormGroup controlId="language">
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Language{"\u002a"}
              </Col>
              <Col md={9}>
                <FormControl
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
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup controlId="password" validationState={passwordsNotMatch}>
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Password
              </Col>
              <Col md={9}>
                <FormControl
                  type="password"
                  placeholder="Password"
                  defaultValue={password}
                  onChange={e =>
                    this.setState({
                      password: e.target.value,
                      passwordsNotMatch: null
                    })
                  }
                />
                {passwordsNotMatch && (
                  <HelpBlock>Passwords do not match</HelpBlock>
                )}
              </Col>
            </FormGroup>
            <FormGroup
              controlId="confirmPassword"
              validationState={passwordsNotMatch}
            >
              <Col componentClass={ControlLabel} md={3} className={"text-left"}>
                Confirm password
              </Col>
              <Col md={9}>
                <FormControl
                  type="password"
                  placeholder="Confirm password"
                  defaultValue={confirmPassword}
                  onChange={e =>
                    this.setState({
                      confirmPassword: e.target.value,
                      passwordsNotMatch: null
                    })
                  }
                />
                {passwordsNotMatch && (
                  <HelpBlock>Passwords do not match</HelpBlock>
                )}
              </Col>
            </FormGroup>
            {this.props.user.trunkEndpoint && (
              <Row>
                <Col mdOffset={3} md={9}>
                  <Panel>
                    <Panel.Heading>Trunk details</Panel.Heading>
                    <Panel.Body>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Name:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <Link>
                            {
                              this.props.user.trunkEndpoint
                                .trunkGroupDeviceEndpoint.name
                            }
                          </Link>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Line Port:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {
                              this.props.user.trunkEndpoint
                                .trunkGroupDeviceEndpoint.linePort
                            }
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Static registration capable:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {this.props.user.trunkEndpoint
                              .trunkGroupDeviceEndpoint
                              .staticRegistrationCapable
                              ? "Yes"
                              : "No"}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Use domain:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {this.props.user.trunkEndpoint
                              .trunkGroupDeviceEndpoint.useDomain
                              ? "Yes"
                              : "No"}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Is pilot user:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {this.props.user.trunkEndpoint
                              .trunkGroupDeviceEndpoint.isPilotUser
                              ? "Yes"
                              : "No"}
                          </div>
                        </Col>
                      </Row>
                    </Panel.Body>
                  </Panel>
                </Col>
              </Row>
            )}
            {this.props.user.accessDeviceEndpoint && (
              <Row>
                <Col mdOffset={3} md={9}>
                  <Panel>
                    <Panel.Heading>Device details</Panel.Heading>
                    <Panel.Body>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Name:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {
                              this.props.user.accessDeviceEndpoint.accessDevice
                                .name
                            }
                          </div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Description:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.description}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Device type:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.deviceType}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Mac address:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.macAddress}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Number of assigned ports:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {this.props.accessDevice.numberOfAssignedPorts}
                          </div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Number of ports:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.numberOfPorts}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Outbound proxy server net address:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {
                              this.props.accessDevice
                                .outboundProxyServerNetAddress
                            }
                          </div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Physical location:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.physicalLocation}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Protocol:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.protocol}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Serial number:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.serialNumber}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Status:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.status}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Stun server net address:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {this.props.accessDevice.stunServerNetAddress}
                          </div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Transport protocol:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.transportProtocol}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Use custom user name password:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>
                            {this.props.accessDevice.useCustomUserNamePassword
                              ? "Yes"
                              : "No"}
                          </div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>User name:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.userName}</div>
                        </Col>
                      </Row>
                      <Row className={"text-left"}>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>Version:</div>
                        </Col>
                        <Col md={6} className={"text-left word-break-word"}>
                          <div>{this.props.accessDevice.version}</div>
                        </Col>
                      </Row>
                    </Panel.Body>
                  </Panel>
                </Col>
              </Row>
            )}
            <Col mdOffset={3} md={9}>
              {updateMassage && (
                <HelpBlock
                  bsClass={`${
                    updateMassage === "Loading..."
                      ? "color-info"
                      : "color-success"
                  }`}
                >
                  {updateMassage}
                </HelpBlock>
              )}
            </Col>
          </FormGroup>
          <Row>
            <Col md={12} className={"padding-0"}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={this.updateUser}
                    type="submit"
                    className="btn-primary"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" /> UPDATE
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Col>
    );
  }

  validateEmail = elementValue => {
    var emailPattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    return emailPattern.test(elementValue);
  };

  updateUser = e => {
    e.preventDefault();
    const {
      useSameName,
      emailAddress,
      firstName,
      lastName,
      cliFirstName,
      cliLastName,
      language,
      password,
      confirmPassword
    } = this.state;

    if (emailAddress) {
      if (!this.validateEmail(emailAddress)) {
        this.setState({ emailIsValid: "error" });
        return;
      }
    }
    if (!firstName) {
      this.setState({ firstNameError: "error" });
      return;
    }
    if (!lastName) {
      this.setState({ lastNameError: "error" });
      return;
    }
    if (password !== confirmPassword) {
      this.setState({ passwordsNotMatch: "error" });
      return;
    }

    const data = {
      emailAddress,
      firstName,
      lastName,
      cliFirstName: useSameName ? firstName : cliFirstName,
      cliLastName: useSameName ? lastName : cliLastName,
      language,
      password
    };

    this.props.fetchPutUpdateUser(
      this.props.match.params.tenantId,
      this.props.match.params.groupId,
      this.props.match.params.userName,
      data
    );
  };
}

const mapDispatchToProps = {
  fetchGetUserByName,
  fetchPutUpdateUser,
  fetchGetAccessDeviceByName,
  fetchGetLanguages
};

const mapStateToProps = state => ({
  user: state.user,
  accessDevice: state.accessDevice,
  languages: state.languages
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details)
);
