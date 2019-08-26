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
import Checkbox from "react-bootstrap/lib/Checkbox";

import { fetchPostCreateGroup } from "../../store/actions";
import { removeEmpty } from "../remuveEmptyInObject";

import {
  TYPEOFIAD,
  TYPEOFACCESS,
  SERVICETYPE,
  ADVICEOFCHARGE,
  DTMF,
  CHANNELHUNTING,
  DIRECTION,
  DESTINATIONNUMBERSPRA,
  NATIONNUMBERSPRA,
  INTERNATIONNUMBERSPRA
} from "../../constants";

export class AddGroup extends Component {
  state = {
    groupName: "",
    ccli: "",
    typeOfIad: "",
    typeOfAccess: "",
    numberOfChannels: undefined,
    serviceType: "",
    additionnalRedundancy: false,
    zipCode: "",
    showServiceConfiguration: false,
    ncosValue: "",
    clip: false,
    colp: false,
    clir: false,
    colr: false,
    adviceOfCharge: "",
    dtmf: "RFC2833",
    channelHunting: "Lowest available channel first",
    direction: "",
    channelsIn: "",
    channelOut: "",
    dstNumberPra: "",
    ntlNumberPra: "",
    intlNumberPra: "",
    buttonName: "Create"
  };
  render() {
    console.log(this.state.adviceOfCharge);
    return (
      <React.Fragment>
        <Panel className={"margin-0"}>
          <Panel.Heading>
            <div className={"header"}>
              ADD GROUP
              <Button
                className={"margin-left-1 btn-danger"}
                onClick={this.cancelClick}
              >
                Cancel
              </Button>
            </div>
            <div>
              Enter yout Connexion Infos and Service Configuration (if not, we
              will use defauls parametres)
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>Name</div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.groupName}
                    placeholder={"Group Name"}
                    onChange={e => this.setState({ groupName: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  Connexion Infos
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>CCLI</div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.ccli}
                    placeholder={"CCLI"}
                    onChange={e => this.setState({ ccli: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Type of IAD
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
                        checked={type.value === this.state.typeOfIad}
                        onChange={e =>
                          this.setState({
                            typeOfIad: e.target.value
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
                  Type of access
                </div>
                <div className={"margin-right-1 flex"}>
                  <FormGroup className={"margin-0 flex"}>
                    {TYPEOFACCESS.map((type, i) => (
                      <Radio
                        disabled={type.disabled}
                        className={"margin-0 flex margin-right-2"}
                        key={i + ""}
                        name="typeOfAccess"
                        value={type.value}
                        checked={type.value === this.state.typeOfAccess}
                        onChange={e =>
                          this.setState({
                            typeOfAccess: e.target.value
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
                <div className={"margin-right-1 flex flex-basis-16"}>
                  Service Type
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    componentClass="select"
                    value={this.state.serviceType}
                    onChange={e =>
                      this.setState({ serviceType: e.target.value })
                    }
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
                <div className={"margin-right-1 flex flex-basis-16"} />
                <div className={"margin-right-1 flex-basis-33"}>
                  <Checkbox
                    checked={this.state.additionnalRedundancy}
                    className={"table-checkbox"}
                    onChange={e => {
                      this.setState({
                        additionnalRedundancy: e.target.checked
                      });
                    }}
                  >
                    Additionnal redundancy
                  </Checkbox>
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex flex-basis-16"}>
                  ZIP code
                </div>
                <div className={"margin-right-1 flex-basis-33"}>
                  <FormControl
                    type="text"
                    value={this.state.zipCode}
                    placeholder={"ZIP code"}
                    onChange={e => this.setState({ zipCode: e.target.value })}
                  />
                </div>
              </Col>
            </Row>
            <Row className={"margin-top-1"}>
              <Col md={12} className={"flex align-items-center"}>
                <div className={"margin-right-1 flex font-24"}>
                  Connexion Infos
                </div>
                {this.state.showServiceConfiguration ? (
                  <Glyphicon
                    onClick={() =>
                      this.setState({ showServiceConfiguration: false })
                    }
                    glyph="glyphicon glyphicon-menu-right"
                  />
                ) : (
                  <Glyphicon
                    onClick={() =>
                      this.setState({ showServiceConfiguration: true })
                    }
                    glyph="glyphicon glyphicon-menu-down"
                  />
                )}
              </Col>
            </Row>
            {this.state.showServiceConfiguration && (
              <React.Fragment>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      NCOS value
                    </div>
                    <div className={"margin-right-1 flex-basis-33"}>
                      <FormControl
                        type="text"
                        value={this.state.ncosValue}
                        placeholder={"NCOS value"}
                        onChange={e =>
                          this.setState({ ncosValue: e.target.value })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      CLIP
                    </div>
                    <div className={"margin-right-1 flex-basis-11"}>
                      <Checkbox
                        checked={this.state.clip}
                        className={"table-checkbox"}
                        onChange={e => {
                          this.setState({
                            clip: e.target.checked
                          });
                        }}
                      >
                        Active
                      </Checkbox>
                    </div>
                    <div className={"margin-right-1 flex flex-basis-11"}>
                      COLP
                    </div>
                    <div className={"margin-right-1 flex-basis-11"}>
                      <Checkbox
                        checked={this.state.colp}
                        className={"table-checkbox"}
                        onChange={e => {
                          this.setState({
                            colp: e.target.checked
                          });
                        }}
                      >
                        Active
                      </Checkbox>
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      CLIR
                    </div>
                    <div className={"margin-right-1 flex-basis-11"}>
                      <Checkbox
                        checked={this.state.clir}
                        className={"table-checkbox"}
                        onChange={e => {
                          this.setState({
                            clir: e.target.checked
                          });
                        }}
                      >
                        Active
                      </Checkbox>
                    </div>
                    <div className={"margin-right-1 flex flex-basis-11"}>
                      COLR
                    </div>
                    <div className={"margin-right-1 flex-basis-11"}>
                      <Checkbox
                        checked={this.state.colr}
                        className={"table-checkbox"}
                        onChange={e => {
                          this.setState({
                            colr: e.target.checked
                          });
                        }}
                      >
                        Active
                      </Checkbox>
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      Advice of Charge
                    </div>
                    <div className={"margin-right-1 flex"}>
                      <FormGroup className={"margin-0 flex"}>
                        {ADVICEOFCHARGE.map((type, i) => (
                          <Radio
                            className={"margin-0 flex margin-right-2"}
                            key={i + ""}
                            name="adviceOfCharge"
                            value={type.value}
                            defaultChecked={
                              type.value === this.state.adviceOfCharge
                            }
                            onChange={e =>
                              this.setState({
                                adviceOfCharge: e.target.value
                              })
                            }
                          >
                            <div className="font-weight-bold flex">
                              {type.name}
                            </div>
                          </Radio>
                        ))}
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
                <Row className={"margin-top-1"}>
                  <Col md={12} className={"flex align-items-center"}>
                    <div className={"margin-right-1 flex flex-basis-16"}>
                      DTMF
                    </div>
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
                            <div className="font-weight-bold flex">
                              {type.name}
                            </div>
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
                            <div className="font-weight-bold flex">
                              {type.name}
                            </div>
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
                        value={this.state.channeslIn}
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
                      {"\u002a"} Don't exceed your IADs capacity (avalible:
                      xxxxx)
                    </div>
                  </Col>
                </Row>
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
            )}
            <Row>
              <Col md={12}>
                <div className="button-row">
                  <div className="pull-right">
                    <Button
                      onClick={this.AddGroup}
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
      `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`
    );
  };

  AddGroup = () => {
    const {
      groupName,
      ccli,
      typeOfIad,
      typeOfAccess,
      numberOfChannels,
      serviceType,
      additionnalRedundancy,
      zipCode,
      ncosValue,
      clip,
      colp,
      clir,
      colr,
      adviceOfCharge,
      dtmf,
      channelHunting,
      direction,
      channelsIn,
      channelOut,
      dstNumberPra,
      ntlNumberPra,
      intlNumberPra
    } = this.state;

    const data = {
      groupName,
      cliName: ccli,
      zipCode,
      numberOfChannels: Number(numberOfChannels),
      pbxType: typeOfIad,
      accessType: typeOfAccess,
      serviceType,
      np1Redundancy: additionnalRedundancy,
      ncos: ncosValue,
      clip,
      colp,
      clir,
      colr,
      aoc: adviceOfCharge,
      direction,
      channelsIn,
      channelOut,
      channelHunting,
      dtmf,
      sip_nat_dst: dstNumberPra,
      sip_nat_src: ntlNumberPra,
      sip_int_src: intlNumberPra
    };
    const clearData = removeEmpty(data);
    this.setState({ buttonName: "Creating..." }, () =>
      this.props
        .fetchPostCreateGroup(this.props.match.params.tenantId, clearData)
        .then(res =>
          true //res === "created"
            ? this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`
              )
            : this.setState({ buttonName: "Create" })
        )
    );
  };
}

const mapDispatchToProps = { fetchPostCreateGroup };

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AddGroup)
);
