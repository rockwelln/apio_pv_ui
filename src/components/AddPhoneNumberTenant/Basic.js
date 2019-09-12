import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import Radio from "react-bootstrap/lib/Radio";

import {
  changeStepOfAddPhoneTenant,
  saveValidatedNumbersTenant,
  refuseAddPhoneToTenant
} from "../../store/actions";
import { parseNumbersString } from "../parsePhoneNumbers";

export class Basic extends Component {
  state = {
    inputPhones: "",
    isLocalFormat: false
  };
  render() {
    return (
      <React.Fragment>
        {/**Header */}
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                {this.props.match.params.groupId
                  ? "Try to add numbers to the tenant"
                  : "Add phone numbers"}
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
              <div>Assign phone numbers to this tenants</div>
            </Col>
          </Row>
        </div>
        {/**Body */}
        <div className={"panel-body"}>
          {/**Description */}
          <Row>
            <Col md={12}>
              <div>Copy-paste here the phone numbers you want to add</div>
              <div>
                <ul>
                  <li>
                    Delimiter: use "space", "tab", "," or ";" as delimiter
                  </li>
                  <li>Use line breaks to end a row</li>
                  <li>Numbers in national or international format</li>
                  <li>
                    Each row can contain 1 (individual number) or 2 (range)
                    numbers
                  </li>
                </ul>
              </div>
              {/**Radio for check local format */}
              <div>
                <FormGroup>
                  <Radio
                    name="phoneTypes"
                    checked={!this.state.isLocalFormat}
                    onClick={() =>
                      this.setState({
                        isLocalFormat: !this.state.isLocalFormat
                      })
                    }
                  >
                    <div className="font-weight-bold flex">{`I will paste phonenumbers in international format (00<cc>xx..x or <cc>xx..x)`}</div>
                  </Radio>
                  <Radio
                    name="phoneTypes"
                    checked={this.state.isLocalFormat}
                    onClick={() =>
                      this.setState({
                        isLocalFormat: !this.state.isLocalFormat
                      })
                    }
                  >
                    <div className="font-weight-bold flex">{`I will paste phonenumbers in local format (0xx..x or xx...x)`}</div>
                  </Radio>
                </FormGroup>
              </div>
              {/**Text area */}
              <FormGroup controlId="validatePhone">
                <FormControl
                  componentClass="textarea"
                  rows={20}
                  onChange={e => this.setState({ inputPhones: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          {/*Button for next step and validation*/}
          <Row className={"margin-1"}>
            <div className="button-row">
              <div className="pull-right">
                <Button onClick={this.nextStep} className={"btn-primary"}>
                  Validate
                </Button>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  nextStep = () => {
    const validatedNumbers = parseNumbersString(
      this.state.inputPhones,
      this.state.isLocalFormat
    );
    this.props.saveValidatedNumbersTenant(validatedNumbers);
    this.props.changeStepOfAddPhoneTenant("Validated");
  };
}

const mapStateToProps = state => ({
  addPhoneTenantStep: state.addPhoneTenantStep
});

const mapDispatchToProps = {
  changeStepOfAddPhoneTenant,
  saveValidatedNumbersTenant,
  refuseAddPhoneToTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
