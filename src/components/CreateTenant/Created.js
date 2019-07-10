import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/lib/Button";

import { changeStepOfCreateTenant } from "../../store/actions";

export class Created extends Component {
  render() {
    return (
      <div className={"flex-column text-align-center align-items-center"}>
        <p className={"header margin-1"}>
          {`Congratulations, tenant ${this.props.createdTenant.name} (id: ${
            this.props.createdTenant.tenantId
          }) was succussfully created`}
        </p>
        <Link to={`/provisioning/${this.props.match.params.gwName}/tenants`}>
          <Button className={"margin-1 width-20"}>Return to tenants</Button>
        </Link>
        <Button className={"margin-1 width-20"} onClick={this.goToLicenses}>
          Assign licenses
        </Button>
      </div>
    );
  }

  goToLicenses = () => {
    this.props.changeStepOfCreateTenant("Limits");
  };
}

const mapStateToProps = state => ({
  createdTenant: state.createdTenant
});

const mapDispatchToProps = {
  changeStepOfCreateTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Created)
);
