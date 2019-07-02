import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";

export class FirstStep extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <p className={"header"}>
              ADD TENANT
              <Link to={`/provisioning/broadsoft_xsp1_as1/tenants`}>
                <Glyphicon
                  className={"margin-1 smaller"}
                  glyph="glyphicon glyphicon-remove"
                />
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className={"smaller"}>
              Select the type, configure a unique ID, a name and optionally some
              contact details
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className={"larger"}>TYPE</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ToggleButtonGroup type="radio" name="options">
              <ToggleButton value={"Service Provider"}>
                <Glyphicon glyph="glyphicon glyphicon-remove" />
              </ToggleButton>
              <ToggleButton value={"Enterprise"}>
                <Glyphicon glyph="glyphicon glyphicon-remove" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstStep);
