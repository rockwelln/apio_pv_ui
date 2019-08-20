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

import {
  fetchPostAssignPhoneNumbersToGroup,
  changeStepOfAddPhoneTenant
} from "../../store/actions";

export class Info extends Component {
  state = {
    addButton: "Add now"
  };
  render() {
    return (
      //body
      <div className={"panel-body"}>
        {this.props.isGroupPage && <div>Results added to tennant</div>}
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
            <Added added={this.props.addedNumbersToTenant.added} />
          </Tab>
          <Tab
            eventKey={1}
            title={`Rejected (${
              this.props.addedNumbersToTenant.rejected.length
            })`}
          >
            <Rejected rejected={this.props.addedNumbersToTenant.rejected} />
          </Tab>
        </Tabs>
        {/**Button for finish */}
        <Row className={"margin-1"}>
          <div className="button-row">
            <div className="pull-right">
              {this.props.isGroupPage ? (
                <React.Fragment>
                  <Button
                    onClick={this.addNumbersToGroup}
                    className={"btn-primary"}
                    disabled={this.state.addButton === "Adding..."}
                  >
                    {this.state.addButton}
                  </Button>
                  <div className={"color-error"}>{this.props.errorMessage}</div>
                </React.Fragment>
              ) : (
                <Link
                  to={`/provisioning/${
                    this.props.match.params.gwName
                  }/tenants/${this.props.match.params.tenantId}`}
                >
                  <Button
                    onClick={this.addPhoneNumbers}
                    className={"btn-primary"}
                  >
                    OK
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Row>
      </div>
    );
  }

  addNumbersToGroup = () => {
    this.setState({ errorMessage: null, addButton: "Adding..." });
    const numbers = this.props.addedNumbersToTenant.added.map(phone => ({
      phoneNumber: phone.phoneNumber
    }));
    const data = { numbers };
    this.props
      .fetchPostAssignPhoneNumbersToGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId,
        data
      )
      .then(res =>
        res === "success"
          ? this.props.changeStepOfAddPhoneTenant("InfoGroup")
          : this.setState({
              errorMessage: "Failed assign numbers",
              addButton: "Add now"
            })
      );
  };
}

const mapStateToProps = state => ({
  addedNumbersToTenant: state.addedNumbersToTenant
});

const mapDispatchToProps = {
  fetchPostAssignPhoneNumbersToGroup,
  changeStepOfAddPhoneTenant
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Info)
);
