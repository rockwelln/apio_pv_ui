import React, { Component } from "react";
import { connect } from "react-redux";

import FormControl from "react-bootstrap/lib/FormControl";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

const OPTIONS = [
  {
    name: "Unscreened Originating Calls",
    value: "Unscreened Originating Calls"
  },
  { name: "No Calls", value: "No Calls" },
  { name: "All Originating Calls", value: "All Originating Calls" }
];

export class CallScreening extends Component {
  state = {
    pilotUserCallingLineIdentityForExternalCallsPolicy: null,
    pilotUserChargeNumberPolicy: null,
    pilotUserCallingLineIdentityForEmergencyCallsPolicy: null
  };

  componentDidMount() {
    this.setState({
      pilotUserCallingLineIdentityForExternalCallsPolicy: this.props.trunkGroup
        .pilotUserCallingLineIdentityForExternalCallsPolicy,
      pilotUserChargeNumberPolicy: this.props.trunkGroup
        .pilotUserChargeNumberPolicy,
      pilotUserCallingLineIdentityForEmergencyCallsPolicy: this.props.trunkGroup
        .pilotUserCallingLineIdentityForEmergencyCallsPolicy
    });
  }

  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Use pilot user CLI for outgoing calls
            </div>
            <div>
              <FormControl
                componentClass="select"
                value={
                  this.state.pilotUserCallingLineIdentityForExternalCallsPolicy
                }
                onChange={e =>
                  this.setState({
                    pilotUserCallingLineIdentityForExternalCallsPolicy:
                      e.target.value
                  })
                }
              >
                {OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Add pilot user CLI as charge number for outgoing calls
            </div>
            <div>
              <FormControl
                componentClass="select"
                value={this.state.pilotUserChargeNumberPolicy}
                onChange={e =>
                  this.setState({ pilotUserChargeNumberPolicy: e.target.value })
                }
              >
                {OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Use pilot user CLI for outgoing calls to emergency services
            </div>
            <div>
              <FormControl
                componentClass="select"
                value={
                  this.state.pilotUserCallingLineIdentityForEmergencyCallsPolicy
                }
                onChange={e =>
                  this.setState({
                    pilotUserCallingLineIdentityForEmergencyCallsPolicy:
                      e.target.value
                  })
                }
              >
                {OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button className={"btn-primary"}>&nbsp; Update</Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  trunkGroup: state.trunkGroup
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallScreening);
