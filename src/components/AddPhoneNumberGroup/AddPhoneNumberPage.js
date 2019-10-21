import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";

import {
  fetchGetAvailableNumbersByTenantID,
  refuseAddPhoneToTenant
} from "../../store/actions";
import Loading from "../../common/Loading";

import SelectAvalibleNumbers from "./SelectAvalibleNumbers";
import Steps from "../AddPhoneNumberTenant/Steps";

export class AddPhoneNumberPage extends Component {
  state = { isLoadNewPhones: null, isLoading: true };

  componentDidUpdate(prevProps) {
    if (
      prevProps.availableNumbersTenant.lenght !==
      this.props.availableNumbersTenant.lenght
    ) {
      this.props.fetchGetAvailableNumbersByTenantID(
        this.props.match.params.tenantId
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className={"header panel-heading"}>Add phonenumbers for group</div>
        <div className={"panel-body"}>
          <Row>
            <Col md={12}>
              Please select how you want to add phonenumbers to this group:
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Radio
                  className={"margin-left-1"}
                  name="addPhoneGroups"
                  checked={this.state.isLoadNewPhones === "not load"}
                  onChange={() => {
                    this.props.refuseAddPhoneToTenant();
                    this.setState(
                      {
                        isLoadNewPhones: "not load"
                      },
                      () =>
                        this.props
                          .fetchGetAvailableNumbersByTenantID(
                            this.props.match.params.tenantId
                          )
                          .then(() => this.setState({ isLoading: false }))
                    );
                  }}
                >
                  <div>I want to select free numbers from the tenant level</div>
                </Radio>
                <Radio
                  className={"margin-left-1"}
                  name="addPhoneGroups"
                  checked={this.state.isLoadNewPhones === "load"}
                  onChange={() =>
                    this.setState({
                      isLoadNewPhones: "load"
                    })
                  }
                >
                  <div>
                    I want to copy-paste numbers. If some numbers are not yet
                    assigned on tenant level, please do it for me!
                  </div>
                </Radio>
              </FormGroup>
            </Col>
          </Row>
          {this.state.isLoadNewPhones === "not load" && (
            <Row>
              <Col md={12}>
                {this.state.isLoading ? (
                  <Loading />
                ) : (
                  <SelectAvalibleNumbers
                    phoneNumbers={this.props.availableNumbersTenant}
                    toUpdate={() =>
                      this.props.fetchGetAvailableNumbersByTenantID(
                        this.props.match.params.tenantId
                      )
                    }
                  />
                )}
              </Col>
            </Row>
          )}
          {this.state.isLoadNewPhones === "load" && (
            <Row>
              <Col md={12}>
                <Steps isGroupPage />
              </Col>
            </Row>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  availableNumbersTenant: state.availableNumbersTenant
});

const mapDispatchToProps = {
  fetchGetAvailableNumbersByTenantID,
  refuseAddPhoneToTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddPhoneNumberPage)
);