import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Radio from "react-bootstrap/lib/Radio";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { FormattedMessage } from "react-intl";

import { changeIAD, fetchPutUpdateIAD } from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";

import { TRANSPORTMODE, IP1MODE } from "../../../constants";

export class IPAddress extends Component {
  state = {
    ip1: {},
    pbx: {},
    transportMode: "",
    disabledButton: false
  };

  componentDidMount() {
    this.setState({
      ip1: this.props.iad.ip1,
      pbx: this.props.iad.pbx,
      transportMode: this.props.iad.transportMode
    });
  }
  render() {
    return (
      <React.Fragment>
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
                    onChange={e =>
                      this.setState({
                        transportMode: e.target.value
                      })
                    }
                  >
                    <div className="font-weight-bold flex">{type.name}</div>
                  </Radio>
                ))}
              </FormGroup>
            </div>
          </Col>
        </Row>
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
                        ip1mode: e.target.value
                      })
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
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}></div>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage
                    id="IPv4Address"
                    defaultMessage="IPv4 address"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-16"}>
                <FormControl
                  type="text"
                  value={this.state.ipv4Address}
                  placeholder={"IPv4 address"}
                  onChange={e => this.setState({ ipv4Address: e.target.value })}
                />
              </div>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage
                    id="IPv4Netmask"
                    defaultMessage="IPv4 netmask"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-16"}>
                <FormControl
                  type="text"
                  value={this.state.ipv4Netmask}
                  placeholder={"IPv4 netmask"}
                  onChange={e => this.setState({ ipv4Netmask: e.target.value })}
                />
              </div>
            </Col>
          </Row>
        )}
        {this.state.ip1.mode === "IPv6" && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}></div>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage
                    id="IPv6Address"
                    defaultMessage="IPv6 address"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-16"}>
                <FormControl
                  type="text"
                  value={this.state.ipv6Address}
                  placeholder={"IPv6 address"}
                  onChange={e => this.setState({ ipv6Address: e.target.value })}
                />
              </div>
              <div className={"margin-right-1 flex flex-basis-16"}>
                <ControlLabel>
                  <FormattedMessage
                    id="IPv6Netmask"
                    defaultMessage="IPv6 netmask"
                  />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-16"}>
                <FormControl
                  type="text"
                  value={this.state.ipv6Netmask}
                  placeholder={"IPv6 netmask"}
                  onChange={e => this.setState({ ipv6Netmask: e.target.value })}
                />
              </div>
            </Col>
          </Row>
        )}
        <Row className={"margin-top-1"}>
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
              className={"margin-right-1 flex flex-basis-33 align-items-center"}
            >
              <ControlLabel className={"margin-0 margin-right-1"}>
                <FormattedMessage id="IPAddress" defaultMessage="IP Address" />
              </ControlLabel>
              <FormControl
                type="text"
                value={this.state.IPAddress}
                placeholder={"IP Address"}
                onChange={e => this.setState({ IPAddress: e.target.value })}
              />
            </div>
            <div
              className={"margin-right-1 flex flex-basis-33 align-items-center"}
            >
              <ControlLabel className={"margin-0 margin-right-1"}>
                <FormattedMessage id="port" defaultMessage="Port" />
              </ControlLabel>
              <FormControl
                type="text"
                value={this.state.port}
                placeholder={"Port"}
                onChange={e => this.setState({ port: e.target.value })}
              />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  updateIAD = () => {
    const { macAddress, pilotNumber } = this.state;
    const data = { macAddress, pilotNumber };
    const clearData = removeEmpty(data);
    if (Object.keys(clearData).length) {
      console.log(Object.keys(clearData).length);
      this.setState({ disabledButton: true }, () =>
        this.props
          .fetchPutUpdateIAD(
            this.props.match.params.tenantId,
            this.props.match.params.groupId,
            this.props.match.params.iadId,
            clearData
          )
          .then(() => this.setState({ disabledButton: false }))
      );
    } else {
      console.log(Object.keys(clearData).length);
      this.setState({ disabledButton: true }, () =>
        this.setState({ disabledButton: false })
      );
    }
  };

  upadateMacAddres = e => {
    this.setState({
      macAddress: e.target.value,
      errorMacAddress: null
    });
    this.props.changeIAD("macAddress", e.target.value);
  };

  upadatePilotNumber = e => {
    this.props.changeIAD("pilotNumber", e.target.value);
    this.setState({ pilotNumber: e.target.value });
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

const mapStateToProps = state => ({ iad: state.iad, config: state.config });

const mapDispatchToProps = { changeIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IPAddress)
);
