import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Loading from "../../common/Loading";
import Details from "./Tabs/Details";
import PhoneNumber from "./Tabs/PhoneNumbers";
import Services from "./Tabs/Services";
import ServicesPacks from "./Tabs/ServicePacks";

import deepEqual from "../deepEqual";
import DeleteModal from "./DeleteModal";

import {
  fetchGetTenantById,
  fetchGetGroupById,
  fetchGetUserByName
} from "../../store/actions";

class TenantPage extends Component {
  state = {
    isLoadingTenant: true,
    isLoadingGroup: true,
    isLoadingUser: true,
    showDelete: false
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
      showDelete
    } = this.state;

    if (isLoadingTenant && isLoadingGroup && isLoadingUser) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>
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
          </div>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="tenant_tabs">
            <Tab eventKey={0} title="DETAILS">
              <Details />
            </Tab>
            <Tab eventKey={1} title="PHONE NUMBERS">
              <PhoneNumber />
            </Tab>
            <Tab eventKey={2} title="SERVICES">
              <Services />
            </Tab>
            <Tab eventKey={3} title="SERVICE PACKS">
              <ServicesPacks />
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchGetTenantById,
  fetchGetGroupById,
  fetchGetUserByName
};

const mapStateToProps = state => ({
  tenant: state.tenant,
  group: state.group,
  user: state.user
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantPage)
);
