import React, { Component } from "react";
import { connect } from "react-redux";

import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Checkbox from "react-bootstrap/lib/Checkbox";
import { Form } from "react-bootstrap";

import Loading from "../../../../common/Loading";

import { removeEmpty } from "../../../remuveEmptyInObject";

import { get } from "../../../get";

import {
  fetchPutUpdateTenantDetails,
  fetchGetTenantById,
  fetchGetListOfRoutingProfiles,
  fetchGetTenantRoutingProfile,
  fetchPutUpdateTenantRoutingProfile,
  fetchGetTenantVoiceMessaging,
  fetchPutUpdateTenantVoiceMessaging
} from "../../../../store/actions";

class Details extends Component {
  state = {
    tenant: {},
    tenantName: "",
    defaultDomain: "",
    useTenantLanguages: "",
    useCustomRoutingProfile: "",
    isLoading: true,
    addressInformation: {},
    isLoadingRoutingProfile: true,
    tenantRoutingProfile: "",

    voiceMessageDelivery: "",
    voiceMessageNotification: "",
    voicePortalPasscodeLockout: ""
  };

  fetchReq = () => {
    this.setState(
      { isLoading: true, isLoadingRoutingProfile: true, isLoadingVM: true },
      () => {
        this.props.fetchGetTenantById(this.props.tenantId).then(() =>
          this.setState({
            tenant: { ...this.props.tenant },
            addressInformation: this.props.tenant.addressInformation
              ? this.props.tenant.addressInformation
              : {},
            isLoading: false
          })
        );
        this.props
          .fetchGetTenantRoutingProfile(this.props.tenantId)
          .then(() => {
            this.setState({
              isLoadingRoutingProfile: false,
              tenantRoutingProfile: this.props.tenantRoutingProfile
            });
          });
        this.props
          .fetchGetTenantVoiceMessaging(this.props.tenantId)
          .then(() => {
            this.setState({
              isLoadingVM: false,
              voiceMessageDelivery: get(
                this.props,
                "tenantVoiceMessaging.voiceMessageDelivery.fromAddress"
              )
                ? this.props.tenantVoiceMessaging.voiceMessageDelivery
                    .fromAddress
                : "",
              voiceMessageNotification: get(
                this.props,
                "tenantVoiceMessaging.voiceMessageNotification.fromAddress"
              )
                ? this.props.tenantVoiceMessaging.voiceMessageNotification
                    .fromAddress
                : "",
              voicePortalPasscodeLockout: get(
                this.props,
                "tenantVoiceMessaging.voicePortalPasscodeLockout.fromAddress"
              )
                ? this.props.tenantVoiceMessaging.voicePortalPasscodeLockout
                    .fromAddress
                : ""
            });
          });
      }
    );
  };

