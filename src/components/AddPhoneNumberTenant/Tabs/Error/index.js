import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import { FormattedMessage } from "react-intl";

import Phone from "./Phone";

export class OkTab extends Component {
  state = {
    searchValue: "",
    failedValidated: [],
    sortedBy: ""
  };

  getValidatedNumbers = () => {
    this.setState({
      failedValidated: this.props.validatedNumbersTenant.err.sort((a, b) => {
        if (a.line < b.line) return -1;
        if (a.line > b.line) return 1;
        return 0;
      }),
      sortedBy: "line"
    });
  };

  componentDidMount() {
    this.getValidatedNumbers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.validatedNumbersTenant.err.length !==
      this.props.validatedNumbersTenant.err.length
    ) {
      this.getValidatedNumbers();
    }
  }

  render() {
    const { failedValidated } = this.state;
    return (
      <React.Fragment>
        {/**TABLE */}

        <Row>
          <Col mdOffset={1} md={10}>
            <Table hover>
              {/**TABLE HEAD */}

              <thead>
                <tr>
                  <th style={{ width: "10%" }}>
                    <FormattedMessage id="Line" defaultMessage="Line" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByLine}
                    />
                  </th>
                  <th style={{ width: "90%" }} />
                </tr>
              </thead>
              {/**TABLE BODY */}

              <tbody>
                {failedValidated.map(phone => (
                  <Phone key={phone.line} phone={phone} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  //Funcinons for sort
  sortByLine = () => {
    const { failedValidated, sortedBy } = this.state;
    if (sortedBy === "line") {
      const phonesSorted = failedValidated.reverse();
      this.setState({ failedValidated: phonesSorted });
    } else {
      const phonesSorted = failedValidated.sort((a, b) => {
        if (a.line < b.line) return -1;
        if (a.line > b.line) return 1;
        return 0;
      });
      this.setState({ failedValidated: phonesSorted, sortedBy: "line" });
    }
  };
}

const mapStateToProps = state => ({
  validatedNumbersTenant: state.validatedNumbersTenant
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkTab);
