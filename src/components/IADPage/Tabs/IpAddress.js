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

import {
  changeIAD,
  fetchPutUpdateIAD,
  changeObjectIAD
} from "../../../store/actions";
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
      ip1: this.props.iad.ip1 ? this.props.iad.ip1 : {},
      pbx: this.props.iad.pbx ? this.props.iad.pbx : {},
      transportMode: this.props.iad.transportMode
        ? this.props.iad.transportMode
        : ""
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
                    onChange={this.changeTransportMode}
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
                    onChange={this.changeIPMode}
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
                  value={this.state.ip1.ipv4Address}
                  placeholder={"IPv4 address"}
                  onChange={this.changeIPv4Address}
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
                  value={this.state.ip1.ipv4Netmask}
                  placeholder={"IPv4 netmask"}
                  onChange={this.changeIPv4Netmask}
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
                  value={this.state.ip1.ipv6Address}
                  placeholder={"IPv6 address"}
                  onChange={this.changeIPv6Address}
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
                  value={this.state.ip1.ipv6Netmask}
                  placeholder={"IPv6 netmask"}
                  onChange={this.changeIPv6Netmask}
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
                value={this.state.pbx.ipAddress}
                placeholder={"IP Address"}
                onChange={this.changePbxAddress}
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
                value={this.state.pbx.port}
                placeholder={"Port"}
                onChange={this.changePbxPort}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.updateIAD}
                  type="submit"
                  className="btn-primary"
                  disabled={this.state.disabledButton}
                >
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  <FormattedMessage id="update" defaultMessage="Update" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
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
      this.setState({ disabledButton: true }, () =>
        this.setState({ disabledButton: false })
      );
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

const mapStateToProps = state => ({ iad: state.iad, config: state.config });

const mapDispatchToProps = { changeIAD, fetchPutUpdateIAD, changeObjectIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IPAddress)
);