  componentDidMount() {
    this.fetchReq();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.refreshTab !== prevProps.refreshTab &&
      this.props.refreshTab
    ) {
      this.fetchReq();
    }
  }

  render() {
    if (
      this.props.isLoading ||
      this.state.isLoadingRoutingProfile ||
      this.state.isLoadingVM
    ) {
      return <Loading />;
    }

    return (
      <Col md={8}>
        <Form horizontal className={"margin-1"}>
          <FormGroup controlId="Details">
            <ControlLabel className={"margin-1"}>DETAILS</ControlLabel>
            <FormGroup controlId="tentantID">
              <Col componentClass={ControlLabel} md={3}>
                ID
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Tenant ID"
                  disabled
                  defaultValue={this.state.tenant.tenantId}
                />
              </Col>
            </FormGroup>
            {this.state.tenant.sync && (
              <React.Fragment>
                <FormGroup controlId="ldap">
                  <Col componentClass={ControlLabel} md={3}>
                    External LDAP
                  </Col>
                  <Col md={9}>
                    <FormControl value={this.state.tenant.sync.ldap} disabled />
                  </Col>
                </FormGroup>
                <FormGroup controlId="ldap">
                  <Col componentClass={ControlLabel} md={3}>
                    Tenant OU
                  </Col>
                  <Col md={9}>
                    <FormControl value={this.state.tenant.sync.ou} disabled />
                  </Col>
                </FormGroup>
              </React.Fragment>
            )}
            <FormGroup controlId="useTenantLanguages">
              <Col mdOffset={3} md={9}>
                <Checkbox
                //defaultChecked={this.state.tenant.useTenantLanguages}
                // onChange={e =>
                //   this.setState({ useTenantLanguages: e.target.checked })
                // }
                >
                  Include the Tenant in next Synchronization cycle (Groups and
                  Users)
                </Checkbox>
              </Col>
            </FormGroup>
            <FormGroup controlId="useTenantLanguages">
              <Col mdOffset={1}>
                <div>Last synchronization performed for this Tenant: </div>
              </Col>
            </FormGroup>
            <FormGroup controlId="useTenantLanguages">
              <Col mdOffset={1}>
                <div>Next synchronization planned: </div>
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantName">
              <Col componentClass={ControlLabel} md={3}>
                Name
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Tenant name"
                  defaultValue={this.state.tenant.name}
                  onChange={e => {
                    this.setState({ tenantName: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="defaultDomain">
              <Col componentClass={ControlLabel} md={3}>
                Domain
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Tenant name"
                  defaultValue={this.state.tenant.defaultDomain}
                  onChange={e => {
                    this.setState({ defaultDomain: e.target.value });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="useTenantLanguages">
              <Col mdOffset={3} md={9}>
                <Checkbox
                  defaultChecked={this.state.tenant.useTenantLanguages}
                  onChange={e =>
                    this.setState({ useTenantLanguages: e.target.checked })
                  }
                >
                  Use tenant languages
                </Checkbox>
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantStreet">
              <Col componentClass={ControlLabel} md={3}>
                Addess
              </Col>
              <Col md={9}>
                <FormControl
                  type="text"
                  placeholder="Street"
                  value={this.state.addressInformation.addressLine1}
                  onChange={e =>
                    this.setState({
                      addressInformation: {
                        ...this.state.addressInformation,
                        addressLine1: e.target.value
                      }
                    })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="tentantZipCity">
              <Col mdOffset={3} md={3}>
                <FormControl
                  type="text"
                  placeholder="ZIP"
                  value={this.state.addressInformation.postalCode}
                  onChange={e =>
                    this.setState({
                      addressInformation: {
                        ...this.state.addressInformation,
                        postalCode: e.target.value
                      }
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <FormControl
                  type="text"
                  placeholder="City"
                  value={this.state.addressInformation.city}
                  onChange={e =>
                    this.setState({
                      addressInformation: {
                        ...this.state.addressInformation,
                        city: e.target.value
                      }
                    })
                  }
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="useCustomRoutingProfile">
              <Col mdOffset={3} md={9}>
                <Checkbox
                  defaultChecked={this.state.tenant.useCustomRoutingProfile}
                  onChange={e =>
                    this.setState({ useCustomRoutingProfile: e.target.checked })
                  }
                >
                  Use custom routing profile
                </Checkbox>
              </Col>
            </FormGroup>
            {this.state.useCustomRoutingProfile && (
              <FormGroup controlId="routingProfile">
                <Col componentClass={ControlLabel} md={3}>
                  Routing profile
                </Col>
                <Col md={9}>
                  <FormControl
                    componentClass="select"
                    value={this.state.tenantRoutingProfile}
                    onChange={e => {
                      this.setState({
                        tenantRoutingProfile: e.target.value
                      });
                    }}
                  >
                    {!this.state.tenantRoutingProfile && (
                      <option key={"null"} value={""}>
                        {""}
                      </option>
                    )}
                    {this.props.listOfRoutingProfiles.map(el => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </FormControl>
                </Col>
                <Col md={12}>
                  <div class="button-row margin-right-0">
                    <div className="pull-right">
                      <Button
                        className={"btn-primary"}
                        onClick={this.saveRoutingProfile}
                        disabled={!this.state.tenantRoutingProfile}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </Col>
              </FormGroup>
            )}
            <FormGroup controlId="useCustomRoutingProfile">
              <Col mdOffset={3} md={9}>
                <Checkbox
                  defaultChecked={this.state.enabledVoiceMessagingSettings}
                  onChange={e =>
                    this.setState({
                      enabledVoiceMessagingSettings: e.target.checked
                    })
                  }
                >
                  Voice messaging settings
                </Checkbox>
              </Col>
            </FormGroup>
            {this.state.enabledVoiceMessagingSettings && (
              <React.Fragment>
                <FormGroup controlId="tentantID">
                  <Col componentClass={ControlLabel} md={3}>
                    Voicemail Notification
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="text"
                      placeholder="Voicemail Notification"
                      value={this.state.voiceMessageNotification}
                      onChange={e =>
                        this.setState({
                          voiceMessageNotification: e.target.value
                        })
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="tentantID">
                  <Col componentClass={ControlLabel} md={3}>
                    Voicemail Delivery
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="text"
                      placeholder="Voicemail Delivery"
                      value={this.state.voiceMessageDelivery}
                      onChange={e =>
                        this.setState({
                          voiceMessageDelivery: e.target.value
                        })
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="tentantID">
                  <Col componentClass={ControlLabel} md={3}>
                    Voice portal passcode lockout
                  </Col>
                  <Col md={9}>
                    <FormControl
                      type="text"
                      placeholder="Voice portal passcode lockout"
                      value={this.state.voicePortalPasscodeLockout}
                      onChange={e =>
                        this.setState({
                          voicePortalPasscodeLockout: e.target.value
                        })
                      }
                    />
                  </Col>
                  <Col md={12}>
                    <div class="button-row margin-right-0">
                      <div className="pull-right">
                        <Button
                          className={"btn-primary"}
                          onClick={this.saveVoiceMessaging}
                          disabled={
                            !this.state.voiceMessageNotification &&
                            !this.state.voiceMessageDelivery &&
                            !this.state.voicePortalPasscodeLockout
                          }
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </Col>
                </FormGroup>
              </React.Fragment>
            )}
            <Col mdPush={10} md={1}>
              <Button onClick={this.updateTenant}>
                <Glyphicon glyph="glyphicon glyphicon-ok" />
                {` UPDATE`}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Col>
    );
  }

  updateTenant = () => {
    const {
      tenantName,
      defaultDomain,
      useTenantLanguages,
      useCustomRoutingProfile,
      addressInformation
    } = this.state;

    const data = {
      name: tenantName ? tenantName : this.state.tenant.name,
      defaultDomain: defaultDomain
        ? defaultDomain
        : this.state.tenant.defaultDomain,
      useTenantLanguages: useTenantLanguages
        ? useTenantLanguages
        : this.state.tenant.useTenantLanguages,
      useCustomRoutingProfile: useCustomRoutingProfile
        ? useCustomRoutingProfile
        : this.state.tenant.useCustomRoutingProfile,
      addressInformation
    };
    const clearData = removeEmpty(data);

    this.props.fetchPutUpdateTenantDetails(
      this.state.tenant.tenantId,
      clearData
    );
  };

  saveRoutingProfile = () => {
    this.props
      .fetchPutUpdateTenantDetails(this.state.tenant.tenantId, {
        useCustomRoutingProfile: true
      })
      .then(() => {
        this.props.fetchPutUpdateTenantRoutingProfile(
          this.state.tenant.tenantId,
          {
            routingProfile: this.state.tenantRoutingProfile
          }
        );
      });
  };

  saveVoiceMessaging = () => {
    const data = {
      voiceMessageDelivery: {
        fromAddress: this.state.voiceMessageDelivery
      },
      voiceMessageNotification: {
        fromAddress: this.state.voiceMessageNotification
      },
      voicePortalPasscodeLockout: {
        fromAddress: this.state.voicePortalPasscodeLockout
      }
    };
    this.props.fetchPutUpdateTenantVoiceMessaging(
      this.state.tenant.tenantId,
      data
    );
  };
}

const mapStateToProps = state => ({
  tenant: state.tenant,
  ldapBackends: state.ldapBackends,
  tenantOU: state.tenantOU,
  listOfRoutingProfiles: state.listOfRoutingProfiles,
  tenantRoutingProfile: state.tenantRoutingProfile,
  tenantVoiceMessaging: state.tenantVoiceMessaging
});

const mapDispatchToProps = {
  fetchGetTenantById,
  fetchPutUpdateTenantDetails,
  fetchGetListOfRoutingProfiles,
  fetchGetTenantRoutingProfile,
  fetchPutUpdateTenantRoutingProfile,
  fetchGetTenantVoiceMessaging,
  fetchPutUpdateTenantVoiceMessaging
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
