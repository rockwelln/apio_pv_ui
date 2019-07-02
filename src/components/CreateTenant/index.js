import React, { Component } from "react";
import { connect } from "react-redux";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";

import Breadcrumb from "../../common/Breadcrumb";
import Sidebar from "../../common/Sidebar";
import Title from "../../common/Title";

export class CreateTenant extends Component {
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
          <Col md={10} className={"border-left padding-left-3"}>
            <Row>
              <Breadcrumb />
            </Row>
            <Row>{this.returnStep()}</Row>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  returnStep = () => {
    switch (this.props.createTenantStep) {
      case "firstStep": {
        return <FirstStep />;
      }
      case "secondStep": {
        return <SecondStep />;
      }
      default:
        return <FirstStep />;
    }
  };
}

const mapStateToProps = state => ({
  createTenantStep: state.createTenantStep
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTenant);
