import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

import { fetchPutUpdateTrunkGroup } from "../../../../store/actions";

import { removeEmpty } from "../../../remuveEmptyInObject";

export class CallScreening extends Component {
  state = {
    disableButton: false,
    allowUnscreenedCalls: null,
    allowUnscreenedEmergencyCalls: null
  };

  componentDidMount() {
    this.setState({
      allowUnscreenedCalls: this.props.trunkGroup.allowUnscreenedCalls
        ? this.props.trunkGroup.allowUnscreenedCalls
        : false,
      allowUnscreenedEmergencyCalls: this.props.trunkGroup
        .allowUnscreenedEmergencyCalls
        ? this.props.trunkGroup.allowUnscreenedEmergencyCalls
        : false
    });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <Checkbox
              checked={this.state.allowUnscreenedCalls}
              onChange={e => {
                this.setState({ allowUnscreenedCalls: e.target.checked });
              }}
            >
              Allow unscreened calls
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Checkbox
              checked={this.state.allowUnscreenedEmergencyCalls}
              onChange={e => {
                this.setState({
                  allowUnscreenedEmergencyCalls: e.target.checked
                });
              }}
            >
              Allow unscreened calls to emergency services
            </Checkbox>
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
    const { allowUnscreenedCalls, allowUnscreenedEmergencyCalls } = this.state;

    const data = {
      allowUnscreenedCalls: allowUnscreenedCalls && allowUnscreenedCalls,
      allowUnscreenedEmergencyCalls:
        allowUnscreenedEmergencyCalls && allowUnscreenedEmergencyCalls
    };

    const clearData = removeEmpty(data);

    this.setState({ disableButton: true }, () =>
      this.props
        .fetchPutUpdateTrunkGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          this.props.match.params.trunkGroupName,
          clearData
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
