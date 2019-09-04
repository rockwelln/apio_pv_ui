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

import {
  TRANSPORTMODE,
  IP1MODE,
  TYPEOFIAD,
  DTMF,
  CHANNELHUNTING,
  DIRECTION
} from "../../constants";

export class AddIAD extends Component {
  state = {
    mainNumber: "",
    iadType: "",
    tpid: "",
    macAddress: "",
    pilotNumber: "",
    nameEDU: "",
    lanPort: "",
    wanPort: "",
    srName: "",
    srSAP: "",
    eduVIF: "",
    transportMode: "",
    ip1mode: "",
    ip2mode: "",
    ipv4Address1: "",
    ipv4Netmask1: "",
    ipv6Address1: "",
    ipv6Netmask1: "",
    ipv4Address2: "",
    ipv4Netmask2: "",
    ipv6Address2: "",
    ipv6Netmask2: "",
    protocolMode: "",
    dtmf: "",
    channelHunting: "",
    direction: "",
    channelsIn: "",
    channelOut: "",
    buttonName: "Create"
  };
  render() {
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              ADD IAD
              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                Cancel
              </Button>
            </div>
            <div>
              Enter yout IAD specificitys, configurations and optionnals
              overrides
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>DETAILS</div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>ID</div>
                <div className={"margin-right-1 flex-1"}>
                  <FormControl type="text" disabled />
                </div>
              </Col>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Main number
                </div>
                <div className={"margin-right-1 flex-1"}>
                  <FormControl
                    type="text"
                    value={this.state.mainNumber}
                    placeholder={"Main number"}
                    onChange={e =>
                      this.setState({ mainNumber: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Type of IAD
                </div>
                <div className={"margin-right-1 flex-1"}>
                  <FormControl
                    type="text"
                    value={this.state.iadType}
                    placeholder={"Type of IAD"}
                    onChange={e => this.setState({ iadType: e.target.value })}
                  />
                </div>
              </Col>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>TPID</div>
                <div className={"margin-right-1 flex-1"}>
                  <FormControl
                    type="text"
                    value={this.state.tpid}
                    placeholder={"TPID"}
                    onChange={e => this.setState({ tpid: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  MAC Address
                </div>
                <div className={"margin-right-1 flex-1"}>
                  <FormControl
                    type="text"
                    value={this.state.macAddress}
                    placeholder={"MAC Address"}
                    onChange={e =>
                      this.setState({ macAddress: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Pilot Number
                </div>
                <div className={"margin-right-1 flex-1"}>
                  <FormControl
                    type="number"
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
                  EDU configuration
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  EDU Name
                </div>
                <div className={"margin-right-1 flex-basis-16"}>
                  <FormControl
                    type="text"
                    value={this.state.ccli}
                    placeholder={"EDU Name"}
                    onChange={e => this.setState({ nameEDU: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  LAN port
                </div>
                <div className={"margin-right-1 flex-basis-16"}>
                  <FormControl
                    type="text"
                    value={this.state.lanPort}
                    placeholder={"LAN port"}
                    onChange={e => this.setState({ lanPort: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  WAN port
                </div>
                <div className={"margin-right-1 flex-basis-16"}>
                  <FormControl
                    type="text"
                    value={this.state.wanPort}
                    placeholder={"WAN port"}
                    onChange={e => this.setState({ wanPort: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  SR name
                </div>
                <div className={"margin-right-1 flex-basis-16"}>
                  <FormControl
                    type="text"
                    value={this.state.srName}
                    placeholder={"SR name"}
                    onChange={e => this.setState({ srName: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  SR SAP
                </div>
                <div className={"margin-right-1 flex-basis-16"}>
                  <FormControl
                    type="text"
                    value={this.state.srSAP}
                    placeholder={"SR SAP"}
                    onChange={e => this.setState({ srSAP: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  EDU VIF
                </div>
                <div className={"margin-right-1 flex-basis-16"}>
                  <FormControl
                    type="text"
                    value={this.state.eduVIF}
                    placeholder={"EDU VIF"}
                    onChange={e => this.setState({ eduVIF: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  Local IP Addressing
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Transport mode
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
                  IP 1 mode
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
                    IPv4 address
                  </div>
                  <div className={"margin-right-1 flex-basis-16"}>
                    <FormControl
                      type="text"
                      value={this.state.ipv4Address1}
                      placeholder={"IPv4 address"}
                      onChange={e =>
                        this.setState({ ipv4Address1: e.target.value })
                      }
                    />
                  </div>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    IPv4 netmask
                  </div>
                  <div className={"margin-right-1 flex-basis-16"}>
                    <FormControl
                      type="text"
                      value={this.state.ipv4Netmask1}
                      placeholder={"IPv4 netmask"}
                      onChange={e =>
                        this.setState({ ipv4Netmask1: e.target.value })
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
                    IPv6 address
                  </div>
                  <div className={"margin-right-1 flex-basis-16"}>
                    <FormControl
                      type="text"
                      value={this.state.ipv6Address1}
                      placeholder={"IPv6 address"}
                      onChange={e =>
                        this.setState({ ipv6Address1: e.target.value })
                      }
                    />
                  </div>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    IPv6 netmask
                  </div>
                  <div className={"margin-right-1 flex-basis-16"}>
                    <FormControl
                      type="text"
                      value={this.state.ipv6Netmask1}
                      placeholder={"IPv6 netmask"}
                      onChange={e =>
                        this.setState({ ipv6Netmask1: e.target.value })
                      }
                    />
                  </div>
                </Col>
              </Row>
            )}
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  IP 2 mode
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    {IP1MODE.map((type, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="ip2mode"
                        value={type.value}
                        checked={type.value === this.state.ip2mode}
                        onChange={e =>
                          this.setState({
                            ip2mode: e.target.value
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
            {this.state.ip2mode === "IPv4" && (
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}></div>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    IPv4 address
                  </div>
                  <div className={"margin-right-1 flex-basis-16"}>
                    <FormControl
                      type="text"
                      value={this.state.ipv4Address2}
                      placeholder={"IPv4 address"}
                      onChange={e =>
                        this.setState({ ipv4Address2: e.target.value })
                      }
                    />
                  </div>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    IPv4 netmask
                  </div>
                  <div className={"margin-right-1 flex-basis-16"}>
                    <FormControl
                      type="text"
                      value={this.state.ipv4Netmask2}
                      placeholder={"IPv4 netmask"}
                      onChange={e =>
                        this.setState({ ipv4Netmask2: e.target.value })
                      }
                    />
                  </div>
                </Col>
              </Row>
            )}
            {this.state.ip2mode === "IPv6" && (
              <Row className={"margin-top-1"}>
                <Col md={12} className={"flex align-items-center"}>
                  <div className={"margin-right-1 flex flex-basis-16"}></div>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    IPv6 address
                  </div>
                  <div className={"margin-right-1 flex-basis-16"}>
                    <FormControl
                      type="text"
                      value={this.state.ipv6Address2}
                      placeholder={"IPv6 address"}
                      onChange={e =>
                        this.setState({ ipv6Address2: e.target.value })
                      }
                    />
                  </div>
                  <div className={"margin-right-1 flex flex-basis-16"}>
                    IPv6 netmask
                  </div>
                  <div className={"margin-right-1 flex-basis-16"}>
                    <FormControl
                      type="text"
                      value={this.state.ipv6Netmask2}
                      placeholder={"IPv6 netmask"}
                      onChange={e =>
                        this.setState({ ipv6Netmask2: e.target.value })
                      }
                    />
                  </div>
                </Col>
              </Row>
            )}
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Protocol mode
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    {TYPEOFIAD.map((type, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="typeOfIad"
                        disabled={type.disabled}
                        value={type.value}
                        checked={type.value === this.state.protocolMode}
                        onChange={e =>
                          this.setState({
                            protocolMode: e.target.value
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
                <div className={"margin-right-1 flex font-24"}>
                  Override of the default Group option
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>DTMF</div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    {DTMF.map((type, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="dtmf"
                        value={type.value}
                        defaultChecked={type.value === this.state.dtmf}
                        onChange={e =>
                          this.setState({
                            dtmf: e.target.value
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
                  Channel Hunting
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.channelHunting}
                    onChange={e =>
                      this.setState({ channelHunting: e.target.value })
                    }
                  >
                    {CHANNELHUNTING.map((type, i) => (
                      <option key={i} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </FormControl>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"} />
                <div className={"margin-right-1 flex-basis-33"}>
                  {"\u26a0"} Will only work on lowest IAD, not recommended
                  unless only 1 IAD on site
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Direction
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    {DIRECTION.map((type, i) => (
                      <Radio
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="direction"
                        value={type.value}
                        defaultChecked={type.value === this.state.direction}
                        onChange={e =>
                          this.setState({
                            direction: e.target.value
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
                  Numbers Of Channels{"\u002a"}
                </div>
                <div className={"margin-right-1 flex"}>In</div>
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
                <div className={"margin-right-1 flex"}>Out</div>
                <div className={"margin-right-1 flex-basis-11"}>
                  <FormControl
                    type="text"
                    value={this.state.channelOut}
                    placeholder={"Out"}
                    onChange={e =>
                      this.setState({ channelOut: e.target.value })
                    }
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"} />
                <div className={"margin-right-1 flex-basis-33"}>
                  {"\u002a"} Don't exceed your IADs capacity (avalible: xxxxx)
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.addAID}
                      type="submit"
                      className="btn-primary"
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

  cancelClick = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };

  addAID = () => {
    this.props.history.push(
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}`
    );
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddIAD)
);
