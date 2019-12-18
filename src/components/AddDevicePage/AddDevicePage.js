import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";

import Loading from "../../common/Loading";

import { FormattedMessage } from "react-intl";
import {
  fetchGetPhoneTypes,
  fetchPostDeviceInGroup
} from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

export class AddDevicePage extends Component {
  state = {
    errorMacAddress: null,
    macAddress: "",
    isLoading: true,
    deviceName: "",
    deviceType: "Other",
    showMore: false,
    netAddress: "",
    netPort: "",
    errorTPCIP: null,
    outboundProxyServerNetAddress: "",
    stunServerNetAddress: "",
    serialNumber: "",
    description: "",
    physicalLocation: "",
    transportProtocol: "",
    useCustomUserNamePassword: false,
    customDeviceType: ""
  };

  componentDidMount() {
    this.props.fetchGetPhoneTypes().then(() =>
      this.setState({
        isLoading: false,
        deviceType: this.props.phoneTypes.technicalName
          ? this.props.phoneTypes[0].technicalName
          : "Other"
      })
    );
  }
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              {`Add device to group ${this.props.match.params.groupId}`}
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="deviceName"
                      defaultMessage={`Device name`}
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    placeholder={"Device name"}
                    value={this.state.deviceName}
                    onChange={e =>
                      this.setState({ deviceName: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="deviceType"
                      defaultMessage="Device type"
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.deviceType}
                    onChange={e =>
                      this.setState({ deviceType: e.target.value })
                    }
                  >
                    <option value={"Other"}>{"Other"}</option>
                    {this.props.phoneTypes.map((el, i) => (
                      <option key={i} value={el.technicalName}>
                        {el.displayName}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            {!!(this.state.deviceType === "Other") && (
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="customDeviceType"
                        defaultMessage={`Custom device type`}
                      />
                      {"\u002a"}
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      placeholder={"Device type"}
                      value={this.state.customDeviceType}
                      onChange={e =>
                        this.setState({ customDeviceType: e.target.value })
                      }
                    />
                  </div>
                </Col>
              </Row>
            )}
            <FormGroup
              controlId="errorMacAddress"
              validationState={this.state.errorMacAddress}
              className={"margin-0"}
            >
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="macAddress"
                        defaultMessage="MAC Address"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      value={this.state.macAddress}
                      placeholder={"MAC Address"}
                      onChange={e =>
                        this.setState({
                          macAddress: e.target.value,
                          errorMacAddress: false
                        })
                      }
                      onBlur={this.validateMacAddress}
                    />
                  </div>
                </Col>
              </Row>
              {this.state.errorMacAddress && (
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}></div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <HelpBlock bsClass="color-error">
                        <FormattedMessage
                          id="errorMacAddress"
                          defaultMessage="Invalide MAC address"
                        />
                      </HelpBlock>
                    </div>
                  </Col>
                </Row>
              )}
            </FormGroup>
            {this.state.showMore && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="netAddress"
                          defaultMessage={`Net Address`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        type="text"
                        placeholder={"The IP Address, hostname, or domain."}
                        value={this.state.netAddress}
                        onChange={e =>
                          this.setState({ netAddress: e.target.value })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="netPort"
                          defaultMessage={`Net Port`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormGroup
                        controlId="errorMacAddress"
                        validationState={this.state.errorTPCIP}
                        className={"margin-0"}
                      >
                        <FormControl
                          type="number"
                          placeholder={"The TCP/IP Port in range 1025 - 65535"}
                          //value={this.state.netPort}
                          min={1025}
                          max={65535}
                          onChange={e => {
                            if (
                              (e.target.value < 1025 ||
                                e.target.value > 65535) &&
                              e.target.value !== ""
                            ) {
                              this.setState({
                                errorTPCIP: "error"
                              });
                              return;
                            }
                            this.setState({
                              netPort: Number(e.target.value),
                              errorTPCIP: null
                            });
                          }}
                        />
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="outboundProxyServerNetAddress"
                          defaultMessage={`Proxy Server Net Address`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        type="text"
                        placeholder={"The IP Address, hostname, or domain."}
                        value={this.state.outboundProxyServerNetAddress}
                        onChange={e =>
                          this.setState({
                            outboundProxyServerNetAddress: e.target.value
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="stunServerNetAddress"
                          defaultMessage={`Stun Server Net Address`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        type="text"
                        placeholder={"The IP Address, hostname, or domain."}
                        value={this.state.stunServerNetAddress}
                        onChange={e =>
                          this.setState({
                            stunServerNetAddress: e.target.value
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="serialNumber"
                          defaultMessage={`Serial Number`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        type="text"
                        placeholder={"The access device serial number."}
                        value={this.state.serialNumber}
                        onChange={e =>
                          this.setState({
                            serialNumber: e.target.value
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="description"
                          defaultMessage={`Description`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        componentClass="textarea"
                        value={this.state.description}
                        onChange={e =>
                          this.setState({
                            description: e.target.value
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="physicalLocation"
                          defaultMessage={`Location`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        type="text"
                        placeholder={"Physical Location"}
                        value={this.state.physicalLocation}
                        onChange={e =>
                          this.setState({
                            physicalLocation: e.target.value
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="transportProtocol"
                          defaultMessage={`Transport Protocol`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        type="text"
                        value={this.state.transportProtocol}
                        onChange={e =>
                          this.setState({
                            transportProtocol: e.target.value
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="useCustomUserNamePassword"
                          defaultMessage={`Use Custom User Name Password`}
                        />
                      </ControlLabel>
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <Checkbox
                        checked={this.state.useCustomUserNamePassword}
                        onChange={e =>
                          this.setState({
                            useCustomUserNamePassword: e.target.checked
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className={"flex justify-center"}>
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
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.addDevice}
                      type="submit"
                      className="btn-primary"
                      disabled={
                        !this.state.deviceName ||
                        !this.state.deviceType ||
                        !(
                          this.state.deviceType === "Other" &&
                          this.state.customDeviceType
                        ) ||
                        this.state.errorMacAddress === "error"
                      }
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />
                      <FormattedMessage id="create" defaultMessage="Create" />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      </React.Fragment>
    );
  }
  addDevice = () => {
    const {
      macAddress,
      deviceName,
      deviceType,
      netAddress,
      netPort,
      errorTPCIP,
      outboundProxyServerNetAddress,
      stunServerNetAddress,
      serialNumber,
      description,
      physicalLocation,
      transportProtocol,
      useCustomUserNamePassword,
      customDeviceType
    } = this.state;

    const data = {
      macAddress,
      deviceName,
      deviceType: deviceType === "Other" ? customDeviceType : deviceType,
      netAddress,
      netPort,
      errorTPCIP,
      outboundProxyServerNetAddress,
      stunServerNetAddress,
      serialNumber,
      description,
      physicalLocation,
      transportProtocol,
      useCustomUserNamePassword
    };
    const clearData = removeEmpty(data);
    this.props
      .fetchPostDeviceInGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        clearData
      )
      .then(
        res =>
          res === "success" &&
          this.props.history.push(
            `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`,
            { defaultTab: 4 }
          )
      );
  };

  validateMacAddress = e => {
    let regDots = /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/;
    let reg = /^([0-9A-Fa-f]{2}){5}([0-9A-Fa-f]{2})$/;
    if (
      reg.test(e.target.value) ||
      regDots.test(e.target.value) ||
      e.target.value === ""
    ) {
      return;
    } else {
      this.setState({ errorMacAddress: "error" });
    }
  };
}

const mapStateToProps = state => ({ phoneTypes: state.phoneTypes });

const mapDispatchToProps = { fetchGetPhoneTypes, fetchPostDeviceInGroup };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddDevicePage)
);
