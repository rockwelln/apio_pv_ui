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
  changeStepOfCreateGroup,
  fetchGetTenantById
} from "../../store/actions";

export class Basic extends Component {
  state = {
    showMore: false,
    errorMessage: "",
    domainError: "",
    userUnlimeted: false
  };

  componentDidMount() {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.props.changeDomainOfGroup(this.props.defaultDomain));
  }

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
            <p>Please specify a name and an ID</p>
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
    const {
      groupId,
      groupName,
      userLimit,
      defaultDomain
    } = this.props.createGroup;
    if (groupId && groupName) {
      this.props.changeStepOfCreateGroup("Template");
    } else {
      this.setState({
        errorMessage: "Grop ID, name, user limit and domain are required"
      });
    }
  };

  validateUserLimits = value => {
    if ((!isNaN(value) && value > 0) || value === "") {
      this.props.changeUserLimitOfGroup(Number(value));
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
