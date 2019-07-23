import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";

export class Basic extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={"panel-heading"}>
          <Row>
            <Col md={12}>
              <div className={"header"}>
                Add phone numbers
                <Link
                  to={`/provisioning/${
                    this.props.match.params.gwName
                  }/tenants/${this.props.match.params.tenantId}`}
                >
                  <Button
                    className={"margin-left-1 btn-danger"}
                    onClick={() => this.props.refuseCreateGroup()}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div>Assign phone numbers to this tenants</div>
            </Col>
          </Row>
        </div>
        <div className={"panel-body"}>
          <Row>
            <Col md={12}>
              <div>Copy-paste here the phone numbers you want to add</div>
              <div>
                <ul>
                  <li>
                    Delimiter: use "space", "tab", "," or ";" as delimiter
                  </li>
                  <li>Use line breaks to end a row</li>
                  <li>Numbers in national or international format</li>
                  <li>
                    Each row can contain 1 (individual number) or 2 (range)
                    numbers
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Basic)
);
