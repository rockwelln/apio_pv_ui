import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import ZipToRouting from "./Tabs/ZTR/ZipToRouting";
import ReconciliationTeams from "./Tabs/ReconciliationTeams/ReconciliationTeams";

export class ConfigPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>Configs</div>
        </div>
        <div className={"panel-body"}>
          <Tabs
            id="tenant_tabs"
            activeKey={this.returnActiveKey()}
            id="enterprice_tabs"
            onSelect={key => this.tabRouting(key)}
          >
            <Tab eventKey={0} title="ZIP to Routing">
              <ZipToRouting />
            </Tab>
            <Tab eventKey={1} title="Reconciliation Teams">
              <ReconciliationTeams />
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }

  tabRouting = key => {
    switch (key) {
      case 0:
        this.props.history.push("#zipToRouting");
        break;
      case 1:
        this.props.history.push("#reconciliationTeams");
        break;
    }
  };

  returnActiveKey = () => {
    switch (this.props.location.hash) {
      case "#zipToRouting":
        return 0;
      case "#reconciliationTeams":
        return 1;
      default:
        return 0;
    }
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfigPage)
);
