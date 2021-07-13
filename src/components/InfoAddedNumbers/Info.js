import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Alert from "react-bootstrap/lib/Alert";
import Button from "react-bootstrap/lib/Button";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Panel from "react-bootstrap/lib/Panel";

import Added from "./Added";
import Rejected from "./Rejected";

import {
  fetchPostAssignPhoneNumbersToGroup,
  changeStepOfAddPhoneTenant,
  changeStepOfCreateTenant,
} from "../../store/actions";

export class Info extends Component {
  render() {
    return (
      //body
      <Panel className={"margin-0"}>
        <Panel.Heading>
          <div className={"header"}>Added numbers</div>
        </Panel.Heading>
        <Panel.Body>
          <Tabs defaultActiveKey={0} id="tenant_tabs">
            <Tab
              eventKey={0}
              title={`Added (${this.props.addedNumbers.added.length})`}
            >
              <Added added={this.props.addedNumbers.added} />
            </Tab>
            <Tab
              eventKey={1}
              title={`Rejected (${this.props.addedNumbers.rejected.length})`}
            >
              <Rejected rejected={this.props.addedNumbers.rejected} />
            </Tab>
          </Tabs>
          {/**Button for finish */}
          <Row className={"margin-1"}>
            <div className="button-row">
              <div className="pull-right">
                <Link
                  to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/#numbers`}
                >
                  <Button className={"btn-primary margin-left-1"}>OK</Button>
                </Link>
              </div>
            </div>
          </Row>
        </Panel.Body>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => ({
  addedNumbers: state.addedNumbers,
});

export default withRouter(connect(mapStateToProps, {})(Info));
