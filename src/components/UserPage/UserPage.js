import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Button from "react-bootstrap/lib/Button";

import Loading from "../../common/Loading";
import Details from "./Tabs/Details";
import PhoneNumber from "./Tabs/PhoneNumbers";
import Services from "./Tabs/Services";
import ServicesPacks from "./Tabs/ServicePacks";

import deepEqual from "../deepEqual";
import DeleteModal from "./DeleteModal";

import { get } from "../get";
import { getCookie } from "../../utils";

import {
  fetchGetTenantById,
  fetchGetGroupById,
  fetchGetUserByName,
  fetchGetSelfcareURL
} from "../../store/actions";

class TenantPage extends Component {
  state = {
    isLoadingTenant: true,
    isLoadingGroup: true,
    isLoadingUser: true,
    showDelete: false,
    isLoadingSCURL: true,
    activeKey: 0,
    refreshTab: ""
  };

  fetchRequsts = () => {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.setState({ isLoadingTenant: false }));
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoadingGroup: false }));
    this.props
      .fetchGetUserByName(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.userName
      )
      .then(() => this.setState({ isLoadingUser: false }));
    this.props
      .fetchGetSelfcareURL()
      .then(() => this.setState({ isLoadingSCURL: false }));
  };

  componentDidMount() {
    this.fetchRequsts();
  }

  componentDidUpdate(prevProps) {
    const { _record_internal_id: prevId, ...prevPropsUser } = prevProps.user;
    const { _record_internal_id: thisId, ...thisPropsUser } = this.props.user;
    if (!deepEqual(prevPropsUser, thisPropsUser)) {
      this.fetchRequsts();
    }
  }

  render() {
    const { user } = this.props;
    const {
      isLoadingTenant,
      isLoadingGroup,
      isLoadingUser,
      showDelete,
      isLoadingSCURL
    } = this.state;

    if (isLoadingTenant || isLoadingGroup || isLoadingUser || isLoadingSCURL) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header flex space-between"}>
            <div>
              {`User: 
              ${user.firstName ? user.firstName : ""} 
              ${user.lastName ? user.lastName : ""}
              (${this.props.match.params.userName})`}
              <Glyphicon
                glyph="glyphicon glyphicon-trash"
                onClick={() => this.setState({ showDelete: true })}
              />
              <DeleteModal
                userId={this.props.match.params.userName}
                show={showDelete}
                onClose={() => {
                  this.setState({ showDelete: false });
                }}
              />
            </div>{" "}
            {get(this.props, "selfcareUrl.selfcare.url") && (
              <div>
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
                      )}&tenant=${this.props.match.params.tenantId}&group=${
                        this.props.match.params.groupId
                      }&user=${this.props.match.params.userName}`
                    )
                  }
                >
                  Switch to selfcare portal
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={"panel-body"}>
          <Tabs
            activeKey={this.state.activeKey}
            id="tenant_tabs"
            onSelect={this.changeTab}
          >
            <Tab eventKey={0} title="DETAILS">
              <Details refreshTab={this.state.refreshTab === "Details"} />
            </Tab>
            <Tab eventKey={1} title="PHONE NUMBERS">
              <PhoneNumber
                refreshTab={this.state.refreshTab === "PhoneNumber"}
              />
            </Tab>
            <Tab eventKey={2} title="SERVICES">
              <Services refreshTab={this.state.refreshTab === "Services"} />
            </Tab>
            <Tab eventKey={3} title="SERVICE PACKS">
              <ServicesPacks
                refreshTab={this.state.refreshTab === "ServicesPacks"}
              />
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }

  changeTab = key => {
    let refreshTab = "";
    switch (key) {
      case 0:
        refreshTab = "Details";
        break;
      case 1:
        refreshTab = "PhoneNumber";
        break;
      case 2:
        refreshTab = "Services";
        break;
      case 3:
        refreshTab = "ServicesPacks";
        break;
      default:
        refreshTab = "";
    }
    this.setState({ activeKey: key, refreshTab });
  };
}

const mapDispatchToProps = {
  fetchGetTenantById,
  fetchGetGroupById,
  fetchGetUserByName,
  fetchGetSelfcareURL
};

const mapStateToProps = state => ({
  tenant: state.tenant,
  group: state.group,
  user: state.user,
  selfcareUrl: state.selfcareUrl
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantPage)
);
