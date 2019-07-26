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

import Added from "./Tabs/Added";
import Rejected from "./Tabs/Rejected";

export class Info extends Component {
  render() {
    return (
      <div className={"panel-body"}>
        {this.props.addedNumbersToTenant.warning && (
          <Row>
            <Col md={12}>
              <Alert bsStyle="warning">
                {this.props.addedNumbersToTenant.warning.message}
              </Alert>
            </Col>
          </Row>
        )}
        <Tabs defaultActiveKey={0} id="tenant_tabs">
          <Tab
            eventKey={0}
            title={`Added (${this.props.addedNumbersToTenant.added.length})`}
          >
            <Added />
          </Tab>
          <Tab
            eventKey={1}
            title={`Rejected (${
              this.props.addedNumbersToTenant.rejected.length
            })`}
          >
            <Rejected />
          </Tab>
        </Tabs>
        <Row className={"margin-1"}>
          <div className="button-row">
            <div className="pull-right">
              <Link
                to={`/provisioning/${this.props.match.params.gwName}/tenants/${
                  this.props.match.params.tenantId
                }`}
              >
                <Button
                  onClick={this.addPhoneNumbers}
                  className={"btn-primary"}
                >
                  OK
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addedNumbersToTenant: state.addedNumbersToTenant
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Info)
);
