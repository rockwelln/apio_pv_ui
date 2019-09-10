import React, { Component } from "react";
import { connect } from "react-redux";

import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import FormControl from "react-bootstrap/lib/FormControl";
import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";

export class View extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Number Rooting
            </div>
          </Col>
        </Row>
        <Row>
          <Col mdOffset={1} md={10}>
            <Table hover>
              <thead>
                <tr>
                  <th>
                    Header 1
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByRangeStart}
                    />
                  </th>
                  <th>
                    Header 2
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByRangeEnd}
                    />
                  </th>
                  <th>
                    Header 3
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByAssignedToGroup}
                    />
                  </th>
                  <th>
                    Header 4
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByAssignedToGroup}
                    />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col md={12} className={"flex align-items-center"}>
            <div className={"margin-right-1 flex flex-basis-16"}>
              Forward to Phone Number
            </div>
            <div className={"margin-right-1 flex-basis-33"}>
              <FormControl type="text" value={"xxxxxxxxxxx"} disabled />
            </div>
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
)(View);
