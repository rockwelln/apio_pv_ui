import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Checkbox from "react-bootstrap/lib/Checkbox";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

import { fetchPutUpdateTrunkGroup } from "../../../../store/actions";

export class Advanced extends Component {
  state = {
    disableButton: false,
    peeringDomain: null,
    routeToPeeringDomain: null,
    prefixEnabled: null,
    prefix: null
  };

  componentDidMount() {
    this.setState({
      peeringDomain: this.props.trunkGroup.peeringDomain
        ? this.props.trunkGroup.peeringDomain
        : "",
      routeToPeeringDomain: this.props.trunkGroup.routeToPeeringDomain
        ? this.props.trunkGroup.routeToPeeringDomain
        : "",
      prefixEnabled: this.props.trunkGroup.prefixEnabled
        ? this.props.trunkGroup.prefixEnabled
        : "",
      prefix: this.props.trunkGroup.prefix ? this.props.trunkGroup.prefix : ""
    });
  }

  render() {
    return (
      <React.Fragment className={"margin-1"}>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <Checkbox
              checked={this.state.routeToPeeringDomain}
              onChange={e => {
                this.setState({ routeToPeeringDomain: e.target.checked });
              }}
            >
              Overwrite the domain of the R-URI for outgoing calls
            </Checkbox>
            <FormControl
              className={"width-auto margin-left-1"}
              type="text"
              value={this.state.peeringDomain}
              onChange={e => {
                this.setState({
                  peeringDomain: e.target.value
                });
              }}
            />
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <Checkbox
              checked={this.state.prefixEnabled}
              onChange={e => {
                this.setState({ prefixEnabled: e.target.checked });
              }}
            >
              Add prefix to R-URI for outgoing calls
            </Checkbox>
            <FormControl
              className={"width-auto margin-left-1"}
              type="text"
              value={this.state.prefix}
              onChange={e => {
                this.setState({
                  prefix: e.target.value
                });
              }}
            />
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
      peeringDomain,
      routeToPeeringDomain,
      prefixEnabled,
      prefix
    } = this.state;

    const data = {
      peeringDomain: peeringDomain && peeringDomain,
      routeToPeeringDomain: routeToPeeringDomain && routeToPeeringDomain,
      prefixEnabled: prefixEnabled && prefixEnabled,
      prefix: prefix && prefix
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
  )(Advanced)
);
