import React, { Component } from "react";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

import Sidebar from "../../common/Sidebar";
import Title from "../../common/Title";
import Breadcrumb from "../../common/Breadcrumb";

import EnterpriseTrunk from "./EnterpriseTrunk";

export class EnterpriseTrunkPage extends Component {
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
          <Col md={10} className={"padding-left-3 padding-right-3"}>
            <Row>
              <Breadcrumb hash={"#routingNumbers"} />
            </Row>
            <Row className={"panel panel-default"}>
              <EnterpriseTrunk />
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default EnterpriseTrunkPage;
