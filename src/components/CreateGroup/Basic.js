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

import { FormattedMessage } from "react-intl";

import {
  refuseCreateGroup,
  changeIdOfGroup,
  changeNameOfGroup,
  changeDomainOfGroup,
  changeUserLimitOfGroup,
  changeAddressOfGroup,
  changeZIPOfGroup,
  changeCityOfGroup,
  changeStepOfCreateGroup,
  fetchGetTenantById
} from "../../store/actions";

export class Basic extends Component {
  state = {
    showMore: false,
    errorMessage: "",
    domainError: "",
    userUnlimited: false,
    groupId: "",
    overwriteId: false
  };

  componentDidMount() {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.props.changeDomainOfGroup(this.props.defaultDomain));
  }

  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                ADD GROUP
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}`}
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
            <Col md={12}>
              <Checkbox
                checked={this.state.overwriteId}
                onChange={e => {
                  if (e.target.checked) {
                    this.setState({ overwriteId: e.target.checked });
                  } else {
                    this.setState({ overwriteId: e.target.checked });
                    this.props.changeIdOfGroup("");
                  }
                }}
              >
                Overwrite default group ID
              </Checkbox>
            </Col>
          </Row>
          {this.state.overwriteId && (
            <Row className={"margin-1"}>
              <Col componentClass={ControlLabel} md={3}>
                ID
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Group ID"
                  value={this.props.createGroup.groupId}
                  onChange={e => {
                    this.props.changeIdOfGroup(e.target.value);
                    this.setState({ errorMessage: "" });
                  }}
                />
              </Col>
            </Row>
          )}
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
            <Col mdOffset={10} md={2}>
              {!this.state.showHideMore ? (
                <div>
                  <Glyphicon
                    glyph="glyphicon glyphicon-collapse-up"
                    onClick={this.showHideMore}
                  />
                  Add address
                </div>
              ) : (
                <div>
                  <Glyphicon
                    glyph="glyphicon glyphicon-collapse-down"
                    onClick={this.showHideMore}
                  />
                  Hide
                </div>
              )}
            </Col>
          </Row>
          {this.state.showHideMore && (
            <React.Fragment>
              <Row className={"margin-1"}>
                <Col componentClass={ControlLabel} md={3}>
                  Address
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
            <div className="button-row">
              <div className="pull-right">
                <Button onClick={this.nextStep} className={"btn-primary"}>
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
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
    const { groupId, groupName } = this.props.createGroup;
    if (groupName) {
      this.props.changeStepOfCreateGroup("Template");
    } else {
      this.setState({
        errorMessage: "Name are required"
      });
    }
  };

  showHideMore = () => {
    this.setState(prevState => ({ showHideMore: !prevState.showHideMore }));
  };
}

const mapStateToProps = state => ({
  createTenant: state.createTenant,
  createGroup: state.createGroup,
  defaultDomain: state.tenant.defaultDomain
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
  changeStepOfCreateGroup,
  fetchGetTenantById
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
