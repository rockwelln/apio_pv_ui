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

import {
  TRANSPORTMODE,
  IP1MODE,
  TYPEOFIAD,
  DTMF,
  CHANNELHUNTING,
  DIRECTION,
  CLOCKING,
  ISDN
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
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>ID</div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl type="text" disabled />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Type of IAD
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.iadType}
                    placeholder={"Type of IAD"}
                    onChange={e => this.setState({ iadType: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  MAC Address
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
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
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Pilot Number
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
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
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Main number
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
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
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  EDU configuration
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  EDU A Name
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
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  EDU B Name
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.nameEDUB}
                    placeholder={"EDU Name"}
                    onChange={e => this.setState({ nameEDUB: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  LAN port
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.lanPortA}
                    placeholder={"LAN port"}
                    onChange={e => this.setState({ lanPort: e.target.value })}
                  />
                </div>
              </Col>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  LAN port
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.lanPortB}
                    placeholder={"LAN port"}
                    onChange={e => this.setState({ lanPort: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  WAN port
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
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  WAN port
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.wanPortB}
                    placeholder={"WAN port"}
                    onChange={e => this.setState({ wanPortB: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  SR name
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
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  SR name
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
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  SR SAP
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
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  SR SAP
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
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  EDU VIF
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.eduVIFA}
                    placeholder={"EDU VIF"}
                    onChange={e => this.setState({ eduVIFA: e.target.value })}
                  />
                </div>
              </Col>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-33"}>
                  EDU VIF
                </div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.eduVIFB}
                    placeholder={"EDU VIF"}
                    onChange={e => this.setState({ eduVIFB: e.target.value })}
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
                  IAD LAN address
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
                  IP-PBX address
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
                {this.state.direction === "Uni" && (
                  <div className={"margin-right-1 flex-basis-33"}>
                    <FormControl
                      type="text"
                      value={this.state.numbersOfChannels}
                      placeholder={"Numbers Of Channels"}
                      onChange={e =>
                        this.setState({ numbersOfChannels: e.target.value })
                      }
                    />
                  </div>
                )}
                {this.state.direction === "Bi" && (
                  <React.Fragment>
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
                  </React.Fragment>
                )}
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
            <Row className={"margin-top-1"}>
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
