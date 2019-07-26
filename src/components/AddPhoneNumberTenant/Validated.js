import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import {
  changeStepOfAddPhoneTenant,
  refuseAddPhoneToTenant,
  fetchPostAddPhoneNumbersToTenant
} from "../../store/actions";

import OkTab from "./Tabs/OK";
import ErrorTab from "./Tabs/Error";

export class Basic extends Component {
  render() {
    console.log(this.props.addedNumbersToTenant);
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                Add phone numbers
                <Link
                  to={`/provisioning/${
                    this.props.match.params.gwName
                  }/tenants/${this.props.match.params.tenantId}`}
                >
                  <Button
                    className={"margin-left-1 btn-danger"}
                    onClick={() => this.props.refuseAddPhoneToTenant()}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div>Assign phone numbers to this tenants</div>
            </Col>
          </Row>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="tenant_tabs">
            <Tab
              eventKey={0}
              title={`OK (${this.props.validatedNumbersTenant.ok.length})`}
            >
              <OkTab />
            </Tab>
            <Tab
              eventKey={1}
              title={`ERROR (${this.props.validatedNumbersTenant.err.length})`}
            >
              <ErrorTab />
            </Tab>
          </Tabs>
          <Row className={"margin-1"}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.addPhoneNumbers}
                  className={"btn-primary"}
                >
                  ADD
                </Button>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  addPhoneNumbers = () => {
    const data = this.props.validatedNumbersTenant.ok.reduce(
      (accamulator, phone) => {
        console.log("accamulator", accamulator);
        if (!phone.end) {
          accamulator.numbers.push({ phoneNumber: phone.start });
        } else {
          accamulator = {
            ...accamulator,
            range: { minPhoneNumber: phone.start, maxPhoneNumber: phone.end }
          };
        }
        console.log("accamulator2", accamulator);
        return accamulator;
      },
      { numbers: [], range: {} }
    );
    console.log(data);
    this.props
      .fetchPostAddPhoneNumbersToTenant(this.props.match.params.tenantId, data)
      .then(this.props.changeStepOfAddPhoneTenant("Info"));
  };
}

const mapStateToProps = state => ({
  addPhoneTenantStep: state.addPhoneTenantStep,
  validatedNumbersTenant: state.validatedNumbersTenant,
  addedNumbersToTenant: state.addedNumbersToTenant
});

const mapDispatchToProps = {
  changeStepOfAddPhoneTenant,
  refuseAddPhoneToTenant,
  fetchPostAddPhoneNumbersToTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
