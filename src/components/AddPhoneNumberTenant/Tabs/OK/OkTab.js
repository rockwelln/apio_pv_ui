import React, { Component } from "react";
import { connect } from "react-redux";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import { FormattedMessage } from "react-intl";

import Phone from "./Phone";

export class OkTab extends Component {
  state = {
    searchValue: "",
    successfulValidated: [],
    sortedBy: ""
  };

  getValidatedNumbers = () => {
    this.setState({
      successfulValidated: this.props.validatedNumbersTenant.ok.sort((a, b) => {
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.validatedNumbersTenant.ok.length !==
      this.props.validatedNumbersTenant.ok.length
    ) {
      this.getValidatedNumbers();
    }
  }

  render() {
    const { successfulValidated } = this.state;
    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="phonenumber or type"
              >
                {placeholder => (
                  <FormControl
                    type="text"
                    value={this.state.searchValue}
                    placeholder={placeholder}
                    onChange={e =>
                      this.setState(
                        {
                          searchValue: e.target.value
                        },
                        () => this.filterBySearchValue()
                      )
                    }
                  />
                )}
              </FormattedMessage>
            </InputGroup>
          </Col>
          <Col md={1}>
            <Glyphicon
              className={"x-large"}
              glyph="glyphicon glyphicon-plus-sign"
            />
          </Col>
        </Row>
        <Row>
          <Col mdOffset={1} md={10}>
            <Table hover>
              <thead>
                <tr>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="Line" defaultMessage="Line" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByLine}
                    />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="Start" defaultMessage="Range start" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByRangeStart}
                    />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="End" defaultMessage="Range end" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByRangeEnd}
                    />
                  </th>
                  <th style={{ width: "24%" }}>
                    <FormattedMessage id="type" defaultMessage="Type" />
                    <Glyphicon
                      glyph="glyphicon glyphicon-sort"
                      onClick={this.sortByType}
                    />
                  </th>
                  <th style={{ width: "4%" }} />
                </tr>
              </thead>
              <tbody>
                {successfulValidated.map(phone => (
                  <Phone key={phone.line} phone={phone} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.validatedNumbersTenant.ok
      .filter(
        phone =>
          phone.start.toLowerCase().includes(searchValue.toLowerCase()) ||
          (phone.end &&
            phone.end.toLowerCase().includes(searchValue.toLowerCase())) ||
          phone.type.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(phone => phone);
    this.setState({ successfulValidated: SearchArray });
  };

  sortByLine = () => {
    const { successfulValidated, sortedBy } = this.state;
    if (sortedBy === "line") {
      const phonesSorted = successfulValidated.reverse();
      this.setState({ successfulValidated: phonesSorted });
    } else {
      const phonesSorted = successfulValidated.sort((a, b) => {
        if (a.line < b.line) return -1;
        if (a.line > b.line) return 1;
        return 0;
      });
      this.setState({ successfulValidated: phonesSorted, sortedBy: "line" });
    }
  };

  sortByRangeStart = () => {
    const { successfulValidated, sortedBy } = this.state;
    if (sortedBy === "start") {
      const phonesSorted = successfulValidated.reverse();
      this.setState({ successfulValidated: phonesSorted });
    } else {
      const phonesSorted = successfulValidated.sort((a, b) => {
        if (a.start < b.start) return -1;
        if (a.start > b.start) return 1;
        return 0;
      });
      this.setState({ successfulValidated: phonesSorted, sortedBy: "start" });
    }
  };

  sortByRangeEnd = () => {
    const { successfulValidated, sortedBy } = this.state;
    if (sortedBy === "end") {
      const phonesSorted = successfulValidated.reverse();
      this.setState({ successfulValidated: phonesSorted });
    } else {
      const phonesSorted = successfulValidated.sort((a, b) => {
        if (a.end < b.end) return -1;
        if (a.end > b.end) return 1;
        return 0;
      });
      this.setState({ successfulValidated: phonesSorted, sortedBy: "end" });
    }
  };

  sortByType = () => {
    const { successfulValidated, sortedBy } = this.state;
    if (sortedBy === "type") {
      const phonesSorted = successfulValidated.reverse();
      this.setState({ successfulValidated: phonesSorted });
    } else {
      const phonesSorted = successfulValidated.sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return 0;
      });
      this.setState({ successfulValidated: phonesSorted, sortedBy: "type" });
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
