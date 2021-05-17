import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Loading from "../../common/Loading";
import PhoneNumbers from "./Tabs/PhoneNumbers";
import Details from "./Details";
import Channels from "./Tabs/Channels";
import Service from "./Tabs/Service";
import NumberFormatting from "./Tabs/NumberFormatting";
import RoutingNumber from "./Tabs/RoutingNumber";

import IADs from "./Tabs/IADs";

import { fetchGetTenantById, fetchGetGroupById } from "../../store/actions";

import DeleteModal from "./DeleteModal";
import Product from "./Tabs/Product";

import { isAllowed, pages } from "../../utils/user";

class TenantPage extends Component {
  tabsIdSuffix = Math.random().toString(36).replace(".", "");

  state = {
    isLoadingTenant: true,
    isLoadingGroup: true,
    showDelete: false,
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
            {!(group.accessType === "COAX" || group.accessType === "VDSL") &&
              isAllowed(
                localStorage.getItem("userProfile"),
                pages.delete_group
              ) && (
                <Glyphicon
                  glyph="glyphicon glyphicon-trash"
                  onClick={() => this.setState({ showDelete: true })}
                />
              )}
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
            activeKey={
              this.props.location.state && this.props.location.state.defaultTab
                ? this.props.location.state.defaultTab
                : this.returnActiveKey()
            }
            id={`group_tabs${this.tabsIdSuffix}`}
            onSelect={(key) => this.tabRouting(key)}
          >
            <Tab eventKey={0} title="Product type">
              <Product />
            </Tab>
            <Tab eventKey={1} title="Channels">
              <Channels />
            </Tab>
            <Tab eventKey={2} title="Services">
              <Service />
            </Tab>
            <Tab eventKey={3} title="IADs">
              <IADs />
            </Tab>
            <Tab eventKey={4} title="Numbers">
              <PhoneNumbers
                tenantId={this.props.match.params.tenantId}
                groupId={this.props.match.params.groupId}
              />
            </Tab>
            <Tab eventKey={5} title="Number Formatting">
              <NumberFormatting />
            </Tab>
            <Tab eventKey={6} title="Routing Number">
              <RoutingNumber />
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }

  tabRouting = (key) => {
    switch (key) {
      case 0:
        this.props.history.push("#productType");
        break;
      case 1:
        this.props.history.push("#channels");
        break;
      case 2:
        this.props.history.push("#services");
        break;
      case 3:
        this.props.history.push("#iads");
        break;
      case 4:
        this.props.history.push("#numbers");
        break;
      case 5:
        this.props.history.push("#numberFormatting");
        break;
      case 6:
        this.props.history.push("#routingNumbers");
        break;
    }
  };

  returnActiveKey = () => {
    switch (this.props.location.hash) {
      case "#productType":
        return 0;
      case "#channels":
        return 1;
      case "#services":
        return 2;
      case "#iads":
        return 3;
      case "#numbers":
        return 4;
      case "#numberFormatting":
        return 5;
      case "#routingNumbers":
        return 6;
      default:
        return 0;
    }
  };
}

const mapDispatchToProps = {
  fetchGetTenantById,
  fetchGetGroupById,
};

const mapStateToProps = (state) => ({
  tenant: state.tenant,
  group: state.group,
  fetchTrunksGroupsFail: state.fetchTrunksGroupsFail,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TenantPage)
);
