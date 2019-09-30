import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Loading from "../../common/Loading";
import Users from "./Tabs/Users";
import PhoneNumbers from "./Tabs/PhoneNumbers";
import Licenses from "./Tabs/Licenses";
import Details from "./Details";
import Devices from "./Tabs/Devices";
import Admins from "./Tabs/Admins";
import TrunksGroup from "./Tabs/TrunksGroup";
import Channels from "./Tabs/Channels";

import IADs from "./Tabs/IADs";
import Specifications from "./Details";
import Redundancy from "./Tabs/Redundancy";

import { fetchGetTenantById, fetchGetGroupById } from "../../store/actions";

import DeleteModal from "./DeleteModal";

class TenantPage extends Component {
  tabsIdSuffix = Math.random()
    .toString(36)
    .replace(".", "");

  state = {
    isLoadingTenant: true,
    isLoadingGroup: true,
    showDelete: false
  };

  fetchTennant = () => {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.setState({ isLoadingTenant: false }));
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoadingGroup: false }));
  };

  componentDidMount() {
    this.fetchTennant();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.tenantId !== this.props.match.params.tenantId) {
      this.fetchTennant();
    }
  }

  render() {
    const { tenant, group } = this.props;
    const { isLoadingTenant, isLoadingGroup, showDelete } = this.state;

    if (isLoadingTenant && isLoadingGroup) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <p className={"header"}>
            {`Site: ${group.groupName} (${this.props.match.params.groupId}) of customer ${tenant.name} (${tenant.tenantId})`}
            <Glyphicon
              glyph="glyphicon glyphicon-trash"
              onClick={() => this.setState({ showDelete: true })}
            />
            <DeleteModal
              groupId={this.props.match.params.groupId}
              show={showDelete}
              notifications={this.props.notifications}
              onClose={() => {
                this.setState({ showDelete: false });
              }}
            />
          </p>
        </div>
        <div className={"panel-body"}>
          <Details />
          <Tabs
            className={"margin-top-1"}
            defaultActiveKey={0}
            id={`group_tabs${this.tabsIdSuffix}`}
          >
            <Tab eventKey={0} title="Product type"></Tab>
            <Tab eventKey={1} title="Channels">
              <Channels />
            </Tab>
            <Tab eventKey={2} title="Services"></Tab>
            <Tab eventKey={3} title="IADs">
              <IADs />
            </Tab>
            <Tab eventKey={4} title="Numbers">
              <PhoneNumbers
                tenantId={this.props.match.params.tenantId}
                groupId={this.props.match.params.groupId}
              />
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchGetTenantById,
  fetchGetGroupById
};

const mapStateToProps = state => ({
  tenant: state.tenant,
  group: state.group,
  fetchTrunksGroupsFail: state.fetchTrunksGroupsFail
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantPage)
);
