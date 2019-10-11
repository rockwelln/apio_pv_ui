import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";

import Loading from "../../common/Loading";

import { FormattedMessage } from "react-intl";

import {
  fetchGetGroupById,
  fetchPutUpdateGroupDetails
} from "../../store/actions";

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
} from "../../constants";

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
    additionnalRedundancy: true,
    isLoading: true,
    group: {}
  };

  fetchGroup = () => {
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoading: false, group: this.props.group }));
  };

  componentDidMount() {
    this.fetchGroup();
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row>
          <Col md={12} className={"flex align-items-center"}>
            <React.Fragment>
              <div className={"header margin-right-2"}>
                <FormattedMessage id="details" defaultMessage="Details" />
              </div>
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
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="siteID" defaultMessage="Site ID" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                placeholder={"ID"}
                disabled
                value={this.props.match.params.groupId}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="siteName" defaultMessage="Site Name" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.group.groupName}
                placeholder={"Site Name"}
                onChange={e =>
                  this.setState({
                    group: { ...this.state.group, groupName: e.target.value }
                  })
                }
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="mainNumber" defaultMessage="Main Number" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.group.cliName}
                placeholder={"Main Number"}
                onChange={e =>
                  this.setState({
                    group: { ...this.state.group, cliName: e.target.value }
                  })
                }
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage id="zipCode" defaultMessage="ZIP code" />
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.group.zipCode}
                placeholder={"ZIP code"}
                onChange={e =>
                  this.setState({
                    group: { ...this.state.group, zipCode: e.target.value }
                  })
                }
                disabled={this.state.isDisabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <FormattedMessage
                id="virtualSite"
                defaultMessage="Virtual Site"
              />
            </div>
            <div className={"margin-right-1 flex"}>
              <FormGroup className={"margin-0 flex"}>
                <Radio
                  className={"margin-0 flex margin-right-2"}
                  name="isVirtualSite"
                  checked={this.state.group.virtualSite}
                  disabled={this.state.isDisabled}
                  onChange={e =>
                    this.setState({
                      group: {
                        ...this.state.group,
                        virtualSite: e.target.checked
                      }
                    })
                  }
                >
                  <div className="font-weight-bold flex">
                    <FormattedMessage id="yes" defaultMessage="Yes" />
                  </div>
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
                  <div className="font-weight-bold flex">
                    <FormattedMessage id="no" defaultMessage="No" />
                  </div>
                </Radio>
              </FormGroup>
            </div>
          </Col>
        </Row>
        {/* <Row className={"margin-top-1"}>
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
        </React.Fragment>*/}
        {!this.state.isDisabled && (
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={() => this.updateGroup()}
                    type="submit"
                    className="btn-primary"
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    <FormattedMessage id="update" defaultMessage="Update" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }

  updateGroup = () => {
    const { groupName, cliName, virtualSite } = this.state.group;
    const data = {
      groupName,
      cliName,
      virtualSite
    };
    this.props
      .fetchPutUpdateGroupDetails(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        data
      )
      .then(() => this.setState({ isDisabled: true }));
  };
}

const mapStateToProps = state => ({ group: state.group });

const mapDispatchToProps = { fetchGetGroupById, fetchPutUpdateGroupDetails };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(index)
);
