import React, { Component } from "react";
import { connect } from "react-redux";

import Basic from "./Basic";
import Template from "./Template";
import Limits from "./Limits";
import Admin from "./Admin";
import Created from "./Created";
import Parameters from "./Parameters";

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
    switch (this.props.createTenantStep) {
      case "Basic": {
        return <Basic />;
      }
      case "Template": {
        return <Template />;
      }
      case "Created": {
        return <Created />;
      }
      case "Limits": {
        return <Limits />;
      }
      case "Admin": {
        return <Admin />;
      }
      case "Parameters": {
        return <Parameters />;
      }
      default:
        return <Basic />;
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
