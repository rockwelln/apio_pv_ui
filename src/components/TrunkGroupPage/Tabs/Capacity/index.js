import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

import { fetchPutUpdateTrunkGroup } from "../../../../store/actions";

import { removeEmpty } from "../../../remuveEmptyInObject";

export class Capacity extends Component {
  state = {
    disableButton: false,
    maxActiveCalls: null,
    maxIncomingCalls: null,
    maxOutgoingCalls: null,
    enableBursting: null
  };

  componentDidMount() {
    this.setState({
      maxActiveCalls: this.props.trunkGroup.maxActiveCalls
        ? this.props.trunkGroup.maxActiveCalls
        : "",
      maxIncomingCalls: this.props.trunkGroup.maxIncomingCalls
        ? this.props.trunkGroup.maxIncomingCalls
        : "",
      maxOutgoingCalls: this.props.trunkGroup.maxOutgoingCalls
        ? this.props.trunkGroup.maxOutgoingCalls
        : "",
      enableBursting: this.props.trunkGroup.enableBursting
        ? this.props.trunkGroup.enableBursting
        : false
    });
  }

  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Maximum number of simultaenous calls
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.maxActiveCalls}
                onChange={e => {
                  this.setState({
                    maxActiveCalls: Number(e.target.value)
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Maximum number of ongoing incoming calls
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.maxIncomingCalls}
                onChange={e => {
                  this.setState({
                    maxIncomingCalls: Number(e.target.value)
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Maximum number of ongoing outgoing calls
            </div>
            <div>
              <FormControl
                type="number"
                value={this.state.maxOutgoingCalls}
                onChange={e => {
                  this.setState({
                    maxOutgoingCalls: Number(e.target.value)
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Checkbox
              checked={this.state.enableBursting}
              onChange={e => {
                this.setState({ enableBursting: e.target.checked });
              }}
            >
              Allow bursting
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
    const {
      maxActiveCalls,
      maxIncomingCalls,
      maxOutgoingCalls,
      enableBursting
    } = this.state;

    const data = {
      maxActiveCalls: maxActiveCalls && maxActiveCalls,
      maxIncomingCalls: maxIncomingCalls && maxIncomingCalls,
      maxOutgoingCalls: maxOutgoingCalls && maxOutgoingCalls,
      enableBursting: enableBursting && enableBursting
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
  )(Capacity)
);
