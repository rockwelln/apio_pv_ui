import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";

import { fetchPutUpdateTrunkGroup } from "../../../../store/actions";

export class CallScreening extends Component {
  state = {
    disableButton: false,
    statefulReroutingEnabled: null,
    sendContinuousOptionsMessage: null,
    continuousOptionsSendingIntervalSeconds: null,
    failureOptionsSendingIntervalSeconds: null,
    failureThresholdCounter: null,
    successThresholdCounter: null,
    inviteFailureThresholdCounter: null,
    inviteFailureThresholdWindowSeconds: null
  };

  componentDidMount() {
    this.setState({
      statefulReroutingEnabled: this.props.trunkGroup.statefulReroutingEnabled,
      sendContinuousOptionsMessage: this.props.trunkGroup
        .sendContinuousOptionsMessage,
      continuousOptionsSendingIntervalSeconds: this.props.trunkGroup
        .continuousOptionsSendingIntervalSeconds,
      failureOptionsSendingIntervalSeconds: this.props.trunkGroup
        .failureOptionsSendingIntervalSeconds,
      failureThresholdCounter: this.props.trunkGroup.failureThresholdCounter,
      successThresholdCounter: this.props.trunkGroup.successThresholdCounter,
      inviteFailureThresholdCounter: this.props.trunkGroup
        .inviteFailureThresholdCounter,
      inviteFailureThresholdWindowSeconds: this.props.trunkGroup
        .inviteFailureThresholdWindowSeconds
    });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <Checkbox
              checked={this.state.statefulReroutingEnabled}
              onChange={e => {
                this.setState({ statefulReroutingEnabled: e.target.checked });
              }}
            >
              Active
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Checkbox
              checked={this.state.sendContinuousOptionsMessage}
              onChange={e => {
                this.setState({
                  sendContinuousOptionsMessage: e.target.checked
                });
              }}
            >
              Send OPTION messages
            </Checkbox>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Time between 2 successful options
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.continuousOptionsSendingIntervalSeconds}
                onChange={e => {
                  this.setState({
                    continuousOptionsSendingIntervalSeconds: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Time between 2 retries
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.failureOptionsSendingIntervalSeconds}
                onChange={e => {
                  this.setState({
                    failureOptionsSendingIntervalSeconds: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Number of failing OPTIONS before trunkgroup is set OOS
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.failureThresholdCounter}
                onChange={e => {
                  this.setState({
                    failureThresholdCounter: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Number of succesful OPTIONS before trunkgroup is set back in
              service
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.successThresholdCounter}
                onChange={e => {
                  this.setState({
                    successThresholdCounter: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Number of failing INVITES before trunkgroup is set OOS
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.inviteFailureThresholdCounter}
                onChange={e => {
                  this.setState({
                    inviteFailureThresholdCounter: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Max time between 2 failing invite before declaring OOS
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.inviteFailureThresholdWindowSeconds}
                onChange={e => {
                  this.setState({
                    inviteFailureThresholdWindowSeconds: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  className={"btn-primary"}
                  onClick={this.update}
                  disabled={this.state.disableButton}
                >
                  Update
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
  update = () => {
    const {
      statefulReroutingEnabled,
      sendContinuousOptionsMessage,
      continuousOptionsSendingIntervalSeconds,
      failureOptionsSendingIntervalSeconds,
      failureThresholdCounter,
      successThresholdCounter,
      inviteFailureThresholdCounterl,
      inviteFailureThresholdWindowSeconds
    } = this.state;

    const data = {
      statefulReroutingEnabled:
        statefulReroutingEnabled && statefulReroutingEnabled,
      sendContinuousOptionsMessage:
        sendContinuousOptionsMessage && sendContinuousOptionsMessage,
      continuousOptionsSendingIntervalSeconds:
        continuousOptionsSendingIntervalSeconds &&
        continuousOptionsSendingIntervalSeconds,
      failureOptionsSendingIntervalSeconds:
        failureOptionsSendingIntervalSeconds &&
        failureOptionsSendingIntervalSeconds,
      failureThresholdCounter:
        failureThresholdCounter && failureThresholdCounter,
      successThresholdCounter:
        successThresholdCounter && successThresholdCounter,
      inviteFailureThresholdCounterl:
        inviteFailureThresholdCounterl && inviteFailureThresholdCounterl,
      inviteFailureThresholdWindowSeconds:
        inviteFailureThresholdWindowSeconds &&
        inviteFailureThresholdWindowSeconds
    };

    this.setState({ disableButton: true }, () =>
      this.props
        .fetchPutUpdateTrunkGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          this.props.match.params.trunkGroupName,
          data
        )
        .then(() => this.setState({ disableButton: false }))
    );
  };
}

const mapStateToProps = state => ({
  trunkGroup: state.trunkGroup
});

const mapDispatchToProps = { fetchPutUpdateTrunkGroup };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CallScreening)
);
