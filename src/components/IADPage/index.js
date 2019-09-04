import React from "react";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

import Breadcrumb from "../../common/Breadcrumb";
import Sidebar from "../../common/Sidebar";
import Title from "../../common/Title";
import IADPage from "./IADPage";

const GroupComponent = notifications => {
  return (
    <React.Fragment>
      <Row className={"margin-bottom-4"}>
        <Title />
      </Row>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Row>
            <Breadcrumb />
          </Row>
          <Row className={"panel panel-default"}>
            <IADPage />
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default GroupComponent;
