import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Radio from "react-bootstrap/lib/Radio";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Table from "react-bootstrap/lib/Table";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

import { FormattedMessage } from "react-intl";
import {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPostCreateIAD
} from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

import { TRANSPORTMODE, IP1MODE } from "../../constants";
import Loading from "../../common/Loading";

export class AddIAD extends Component {
  state = {
    isLoadingConfig: true,
    errorMacAddress: null,
    isLoadingGroup: true,
    secondEDU: false,
    iadType: "",
    macAddress: "",
    pilotNumber: "",
    nameEDUA: "",
    lanPortA: "",
    wanPortA: "",
    srNameA: "",
    srSAPA: "",
    eduVLANIDA: "",
    nameEDUB: "",
    lanPortB: "",
    wanPortB: "",
    srNameB: "",
    srSAPB: "",
    eduVLANIDB: "",
    transportMode: "",
    ip1mode: "",
    ipv4Address: "",
    ipv4Netmask: "",
    ipv6Address: "",
    ipv6Netmask: "",
    IPAddress: "",
    port: "",
    dtmf: "",
    direction: "",
    channelsIn: "",
    channelsOut: "",
    buttonName: "Create"
  };
  componentDidMount() {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.setState({ isLoadingGroup: false }, () =>
          this.props.fetchGetConfig().then(() =>
            this.setState({
              isLoadingConfig: false,
              iadType: this.props.config.tenant.group.iad.iadType[0].value,
              dtmf: this.props.config.tenant.group.iad.dtmfOverride[0].value,
              direction: this.props.config.tenant.group.iad.directionOverride[0]
                .value,
              secondEDU:
                this.props.config.tenant.group.iad[
                  "2EDUsForServiceTypes"
                ].indexOf(this.props.group.serviceType) !== -1
            })
          )
        )
      );
  }
  render() {
    const {
      nameEDUA,
      lanPortA,
      wanPortA,
      srNameA,
      srSAPA,
      eduVLANIDA,
      secondEDU,
      nameEDUB,
      lanPortB,
      wanPortB,
      srNameB,
      srSAPB,
      eduVLANIDB,
      iadType,
      pilotNumber,
      errorMacAddress
    } = this.state;
    if (this.state.isLoadingConfig || this.state.isLoadingGroup) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              <FormattedMessage id="addIad" defaultMessage="ADD IAD" />
              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
              </Button>
            </div>
            <div>
              <FormattedMessage
                id="addIadInfo"
                defaultMessage="Enter yout IAD specificitys, configurations and optionnals
              overrides"
              />
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage id="details" defaultMessage="DETAILS" />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage id="id" defaultMessage="ID" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl type="text" disabled />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="iadType"
                      defaultMessage="Type of IAD"
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.iadType}
                    onChange={e => this.setState({ iadType: e.target.value })}
                  >
                    {this.props.config.tenant.group.iad.iadType.map((el, i) => (
                      <option key={i} value={el.value}>
                        {el.label}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <FormGroup
              controlId="errorMacAddress"
              validationState={this.state.errorMacAddress}
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
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="pilotNumber"
                      defaultMessage="Pilot Number"
                    />
                    {"\u002a"}
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.pilotNumber}
                    placeholder={"Pilot Number"}
                    onChange={e =>
                      this.setState({ pilotNumber: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage
                    id="eduConfiguration"
                    defaultMessage="EDU configuration"
                  />
                  {"\u002a"}
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="eduAName"
                      defaultMessage="EDU A Name"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.nameEDUA}
                    placeholder={"EDU Name"}
                    onChange={e => this.setState({ nameEDUA: e.target.value })}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="eduBName"
                        defaultMessage="EDU B Name"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.nameEDUB}
                      placeholder={"EDU Name"}
                      onChange={e =>
                        this.setState({ nameEDUB: e.target.value })
                      }
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage id="lanPort" defaultMessage="LAN port" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.lanPortA}
                    placeholder={"LAN port"}
                    onChange={e => this.setState({ lanPortA: e.target.value })}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="lanPort"
                        defaultMessage="LAN port"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.lanPortB}
                      placeholder={"LAN port"}
                      onChange={e =>
                        this.setState({ lanPortB: e.target.value })
                      }
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage id="wanPort" defaultMessage="WAN port" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.wanPortA}
                    placeholder={"WAN port"}
                    onChange={e => this.setState({ wanPortA: e.target.value })}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="wanPort"
                        defaultMessage="WAN port"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.wanPortB}
                      placeholder={"WAN port"}
                      onChange={e =>
                        this.setState({ wanPortB: e.target.value })
                      }
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage id="srName" defaultMessage="SR name" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.srNameA}
                    placeholder={"SR name"}
                    onChange={e => this.setState({ srNameA: e.target.value })}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage id="srName" defaultMessage="SR name" />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.srNameB}
                      placeholder={"SR name"}
                      onChange={e => this.setState({ srNameB: e.target.value })}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage id="srSap" defaultMessage="SR SAP" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.srSAPA}
                    placeholder={"SR SAP"}
                    onChange={e => this.setState({ srSAPA: e.target.value })}
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage id="srSap" defaultMessage="SR SAP" />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.srSAPB}
                      placeholder={"SR SAP"}
                      onChange={e => this.setState({ srSAPB: e.target.value })}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="eduVlanId"
                      defaultMessage="EDU VLAN ID"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.eduVLANIDA}
                    placeholder={"EDU VLAN ID"}
                    onChange={e =>
                      this.setState({ eduVLANIDA: e.target.value })
                    }
                  />
                </div>
              </Col>
              {this.state.secondEDU && (
                <Col md={6} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-33"}>
                    <ControlLabel>
                      <FormattedMessage
                        id="eduVlanId"
                        defaultMessage="EDU VLAN ID"
                      />
                    </ControlLabel>
                  </div>
                  <div className={"margin-right-1 flex-basis-66"}>
                    <FormControl
                      type="text"
                      value={this.state.eduVLANIDB}
                      placeholder={"EDU VLAN ID"}
                      onChange={e =>
                        this.setState({ eduVLANIDB: e.target.value })
                      }
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage
                    id="localIpAddressing"
                    defaultMessage="Local IP Addressing"
                  />
                </div>
              </Col>
            </Row>
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
                        checked={type.value === this.state.ip1mode}
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
            {this.state.ip1mode === "IPv4" && (
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
                      onChange={e =>
                        this.setState({ ipv4Address: e.target.value })
                      }
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
                      onChange={e =>
                        this.setState({ ipv4Netmask: e.target.value })
                      }
                    />
                  </div>
                </Col>
              </Row>
            )}
            {this.state.ip1mode === "IPv6" && (
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
                      onChange={e =>
                        this.setState({ ipv6Address: e.target.value })
                      }
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
                      onChange={e =>
                        this.setState({ ipv6Netmask: e.target.value })
                      }
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
                  className={
                    "margin-right-1 flex flex-basis-33 align-items-center"
                  }
                >
                  <ControlLabel className={"margin-0 margin-right-1"}>
                    <FormattedMessage
                      id="IPAddress"
                      defaultMessage="IP Address"
                    />
                  </ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.IPAddress}
                    placeholder={"IP Address"}
                    onChange={e => this.setState({ IPAddress: e.target.value })}
                  />
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
                    value={this.state.port}
                    placeholder={"Port"}
                    onChange={e => this.setState({ port: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  <FormattedMessage
                    id="overrideSite"
                    defaultMessage="Override the default site settings"
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage id="dtmf" defaultMessage="DTMF" />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.dtmf}
                    onChange={e =>
                      this.setState({
                        dtmf: e.target.value
                      })
                    }
                  >
                    {this.props.config.tenant.group.iad.dtmfOverride.map(
                      (el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  <ControlLabel>
                    <FormattedMessage
                      id="direction"
                      defaultMessage="Direction"
                    />
                  </ControlLabel>
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.direction}
                    onChange={e =>
                      this.setState({
                        direction: e.target.value
                      })
                    }
                  >
                    {this.props.config.tenant.group.iad.directionOverride.map(
                      (el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      )
                    )}
                  </FormControl>
                </div>
              </Col>
            </Row>
            {this.state.direction === "Uni" && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      <ControlLabel>
                        <FormattedMessage
                          id="numbersOfChannels"
                          defaultMessage="Numbers Of Channels"
                        />
                      </ControlLabel>
                      {"\u002a"}
                    </div>
                    <React.Fragment>
                      <div className={"margin-right-1 flex"}>
                        <ControlLabel className={"margin-0 margin-right-1"}>
                          <FormattedMessage id="in" defaultMessage="In" />
                        </ControlLabel>
                      </div>
                      <div className={"margin-right-1 flex-basis-11"}>
                        <FormControl
                          type="text"
                          value={this.state.channelsIn}
                          placeholder={"In"}
                          onChange={e =>
                            this.setState({ channelsIn: e.target.value })
                          }
                        />
                      </div>
                      <div className={"margin-right-1 flex"}>
                        <ControlLabel className={"margin-0 margin-right-1"}>
                          <FormattedMessage id="out" defaultMessage="Out" />
                        </ControlLabel>
                      </div>
                      <div className={"margin-right-1 flex-basis-11"}>
                        <FormControl
                          type="text"
                          value={this.state.channelsOut}
                          placeholder={"Out"}
                          onChange={e =>
                            this.setState({ channelsOut: e.target.value })
                          }
                        />
                      </div>
                    </React.Fragment>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"} />
                    <div className={"margin-right-1 flex-basis-33"}>
                      {"\u002a"}
                      <FormattedMessage
                        id="nocInfo"
                        defaultMessage=" Don't exceed your IADs capacity (avalible:
                        xxxxx)"
                      />
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
            {/* <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>PRA Info</div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <Table hover bordered>
                  <thead>
                    <tr>
                      <th>PRA TPID</th>
                      <th>PRA CID</th>
                      <th>PRA PORT</th>
                      <th>PRA MAINT nr</th>
                      <th>MODE</th>
                      <th>
                        ACTIVE
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByRangeEnd}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </Table>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Clocking
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    {CLOCKING.map((type, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="clocking"
                        value={type.value}
                        checked={type.value === this.state.clocking}
                        onChange={e =>
                          this.setState({
                            clocking: e.target.value
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
                <div className={"margin-right-1 flex flex-basis-16"}>ISDN</div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    {ISDN.map((type, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="isdn"
                        value={type.value}
                        checked={type.value === this.state.isdn}
                        onChange={e =>
                          this.setState({
                            isdn: e.target.value
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
                  Dual Power
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      name="dualPower"
                      checked={this.state.dualPower}
                      onChange={e =>
                        this.setState({
                          virtualSite: true
                        })
                      }
                    >
                      <div className="font-weight-bold flex">Yes</div>
                    </Radio>
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      name="dualPower"
                      checked={!this.state.dualPower}
                      onChange={e =>
                        this.setState({
                          virtualSite: false
                        })
                      }
                    >
                      <div className="font-weight-bold flex">No</div>
                    </Radio>
                  </FormGroup>
                </div>
              </Col>
            </Row> */}
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.addAID}
                      type="submit"
                      className="btn-primary"
                      disabled={
                        errorMacAddress ||
                        !iadType ||
                        !pilotNumber ||
                        !nameEDUA ||
                        !lanPortA ||
                        !wanPortA ||
                        !srNameA ||
                        !srSAPA ||
                        !eduVLANIDA ||
                        (secondEDU &&
                          (!nameEDUB ||
                            !lanPortB ||
                            !wanPortB ||
                            !srNameB ||
                            !srSAPB ||
                            !eduVLANIDB))
                      }
                    >
                      <Glyphicon glyph="glyphicon glyphicon-ok" />{" "}
                      {this.state.buttonName}
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
      this.setState({ errorMacAddress: true });
    }
  };

  cancelClick = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };

  addAID = () => {
    const {
      secondEDU,
      iadType,
      macAddress,
      pilotNumber,
      nameEDUA,
      lanPortA,
      wanPortA,
      srNameA,
      srSAPA,
      eduVLANIDA,
      nameEDUB,
      lanPortB,
      wanPortB,
      srNameB,
      srSAPB,
      eduVLANIDB,
      transportMode,
      ip1mode,
      ipv4Address,
      ipv4Netmask,
      ipv6Address,
      ipv6Netmask,
      IPAddress,
      port,
      dtmf,
      direction,
      channelsIn,
      channelsOut
    } = this.state;
    const data = {
      iadType,
      pilotNumber,
      macAddress,
      edu1: {
        name: nameEDUA,
        lanPort: lanPortA,
        wanPort: wanPortA,
        srName: srNameA,
        srSap: srSAPA,
        vlan: eduVLANIDA
      },
      edu2: secondEDU
        ? {
            name: nameEDUB,
            lanPort: lanPortB,
            wanPort: wanPortB,
            srName: srNameB,
            srSap: srSAPB,
            vlan: eduVLANIDB
          }
        : null,
      transportMode,
      ip1:
        ip1mode === "IPv4"
          ? {
              mode: ip1mode,
              ipv4Address,
              ipv4Netmask
            }
          : ip1mode === "IPv6"
          ? {
              mode: ip1mode,
              ipv6Address,
              ipv6Netmask
            }
          : null,
      pbx: {
        IPAddress,
        port
      },
      services: {
        dtmf: dtmf === "useGroupSettings" ? null : dtmf,
        direction: direction === "useGroupSettings" ? null : direction,
        channelsIn,
        channelsOut
      }
    };
    const clearData = removeEmpty(data);
    console.log(clearData);
    this.props
      .fetchPostCreateIAD(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        clearData
      )
      .then(
        res =>
          res === "created" &&
          this.props.history.push(
            `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`,
            { defaultTab: 3 }
          )
      );
  };
}

const mapStateToProps = state => ({ config: state.config, group: state.group });

const mapDispatchToProps = {
  fetchGetConfig,
  fetchGetGroupById,
  fetchPostCreateIAD
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddIAD)
);
