import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Alert from "react-bootstrap/lib/Alert";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";

import Added from "./Tabs/Added";
import Rejected from "./Tabs/Rejected";

export class InfoGroup extends Component {
  state = {
    addButton: "Add now"
  };
  render() {
    return (
      //body
      <div className={"panel-body"}>
        {this.props.isGroupPage && <div>Results added to group</div>}
        {this.props.addedNumbersToGroup.warning && (
          <Row>
            <Col md={12}>
              <Alert bsStyle="warning">
                {this.props.addedNumbersToGroup.warning.message}
              </Alert>
            </Col>
          </Row>
        )}
        <Tabs defaultActiveKey={0} id="tenant_tabs">
          <Tab
            eventKey={0}
            title={`Added (${this.props.addedNumbersToGroup.added.length})`}
          >
            <Added added={this.props.addedNumbersToGroup.added} />
          </Tab>
          <Tab
            eventKey={1}
            title={`Rejected (${
              this.props.addedNumbersToGroup.rejected.length
            })`}
          >
            <Rejected rejected={this.props.addedNumbersToGroup.rejected} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addedNumbersToGroup: state.addedNumbersToGroup
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(InfoGroup)
);
