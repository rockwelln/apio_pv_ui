import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";

import {
  TRANSPORTMODE,
  IP1MODE,
  TYPEOFIAD,
  DTMF,
  CHANNELHUNTING,
  DIRECTION
} from "../../constants";

export class IADPage extends Component {
  state = {
    isDisabled: true,
    transportMode: "udp",
    ip1mode: "IPv4",
    ip2mode: "Disabled",
    protocolMode: "PRA",
    dtmf: "RFC2833",
    channelHunting: "Highest available channel first",
    direction: "Bi",
    channelsIn: "",
    channelOut: ""
  };
  render() {
    return (
      <div className={"panel-body"}>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <React.Fragment>
              <div className={"header margin-right-2"}>EXAMPLE IAD</div>
              {this.state.isDisabled && (
                <Glyphicon
                  className={"font-18"}
                  glyph="glyphicon glyphicon-pencil"
                  onClick={() => this.setState({ isDisabled: false })}
                />
              )}
            </React.Fragment>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>DETAILS</div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>ID</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"ENTxxxxxxGRPyyIADzz"}
                placeholder={"ID"}
                disabled
              />
            </div>
          </Col>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Main Number
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="number"
                placeholder={"Number"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Type of IAD
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"M800"}
                placeholder={"Type of IAD"}
                disabled
              />
            </div>
          </Col>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>TPID</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"TPID"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              MAC Address
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"MAC Address"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Pilot Number
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="number"
                placeholder={"Pilot Number"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-2"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>
              EDU configuration
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>EDU Name</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"EDU Name"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>EDU Name</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"EDU Name"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>LAN PORT</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"LAN PORT"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>LAN PORT</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"LAN PORT"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>WAN PORT</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"WAN PORT"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>WAN PORT</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"WAN PORT"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>SR Name</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"SR Name"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>SR Name</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"SR Name"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>SR SAP</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"SR SAP"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>SR SAP</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"SR SAP"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>EDU VIF</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"EDU VIF"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>EDU VIF</div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={"xxxxxxx"}
                placeholder={"EDU VIF"}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-2"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>
              Local IP Addressing
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          {this.state.isDisabled ? (
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Transport mode
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.transportMode}
                  placeholder={"Transport mode"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          ) : (
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
          )}
        </Row>
        {this.state.isDisabled ? (
          <React.Fragment>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>IP 1</div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.ip1mode}
                    placeholder={"IP 1"}
                    disabled={this.state.isDisabled}
                  />
                </div>
              </Col>
            </Row>
            {this.state.ip1mode !== "Disabled" && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={6} className={"flex align-items-center"}>
                    <div
                      className={
                        "margin-right-1 flex flex-basis-16 padding-left-1"
                      }
                    >
                      {`-${this.state.ip1mode} address`}
                    </div>
                    <div className={"margin-right-1 flex-basis-66"}>
                      <FormControl
                        type="text"
                        value={`${
                          this.state.ip1mode === "IPv4"
                            ? this.state.ipv4Address1
                            : this.state.ipv6Address1
                        }`}
                        placeholder={"address"}
                        disabled={this.state.isDisabled}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={6} className={"flex align-items-center"}>
                    <div
                      className={
                        "margin-right-1 flex flex-basis-16 padding-left-1"
                      }
                    >
                      {`-${this.state.ip1mode} netmark`}
                    </div>
                    <div className={"margin-right-1 flex-basis-66"}>
                      <FormControl
                        type="text"
                        value={`${
                          this.state.ip1mode === "IPv4"
                            ? this.state.ipv4Netmask1
                            : this.state.ipv6Netmask1
                        }`}
                        placeholder={"netmark"}
                        disabled={this.state.isDisabled}
                      />
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {this.state.isDisabled ? (
          <React.Fragment>
            <Row className={"margin-top-1"}>
              <Col md={6} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>IP 2</div>
                <div className={"margin-right-1 flex-basis-66"}>
                  <FormControl
                    type="text"
                    value={this.state.ip2mode}
                    placeholder={"IP 2"}
                    disabled={this.state.isDisabled}
                  />
                </div>
              </Col>
            </Row>
            {this.state.ip2mode !== "Disabled" && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={6} className={"flex align-items-center"}>
                    <div
                      className={
                        "margin-right-1 flex flex-basis-16 padding-left-1"
                      }
                    >
                      {`-${this.state.ip2mode} address`}
                    </div>
                    <div className={"margin-right-1 flex-basis-66"}>
                      <FormControl
                        type="text"
                        value={`${
                          this.state.ip2mode === "IPv4"
                            ? this.state.ipv4Address2
                            : this.state.ipv6Address2
                        }`}
                        placeholder={"address"}
                        disabled={this.state.isDisabled}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={6} className={"flex align-items-center"}>
                    <div
                      className={
                        "margin-right-1 flex flex-basis-16 padding-left-1"
                      }
                    >
                      {`${this.state.ip2mode} netmark`}
                    </div>
                    <div className={"margin-right-1 flex-basis-66"}>
                      <FormControl
                        type="text"
                        value={`${
                          this.state.ip2mode === "IPv4"
                            ? this.state.ipv4Netmask2
                            : this.state.ipv4Netmask2
                        }`}
                        placeholder={"netmark"}
                        disabled={this.state.isDisabled}
                      />
                    </div>
                  </Col>
                </Row>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {this.state.isDisabled ? (
          <Row className={"margin-top-1"}>
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Protocol Mode
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.protocolMode}
                  placeholder={"Protocol Mode"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
        ) : (
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
        )}
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>
              Override of the default Group option
            </div>
          </Col>
        </Row>
        {this.state.isDisabled ? (
          <Row className={"margin-top-1"}>
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>DTMF</div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.dtmf}
                  placeholder={"DTMF"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
        ) : (
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
        )}
        {this.state.isDisabled ? (
          <Row className={"margin-top-1"}>
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Channel Hunting
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.channelHunting}
                  placeholder={"Channel Hunting"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {this.state.isDisabled ? (
          <Row className={"margin-top-1"}>
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Direction
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.direction}
                  placeholder={"Channel Hunting"}
                  disabled={this.state.isDisabled}
                />
              </div>
            </Col>
          </Row>
        ) : (
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
        )}
        <Row className={"margin-top-1"}>
          <Col
            md={this.state.isDisabled ? 6 : 12}
            className={"flex align-items-center"}
          >
            <div className={"margin-right-1 flex flex-basis-16"}>
              Numbers Of Channels
            </div>
            <div className={"margin-right-1 flex"}>In</div>
            <div
              className={`margin-right-1 ${
                this.state.isDisabled ? "flex-basis-28" : "flex-basis-11"
              }`}
            >
              <FormControl
                type="text"
                value={this.state.channelsIn}
                placeholder={"In"}
                onChange={e => this.setState({ channelsIn: e.target.value })}
                disabled={this.state.isDisabled}
              />
            </div>
            <div className={"margin-right-1 flex"}>Out</div>
            <div
              className={`margin-right-1 ${
                this.state.isDisabled ? "flex-basis-28" : "flex-basis-11"
              }`}
            >
              <FormControl
                type="text"
                value={this.state.channelOut}
                placeholder={"Out"}
                onChange={e => this.setState({ channelOut: e.target.value })}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        {!this.state.isDisabled && (
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"} />
              <div className={"margin-right-1 flex-basis-33"}>
                {"\u002a"} Don't exceed your IADs capacity (avalible: xxxxx)
              </div>
            </Col>
          </Row>
        )}
        {!this.state.isDisabled && (
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={() => this.setState({ isDisabled: true })}
                    type="submit"
                    className="btn-primary"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    Update
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IADPage);
