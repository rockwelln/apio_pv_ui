import React, { Component } from "react";
import { connect } from "react-redux";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";

import { FormattedMessage } from "react-intl";

export class Options extends Component {
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
              <Checkbox checked={this.props.iad.advanced.clock_master} />
            </div>
          </Col>
        </Row>
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
              <Checkbox checked={this.props.iad.advanced.dual_power} />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              <ControlLabel>
                <FormattedMessage
                  id="isdnTerminationSide"
                  defaultMessage="ISDN temination side"
                />
              </ControlLabel>
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl
                componentClass="select"
                value={this.props.iad.advanced.isdnTerminationSide}
                onChange={this.changeDtmf}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  iad: state.iad,
  config: state.config
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
