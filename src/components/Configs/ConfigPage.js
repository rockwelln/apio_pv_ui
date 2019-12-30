import React, { Component } from "react";
import { connect } from "react-redux";

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
          <Tabs defaultActiveKey={1} id="tenant_tabs">
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
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfigPage);
