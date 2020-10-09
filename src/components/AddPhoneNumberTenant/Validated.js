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
  fetchPostAddPhoneNumbersToTenant,
  fetchPostAssignPhoneNumbersToGroup,
  fetchPostAddMobileNumbersToTenant
} from "../../store/actions";

import OkTab from "./Tabs/OK";
import ErrorTab from "./Tabs/Error";

import { getRange } from "../expandRangeOfPhoneNumber";

export class Basic extends Component {
  state = {
    buttomNameAdd: "ADD"
  };
  render() {
    return (
      <React.Fragment>
        {/**Header */}
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                Add phone numbers
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`}
                >
                  {this.props.isGroupPage ? null : (
                    <Button
                      className={"margin-left-1 btn-danger"}
                      onClick={() => this.props.refuseAddPhoneToTenant()}
                    >
                      Cancel
                    </Button>
                  )}
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div>
                {!this.props.isGroupPage
                  ? "Assign phone numbers to this tenants"
                  : "Assign phone numbers to this group"}
              </div>
            </Col>
          </Row>
        </div>
        {/**Body */}
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
          {/**Button to send data to BE and switch to next step */}
          <Row className={"margin-1"}>
            <div className="button-row">
              {this.props.match.params.groupId && (
                <div className="pull-left">
                  <Button
                    onClick={this.toBasic}
                    className={"btn-primary"}
                    disabled={this.state.buttomNameAdd === "Adding..."}
                  >
                    Back
                  </Button>
                </div>
              )}
              <div className="pull-right">
                <Button
                  onClick={
                    this.props.isGroupPage
                      ? this.addNumbersToGroup
                      : this.addPhoneNumbers
                  }
                  className={"btn-primary"}
                  disabled={this.state.buttomNameAdd === "Adding..."}
                >
                  {this.state.buttomNameAdd}
                </Button>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  toBasic = () => {
    this.props.changeStepOfAddPhoneTenant("Basic");
  };

  addNumbersToGroup = () => {
    this.setState({ errorMessage: null, buttomNameAdd: "Adding..." });
    const data = this.props.validatedNumbersTenant.ok.reduce(
      (accamulator, phone) => {
        if (!phone.end) {
          accamulator.numbers.push({ phoneNumber: phone.start });
        } else {
          let range = getRange(phone.start, phone.end);
          range &&
            range.map(phone =>
              accamulator.numbers.push({ phoneNumber: phone })
            );
        }
        return accamulator;
      },
      { numbers: [], auto_create: true }
    );
    this.props
      .fetchPostAssignPhoneNumbersToGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        data
      )
      .then(res =>
        res === "success"
          ? this.props.changeStepOfAddPhoneTenant("Info")
          : this.setState({
              errorMessage: "Failed assign numbers",
              buttomNameAdd: "ADD"
            })
      );
  };

  addPhoneNumbers = () => {
    const pathNameArr = this.props.location.pathname.split("/");
    let mobileData = {};
    const data = this.props.validatedNumbersTenant.ok.reduce(
      (accamulator, phone) => {
        if (!phone.end) {
          accamulator.numbers.push({ phoneNumber: phone.start });
        } else {
          let range = getRange(phone.start, phone.end);
          range &&
            range.map(phone =>
              accamulator.numbers.push({ phoneNumber: phone })
            );
        }
        return accamulator;
      },
      { numbers: [] }
    );
    if (pathNameArr[pathNameArr.length - 1] === "add-mobile-phone") {
      mobileData = { phoneNumbers: data.numbers };
    }
    this.setState({ buttomNameAdd: "Adding..." }, () => {
      pathNameArr[pathNameArr.length - 1] === "add-mobile-phone"
        ? this.props
            .fetchPostAddMobileNumbersToTenant(
              this.props.match.params.tenantId,
              mobileData
            )
            .then(res => {
              if (res) {
                this.props.changeStepOfAddPhoneTenant("Info");
              }
            })
            .then(() =>
              this.setState({
                buttomNameAdd: "ADD"
              })
            )
        : this.props
            .fetchPostAddPhoneNumbersToTenant(
              this.props.match.params.tenantId,
              data
            )
            .then(res => {
              if (res) {
                this.props.changeStepOfAddPhoneTenant("Info");
              }
            })
            .then(() =>
              this.setState({
                buttomNameAdd: "ADD"
              })
            );
    });
  };
}

const mapStateToProps = state => ({
  addPhoneTenantStep: state.addPhoneTenantStep,
  validatedNumbersTenant: state.validatedNumbersTenant
});

const mapDispatchToProps = {
  changeStepOfAddPhoneTenant,
  refuseAddPhoneToTenant,
  fetchPostAddPhoneNumbersToTenant,
  fetchPostAssignPhoneNumbersToGroup,
  fetchPostAddMobileNumbersToTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
