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
  changeStepOfCreateTenant
} from "../../store/actions";

const RESELLEROPTIONS = [
  { value: "", name: "None" },
  { value: "Paradice IT", name: "Paradice IT" },
  { value: "ICT in action", name: "ICT in action" },
  { value: "Vangeel ICT", name: "Vangeel ICT" },
  { value: "Euphony", name: "Euphony" }
];

export class FirstStep extends Component {
  state = {
    showMore: false,
    errorMessage: ""
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <p className={"header"}>
              ADD TENANT
              <Link to={`/provisioning/broadsoft_xsp1_as1/tenants`}>
                <Glyphicon
                  className={"margin-1 smaller"}
                  glyph="glyphicon glyphicon-remove"
                />
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className={"smaller"}>
              Select the type, configure a unique ID, a name and optionally some
              contact details
            </p>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col md={12}>
            <p className={"larger"}>TYPE</p>
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
                value={"Service Provider"}
                onClick={e => {
                  this.props.changeTypeOfTenant(e.target.value);
                  this.setState({ errorMessage: "" });
                }}
              >
                <div>
                  <Glyphicon
                    className={"xxx-large"}
                    glyph="glyphicon glyphicon-cloud"
                  />
                  <p className={"font-24"}>SERVICE PROVIDER</p>
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
                    className={"xxx-large"}
                    glyph="glyphicon glyphicon-object-align-bottom"
                  />
                  <p className={"font-24"}>ENTERPRISE</p>
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
            ID
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
          <Col mdOffset={10} md={2}>
            {!this.state.showHideMore ? (
              <Glyphicon
                className={"larger"}
                glyph="glyphicon glyphicon-plus"
                onClick={this.showHideMore}
              >
                MORE
              </Glyphicon>
            ) : (
              <Glyphicon
                className={"larger"}
                glyph="glyphicon glyphicon-minus"
                onClick={this.showHideMore}
              >
                LESS
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
                  defaultValue={
                    this.props.createTenant.addressInformation.addressLine1
                  }
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
                  defaultValue={
                    this.props.createTenant.addressInformation.postalCode
                  }
                  onChange={e => this.props.changeZIPOfTenant(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <FormControl
                  type="text"
                  placeholder="City"
                  defaultValue={this.props.createTenant.addressInformation.city}
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
          <Col mdOffset={10} md={2}>
            <Button onClick={this.nextStep}>
              <Glyphicon glyph="glyphicon glyphicon-ok">Ok</Glyphicon>
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  nextStep = () => {
    const { tenantId, name, type } = this.props.createTenant;
    if (tenantId && name && type) {
      this.props.changeStepOfCreateTenant("secondStep");
    } else {
      this.setState({
        errorMessage: "Tenant ID, name and type this fields is required"
      });
    }
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
  changeStepOfCreateTenant
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstStep);
