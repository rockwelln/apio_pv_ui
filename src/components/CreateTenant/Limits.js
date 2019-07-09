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
            <p>
              Set user limits on service packs and group services. This is
              typically used to limit the volime of licensable items that can be
              consumed by a customer.
            </p>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col md={12}>
            <p>Page under construction, press SKIP or ADD to continue</p>
          </Col>
        </Row>
        <Row className={"margin-1"}>
          <Col mdOffset={9} md={1}>
            <Button
              onClick={() => this.props.changeStepOfCreateTenant("Admin")}
            >
              <Glyphicon
                glyph="glyphicon glyphicon-forward"
                style={{ display: "flex", lineHeight: "20px" }}
              >
                <div
                  className={"margin-left-1"}
                  style={{
                    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                  }}
                >
                  SKIP
                </div>
              </Glyphicon>
            </Button>
          </Col>
          <Col mdOffset={1} md={1}>
            <Button
              onClick={() => this.props.changeStepOfCreateTenant("Admin")}
            >
              <Glyphicon
                glyph="glyphicon glyphicon-ok"
                style={{ display: "flex", lineHeight: "20px" }}
              >
                <div
                  className={"margin-left-1"}
                  style={{
                    fontFamily: `"Helvetica Neue",Helvetica,Arial,sans-serif`
                  }}
                >
                  APPLY
                </div>
              </Glyphicon>
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
