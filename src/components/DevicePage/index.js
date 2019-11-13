import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Modal from "react-bootstrap/lib/Modal";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";

import { FormattedMessage } from "react-intl";

import { fetchGetDevice, fetchPutUpdateDevice } from "../../store/actions";
import Loading from "../../common/Loading";
import { removeEmpty } from "../remuveEmptyInObject";

export class DevicePage extends Component {
  state = {
    isLoading: true,
    errorMacAddress: null,
    errorTPCIP: null,
    device: {}
  };

  componentDidMount() {
    this.props
      .fetchGetDevice(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.deviceName
      )
      .then(() =>
        this.setState({ isLoading: false, device: this.props.device })
      );
  }
  render() {
    if (this.state.isLoading) {
      return (
        <Modal show={this.props.isOpen}>
          <Loading />
        </Modal>
      );
    }
    return (
      <Modal show={this.props.isOpen} onHide={this.props.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.deviceName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage
                    id="deviceName"
                    defaultMessage={`Device name`}
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  placeholder={"Device name"}
                  value={this.props.deviceName}
                  disabled
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
                    defaultMessage={`Device type`}
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  placeholder={"Device name"}
                  value={this.state.device.deviceType}
                  disabled
                />
              </div>
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage id="protocol" defaultMessage={`Protocol`} />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  placeholder={"Device name"}
                  value={this.state.device.protocol}
                  disabled
                />
              </div>
            </Col>
          </Row>
          <FormGroup
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
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    autoComplete="new-address"
                    type="text"
                    value={this.state.macAddress}
                    placeholder={"MAC Address"}
                    onChange={e =>
                      this.setState({
                        device: {
                          ...this.state.device,
                          macAddress: e.target.value
                        },
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
                  <div className={"margin-right-1 flex-basis-66"}>
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
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  autoComplete="new-address"
                  type="text"
                  placeholder={"The IP Address, hostname, or domain."}
                  value={this.state.device.netAddress}
                  onChange={e =>
                    this.setState({
                      device: {
                        ...this.state.device,
                        netAddress: e.target.value
                      }
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
                  <FormattedMessage id="netPort" defaultMessage={`Net Port`} />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormGroup
                  controlId="errorMacAddress"
                  validationState={this.state.errorTPCIP}
                  className={"margin-0"}
                >
                  <FormControl
                    type="number"
                    placeholder={"The TCP/IP Port in range 1025 - 65535"}
                    defaultValue={this.state.device.netPort}
                    min={1025}
                    max={65535}
                    onChange={e => {
                      if (
                        (e.target.value < 1025 || e.target.value > 65535) &&
                        e.target.value !== ""
                      ) {
                        this.setState({
                          errorTPCIP: "error"
                        });
                        return;
                      }
                      this.setState({
                        device: {
                          ...this.state.device,
                          netPort: Number(e.target.value)
                        },
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
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  placeholder={"The IP Address, hostname, or domain."}
                  value={this.state.device.outboundProxyServerNetAddress}
                  onChange={e =>
                    this.setState({
                      device: {
                        ...this.state.device,
                        outboundProxyServerNetAddress: e.target.value
                      }
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
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  placeholder={"The IP Address, hostname, or domain."}
                  value={this.state.device.stunServerNetAddress}
                  onChange={e =>
                    this.setState({
                      device: {
                        ...this.state.device,
                        stunServerNetAddress: e.target.value
                      }
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
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  placeholder={"The access device serial number."}
                  value={this.state.device.serialNumber}
                  onChange={e =>
                    this.setState({
                      device: {
                        ...this.state.device,
                        serialNumber: e.target.value
                      }
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
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  componentClass="textarea"
                  value={this.state.device.description}
                  onChange={e =>
                    this.setState({
                      device: {
                        ...this.state.device,
                        description: e.target.value
                      }
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
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  placeholder={"Physical Location"}
                  value={this.state.device.physicalLocation}
                  onChange={e =>
                    this.setState({
                      device: {
                        ...this.state.device,
                        physicalLocation: e.target.value
                      }
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
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.device.transportProtocol}
                  onChange={e =>
                    this.setState({
                      device: {
                        ...this.state.device,
                        transportProtocol: e.target.value
                      }
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
              <div className={"margin-right-1 flex-basis-66"}>
                <Checkbox
                  checked={this.state.device.useCustomUserNamePassword}
                  onChange={e =>
                    this.setState({
                      device: {
                        ...this.state.device,
                        useCustomUserNamePassword: e.target.value
                      }
                    })
                  }
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={this.updateDevice}
                    type="submit"
                    className="btn-primary"
                    disabled={
                      this.state.errorMacAddress === "error" ||
                      this.state.errorTPCIP === "error"
                    }
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    <FormattedMessage id="create" defaultMessage="Create" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
  updateDevice = () => {
    const {
      macAddress,
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
    } = this.state.device;
    const data = {
      macAddress,
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

    this.props.fetchPutUpdateDevice(
      this.props.match.params.tenantId,
      this.props.match.params.groupId,
      this.props.deviceName,
      clearData
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

const mapStateToProps = state => ({ device: state.device });

const mapDispatchToProps = { fetchGetDevice, fetchPutUpdateDevice };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DevicePage)
);
