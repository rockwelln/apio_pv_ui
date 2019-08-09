import React, { Component } from "react";
import { connect } from "react-redux";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

export class Capacity extends Component {
  state = {
    maxActiveCalls: null,
    maxIncomingCalls: null,
    maxOutgoingCalls: null,
    enableBursting: null
  };

  componentDidMount() {
    this.setState({
      maxActiveCalls: this.props.trunkGroup.maxActiveCalls,
      maxIncomingCalls: this.props.trunkGroup.maxIncomingCalls,
      maxOutgoingCalls: this.props.trunkGroup.maxOutgoingCalls,
      enableBursting: this.props.trunkGroup.enableBursting
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
                    maxActiveCalls: e.target.value
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
                    maxIncomingCalls: e.target.value
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
                    maxOutgoingCalls: e.target.value
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
)(Capacity);
