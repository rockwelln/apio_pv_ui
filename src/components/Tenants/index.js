import React from "react";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

import Breadcrumb from "../../common/Breadcrumb";
import Sidebar from "../../common/Sidebar";
import Tenants from "./Tenants";
import Title from "../../common/Title";

import "./styles.css";

const TenantComponent = props => {
  return (
    <React.Fragment>
      <Row>
        <Title />
      </Row>
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col md={10} className={"border-left padding-left-3"}>
          <Row>
            <Breadcrumb />
          </Row>
          <Row>
            <Tenants {...props} />
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default TenantComponent;
