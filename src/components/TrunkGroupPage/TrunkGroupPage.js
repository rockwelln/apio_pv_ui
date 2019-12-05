import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

import Loading from "../../common/Loading";

import { fetchGetTrunkGroupByName } from "../../store/actions";

import Users from "./Tabs/Users";
import Backup from "./Tabs/Backup";
import Details from "./Tabs/Details";
import TrunkIndenty from "./Tabs/TrunkIndenty";
import Capacity from "./Tabs/Capacity";
import CallScreening from "./Tabs/CallScreening";
import StatefulRerouting from "./Tabs/StatefulRerouting";
import CLI from "./Tabs/CLI";
import Advanced from "./Tabs/Advanced";
import Authentication from "./Tabs/Authentication";
import DeleteModal from "./DeleteModal";

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
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>
            {`Name: ${this.props.match.params.trunkGroupName}`}{" "}
            <Glyphicon
              glyph="glyphicon glyphicon-trash"
              onClick={() => this.setState({ showDelete: true })}
            />
            <DeleteModal
              trunkGroupName={this.props.match.params.trunkGroupName}
              show={this.state.showDelete}
              onClose={() => {
                this.setState({ showDelete: false });
              }}
            />
          </div>
          <div>{`Level: ${
            this.props.trunkGroup.accessDevice
              ? this.props.trunkGroup.accessDevice.level
              : ""
          }`}</div>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="tenant_tabs">
            <Tab eventKey={0} title="Details">
              <Details />
            </Tab>
            <Tab eventKey={9} title="Authentication">
              <Authentication />
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
              <Capacity />
            </Tab>
            <Tab eventKey={5} title="Call screening">
              <CallScreening />
            </Tab>
            <Tab eventKey={6} title="Stateful rerouting">
              <StatefulRerouting />
            </Tab>
            <Tab eventKey={7} title="Outgoing CLI overwrite">
              <CLI />
            </Tab>
            <Tab eventKey={8} title="Advanced">
              <Advanced />
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
