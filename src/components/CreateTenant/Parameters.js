import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Checkbox from "react-bootstrap/lib/Checkbox";
import FormControl from "react-bootstrap/lib/FormControl";

import Loading from "../../common/Loading";

import { removeEmpty } from "../remuveEmptyInObject";

import {
  refuseCreateTenant,
  changeStepOfCreateTenant,
  fetchGetListOfRoutingProfiles,
  fetchPutUpdateTenantDetails,
  fetchPutUpdateTenantRoutingProfile,
  fetchPutUpdateTenantVoiceMessaging
} from "../../store/actions";

export class TenantParameters extends Component {
  state = {
    isLoading: true,
    useCustomRouting: false,
    selectedRoutingProfile: "",
    enabledVoiceMessagingSettings: false,
    voiceMessageNotification: "",
    voiceMessageDelivery: "",
    voicePortalPasscodeLockout: ""
  };

  componentDidMount() {
    this.props.fetchGetListOfRoutingProfiles();
  }

  render() {
    // if (this.state.isLoading) {
    //   return <Loading />;
    // }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>Tenant parameters</div>
            </Col>
          </Row>
        </div>
        <div class="panel-body">
          <Row>
            <Col md={12} className={"flex-row"}>
              <div className={"width-100p"}>
                <Checkbox
                  className={"margin-top-0"}
                  checked={this.state.useCustomRouting}
                  onChange={e => {
                    if (e.target.checked) {
                      this.setState({
                        useCustomRouting: e.target.checked,
                        selectedRoutingProfile: this.props
                          .listOfRoutingProfiles[0]
                      });
                    } else {
                      this.setState({
                        useCustomRouting: e.target.checked,
                        selectedRoutingProfile: ""
                      });
                    }
                  }}
                >
                  Use custom routing profile
                </Checkbox>
                {this.state.useCustomRouting && (
                  <React.Fragment>
                    <div className="flex space-between align-items-center margin-bottom-1">
                      <div className="nowrap margin-right-1 width-50p">
                        Routing profile
                      </div>
                      <FormControl
                        componentClass="select"
                        value={this.state.selectedRoutingProfile}
                        onChange={e => {
                          this.setState({
                            selectedRoutingProfile: e.target.value
                          });
                        }}
                      >
                        {this.props.listOfRoutingProfiles.map(el => (
                          <option key={el} value={el}>
                            {el}
                          </option>
                        ))}
                      </FormControl>
                    </div>
                    <div class="button-row margin-right-0">
                      <div className="pull-right">
                        <Button
                          className={"btn-primary"}
                          onClick={this.saveRoutingProfile}
                          disabled={!this.state.selectedRoutingProfile}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className={"flex-row"}>
              <div className={"width-100p"}>
                <Checkbox
                  className={"margin-top-0"}
                  checked={this.state.enabledVoiceMessagingSettings}
                  onChange={e => {
                    if (e.target.checked) {
                      this.setState({
                        enabledVoiceMessagingSettings: e.target.checked
                      });
                    } else {
                      this.setState({
                        enabledVoiceMessagingSettings: e.target.checked,
                        voiceMessageNotification: "",
                        voiceMessageDelivery: "",
                        voicePortalPasscodeLockout: ""
                      });
                    }
                  }}
                >
                  Voice messaging settings
                </Checkbox>
                {this.state.enabledVoiceMessagingSettings && (
                  <React.Fragment>
                    <div className="flex space-between align-items-center margin-bottom-1">
                      <div className="nowrap margin-right-1 width-50p">
                        Voicemail Notification
                      </div>
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
                    </div>
                    <div className="flex space-between align-items-center margin-bottom-1">
                      <div className="nowrap margin-right-1 width-50p">
                        Voicemail Delivery
                      </div>
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
                    </div>
                    <div className="flex space-between align-items-center margin-bottom-1">
                      <div className="nowrap margin-right-1 width-50p">
                        Voice portal passcode lockout
                      </div>
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
                    </div>
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
                  </React.Fragment>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <div class="button-row">
              <div className="pull-right">
                <Button className={"btn-primary"} onClick={this.goToLicenses}>
                  <Glyphicon glyph="glyphicon glyphicon-ok" />
                  Skip
                </Button>
              </div>
              <div className="pull-right link-button">
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.createdTenant.tenantId}`}
                >
                  <div onClick={() => this.props.refuseCreateTenant()}>
                    Quit wizard
                  </div>
                </Link>
              </div>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }

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
    const clearData = removeEmpty(data);
    this.props.fetchPutUpdateTenantVoiceMessaging(
      this.props.createdTenant.tenantId,
      clearData
    );
  };

  saveRoutingProfile = () => {
    this.props
      .fetchPutUpdateTenantDetails(this.props.createdTenant.tenantId, {
        useCustomRoutingProfile: true
      })
      .then(() => {
        this.props.fetchPutUpdateTenantRoutingProfile(
          this.props.createdTenant.tenantId,
          {
            routingProfile: this.state.selectedRoutingProfile
          }
        );
      });
  };

  goToLicenses = () => {
    this.props.changeStepOfCreateTenant("Limits");
  };
}

const mapStateToProps = state => ({
  createdTenant: state.createdTenant,
  listOfRoutingProfiles: state.listOfRoutingProfiles
});

const mapDispatchToProps = {
  refuseCreateTenant,
  changeStepOfCreateTenant,
  fetchGetListOfRoutingProfiles,
  fetchPutUpdateTenantDetails,
  fetchPutUpdateTenantRoutingProfile,
  fetchPutUpdateTenantVoiceMessaging
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantParameters)
);
