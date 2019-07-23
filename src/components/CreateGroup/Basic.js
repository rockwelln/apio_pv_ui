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
  refuseCreateGroup,
  changeIdOfGroup,
  changeNameOfGroup,
  changeDomainOfGroup,
  changeUserLimitOfGroup,
  changeAddressOfGroup,
  changeZIPOfGroup,
  changeCityOfGroup,
  changeStepOfCreateGroup
} from "../../store/actions";

export class Basic extends Component {
  state = {
    showMore: false,
    errorMessage: "",
    domainError: "",
    userUnlimited: false
  };

  render() {
    return (
      <React.Fragment>

        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                ADD GROUP
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${
                    this.props.match.params.tenantId
                  }`}
                >
                  <Button
                    className={"margin-left-1 btn-danger"}
                    onClick={() => this.props.refuseCreateGroup()}
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
                      this.setState({ userUnlimited: e.target.checked }))
                    : this.props.changeUserLimitOfGroup("")
                }
              >
                unlimited
              </Checkbox>
            </Col>
            <Col md={7}>
              <FormControl
                disabled={this.props.createGroup.userLimit === -1}
                type="number"
                min={0}
                placeholder="User limit"
                value={
                  this.props.createGroup.userLimit === -1
                    ? ""
                    : this.props.createGroup.userLimit
                }
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
                <div>
                  <Glyphicon
                    glyph="glyphicon glyphicon-collapse-up"
                    onClick={this.showHideMore}
                  >
                  </Glyphicon>
                  Add adress
                </div>
                
              ) : (
              <div>
                <Glyphicon
                  glyph="glyphicon glyphicon-collapse-down"
                  onClick={this.showHideMore}
                >
                </Glyphicon>
                  Hide
                </div>
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
                    defaultValue={this.props.createGroup.address.addressLine1}
                    onChange={e =>
                      this.props.changeAddressOfGroup(e.target.value)
                    }
                  />
                </Col>
              </Row>
              <Row className={"margin-1"}>
                <Col mdOffset={3} md={3}>
                  <FormControl
                    type="text"
                    placeholder="ZIP"
                    defaultValue={this.props.createGroup.address.postalCode}
                    onChange={e => this.props.changeZIPOfGroup(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <FormControl
                    type="text"
                    placeholder="City"
                    defaultValue={this.props.createGroup.address.city}
                    onChange={e => this.props.changeCityOfGroup(e.target.value)}
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
                <Button onClick={this.nextStep} className={"btn-primary"}>
                  <Glyphicon
                    glyph="glyphicon glyphicon-ok"
                  >
                  </Glyphicon>
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
    const {
      groupId,
      groupName,
      userLimit,
      defaultDomain
    } = this.props.createGroup;
    if (groupId && groupName && userLimit && defaultDomain) {
      this.props.changeStepOfCreateGroup("Template");
    } else {
      this.setState({
        errorMessage: "Grop ID, name, user limit and domain are required"
      });
    }
  };

  validateUserLimits = value => {
    if ((!isNaN(value) && value > 0) || value === "") {
      this.props.changeUserLimitOfGroup(value);
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
  refuseCreateGroup,
  changeIdOfGroup,
  changeNameOfGroup,
  changeDomainOfGroup,
  changeUserLimitOfGroup,
  changeAddressOfGroup,
  changeZIPOfGroup,
  changeCityOfGroup,
  changeStepOfCreateGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
