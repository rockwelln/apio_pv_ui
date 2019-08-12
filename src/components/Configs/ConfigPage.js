import React, { Component } from "react";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import PhoneTypes from "./Tabs/PhoneTypes";
export class ConfigPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div className={"header"}>Configs</div>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="tenant_tabs">
            <Tab eventKey={0} title="Phone types">
              <PhoneTypes />
            </Tab>
            <Tab eventKey={1} title="Key-value stores">
              Key-value stores
            </Tab>
            <Tab eventKey={2} title="Default announcements">
              Default announcements
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
