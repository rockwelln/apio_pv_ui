import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Loading from "../../common/Loading";
import GroupsTab from "./Tabs/Groups";
import PhoneNumbersTab from "./Tabs/PhoneNumber";
import Admins from "./Tabs/Admins";

import { fetchGetTenantById } from "../../store/actions";

import "./styles.css";

class TenantPage extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props
      .fetchGetTenantById(this.props.match.params.tenantId)
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { tenant } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div>
          <p className={"header"}>
            {`TENANT: ${tenant.name} (id: ${tenant.tenantId})`}
            <Glyphicon
              glyph="glyphicon glyphicon-trash"
              onClick={this.sortByID}
            />
          </p>
          <p>{`Type: ${tenant.type}`}</p>
        </div>
        <Tabs defaultActiveKey={4} id="tenant_tabs">
          <Tab eventKey={0} title="LICENSES">
            LICENSES Tab
          </Tab>
          <Tab eventKey={1} title="GROUPS">
            <GroupsTab tenantId={this.props.match.params.tenantId} />
          </Tab>
          <Tab eventKey={2} title="ENTERPRISE TRUNKS">
            ENTERPRISE TRUNKS Tab
          </Tab>
          <Tab eventKey={3} title="PHONE NUMBERS">
            <PhoneNumbersTab tenantId={this.props.match.params.tenantId} />
          </Tab>
          <Tab eventKey={4} title="ADMINISTRATORS">
            <Admins tenantId={this.props.match.params.tenantId} />
          </Tab>
          <Tab eventKey={5} title="DETAILS">
            DETAILS Tab
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  fetchGetTenantById
};

const mapStateToProps = state => ({
  tenant: state.tenant
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TenantPage)
);
