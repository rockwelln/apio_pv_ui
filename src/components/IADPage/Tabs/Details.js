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
import Alert from "react-bootstrap/lib/Alert";

import { FormattedMessage } from "react-intl";

import { changeIAD, fetchPutUpdateIAD } from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";

export class Details extends Component {
  state = {
    errorMacAddress: null,
    macAddress: "",
    pilotNumber: "",
    disabledButton: false,
    isDisabled: true
  };
  componentDidMount() {
    this.setState({
      macAddress: this.props.iad.macAddress,
      pilotNumber: this.props.iad.pilotNumber
    });
  }
  render() {
    const iadType = this.props.config.tenant.group.iad.iadType.filter(
      el => el.value === this.props.iad.iadType
    );
    return (
      <React.Fragment>
        <Row>
          <Col md={12} className={"flex align-items-center"}>
            <React.Fragment>
              {this.props.iadTimer.at && (
                <Alert bsStyle="warning">
                  {`Reboot scheduled at ${this.props.iadTimer.at}`}
                </Alert>
              )}
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
              <ControlLabel>
                <FormattedMessage id="id" defaultMessage="ID" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl type="text" disabled value={this.props.iad.iadId} />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage id="iadType" defaultMessage="Type of IAD" />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={iadType.length && iadType[0].label}
                disabled
              ></FormControl>
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
                  value={this.state.macAddress || this.props.iad.macAddress}
                  placeholder={"MAC Address"}
                  disabled={this.state.isDisabled}
                  onChange={this.upadateMacAddres}
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
                  id="maintenanceNumber"
                  defaultMessage="Maintenance number"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.state.pilotNumber || this.props.iad.pilotNumber}
                placeholder={"Pilot Number"}
                disabled
                onChange={this.upadatePilotNumber}
              />
            </div>
          </Col>
        </Row>
        {!this.state.isDisabled && (
          <Row>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    onClick={this.updateIAD}
                    type="submit"
                    className="btn-primary"
                    disabled={
                      this.state.errorMacAddress || this.state.disabledButton
                    }
                  >
                    <Glyphicon glyph="glyphicon glyphicon-ok" />
                    <FormattedMessage id="update" defaultMessage="Update" />
                  </Button>
                </div>
                <div className="pull-right margin-right-1">
                  <Button
                    onClick={this.cancelClick}
                    type="submit"
                    className="btn-danger"
                  >
                    <FormattedMessage id="cancel" defaultMessage="Cancel" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }

  cancelClick = () => {
    this.setState({
      isDisabled: true,
      macAddress: this.props.iad.macAddress,
      pilotNumber: this.props.iad.pilotNumber,
      errorMacAddress: null
    });
  };

  updateIAD = () => {
    const { macAddress, pilotNumber } = this.state;
    const data = { macAddress, pilotNumber };
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
          .then(res =>
            res === "successful"
              ? this.setState({ disabledButton: false, isDisabled: true })
              : this.setState({ disabledButton: false })
          )
      );
    }
  };

  upadateMacAddres = e => {
    this.setState({
      macAddress: e.target.value,
      errorMacAddress: null
    });
    this.props.changeIAD("macAddress", e.target.value);
  };

  upadatePilotNumber = e => {
    this.props.changeIAD("pilotNumber", e.target.value);
    this.setState({ pilotNumber: e.target.value });
  };

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
      this.setState({ errorMacAddress: "error" });
    }
  };
}

const mapStateToProps = state => ({
  iad: state.iad,
  config: state.config,
  iadTimer: state.iadTimer
});

const mapDispatchToProps = { changeIAD, fetchPutUpdateIAD };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details)
);
