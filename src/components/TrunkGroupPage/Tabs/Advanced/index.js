import React, { Component } from "react";
import { connect } from "react-redux";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

export class Advanced extends Component {
  state = {
    peeringDomain: null,
    routeToPeeringDomain: null,
    prefixEnabled: null,
    prefix: null
  };

  componentDidMount() {
    this.setState({
      peeringDomain: this.props.trunkGroup.peeringDomain,
      routeToPeeringDomain: this.props.trunkGroup.routeToPeeringDomain,
      prefixEnabled: this.props.trunkGroup.prefixEnabled,
      prefix: this.props.trunkGroup.prefix
    });
  }

  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>
              Domain used for overwrite
            </div>
            <div>
              <FormControl
                type="text"
                value={this.state.peeringDomain}
                onChange={e => {
                  this.setState({
                    peeringDomain: e.target.value
                  });
                }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Checkbox
              checked={this.state.routeToPeeringDomain}
              onChange={e => {
                this.setState({ routeToPeeringDomain: e.target.checked });
              }}
            >
              Overwrite the domain of the R-URI for outgoing calls
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Checkbox
              checked={this.state.prefixEnabled}
              onChange={e => {
                this.setState({ prefixEnabled: e.target.checked });
              }}
            >
              Add prefix to R-URI for outgoing calls
            </Checkbox>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-33"}>Prefix</div>
            <div>
              <FormControl
                type="text"
                value={this.state.prefix}
                onChange={e => {
                  this.setState({
                    prefix: e.target.value
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
)(Advanced);
