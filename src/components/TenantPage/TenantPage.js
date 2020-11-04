import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";

import Loading from "../../common/Loading";
import GroupsTab from "./Tabs/Groups";
import PhoneNumbersTab from "./Tabs/PhoneNumber";
import Admins from "./Tabs/Admins";
import Details from "./Tabs/Details";
import DeleteModal from "./DeleteModal";
import Licenses from "./Tabs/Licenses";
import Trunking from "./Tabs/Trunking";
import MobileNumbersTab from "./Tabs/MobileNumbers";

import { get } from "../get";
import { getCookie } from "../../utils";

import {
  fetchGetTenantById,
  refuseCreateGroup,
  refuseAddPhoneToTenant,
  fetchGetSelfcareURL
} from "../../store/actions";

import "./styles.css";

class TenantPage extends Component {
  state = {
    isLoading: true,
    isLoadingSCURL: true,
    showDelete: false,
    activeKey: 0,
    refreshTab: ""
  };

  componentDidMount() {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.setState({ isLoading: false }));
    this.props.refuseCreateGroup();
    this.props.refuseAddPhoneToTenant();
    this.props
      .fetchGetSelfcareURL()
      .then(() => this.setState({ isLoadingSCURL: false }));
  }

  render() {
    const { tenant } = this.props;
    const { isLoading, showDelete, isLoadingSCURL } = this.state;
    if (isLoading || isLoadingSCURL) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header flex space-between"}>
            <div>
              {`${tenant.type}: ${tenant.name} (id: ${tenant.tenantId})`}
              <Glyphicon
                glyph="glyphicon glyphicon-trash"
                onClick={() => this.setState({ showDelete: true })}
              />
              <DeleteModal
                tenantId={tenant.tenantId}
                show={showDelete}
                onClose={() => {
                  this.setState({ showDelete: false });
                }}
              />
            </div>
            {get(this.props, "selfcareUrl.selfcare.url") && (
              <Button
                className="btn-primary"
                onClick={() =>
                  window.open(
                    `${
                      this.props.selfcareUrl.selfcare.url
                    }/sso?token=${localStorage.getItem(
                      "auth_token"
                    )}&refreshToken=${localStorage.getItem(
                      "refreshToken"
                    )}&tenant=${this.props.match.params.tenantId}`
                  )
                }
              >
                Switch to selfcare portal
              </Button>
            )}
          </div>
        </div>
        <div className={"panel-body"}>
          <Tabs
            activeKey={this.state.activeKey}
            id="tenant_tabs"
            onSelect={this.changeTab}
          >
            <Tab eventKey={0} title="LICENSES">
              <Licenses refreshTab={this.state.refreshTab === "Licenses"} />
            </Tab>
            <Tab eventKey={1} title="GROUPS">
              <GroupsTab
                tenantId={this.props.match.params.tenantId}
                refreshTab={this.state.refreshTab === "GroupsTab"}
              />
            </Tab>
            {/* <Tab eventKey={2} title="ENTERPRISE TRUNKS">
              ENTERPRISE TRUNKS Tab
            </Tab> */}
            <Tab eventKey={3} title="PHONE NUMBERS">
              <PhoneNumbersTab
                tenantId={this.props.match.params.tenantId}
                refreshTab={this.state.refreshTab === "PhoneNumbersTab"}
              />
            </Tab>
            <Tab eventKey={7} title="MOBILE NUMBERS">
              <MobileNumbersTab
                tenantId={this.props.match.params.tenantId}
                refreshTab={this.state.refreshTab === "MobileNumbersTab"}
              />
            </Tab>
            <Tab eventKey={4} title="ADMINISTRATORS">
              <Admins
                tenantId={this.props.match.params.tenantId}
                refreshTab={this.state.refreshTab === "Admins"}
              />
            </Tab>
            <Tab eventKey={5} title="DETAILS">
              <Details
                tenantId={this.props.match.params.tenantId}
                isLoading={isLoading}
                refreshTab={this.state.refreshTab === "Details"}
              />
            </Tab>
            {this.props.isAuthorisedTrunkTenant && (
              <Tab eventKey={6} title="TRUNKING">
                <Trunking refreshTab={this.state.refreshTab === "Trunking"} />
              </Tab>
            )}
          </Tabs>
        </div>
      </React.Fragment>
    );
  }

  changeTab = key => {
    let refreshTab = "";
    switch (key) {
      case 0:
        refreshTab = "Licenses";
        break;
      case 1:
        refreshTab = "GroupsTab";
        break;
      case 3:
        refreshTab = "PhoneNumbersTab";
        break;
      case 4:
        refreshTab = "Admins";
        break;
      case 5:
        refreshTab = "Details";
        break;
      case 6:
        refreshTab = "Trunking";
        break;
      case 7:
        refreshTab = "MobileNumbersTab";
        break;
      default:
        refreshTab = "";
    }
    this.setState({ activeKey: key, refreshTab });
  };
}

const mapDispatchToProps = {
  fetchGetTenantById,
  refuseCreateGroup,
  refuseAddPhoneToTenant,
  fetchGetSelfcareURL
};

const mapStateToProps = state => ({
  tenant: state.tenant,
  isAuthorisedTrunkTenant: state.isAuthorisedTrunkTenant,
  selfcareUrl: state.selfcareUrl
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantPage)
);
