import React, { Component } from "react";
import { connect } from "react-redux";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

export class CallScreening extends Component {
  state = {
    allowUnscreenedCalls: null,
    allowUnscreenedEmergencyCalls: null
  };

  componentDidMount() {
    this.setState({
      allowUnscreenedCalls: this.props.trunkGroup.allowUnscreenedCalls,
      allowUnscreenedEmergencyCalls: this.props.trunkGroup
        .allowUnscreenedEmergencyCalls
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
