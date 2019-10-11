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
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import HelpBlock from "react-bootstrap/lib/HelpBlock";

import { FormattedMessage } from "react-intl";

export class Details extends Component {
  state = {
    errorMacAddress: null
  };
  render() {
    const iadType = this.props.config.tenant.group.iad.iadType.filter(
      el => el.value === this.props.iad.iadType
    );
    return (
      <React.Fragment>
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
                value={iadType[0].label}
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
                  value={this.props.iad.macAddress}
                  placeholder={"MAC Address"}
                  onChange={e =>
                    this.setState({
                      macAddress: e.target.value,
                      errorMacAddress: false
                    })
                  }
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
                  id="pilotNumber"
                  defaultMessage="Pilot Number"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                type="text"
                value={this.props.iad.pilotNumber}
                placeholder={"Pilot Number"}
                onChange={e => this.setState({ pilotNumber: e.target.value })}
              />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ iad: state.iad, config: state.config });

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Details)
);
