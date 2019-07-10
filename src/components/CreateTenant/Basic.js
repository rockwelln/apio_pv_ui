import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Button from "react-bootstrap/lib/Button";

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

const RESELLEROPTIONS = [{ value: "", name: "None" }];

export class Basic extends Component {
  state = {
    showMore: false,
    errorMessage: "",
    domainError: ""
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <p className={"header"}>
              ADD TENANT
              <Link to={`/provisioning/broadsoft_xsp1_as1/tenants`}>
                <Button
                  className={"margin-left-1"}
                  onClick={() => this.props.refuseCreateTenant()}
                >
                  Cancel
                </Button>
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>
              Select the type, configure a unique ID, a name and optionally some
              contact details
            </p>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col md={12}>
            <p className={"larger"}>TYPE{"\u002a"}</p>
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
            <p className={"larger"}>Reseller</p>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col md={12}>
            <FormControl componentClass="select">
              {RESELLEROPTIONS.map((option, i) => (
                <option key={i + ""} value={option.value}>
                  {option.name}
                </option>
              ))}
            </FormControl>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col md={12}>
            <p className={"larger"}>DETAILS</p>
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
            Name{"\u002a"}
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
            Domain{"\u002a"}
          </Col>
          <Col md={9}>
            <FormControl
              type="text"
              placeholder="Domain"
              defaultValue={this.props.createTenant.defaultDomain}
              onChange={e => {
                this.validateDomain(e.target.value);
                this.setState({ errorMessage: "" });
              }}
            />
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
          <Col mdOffset={10} md={2}>
            {!this.state.showHideMore ? (
              <Glyphicon
                className={"larger"}
                glyph="glyphicon glyphicon-plus"
                onClick={this.showHideMore}
                style={{ display: "flex", lineHeight: "20px" }}
              >
                <div
                  style={{
                    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                  }}
                >
                  Add address
                </div>
              </Glyphicon>
            ) : (
              <Glyphicon
                className={"larger"}
                glyph="glyphicon glyphicon-minus"
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
                  onChange={e => this.props.changeCityOfTenant(e.target.value)}
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
          <Col mdOffset={10} md={1}>
            <Button onClick={this.nextStep}>
              <Glyphicon
                glyph="glyphicon glyphicon-ok"
                style={{ display: "flex", lineHeight: "20px" }}
              >
                <div
                  className={"margin-left-1"}
                  style={{
                    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                  }}
                >
                  Ok
                </div>
              </Glyphicon>
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  nextStep = () => {
    const { tenantId, name, type, defaultDomain } = this.props.createTenant;
    if (tenantId && name && type && defaultDomain) {
      this.props.changeStepOfCreateTenant("Template");
    } else {
      this.setState({
        errorMessage: "Tenant ID, name, type and domain are required"
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Basic);
