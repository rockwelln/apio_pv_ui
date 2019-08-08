import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import Loading from "../../common/Loading";

import { fetchGetTrunkGroupByName } from "../../store/actions";

import Users from "./Tabs/Users";
import Backup from "./Tabs/Backup";
import Details from "./Tabs/Details";
import TrunkIndenty from "./Tabs/TrunkIndenty";

class TrunkGroupPage extends Component {
  state = {
    isLoading: true,
    showDelete: false
  };

  fetchTrunk() {
    this.props
      .fetchGetTrunkGroupByName(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        this.props.match.params.trunkGroupName
      )
      .then(() => this.setState({ isLoading: false }));
  }

  componentDidMount() {
    this.fetchTrunk();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.trunkGroupName !==
      this.props.match.params.trunkGroupName
    ) {
      this.setState({ isLoading: true }, () => this.fetchTrunk());
    }
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    console.log(this.props.trunkGroup);
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>{`Name: ${
            this.props.trunkGroup.accessDevice.name
          }`}</div>
          <div>{`Level: ${this.props.trunkGroup.accessDevice.level}`}</div>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={2} id="tenant_tabs">
            <Tab eventKey={0} title="Details">
              <Details />
            </Tab>
            <Tab eventKey={1} title="Users">
              <Users />
            </Tab>
            <Tab eventKey={2} title="Trunk indentity">
              <TrunkIndenty />
            </Tab>
            <Tab eventKey={3} title="Backup">
              <Backup />
            </Tab>
            <Tab eventKey={4} title="Capacity">
              Capacity
            </Tab>
            <Tab eventKey={5} title="Call screening">
              Call screening
            </Tab>
            <Tab eventKey={6} title="Stateful rerouting">
              Stateful rerouting
            </Tab>
            <Tab eventKey={7} title="Outgoing CLI overwrite">
              Outgoing CLI overwrite
            </Tab>
            <Tab eventKey={8} title="Advanced">
              Advanced
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
