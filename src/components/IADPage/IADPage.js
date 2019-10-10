import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

export class IADPage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <div
            className={"header"}
          >{`IAD: ${this.props.match.params.iadId}`}</div>
        </div>
        <div className={"panel-body"}>
          <Tabs defaultActiveKey={0} id="iads_tabs">
            <Tab eventKey={0} title="Details"></Tab>
            <Tab eventKey={1} title="EDUs"></Tab>
            <Tab eventKey={2} title="IP Addressing"></Tab>
            <Tab eventKey={3} title="Group service override"></Tab>
            <Tab eventKey={4} title="Advanced settings"></Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IADPage)
);
