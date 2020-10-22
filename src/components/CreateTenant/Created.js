import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/lib/Button";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import {
  changeStepOfCreateTenant,
  refuseCreateTenant
} from "../../store/actions";

export class Created extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>Tenant created</div>
            </Col>
          </Row>
        </div>
        <div class="panel-body">
          <p>
            {this.props.createdTenant.tenantId
              ? `Congratulations, tenant ${this.props.createdTenant.name} (id: ${this.props.createdTenant.tenantId}) was created`
              : "Congratulations, tenant was created"}
          </p>
          <p>
            You can either just continue to the tenant or continue assigning
            licenses are creating a tenant admin.
          </p>
          <Row>
            <div class="button-row">
              <div class="pull-right">
                <Button onClick={this.goToLicenses} className={"btn-primary"}>
                  <Glyphicon glyph="glyphicon glyphicon-forward"></Glyphicon>
                  &nbsp; Next
                </Button>
              </div>
              <div className="pull-right link-button">
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.createdTenant.tenantId}`}
                >
                  <div onClick={() => this.props.refuseCreateTenant()}>
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
    this.props.changeStepOfCreateTenant("Parameters");
  };
}

const mapStateToProps = state => ({
  createdTenant: state.createdTenant
});

const mapDispatchToProps = {
  changeStepOfCreateTenant,
  refuseCreateTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Created)
);
