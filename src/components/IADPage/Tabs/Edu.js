import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { FormattedMessage } from "react-intl";

import { changeObjectIAD, fetchPutUpdateIAD } from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";

export class Edu extends Component {
  state = {
    edu1: {},
    edu2: {},
    disabledButton: false
  };

  componentDidMount() {
    this.setState({ edu1: this.props.iad.edu1, edu2: this.props.iad.edu2 });
  }
  render() {
    const iadType = this.props.config.tenant.group.iad.iadType.filter(
      el => el.value === this.props.iad.iadType
    );
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage id="eduAName" defaultMessage="EDU A Name" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.edu1.name}
                placeholder={"EDU Name"}
                onChange={this.changeEdu1Name}
              />
            </div>
          </Col>
          {this.props.iad.edu2 && (
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage id="eduBName" defaultMessage="EDU B Name" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.edu2.name}
                  placeholder={"EDU Name"}
                  onChange={this.changeEdu2Name}
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
                value={this.state.edu1.lanPort}
                placeholder={"LAN port"}
                onChange={this.changeEdu1Lan}
              />
            </div>
          </Col>
          {this.props.iad.edu2 && (
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage id="lanPort" defaultMessage="LAN port" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.edu2.lanPort}
                  placeholder={"LAN port"}
                  onChange={this.changeEdu2Lan}
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
                value={this.state.edu1.wanPort}
                placeholder={"WAN port"}
                onChange={this.changeEdu1Wan}
              />
            </div>
          </Col>
          {this.props.iad.edu2 && (
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage id="wanPort" defaultMessage="WAN port" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.edu2.wanPort}
                  placeholder={"WAN port"}
                  onChange={this.changeEdu2Wan}
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
                value={this.state.edu1.srName}
                placeholder={"SR name"}
                onChange={this.changeEdu1SrName}
              />
            </div>
          </Col>
          {this.props.iad.edu2 && (
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage id="srName" defaultMessage="SR name" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.edu2.srName}
                  placeholder={"SR name"}
                  onChange={this.changeEdu2SrName}
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
                value={this.state.edu1.srSap}
                placeholder={"SR SAP"}
                onChange={this.changeEdu1SrSap}
              />
            </div>
          </Col>
          {this.props.iad.edu2 && (
            <Col md={6} className={"flex align-items-center"}>
              <div className={"margin-right-1 flex flex-basis-33"}>
                <ControlLabel>
                  <FormattedMessage id="srSap" defaultMessage="SR SAP" />
                </ControlLabel>
              </div>
              <div className={"margin-right-1 flex-basis-66"}>
                <FormControl
                  type="text"
                  value={this.state.edu2.srSap}
                  placeholder={"SR SAP"}
                  onChange={this.changeEdu2SrSap}
                />
              </div>
            </Col>
          )}
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={6} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              <ControlLabel>
                <FormattedMessage id="eduVlanId" defaultMessage="EDU VLAN ID" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-66"}>
              <FormControl
                type="text"
                value={this.state.edu1.vlan}
                placeholder={"EDU VLAN ID"}
                onChange={this.changeEdu1Vlan}
              />
            </div>
          </Col>
          {this.props.iad.edu2 && (
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
                  value={this.state.edu2.vlan}
                  placeholder={"EDU VLAN ID"}
                  onChange={this.changeEdu2Vlan}
                />
              </div>
            </Col>
          )}
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
    const { edu1, edu2 } = this.state;
    const data = { edu1, edu2 };
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

  changeEdu1Name = e => {
    this.setState({
      edu1: {
        ...this.state.edu1,
        name: e.target.value
      }
    });
    this.props.changeObjectIAD("edu1", "name", e.target.value);
  };

  changeEdu2Name = e => {
    this.setState({
      edu2: {
        ...this.state.edu2,
        name: e.target.value
      }
    });
    this.props.changeObjectIAD("edu2", "name", e.target.value);
  };

  changeEdu1Lan = e => {
    this.setState({
      edu1: {
        ...this.state.edu1,
        lanPort: e.target.value
      }
    });
    this.props.changeObjectIAD("edu1", "lanPort", e.target.value);
  };

  changeEdu2Lan = e => {
    this.setState({
      edu2: {
        ...this.state.edu2,
        lanPort: e.target.value
      }
    });
    this.props.changeObjectIAD("edu2", "lanPort", e.target.value);
  };

  changeEdu1Wan = e => {
    this.setState({
      edu1: {
        ...this.state.edu1,
        wanPort: e.target.value
      }
    });
    this.props.changeObjectIAD("edu1", "wanPort", e.target.value);
  };

  changeEdu2Wan = e => {
    this.setState({
      edu2: {
        ...this.state.edu2,
        wanPort: e.target.value
      }
    });
    this.props.changeObjectIAD("edu2", "wanPort", e.target.value);
  };

  changeEdu1SrName = e => {
    this.setState({
      edu1: {
        ...this.state.edu1,
        srName: e.target.value
      }
    });
    this.props.changeObjectIAD("edu1", "srName", e.target.value);
  };

  changeEdu2SrName = e => {
    this.setState({
      edu2: {
        ...this.state.edu2,
        srName: e.target.value
      }
    });
    this.props.changeObjectIAD("edu2", "srName", e.target.value);
  };

  changeEdu1SrSap = e => {
    this.setState({
      edu1: {
        ...this.state.edu1,
        srSap: e.target.value
      }
    });
    this.props.changeObjectIAD("edu1", "srSap", e.target.value);
  };

  changeEdu2SrSap = e => {
    this.setState({
      edu2: {
        ...this.state.edu2,
        srSap: e.target.value
      }
    });
    this.props.changeObjectIAD("edu2", "srSap", e.target.value);
  };

  changeEdu1Vlan = e => {
    this.setState({
      edu1: {
        ...this.state.edu1,
        vlan: e.target.value
      }
    });
    this.props.changeObjectIAD("edu1", "vlan", e.target.value);
  };

  changeEdu2Vlan = e => {
    this.setState({
      edu2: {
        ...this.state.edu2,
        vlan: e.target.value
      }
    });
    this.props.changeObjectIAD("edu2", "vlan", e.target.value);
  };
}

const mapStateToProps = state => ({ iad: state.iad, config: state.config });

const mapDispatchToProps = { changeObjectIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Edu)
);
