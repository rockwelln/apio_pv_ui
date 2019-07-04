import React, { Component } from "react";
import { connect } from "react-redux";

import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

import { changeStepOfCreateTenant } from "../../store/actions";

export class Limits extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <p className={"header"}>ADD TENANT: usage limits</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className={"smaller"}>
              Set user limits on service packs and group services. This is
              typically used to limit the volime of licensable items that can be
              consumed by a customer.
            </p>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col mdOffset={10} md={2}>
            <Button
              onClick={() => this.props.changeStepOfCreateTenant("Admin")}
            >
              <Glyphicon glyph="glyphicon glyphicon-forward">SKIP</Glyphicon>
            </Button>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col mdOffset={10} md={2}>
            <Button
              onClick={() => this.props.changeStepOfCreateTenant("Admin")}
            >
              <Glyphicon glyph="glyphicon glyphicon-ok">ADD</Glyphicon>
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = { changeStepOfCreateTenant };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Limits);
