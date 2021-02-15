import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Radio from "react-bootstrap/lib/Radio";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

import RebootWindow from "../RebootWindow";

import { FormattedMessage } from "react-intl";

import {
  changeIAD,
  fetchPutUpdateIAD,
  changeObjectIAD
} from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";

import { TRANSPORTMODE, IP1MODE } from "../../../constants";

import { isAllowed, pages } from "../../../utils/user";

export class IPAddress extends Component {
  state = {
    ip1: {},
    pbx: {},
    transportMode: "",
    disabledButton: false,
    errorMacAddress: null,
    errorPbxIpAdress: null,
    errorIpAdressV4: null,
    errorNetMaskV4: null,
    errorIpAdressV6: null,
    errorNetMaskV6: null,
    showRebootDialog: false
  };

  componentDidMount() {
    this.setState({
      ip1: this.props.iad.ip1 ? this.props.iad.ip1 : {},
      pbx: this.props.iad.pbx ? this.props.iad.pbx : {},
      transportMode: this.props.iad.transportMode
        ? this.props.iad.transportMode
        : ""
    });
  }
  render() {
    const {
      errorMacAddress,
      errorPbxIpAdress,
      errorIpAdressV4,
      errorNetMaskV4,
      errorIpAdressV6,
      errorNetMaskV6
    } = this.state;
    return (
      <React.Fragment>
        {(this.props.iad.protocolMode === "SIP" ||
          this.props.iad.protocolMode === "PRA_SIP" ||
          this.props.iad.protocolMode === "SIP_PRA") && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage
                    id="transportMode"
                    defaultMessage="Transport mode"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex"}>
                <FormGroup className={"margin-0 flex"}>
                  {TRANSPORTMODE.map((type, i) => (
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      key={i + ""}
                      name="transportMode"
                      value={type.value}
                      checked={type.value === this.state.transportMode}
                      onChange={this.changeTransportMode}
                      disabled={
                        !isAllowed(
                          localStorage.getItem("userProfile"),
                          pages.edit_iad_ip_addressing
                        )
                      }
                    >
                      <div className="font-weight-bold flex">{type.name}</div>
                    </Radio>
                  ))}
                </FormGroup>
              </div>
            </Col>
          </Row>
        )}
        {(this.props.iad.protocolMode === "SIP" ||
          this.props.iad.protocolMode === "PRA_SIP" ||
          this.props.iad.protocolMode === "SIP_PRA") && (
          <React.Fragment>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="iadLanAddress"
                      defaultMessage="IAD LAN address"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    {IP1MODE.map((type, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="ip1mode"
                        value={type.value}
                        checked={type.value === this.state.ip1.mode}
                        onChange={e =>
                          this.setState({
                            ip1: { ...this.state.ip1, mode: e.target.value }
                          })
                        }
                        disabled={
                          !isAllowed(
                            localStorage.getItem("userProfile"),
                            pages.edit_iad_ip_addressing
                          )
                        }
                      >
                        <div className="font-weight-bold flex">{type.name}</div>
                      </Radio>
                    ))}
                  </FormGroup>
                </div>
              </Col>
            </Row>
            {this.state.ip1.mode === "IPv4" && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={6}>
                    <FormGroup
                      controlId="errorIpAdressv4"
                      validationState={this.state.errorIpAdressV4}
                      className={"ip-address-styles"}
                    >
                      <ControlLabel className={"margin-right-1 flex-basis-33"}>
                        <FormattedMessage
                          id="IPv4Address"
                          defaultMessage="IPv4 address"
                        />
                      </ControlLabel>
                      <FormControl
                        className={"flex-basis-66"}
                        type="text"
                        value={this.state.ip1.ipv4Address}
                        placeholder={"IPv4 address"}
                        onChange={e =>
                          this.setState({
                            ip1: {
                              ...this.state.ip1,
                              ipv4Address: e.target.value
                            },
                            errorIpAdressV4: null
                          })
                        }
                        onBlur={this.validateIPAddressV4}
                        disabled={
                          !isAllowed(
                            localStorage.getItem("userProfile"),
                            pages.edit_iad_ip_addressing
                          )
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.errorIpAdressV4 && (
                  <Row className={"margin-top-1 "}>
                    <Col md={6} className={"flex"}>
                      <div
                        className={"margin-right-1 flex flex-basis-33"}
                      ></div>
                      <div className={"flex-basis-66"}>
                        <HelpBlock bsClass="color-error">
                          <FormattedMessage
                            id="errorIpAdress"
                            defaultMessage="Invalide IP address"
                          />
                        </HelpBlock>
                      </div>
                    </Col>
                  </Row>
                )}
                <Row className={"margin-top-1"}>
                  <Col md={6}>
                    <FormGroup
                      controlId="errorNetMaskV4"
                      validationState={this.state.errorNetMaskV4}
                      className={"ip-address-styles"}
                    >
                      <ControlLabel className={"margin-right-1 flex-basis-33"}>
                        <FormattedMessage
                          id="IPv4Netmask"
                          defaultMessage="IPv4 netmask"
                        />
                      </ControlLabel>
                      <FormControl
                        className={"flex-basis-66"}
                        type="text"
                        value={this.state.ip1.ipv4Netmask}
                        placeholder={"IPv4 netmask"}
                        onChange={e =>
                          this.setState({
                            ip1: {
                              ...this.state.ip1,
                              ipv4Netmask: e.target.value
                            },
                            errorNetMaskV4: null
                          })
                        }
                        onBlur={this.validateNetMaskV4}
                        disabled={
                          !isAllowed(
                            localStorage.getItem("userProfile"),
                            pages.edit_iad_ip_addressing
                          )
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.errorNetMaskV4 && (
                  <Row className={"margin-top-1 "}>
                    <Col md={6} className={"flex"}>
                      <div
                        className={"margin-right-1 flex flex-basis-33"}
                      ></div>
                      <div className={"flex-basis-66"}>
                        <HelpBlock bsClass="color-error">
                          <FormattedMessage
                            id="errorNetMask"
                            defaultMessage="Invalide Net Mask"
                          />
                        </HelpBlock>
                      </div>
                    </Col>
                  </Row>
                )}
              </React.Fragment>
            )}
            {this.state.ip1.mode === "IPv6" && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={6}>
                    <FormGroup
                      controlId="errorIpAdressv6"
                      validationState={this.state.errorIpAdressV6}
                      className={"ip-address-styles"}
                    >
                      <ControlLabel className={"margin-right-1 flex-basis-33"}>
                        <FormattedMessage
                          id="IPv6Address"
                          defaultMessage="IPv6 address"
                        />
                      </ControlLabel>
                      <FormControl
                        className={"flex-basis-66"}
                        value={this.state.ip1.ipv6Address}
                        placeholder={"IPv6 address"}
                        onChange={e =>
                          this.setState({
                            ip1: {
                              ...this.state.ip1,
                              ipv6Address: e.target.value
                            },
                            errorIpAdressV6: null
                          })
                        }
                        type="text"
                        onBlur={this.validateIPAddressV6}
                        disabled={
                          !isAllowed(
                            localStorage.getItem("userProfile"),
                            pages.edit_iad_ip_addressing
                          )
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.errorIpAdressV6 && (
                  <Row className={"margin-top-1 "}>
                    <Col md={6} className={"flex"}>
                      <div
                        className={"margin-right-1 flex flex-basis-33"}
                      ></div>
                      <div className={"flex-basis-66"}>
                        <HelpBlock bsClass="color-error">
                          <FormattedMessage
                            id="errorIpAdress"
                            defaultMessage="Invalide IP address"
                          />
                        </HelpBlock>
                      </div>
                    </Col>
                  </Row>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {(this.props.iad.protocolMode === "SIP" ||
          this.props.iad.protocolMode === "PRA_SIP" ||
          this.props.iad.protocolMode === "SIP_PRA") && (
          <React.Fragment>
            <Row className={"margin-top-1 "}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="IPPBXAddress"
                      defaultMessage="IP-PBX address"
                    />
                  </ControlLabel>
                </div>
                <div
                  className={
                    "margin-right-1 flex flex-basis-33 align-items-center"
                  }
                >
                  <FormGroup
                    controlId="errorPbxIpAdress"
                    validationState={this.state.errorPbxIpAdress}
                    className={"margin-0 flex width-100p"}
                  >
                    <div className={"flex align-items-center width-100p"}>
                      <ControlLabel className={"margin-0 margin-right-1"}>
                        <FormattedMessage
                          id="ipAddress"
                          defaultMessage="IP Address"
                        />
                      </ControlLabel>
                      <FormControl
                        type="text"
                        value={this.state.pbx.ipAddress}
                        placeholder={"IP Address"}
                        onChange={e =>
                          this.setState({
                            pbx: {
                              ...this.state.pbx,
                              ipAddress: e.target.value
                            },
                            errorPbxIpAdress: null
                          })
                        }
                        onBlur={this.validatePbxIPAddress}
                        disabled={
                          !isAllowed(
                            localStorage.getItem("userProfile"),
                            pages.edit_iad_ip_addressing
                          )
                        }
                      />
                    </div>
                  </FormGroup>
                </div>
                <div
                  className={
                    "margin-right-1 flex flex-basis-33 align-items-center"
                  }
                >
                  <ControlLabel className={"margin-0 margin-right-1"}>
                    <FormattedMessage id="port" defaultMessage="Port" />
                  </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.pbx.port}
                    placeholder={"Port"}
                    onChange={e => {
                      if (isNaN(e.target.value)) {
                        return;
                      }
                      this.setState({
                        pbx: { ...this.state.pbx, port: e.target.value }
                      });
                    }}
                    disabled={
                      !isAllowed(
                        localStorage.getItem("userProfile"),
                        pages.edit_iad_ip_addressing
                      )
                    }
                  />
                </div>
              </Col>
            </Row>
            {this.state.errorPbxIpAdress && (
              <Row className={"margin-top-1 "}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}></div>
                  <div
                    className={
                      "margin-right-1 flex flex-basis-33 align-items-center"
                    }
                  >
                    <HelpBlock bsClass="color-error">
                      <FormattedMessage
                        id="errorIpAdress"
                        defaultMessage="Invalide IP address"
                      />
                    </HelpBlock>
                  </div>
                </Col>
              </Row>
            )}
          </React.Fragment>
        )}
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                {isAllowed(
                  localStorage.getItem("userProfile"),
                  pages.edit_iad_ip_addressing
                ) ? (
                  <Button
                    onClick={this.updateIAD}
                    type="submit"
                    className="btn-primary"
                    disabled={
                      this.state.disabledButton ||
                      errorMacAddress ||
                      errorPbxIpAdress ||
                      errorIpAdressV4 ||
                      errorNetMaskV4 ||
                      errorIpAdressV6 ||
                      errorNetMaskV6
                    }
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    {this.state.disabledButton ? (
                      <FormattedMessage
                        id="updating"
                        defaultMessage="Updating..."
                      />
                    ) : (
                      <FormattedMessage id="update" defaultMessage="Update" />
                    )}
                  </Button>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>
        <RebootWindow
          data={this.state.data}
          show={this.state.showRebootDialog}
          onClose={() => this.setState({ showRebootDialog: false })}
        />
      </React.Fragment>
    );
  }

  updateIAD = () => {
    const { transportMode, ip1, pbx } = this.state;
    const checkedIp =
      ip1.mode === "disabled"
        ? { mode: ip1.mode }
        : ip1.mode === "IPv4"
        ? {
            mode: ip1.mode,
            ipv4Address: ip1.ipv4Address,
            ipv4Netmask: ip1.ipv4Netmask
          }
        : ip1.mode === "IPv6"
        ? {
            mode: ip1.mode,
            ipv6Address: ip1.ipv6Address,
            ipv4Netmask: ip1.ipv6Netmask
          }
        : null;
    const data = { transportMode, pbx, ip1: checkedIp };
    const clearData = removeEmpty(data);

    if (Object.keys(clearData).length) {
      this.setState({ data: clearData, showRebootDialog: true });
      return;
    }

    this.setState({ disabledButton: true }, () =>
      this.setState({ disabledButton: false })
    );
    // if (Object.keys(clearData).length) {
    //   this.setState({ disabledButton: true }, () =>
    //     this.props
    //       .fetchPutUpdateIAD(
    //         this.props.match.params.tenantId,
    //         this.props.match.params.groupId,
    //         this.props.match.params.iadId,
    //         clearData
    //       )
    //       .then(() => this.setState({ disabledButton: false }))
    //   );
    // } else {
    //   this.setState({ disabledButton: true }, () =>
    //     this.setState({ disabledButton: false })
    //   );
    // }
  };

  validateNetMaskV6 = e => {
    let reg = /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/;
    if (reg.test(e.target.value) || e.target.value === "") {
      return;
    } else {
      return this.setState({ errorNetMaskV6: "error" });
    }
  };

  validateIPAddressV6 = e => {
    let reg = /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/;
    let parts =  e.target.value.split("/")
    if (parts.length > 2) {
      return this.setState({ errorIpAdressV6: "error" });
    }
    if (parts.length < 2) {
      if (reg.test(e.target.value) || e.target.value === "") {
        return;
      } else {
        return this.setState({ errorIpAdressV6: "error" });
      }
    }
    // not > 2 and not 2 so automatically 2: ip + mask
    if (reg.test(parts[0]) || parts[0] === "") {
      if (!isNaN(parts[1])) { //mask is not a number
        return this.setState({ errorIpAdressV6: "error" });
      }
      if (parseInt(parts[1]) > 128) { // mask value is too big
        return this.setState({ errorIpAdressV6: "error" });
      }
      // other cases: the mask is ok
      return;
    } else {
      return this.setState({ errorIpAdressV6: "error" });
    }

  };

  validateNetMaskV4 = e => {
    let reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    if (reg.test(e.target.value) || e.target.value === "") {
      return;
    } else {
      return this.setState({ errorNetMaskV4: "error" });
    }
  };

  validateIPAddressV4 = e => {
    let reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    if (reg.test(e.target.value) || e.target.value === "") {
      return;
    } else {
      return this.setState({ errorIpAdressV4: "error" });
    }
  };

  validatePbxIPAddress = e => {
    let reg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
    if (reg.test(e.target.value) || e.target.value === "") {
      return;
    } else {
      return this.setState({ errorPbxIpAdress: "error" });
    }
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

  changePbxPort = e => {
    this.setState({
      pbx: {
        ...this.state.pbx,
        port: e.target.value
      }
    });
    this.props.changeObjectIAD("pbx", "port", e.target.value);
  };

  changePbxAddress = e => {
    this.setState({
      pbx: {
        ...this.state.pbx,
        ipAddress: e.target.value
      }
    });
    this.props.changeObjectIAD("pbx", "ipAddress", e.target.value);
  };

  changeIPv4Netmask = e => {
    this.setState({
      ip1: {
        ...this.state.ip1,
        ipv4Netmask: e.target.value
      }
    });
    this.props.changeObjectIAD("ip1", "ipv4Netmask", e.target.value);
  };

  changeIPv6Netmask = e => {
    this.setState({
      ip1: {
        ...this.state.ip1,
        ipv6Netmask: e.target.value
      }
    });
    this.props.changeObjectIAD("ip1", "ipv6Netmask", e.target.value);
  };

  changeIPv4Address = e => {
    this.setState({
      ip1: {
        ...this.state.ip1,
        ipv4Address: e.target.value
      }
    });
    this.props.changeObjectIAD("ip1", "ipv4Address", e.target.value);
  };

  changeIPv6Address = e => {
    this.setState({
      ip1: {
        ...this.state.ip1,
        ipv6Address: e.target.value
      }
    });
    this.props.changeObjectIAD("ip1", "ipv6Address", e.target.value);
  };

  changeIPMode = e => {
    this.setState({
      ip1: {
        ...this.state.ip1,
        mode: e.target.value
      }
    });
    this.props.changeObjectIAD("ip1", "mode", e.target.value);
  };

  changeTransportMode = e => {
    this.setState({
      transportMode: e.target.value
    });

    this.props.changeIAD("changeObjectIAD", e.target.value);
  };
}

const mapStateToProps = state => ({
  iad: state.iad,
  config: state.config,
  group: state.group
});

const mapDispatchToProps = { changeIAD, fetchPutUpdateIAD, changeObjectIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IPAddress)
);
