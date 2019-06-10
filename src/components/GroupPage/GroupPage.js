import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Loading from "../../common/Loading";
import Users from "./Tabs/Users";
import PhoneNumbers from "./Tabs/PhoneNumbers";
// import PhoneNumbersTab from "./Tabs/PhoneNumber";
// import Admins from "./Tabs/Admins";
// import Details from "./Tabs/Details";

import { fetchGetTenantById, fetchGetGroupById } from "../../store/actions";
import Group from "../TenantPage/Tabs/Groups/Group";

class TenantPage extends Component {
  state = {
    isLoadingTenant: true,
    isLoadingGroup: true
  };

  componentDidMount() {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.setState({ isLoadingTenant: false }));
    this.props
      .fetchGetGroupById(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() => this.setState({ isLoadingGroup: false }));
  }

  render() {
    const { tenant, group } = this.props;
    const { isLoadingTenant, isLoadingGroup } = this.state;

    if (isLoadingTenant && isLoadingGroup) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div>
          <p className={"header"}>
            {`GROUP: ${group.groupName} (${this.props.match.params.groupId})`}
            <Glyphicon glyph="glyphicon glyphicon-trash" />
          </p>
          <p>{`Tenant: ${tenant.name} (${tenant.tenantId})`}</p>
        </div>
        <Tabs defaultActiveKey={3} id="tenant_tabs">
          <Tab eventKey={0} title="LICENSES">
            LICENSES Tab
          </Tab>
          <Tab eventKey={1} title="USERS">
            <Users
              tenantId={tenant.tenantId}
              groupId={this.props.match.params.groupId}
            />
          </Tab>
          <Tab eventKey={2} title="TRUNKS GROUP">
            ENTERPRISE TRUNKS Tab
          </Tab>
          <Tab eventKey={3} title="PHONE NUMBERS">
            <PhoneNumbers
              tenantId={tenant.tenantId}
              groupId={this.props.match.params.groupId}
            />
          </Tab>
          <Tab eventKey={4} title="DEVICES">
            DEVICES
          </Tab>
          <Tab eventKey={5} title="ADMINISTRATORS">
            ADMINISTRATORS
          </Tab>
          <Tab eventKey={6} title="DETAILS">
            DETAILS
          </Tab>
        </Tabs>
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
  group: state.group
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantPage)
);
