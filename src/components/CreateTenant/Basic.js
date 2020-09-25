import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Button from "react-bootstrap/lib/Button";
import Radio from "react-bootstrap/lib/Radio";
import FormGroup from "react-bootstrap/lib/FormGroup";

import {
  changeTypeOfTenant,
  changeIdOfTenant,
  changeNameOfTenant,
  changeAddressOfTenant,
  changeZIPOfTenant,
  changeCityOfTenant,
  changeStepOfCreateTenant,
  refuseCreateTenant,
  changeDomainOfTenant
} from "../../store/actions";

export class Basic extends Component {
  state = {
    showMore: false,
    errorMessage: "",
    domainError: "",
    isDefault: true
  };

  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                Add new tenant
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants`}
                >
                  <Button
                    className={"margin-left-1 btn-danger"}
                    onClick={() => this.props.refuseCreateTenant()}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <div className={"panel-body"}>
          <Row>
            <Col md={12}>
              <p>
                Select the type, configure a unique ID, a name and optionally
                some contact details
              </p>
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col md={12}>
              <p className={"larger"}>Tenant type{"\u002a"}</p>
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col md={12}>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={this.props.createTenant.type}
              >
                <ToggleButton
                  className={"radio-button"}
                  value={"ServiceProvider"}
                  onClick={e => {
                    this.props.changeTypeOfTenant(e.target.value);
                    this.setState({ errorMessage: "" });
                  }}
                >
                  <div>
                    <Glyphicon
                      className={"font-24"}
                      glyph="glyphicon glyphicon-cloud"
                    />
                    <p>SERVICE PROVIDER</p>
                  </div>
                </ToggleButton>
                <ToggleButton
                  className={"radio-button"}
                  value={"Enterprise"}
                  onClick={e => {
                    this.props.changeTypeOfTenant(e.target.value);
                    this.setState({ errorMessage: "" });
                  }}
                >
                  <div>
                    <Glyphicon
                      className={"font-24"}
                      glyph="glyphicon glyphicon-object-align-bottom"
                    />
                    <p>ENTERPRISE</p>
                  </div>
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col md={12}>
              <p className={"larger"}>Details</p>
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col componentClass={ControlLabel} md={3}>
              ID{"\u002a"}
            </Col>
            <Col md={9}>
              <FormControl
                type="text"
                placeholder="Tenant ID"
                defaultValue={this.props.createTenant.tenantId}
                onChange={e => {
                  this.props.changeIdOfTenant(e.target.value);
                  this.setState({ errorMessage: "" });
                }}
              />
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col componentClass={ControlLabel} md={3}>
              Name
            </Col>
            <Col md={9}>
              <FormControl
                type="text"
                placeholder="Tenant name"
                defaultValue={this.props.createTenant.name}
                onChange={e => {
                  this.props.changeNameOfTenant(e.target.value);
                  this.setState({ errorMessage: "" });
                }}
              />
            </Col>
          </Row>
          <Row className={"margin-1"}>
            <Col componentClass={ControlLabel} md={3}>
              Domain
            </Col>
            <Col md={9}>
              <FormGroup>
                <Radio
                  name="domain"
                  checked={this.state.isDefault}
                  onClick={() => {
                    this.props.changeDomainOfTenant("");
                    this.setState({
                      isDefault: !this.state.isDefault
                    });
                  }}
                >
                  <div className="font-weight-bold flex">
                    use default domain
                  </div>
                </Radio>
                <div className={"flex align-items-center"}>
                  <Radio
                    name="domain"
                    className={"nowrap margin-right-1"}
                    checked={!this.state.isDefault}
                    onClick={() =>
                      this.setState({
                        isDefault: !this.state.isDefault
                      })
                    }
                  >
                    <div className="font-weight-bold flex">specify domain</div>
                  </Radio>
                  <FormControl
                    type="text"
                    placeholder="Domain"
                    disabled={this.state.isDefault}
                    defaultValue={this.props.createTenant.defaultDomain}
                    onChange={e => {
                      this.validateDomain(e.target.value);
                      this.setState({ errorMessage: "" });
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          {this.state.domainError && (
            <Row className={"margin-1 color-error"}>
              <Col md={12}>
                <p>{this.state.domainError}</p>
              </Col>
            </Row>
          )}
          <Row className={"margin-1"}>
            <Col mdOffset={0} md={2}>
              {!this.state.showHideMore ? (
                <Glyphicon
                  className={"glyphicon-light"}
                  glyph="glyphicon glyphicon-collapse-down"
                  onClick={this.showHideMore}
                  style={{ display: "flex", lineHeight: "20px" }}
                >
                  <div
                    style={{
                      fontFamily: `"Ubuntu, Helvetica Neue",Helvetica,Arial,sans-serif`
                    }}
                  >
                    Add address
                  </div>
                </Glyphicon>
              ) : (
                <Glyphicon
                  className={"glyphicon-light"}
                  glyph="glyphicon glyphicon-collapse-down"
                  onClick={this.showHideMore}
                  style={{ display: "flex", lineHeight: "20px" }}
                >
                  <div
                    style={{
                      fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                    }}
                  >
                    Hide
                  </div>
                </Glyphicon>
              )}
            </Col>
          </Row>
          {this.state.showHideMore && (
            <React.Fragment>
              <Row className={"margin-1"}>
                <Col componentClass={ControlLabel} md={3}>
                  Addess
                </Col>
                <Col md={9}>
                  <FormControl
                    type="text"
                    placeholder="Street"
                    defaultValue={this.props.createTenant.address.addressLine1}
                    onChange={e =>
                      this.props.changeAddressOfTenant(e.target.value)
                    }
                  />
                </Col>
              </Row>
              <Row className={"margin-1"}>
                <Col mdOffset={3} md={3}>
                  <FormControl
                    type="text"
                    placeholder="ZIP"
                    defaultValue={this.props.createTenant.address.postalCode}
                    onChange={e => this.props.changeZIPOfTenant(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <FormControl
                    type="text"
                    placeholder="City"
                    defaultValue={this.props.createTenant.address.city}
                    onChange={e =>
                      this.props.changeCityOfTenant(e.target.value)
                    }
                  />
                </Col>
              </Row>
            </React.Fragment>
          )}
          {this.state.errorMessage && (
            <Row className={"margin-1 color-error"}>
              <Col md={12}>
                <p>{this.state.errorMessage}</p>
              </Col>
            </Row>
          )}
          <Row className={"margin-1"}>
            <div class="button-row">
              <div class="pull-right">
                <Button className={"btn-primary"} onClick={this.nextStep}>
                  <Glyphicon glyph="glyphicon glyphicon-ok"></Glyphicon>
                  &nbsp; Next
                </Button>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  nextStep = () => {
    const { tenantId, type } = this.props.createTenant;
    if (tenantId && type) {
      this.props.changeStepOfCreateTenant("Template");
    } else {
      this.setState({
        errorMessage: "Tenant ID and type are required"
      });
    }
  };

  validateDomain = value => {
    if (value.length < 2 || value.length > 80 || value.includes("@")) {
      this.props.changeDomainOfTenant(value);
      this.setState({
        domainError:
          "Domain length must be from 2 to 80 characters and not contain the @ symbol"
      });
      return;
    }
    this.props.changeDomainOfTenant(value);
    this.setState({ domainError: "" });
  };

  showHideMore = () => {
    this.setState(prevState => ({ showHideMore: !prevState.showHideMore }));
  };
}

const mapStateToProps = state => ({
  createTenant: state.createTenant
});

const mapDispatchToProps = {
  changeTypeOfTenant,
  changeIdOfTenant,
  changeNameOfTenant,
  changeAddressOfTenant,
  changeZIPOfTenant,
  changeCityOfTenant,
  changeStepOfCreateTenant,
  refuseCreateTenant,
  changeDomainOfTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
