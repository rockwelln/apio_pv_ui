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

import {
  changeIAD,
  fetchPutUpdateIAD,
  fetchGetPhoneNumbersByGroupNotTP
} from "../../../store/actions";
import { removeEmpty } from "../../remuveEmptyInObject";
import Loading from "../../../common/Loading";

export class Details extends Component {
  state = {
    errorMacAddress: null,
    macAddress: "",
    pilotNumber: "",
    disabledButton: false,
    isDisabled: true,
    timers: [],
    cliPhoneNumber: "",
    isLoadingPN: true
  };
  componentDidMount() {
    this.setState({
      macAddress: this.props.iad.macAddress,
      pilotNumber: this.props.iad.pilotNumber,
      timers: this.props.iadTimer.filter(timer => timer.status === "WAIT"),
      cliPhoneNumber: this.props.iad.cliPhoneNumber
    });
    this.props
      .fetchGetPhoneNumbersByGroupNotTP(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoadingPN: false }));
  }
  render() {
    const iadType = this.props.config.tenant.group.iad.iadType.filter(
      el => el.value === this.props.iad.iadType
    );

    if (this.state.isLoadingPN) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            {!!this.state.timers.length && (
              <Alert bsStyle="warning">
                {this.state.timers.map(timer => (
                  <p key={timer.id}>{`Reboot scheduled at ${timer.at}`}</p>
                ))}
              </Alert>
            )}
          </Col>
        </Row>
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
                  value={this.state.macAddress}
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
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage
                  id="mainNumber"
                  defaultMessage="Main Number"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.state.cliPhoneNumber}
                onChange={e =>
                  this.setState({
                    cliPhoneNumber: e.target.value
                  })
                }
                disabled={this.state.isDisabled}
                onChange={this.upadateCliPhoneNumber}
              >
                {!this.state.cliPhoneNumber && (
                  <option key={"empty"} value={""}></option>
                )}
                {this.props.phoneNumbersByGroupNotTP.map((el, i) => (
                  <option key={i} value={el}>
                    {el}
                  </option>
                ))}
              </FormControl>
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
                    {this.state.disabledButton ? (
                      <FormattedMessage
                        id="updating"
                        defaultMessage="Updating..."
                      />
                    ) : (
                      <FormattedMessage id="update" defaultMessage="Update" />
                    )}
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
      cliPhoneNumber: this.props.iad.cliPhoneNumber,
      errorMacAddress: null
    });
  };

  updateIAD = () => {
    const { macAddress, pilotNumber, cliPhoneNumber } = this.state;
    const data = { macAddress, pilotNumber, cliPhoneNumber };
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

  upadateCliPhoneNumber = e => {
    this.props.changeIAD("cliPhoneNumber", e.target.value);
    this.setState({ cliPhoneNumber: e.target.value });
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
  phoneNumbersByGroupNotTP: state.phoneNumbersByGroupNotTP,
  iad: state.iad,
  config: state.config,
  iadTimer: state.iadTimer
});

const mapDispatchToProps = {
  changeIAD,
  fetchPutUpdateIAD,
  fetchGetPhoneNumbersByGroupNotTP
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details)
);
