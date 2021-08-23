import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Table from "react-bootstrap/lib/Table";
import Button from "react-bootstrap/lib/Button";

import { FormattedMessage } from "react-intl";

export class Rejected extends Component {
  render() {
    return (
      <Row>
        <Col md={12}>
          {/**Table of result */}
          <Table hover>
            <thead>
              <tr>
                <th style={{ width: "33%" }}>
                  <FormattedMessage id="Number" defaultMessage="Number" />
                </th>
                <th style={{ width: "33%" }}>
                  <FormattedMessage id="Status" defaultMessage="Status" />
                </th>
                <th style={{ width: "33%" }}>
                  <FormattedMessage id="Reason" defaultMessage="Reason" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.rejected.map((number, i) => (
                <tr key={i + ""}>
                  <td>{number.phoneNumber}</td>
                  <td>{number.status}</td>
                  <td>{number.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/**Button for copy to clipboard */}
          <Row className={"margin-1"}>
            <div className="button-row">
              <div className="pull-right">
                <Button
                  onClick={this.copyToClipBoard}
                  className={"btn-primary"}
                >
                  Copy to clipboard
                </Button>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    );
  }
  copyToClipBoard = () => {
    if (this.props.rejected) {
      const toCopy = JSON.stringify(this.props.rejected);
      navigator.clipboard.writeText(toCopy);
    }
  };
}

const mapStateToProps = (state) => ({
  addedNumbers: state.addedNumbers,
});

export default connect(mapStateToProps, null)(Rejected);
