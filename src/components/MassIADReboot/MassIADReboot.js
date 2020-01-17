import React from "react";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Panel from "react-bootstrap/lib/Panel";

import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

const MassIADReboot = props => {
  return (
    <Panel.Body>
      <Row>
        <Col md={6}>
          <LeftColumn />
        </Col>
        <Col md={6}>
          <RightColumn />
        </Col>
      </Row>
    </Panel.Body>
  );
};

export default withRouter(MassIADReboot);
