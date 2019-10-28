import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import { FormattedMessage } from "react-intl";

import {
  changeObjectIAD,
  fetchPutUpdateIAD
} from "../../../../../store/actions";
import { removeEmpty } from "../../../../remuveEmptyInObject";

export class Options extends Component {
  state = {
    advanced: {},
    disabledButton: false
  };
  componentDidMount() {
    this.setState({
      advanced: {
        clock_master: this.props.iad.advanced.clock_master,
        dual_power: this.props.iad.advanced.dual_power,
        isdnTerminationSide: this.props.iad.advanced.isdnTerminationSide,
        sysLogEnabled: this.props.iad.advanced.sysLogEnabled,
        sysLogIp: this.props.iad.advanced.sysLogIp
      }
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
                  id="clockMaster"
                  defaultMessage="Clock Master"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <Checkbox
                checked={this.state.advanced.clock_master}
                onChange={this.changeClockMaster}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage id="dualPower" defaultMessage="Dual Power" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <Checkbox
                checked={this.state.advanced.dual_power}
                onChange={this.changeDualPower}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage
                  id="isdnTerminationSide"
                  defaultMessage="ISDN termination side"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.advanced.isdnTerminationSide}
                onChange={this.changeIsdnTerminationSide}
              >
                {this.props.config.tenant.group.iad.isdnTerminationSide.map(
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
                <FormattedMessage id="sysLogEnabled" defaultMessage="Syslog enabled" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <Checkbox
                checked={this.state.advanced.sysLogEnabled}
                onChange={this.changeSysLogEnabled}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage id="sysLogIp" defaultMessage="Syslog IP Address" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-16"}>
              <FormControl
                type="text"
                value={this.state.advanced.sysLogIp}
                placeholder={"IPv4 address"}
                onChange={this.changeSysLogIp}
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
    const { advanced } = this.state;
    const data = { advanced };
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

  changeIsdnTerminationSide = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        isdnTerminationSide: e.target.value
      }
    });
    this.props.changeObjectIAD(
      "advanced",
      "isdnTerminationSide",
      e.target.value
    );
  };

  changeDualPower = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        dual_power: e.target.checked
      }
    });
    this.props.changeObjectIAD("advanced", "dual_power", e.target.checked);
  };

  changeSysLogEnabled = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        sysLogEnabled: e.target.checked
      }
    });
    this.props.changeObjectIAD("advanced", "sysLogEnabled", e.target.checked);
  };

  changeSysLogIp = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        sysLogIp: e.target.value
      }
    });
    this.props.changeObjectIAD("advanced", "sysLogIp", e.target.value);
  };

  changeClockMaster = e => {
    this.setState({
      advanced: {
        ...this.state.advanced,
        clock_master: e.target.checked
      }
    });
    this.props.changeObjectIAD("advanced", "clock_master", e.target.checked);
  };
}

const mapStateToProps = state => ({
  iad: state.iad,
  config: state.config
});

const mapDispatchToProps = { changeObjectIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Options)
);
