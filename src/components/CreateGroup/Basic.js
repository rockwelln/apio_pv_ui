import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import Button from "react-bootstrap/lib/Button";
import Checkbox from "react-bootstrap/lib/Checkbox";

import {
  changeAddressOfTenant,
  changeZIPOfTenant,
  changeCityOfTenant,
  changeStepOfCreateTenant,
  refuseCreateGroup,
  changeIdOfGroup,
  changeNameOfGroup,
  changeDomainOfGroup,
  changeUserLimitOfGroup
} from "../../store/actions";

export class Basic extends Component {
  state = {
    showMore: false,
    errorMessage: "",
    domainError: "",
    userUnlimeted: false
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <p className={"header"}>
              ADD GROUP
              <Link
                to={`/provisioning/${this.props.match.params.gwName}/tenants/${
                  this.props.match.params.tenantId
                }`}
              >
                <Button
                  className={"margin-left-1"}
                  onClick={() => this.props.refuseCreateGroup()}
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
              Configure a unique ID, a name, domain, user limit and optionally
              some contact details
            </p>
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
              placeholder="Group ID"
              defaultValue={this.props.createGroup.groupId}
              onChange={e => {
                this.props.changeIdOfGroup(e.target.value);
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
              placeholder="Group name"
              defaultValue={this.props.createGroup.groupName}
              onChange={e => {
                this.props.changeNameOfGroup(e.target.value);
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
              defaultValue={this.props.createGroup.defaultDomain}
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
          <Col componentClass={ControlLabel} md={3}>
            User limit{"\u002a"}
          </Col>
          <Col md={2}>
            <Checkbox
              onChange={e =>
                e.target.checked
                  ? (this.props.changeUserLimitOfGroup(-1),
                    this.setState({ userUnlimeted: e.target.checked }))
                  : this.props.changeUserLimitOfGroup("")
              }
            >
              unlimeted
            </Checkbox>
          </Col>
          <Col md={7}>
            <FormControl
              disabled={this.props.createGroup.userLimit === -1}
              type="number"
              min={0}
              placeholder="User limit"
              defaultValue={this.props.createGroup.userLimit}
              onChange={e => {
                this.validateUserLimits(e.target.value);
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
        {/* {this.state.showHideMore && (
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
        )} */}
        {this.state.errorMessage && (
          <Row className={"margin-1 color-error"}>
            <Col md={12}>
              <p>{this.state.errorMessage}</p>
            </Col>
          </Row>
        )}
        <Row className={"margin-1"}>
          <Col mdOffset={10} md={1}>
            <Button onClick={this.nextStep} disabled>
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

  validateUserLimits = value => {
    console.log(value);
    if (!isNaN(value) && value > 0) {
      console.log("its number");
    }
    return;
  };

  validateDomain = value => {
    if (value.length < 2 || value.length > 80 || value.includes("@")) {
      this.props.changeDomainOfGroup(value);
      this.setState({
        domainError:
          "Domain length must be from 2 to 80 characters and not contain the @ symbol"
      });
      return;
    }
    this.props.changeDomainOfGroup(value);
    this.setState({ domainError: "" });
  };

  showHideMore = () => {
    this.setState(prevState => ({ showHideMore: !prevState.showHideMore }));
  };
}

const mapStateToProps = state => ({
  createTenant: state.createTenant,
  createGroup: state.createGroup
});

const mapDispatchToProps = {
  changeAddressOfTenant,
  changeZIPOfTenant,
  changeCityOfTenant,
  changeStepOfCreateTenant,
  refuseCreateGroup,
  changeIdOfGroup,
  changeNameOfGroup,
  changeDomainOfGroup,
  changeUserLimitOfGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
