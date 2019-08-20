import React, { Component } from "react";
import { connect } from "react-redux";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

import Breadcrumb from "../../common/Breadcrumb";
import Sidebar from "../../common/Sidebar";
import Title from "../../common/Title";

import Steps from "./Steps";

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
            <Row className={"panel panel-default"}>
              <Steps />
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default connect()(AddPhoneNumberTenant);
