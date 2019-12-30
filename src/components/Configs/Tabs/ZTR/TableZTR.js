import React, { Component } from "react";

import Table from "react-bootstrap/lib/Table";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import { FormattedMessage } from "react-intl";

export class TableZTR extends Component {
  render() {
    return (
      <Row>
        <Col md={12}>
          <Table hover>
            <thead>
              <tr>
                <th>
                  <FormattedMessage id="line" defaultMessage="Line" />
                </th>
                <th>
                  <FormattedMessage id="zipCode" defaultMessage="Zip Code" />
                </th>
                <th>
                  <FormattedMessage
                    id="routingProfile"
                    defaultMessage="Routing profile"
                  />
                </th>
                <th>
                  <FormattedMessage id="status" defaultMessage="Status" />
                </th>
                <th>
                  <FormattedMessage id="message" defaultMessage="Message" />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.emergencyRouting.map(line => (
                <tr key={line.line}>
                  <td>{line.line}</td>
                  <td>{line.zip_code}</td>
                  <td>{line.routing_profile}</td>
                  <td
                    style={{
                      color: line.status === "Success" ? "Green" : "Red"
                    }}
                  >
                    {line.status}
                  </td>
                  <td>{line.message}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    );
  }
}

export default TableZTR;
