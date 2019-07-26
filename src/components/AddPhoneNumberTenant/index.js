import React, { Component } from "react";
import { connect } from "react-redux";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

import Breadcrumb from "../../common/Breadcrumb";
import Sidebar from "../../common/Sidebar";
import Title from "../../common/Title";

import Basic from "./Basic";
import Validated from "./Validated";
import Info from "./Info";

export class AddPhoneNumberTenant extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-bottom-4"}>
          <Title />
        </Row>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10} className={"padding-left-3"}>
            <Row>
              <Breadcrumb />
            </Row>
            <Row className={"panel panel-default"}>{this.returnStep()}</Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  returnStep = () => {
    switch (this.props.addPhoneTenantStep) {
      case "Basic": {
        return <Basic />;
      }
      case "Validated": {
        return <Validated />;
      }
      case "Info": {
        return <Info />;
      }
      default:
        return <Basic />;
    }
  };
}

const mapStateToProps = state => ({
  addPhoneTenantStep: state.addPhoneTenantStep
});

export default connect(
  mapStateToProps,
  null
)(AddPhoneNumberTenant);
