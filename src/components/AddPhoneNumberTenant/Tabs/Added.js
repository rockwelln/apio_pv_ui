import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Table from "react-bootstrap/lib/Table";

import { FormattedMessage } from "react-intl";

export class Added extends Component {
  render() {
    return (
      <Row>
        <Col mdOffset={1} md={11}>
          <Table hover>
            <thead>
              <tr>
                <th style={{ width: "50%" }}>
                  <FormattedMessage id="Number" defaultMessage="Number" />
                </th>
                <th style={{ width: "50%" }}>
                  <FormattedMessage id="Status" defaultMessage="Status" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.addedNumbersToTenant.added.map((number, i) => (
                <tr key={i + ""}>
                  <td>{number.phoneNumber}</td>
                  <td>{number.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  addedNumbersToTenant: state.addedNumbersToTenant
});

export default connect(
  mapStateToProps,
  null
)(Added);
