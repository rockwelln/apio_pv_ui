import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  fetchGetPhoneTypes,
  fetchPostCreateTrunkGroup,
  fetchGetTrunkByGroupID,
  fetchGetTenantById,
  fetchGetTrunkGroupTemplate
} from "../../store/actions";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Radio from "react-bootstrap/lib/Radio";
import InputGroup from "react-bootstrap/lib/InputGroup";

import Loading from "../../common/Loading";

import { removeEmpty } from "../remuveEmptyInObject";

export class AddTrunkGroup extends Component {
  state = {
    name: "",
    deviceName: "",
    deviceType: "",
    isLoading: true,
    nameError: null,
    isDisabled: false,
    maxActiveCalls: undefined,
    isLoadingTrunk: true,
    authenticationType: undefined,
    isLoadingTenant: true,
    requireAuthentication: undefined,
    sipAuthenticationUserName: undefined,
    sipAuthenticationPassword: undefined,
    trunkGroupIdentity: undefined,
    otgDtgIdentity: undefined,
    template: "",
    isLoadingTemplates: true
  };

  componentDidMount() {
    let first = Math.floor(Math.random() * 10);
    let second = Math.floor(Math.random() * 10);
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.setState({ isLoadingTenant: false }));
    this.props.fetchGetPhoneTypes().then(() =>
      this.setState({
        isLoading: false,
        phoneTypes: this.props.phoneTypes,
        name: `${this.props.match.params.groupId}_trgp${first}${second}`
      })
    );
    this.props
      .fetchGetTrunkByGroupID(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => {
        this.setState({ isLoadingTrunk: false });
      });
    this.props
      .fetchGetTrunkGroupTemplate()
      .then(() => this.setState({ isLoadingTemplates: false }));
  }

  render() {
    if (
      this.state.isLoading ||
      this.state.isLoadingTrunk ||
      this.state.isLoadingTenant ||
      this.state.isLoadingTemplates
    ) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Add a new trunk group`}</div>
        </div>
        <div className={"panel-body"}>
          <FormGroup controlId="name" validationState={this.state.nameError}>
            <Row className={"margin-top-1"}>
              <Col md={3}>Name{"\u002a"}</Col>
              <Col md={3}>
                <FormControl
                  type="text"
                  value={this.state.name}
                  onChange={e =>
                    this.setState({ name: e.target.value, nameError: null })
                  }
                />
              </Col>
            </Row>
            {this.state.nameError && (
              <Row>
                <Col mdOffset={3} md={3}>
                  <div />
                  <HelpBlock>Field is required</HelpBlock>
                </Col>
              </Row>
            )}
          </FormGroup>
          <Row className={"margin-top-1"}>
            <Col md={3}>Channels</Col>
            <Col md={3}>
              <FormControl
                type="number"
                min={0}
                max={this.props.trunkGroups.maxActiveCalls}
                value={this.state.maxActiveCalls}
                onChange={e => {
                  if (
                    Number(e.target.value) < 0 ||
                    Number(e.target.value) >
                      this.props.trunkGroups.maxActiveCalls
                  ) {
                    return;
                  }
                  this.setState({ maxActiveCalls: Number(e.target.value) });
                }}
              />
            </Col>
            <Col
              md={3}
            >{`Maximum: ${this.props.trunkGroups.maxActiveCalls}`}</Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={3}>Authentication type:</Col>
            <Col md={3}>
              <Radio
                name="authentication_type"
                value={"sip"}
                onChange={e =>
                  this.setState({
                    authenticationType: e.target.value,
                    requireAuthentication: true
                  })
                }
              >
                SIP Registration
              </Radio>
            </Col>
            {this.state.authenticationType === "sip" && (
              <React.Fragment>
                <Col md={3}>
                  <FormControl
                    autoComplete="new-username"
                    type="text"
                    placeholder="Username*"
                    value={this.state.sipAuthenticationUserName}
                    onChange={e =>
                      this.setState({
                        sipAuthenticationUserName: e.target.value
                      })
                    }
                  />
                </Col>
                <Col md={3}>
                  <FormControl
                    autoComplete="new-password"
                    type="password"
                    placeholder="Password*"
                    value={this.state.sipAuthenticationPassword}
                    onChange={e =>
                      this.setState({
                        sipAuthenticationPassword: e.target.value
                      })
                    }
                  />
                </Col>
              </React.Fragment>
            )}
          </Row>
          <Row className={"margin-top-1"}>
            <Col mdOffset={3} md={3}>
              <Radio
                name="authentication_type"
                value={"tgrp"}
                onChange={e =>
                  this.setState({ authenticationType: e.target.value })
                }
              >
                Static (tgrp)
              </Radio>
            </Col>
            {this.state.authenticationType === "tgrp" && (
              <Col md={6}>
                <FormGroup>
                  <InputGroup>
                    <FormControl
                      type="text"
                      value={this.state.trunkGroupIdentity}
                      placeholder={"tgrp"}
                      onChange={e =>
                        this.setState({ trunkGroupIdentity: e.target.value })
                      }
                    />
                    <InputGroup.Addon>{`@${this.props.tenant.defaultDomain}`}</InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              </Col>
            )}
          </Row>
          <Row className={"margin-top-1"}>
            <Col mdOffset={3} md={3}>
              <Radio
                name="authentication_type"
                value={"otg/dtg"}
                onChange={e =>
                  this.setState({ authenticationType: e.target.value })
                }
              >
                Statig (otg/dtg)
              </Radio>
            </Col>
            {this.state.authenticationType === "otg/dtg" && (
              <Col md={3}>
                <FormControl
                  type="text"
                  value={this.state.otgDtgIdentity}
                  placeholder={"otg/dtg"}
                  onChange={e =>
                    this.setState({ otgDtgIdentity: e.target.value })
                  }
                />
              </Col>
            )}
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={3}>Template</Col>
            <Col md={3}>
              <Radio
                name="template"
                value={""}
                onChange={e => this.setState({ template: e.target.value })}
                checked={this.state.template === ""}
              >
                none
              </Radio>
            </Col>
          </Row>
          {/* <Row className={"margin-top-1"}>
            <Col md={3}>Device Name</Col>
            <Col md={3}>
              <FormControl
                type="text"
                value={this.state.deviceName}
                onChange={e => this.setState({ deviceName: e.target.value })}
              />
            </Col>
          </Row>
          <Row className={"margin-top-1"}>
            <Col md={3}>Device Type</Col>
            <Col md={3}>
              <div>
                <FormControl
                  componentClass="select"
                  value={this.state.deviceType}
                  onChange={e => this.setState({ deviceType: e.target.value })}
                >
                  <option key={"none"} value={""}>
                    {"none"}
                  </option>
                  {this.state.phoneTypes.map(type => (
                    <option key={type.technicalName} value={type.technicalName}>
                      {type.displayName}
                    </option>
                  ))}
                </FormControl>
              </div>
            </Col>
          </Row> */}
          <Row className={"margin-top-1"}>
            <Col md={12}>
              <div className="button-row">
                <div className="pull-right">
                  <Button
                    className={"btn-primary"}
                    onClick={this.createTrunk}
                    disabled={
                      this.state.isDisabled ||
                      (this.state.authenticationType === "sip" &&
                        !this.state.sipAuthenticationUserName &&
                        !this.state.sipAuthenticationPassword)
                    }
                  >
                    Create
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }

  getAuthenticationData = () => {
    const {
      requireAuthentication,
      sipAuthenticationUserName,
      sipAuthenticationPassword,
      trunkGroupIdentity,
      otgDtgIdentity
    } = this.state;
    switch (this.state.authenticationType) {
      case "sip": {
        return {
          requireAuthentication,
          sipAuthenticationUserName:
            sipAuthenticationUserName + `@${this.props.tenant.defaultDomain}`,
          sipAuthenticationPassword
        };
      }
      case "tgrp": {
        return { trunkGroupIdentity };
      }
      case "otg/dtg": {
        return {
          otgDtgIdentity
        };
      }
      default: {
        return {};
      }
    }
  };

  createTrunk = () => {
    const { name, deviceName, deviceType, maxActiveCalls } = this.state;
    if (!name) {
      this.setState({ nameError: "error" });
      return;
    }
    const authenticationData = this.getAuthenticationData();
    const data = removeEmpty({
      name,
      maxActiveCalls,
      ...authenticationData,
      accessDeviceInfo: {
        deviceName,
        deviceType
      }
    });
    this.setState({ isDisabled: true }, () =>
      this.props
        .fetchPostCreateTrunkGroup(
          this.props.match.params.tenantId,
          this.props.match.params.groupId,
          data
        )
        .then(res => {
          res === "success"
            ? this.props.history.push(
                `/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/trunkgroup/${name}`
              )
            : this.setState({ isDisabled: false });
        })
    );
  };
}

const mapStateToProps = state => ({
  phoneTypes: state.phoneTypes,
  createdTrunkGroup: state.createdTrunkGroup,
  trunkGroups: state.trunkGroups,
  tenant: state.tenant
});

const mapDispatchToProps = {
  fetchGetPhoneTypes,
  fetchPostCreateTrunkGroup,
  fetchGetTrunkByGroupID,
  fetchGetTenantById,
  fetchGetTrunkGroupTemplate
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddTrunkGroup)
);
