import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import Button from "react-bootstrap/lib/Button";

import { changeStepOfCreateGroup } from "../../store/actions";

export class Created extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>Group created</div>
            </Col>
          </Row>
        </div>
        <div class="panel-body">
          <p>
            {this.props.createdGroup.groupId
              ? `Congratulations, group ${this.props.createdGroup.groupName} (id: ${this.props.createdGroup.groupId} ) was succussfully created`
              : "Congratulations, group was created"}
          </p>
          <Row>
            <div class="button-row">
              <div class="pull-right">
                <Button onClick={this.goToLicenses} className={"btn-primary"}>
                  <Glyphicon glyph="glyphicon glyphicon-forward"></Glyphicon>
                  &nbsp; Assign licenses
                </Button>
              </div>
              <div className="pull-right link-button">
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`}
                >
                  <div onClick={() => this.props.refuseCreateGroup()}>
                    Quit wizard
                  </div>
                </Link>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  goToLicenses = () => {
    this.props.changeStepOfCreateGroup("Limits");
  };
}

const mapStateToProps = state => ({
  createdGroup: state.createdGroup
});

const mapDispatchToProps = {
  changeStepOfCreateGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Created)
);
