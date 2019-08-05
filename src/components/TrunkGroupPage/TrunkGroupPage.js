import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Loading from "../../common/Loading";

import { fetchGetTrunkGroupByName } from "../../store/actions";

import Users from "./Users";

class TrunkGroupPage extends Component {
  state = {
    isLoading: true,
    showDelete: false
  };

  componentDidMount() {
    this.props
      .fetchGetTrunkGroupByName(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.trunkGroupName
      )
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Name: ${
            this.props.trunkGroup.accessDevice.name
          }`}</div>
          <div>{`Level: ${this.props.trunkGroup.accessDevice.level}`}</div>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="tenant_tabs">
            <Tab eventKey={0} title="DETAILS">
              DETAILS Tab
            </Tab>
            <Tab eventKey={1} title="USERS">
              <Users />
            </Tab>
            <Tab eventKey={2} title="SCREENING">
              SCREENING Tab
            </Tab>
            <Tab eventKey={3} title="BACKUP">
              BACKUP
            </Tab>
            <Tab eventKey={4} title="NETWORK SETTINGS">
              NETWORK SETTINGS
            </Tab>
            <Tab eventKey={5} title="NETWORK SETTINGS">
              NETWORK SETTINGS
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { fetchGetTrunkGroupByName };

const mapStateToProps = state => ({
  trunkGroup: state.trunkGroup
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrunkGroupPage)
);
