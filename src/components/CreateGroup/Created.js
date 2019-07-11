import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/lib/Button";

import { changeStepOfCreateGroup } from "../../store/actions";

export class Created extends Component {
  render() {
    console.log(this.props.createdGroup);
    return (
      <div className={"flex-column text-align-center align-items-center"}>
        <p className={"header margin-1"}>
          {`Congratulations, group  (id: ) was succussfully created`}
        </p>
        <Link to={`/provisioning/${this.props.match.params.gwName}/tenants`}>
          <Button className={"margin-1 width-20"}>Return to tenants</Button>
        </Link>
        <Button
          className={"margin-1 width-20"}
          onClick={this.goToLicenses}
          disabled
        >
          Assign licenses
        </Button>
      </div>
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
