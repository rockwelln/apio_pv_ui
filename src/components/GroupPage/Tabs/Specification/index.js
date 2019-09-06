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
  ADVICEOFCHARGE,
  DTMF,
  CHANNELHUNTING,
  DIRECTION,
  DESTINATIONNUMBERSPRA,
  NATIONNUMBERSPRA,
  INTERNATIONNUMBERSPRA,
  TYPEOFIAD,
  TYPEOFACCESS,
  SERVICETYPE
} from "../../../../constants";

export class index extends Component {
  state = {
    typeOfIad: "PRA",
    isDisabled: true,
    clip: true,
    colp: false,
    clir: false,
    colr: true,
    aoc: false,
    dtmf: "RFC2833",
    direction: "Bi",
    additionnalRedundancy: true
  };
  render() {
    const NCOSarray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            {this.state.isDisabled ? (
              <React.Fragment>
                <div className={"header margin-right-2"}>SITE (GROUP ID)</div>
                <Glyphicon
                  className={"font-18"}
                  glyph="glyphicon glyphicon-pencil"
                  onClick={() => this.setState({ isDisabled: false })}
                />
              </React.Fragment>
            ) : (
              <FormControl
                type="text"
                placeholder={"GROUP NAME"}
                disabled={this.state.isDisabled}
                className={"header flex-basis-50 margin-right-2"}
              />
            )}
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>Site ID</div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl type="text" placeholder={"ID"} disabled />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>Site Infos</div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>Site Name</div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.siteName}
                placeholder={"Site Name"}
                onChange={e => this.setState({ siteName: e.target.value })}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Main Number
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.mainNumber}
                placeholder={"Main Number"}
                onChange={e => this.setState({ mainNumber: e.target.value })}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>ZIP code</div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.zipCode}
                placeholder={"ZIP code"}
                onChange={e => this.setState({ zipCode: e.target.value })}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Virtual Site
            </div>
            <div className={"margin-right-1 flex"}>
              <FormGroup className={"margin-0 flex"}>
                <Radio
                  className={"margin-0 flex margin-right-2"}
                  name="isVirtualSite"
                  checked={this.state.virtualSite}
                  disabled={this.state.isDisabled}
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
                  name="isVirtualSite"
                  checked={!this.state.virtualSite}
                  disabled={this.state.isDisabled}
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
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>Product Types</div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Type of IAD
            </div>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.typeOfIad}
                onChange={e => this.setState({ typeOfIad: e.target.value })}
                disabled={this.state.isDisabled}
              >
                {TYPEOFIAD.map((type, i) => (
                  <option key={i} value={type.value} disabled={type.disabled}>
                    {type.name}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Type of access
            </div>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.typeOfAccess}
                onChange={e => this.setState({ typeOfAccess: e.target.value })}
                disabled={this.state.isDisabled}
              >
                {TYPEOFACCESS.map((type, i) => (
                  <option key={i} value={type.value} disabled={type.disabled}>
                    {type.name}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Service Type
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.serviceType}
                onChange={e => this.setState({ serviceType: e.target.value })}
                disabled={this.state.isDisabled}
              >
                <option value={""}>none</option>
                {SERVICETYPE.map((type, i) => (
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
            <div className={"margin-right-1 flex flex-basis-16"}>
              Numbers of Channels{"\u002a"}
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="number"
                value={this.state.numberOfChannels}
                placeholder={"Numbers of Channels"}
                onChange={e =>
                  this.setState({ numberOfChannels: e.target.value })
                }
                disabled={this.state.isDisabled}
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
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex font-24"}>
              Services configuration
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              NCOS value
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.ncos}
                onChange={e => this.setState({ ncos: e.target.value })}
                disabled={this.state.isDisabled}
              >
                {NCOSarray.map((el, i) => (
                  <option key={i} value={i}>
                    {el}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>CLIP</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="clipcolp"
                checked={this.state.clip}
                disabled={this.state.isDisabled}
                onChange={e =>
                  this.setState({
                    clip: true,
                    colp: false
                  })
                }
              >
                <div className="font-weight-bold flex">Active</div>
              </Radio>
            </div>
            <div className={"margin-right-1 flex flex-basis-11"}>COLP</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="clipcolp"
                checked={this.state.colp}
                disabled={this.state.isDisabled}
                onChange={e =>
                  this.setState({
                    clip: false,
                    colp: true
                  })
                }
              >
                <div className="font-weight-bold flex">Active</div>
              </Radio>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>CLIR</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="clircolr"
                checked={this.state.clir}
                disabled={this.state.isDisabled}
                onChange={e =>
                  this.setState({
                    clir: true,
                    colr: false
                  })
                }
              >
                <div className="font-weight-bold flex">Active</div>
              </Radio>
            </div>
            <div className={"margin-right-1 flex flex-basis-11"}>COLR</div>
            <div className={"margin-right-1 flex-basis-11"}>
              <Radio
                className={"margin-0 flex margin-right-2"}
                name="clircolr"
                checked={this.state.colr}
                disabled={this.state.isDisabled}
                onChange={e =>
                  this.setState({
                    clir: false,
                    colr: true
                  })
                }
              >
                <div className="font-weight-bold flex">Active</div>
              </Radio>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Advice of Charge
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              {this.state.isDisabled ? (
                <FormControl
                  type="text"
                  value={
                    this.state.aoc === false || this.state.aoc === "false"
                      ? "None"
                      : this.state.aoc
                  }
                  disabled={this.state.isDisabled}
                />
              ) : (
                <FormGroup className={"margin-0 flex"}>
                  {ADVICEOFCHARGE.map((type, i) => (
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      key={i + ""}
                      name="adviceOfCharge"
                      value={type.value}
                      defaultChecked={type.value === this.state.aoc}
                      onChange={e =>
                        this.setState({
                          aoc: e.target.value
                        })
                      }
                    >
                      <div className="font-weight-bold flex">{type.name}</div>
                    </Radio>
                  ))}
                </FormGroup>
              )}
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>DTMF</div>
            <div className={"margin-right-1 flex-basis-33"}>
              {this.state.isDisabled ? (
                <FormControl
                  type="text"
                  value={
                    this.state.dtmf === false || this.state.dtmf === "false"
                      ? "None"
                      : this.state.dtmf
                  }
                  disabled={this.state.isDisabled}
                />
              ) : (
                <FormGroup className={"margin-0 flex"}>
                  {DTMF.map((type, i) => (
                    <Radio
                      className={"margin-0 flex margin-right-2"}
                      key={i + ""}
                      name="dtmf"
                      value={type.value}
                      defaultChecked={type.value === this.state.dtmf}
                      disabled={this.state !== "SIP"}
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
              )}
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Total Number of PRA/BRA/SIP channels
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.totalNumber}
                placeholder={"Total Number"}
                onChange={e => this.setState({ totalNumber: e.target.value })}
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <React.Fragment>
          <Row className={"margin-top-1"}>
            <Col md={12} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-16"}>
                Destination Number Format for PRA
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  componentClass="select"
                  value={this.state.dstNumberPra}
                  onChange={e =>
                    this.setState({ dstNumberPra: e.target.value })
                  }
                  disabled={this.state.isDisabled}
                >
                  {DESTINATIONNUMBERSPRA.map((type, i) => (
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
              <div className={"margin-right-1 flex flex-basis-16"}>
                Nation Source Number Format for PRA
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  componentClass="select"
                  value={this.state.ntlNumberPra}
                  onChange={e =>
                    this.setState({ ntlNumberPra: e.target.value })
                  }
                  disabled={this.state.isDisabled}
                >
                  {NATIONNUMBERSPRA.map((type, i) => (
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
              <div className={"margin-right-1 flex flex-basis-16"}>
                Internation Source Number Format for PRA
              </div>
              <div className={"margin-right-1 flex-basis-33"}>
                <FormControl
                  componentClass="select"
                  value={this.state.intlNumberPra}
                  onChange={e =>
                    this.setState({ intlNumberPra: e.target.value })
                  }
                  disabled={this.state.isDisabled}
                >
                  {INTERNATIONNUMBERSPRA.map((type, i) => (
                    <option key={i} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </FormControl>
              </div>
            </Col>
          </Row>
        </React.Fragment>
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(index);
