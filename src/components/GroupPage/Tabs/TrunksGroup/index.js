import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import Table from "react-bootstrap/lib/Table";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import FormControl from "react-bootstrap/lib/FormControl";
import InputGroup from "react-bootstrap/lib/InputGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Pagination from "react-bootstrap/lib/Pagination";

import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";

import { fetchGetTrunksGroupsByGroup } from "../../../../store/actions";
import { countsPerPages } from "../../../../constants";

import TrunkGrup from "./TrunkGrup";

export class Trunks extends Component {
  state = {
    trunks: [],
    paginationTrunks: [],
    isLoading: true,
    sortedBy: "",
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null,
    searchValue: ""
  };
  fetchTrunks = () => {
    this.props
      .fetchGetTrunksGroupsByGroup(
        this.props.match.params.tenantId,
        this.props.match.params.groupId
      )
      .then(() =>
        this.setState(
          {
            trunks: this.props.trunks.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            }),
            isLoading: false,
            sortedBy: "name"
          },
          () => this.pagination()
        )
      );
  };

  componentDidMount() {
    this.fetchTrunks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trunks.length !== this.props.trunks.length) {
      this.fetchTrunks();
    }
  }
  render() {
    const { isLoading, countPerPage, paginationTrunks, page } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage id="search_placeholder" defaultMessage="Name">
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
          <Col md={11}>
            <div className="flex flex-row flex-end-center indent-top-bottom-1">
              <div>Item per page</div>
              <FormControl
                componentClass="select"
                defaultValue={countPerPage}
                style={{ display: "inline", width: "auto" }}
                className={"margin-left-1"}
                onChange={this.changeCoutOnPage}
              >
                {countsPerPages.map(counts => (
                  <option key={counts.value} value={counts.value}>
                    {counts.title}
                  </option>
                ))}
              </FormControl>
            </div>
          </Col>
        </Row>
        {paginationTrunks.length ? (
          <React.Fragment>
            <Row>
              <Col mdOffset={1} md={10}>
                <Table hover>
                  <thead>
                    <tr>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage id="Name" defaultMessage="Name" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByName}
                        />
                      </th>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage
                          id="groupId"
                          defaultMessage="Group Id"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByGroupId}
                        />
                      </th>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage
                          id="deviceName"
                          defaultMessage="Device Name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByDeviceName}
                        />
                      </th>
                      <th style={{ width: "19%" }}>
                        <FormattedMessage
                          id="deviceLevel"
                          defaultMessage="Device level"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByDeviceLevel}
                        />
                      </th>
                      <th style={{ width: "20%" }}>
                        <FormattedMessage
                          id="department"
                          defaultMessage="Department"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByDepartment}
                        />
                      </th>
                      <th style={{ width: "4%" }} />
                    </tr>
                  </thead>
                  <tbody>
                    {paginationTrunks[page].map((trunkGrup, i) => (
                      <TrunkGrup
                        key={i}
                        trunkGrup={trunkGrup}
                        onReload={() => this.props.fetchTrunks()}
                      />
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col md={11}>
                <div className="flex flex-row flex-end-center">
                  <Pagination className={"indent-top-bottom-1"}>
                    <Pagination.Prev onClick={this.decrementPage} />
                    <Pagination.Item>{this.state.page + 1}</Pagination.Item>
                    <Pagination.Next onClick={this.incrementPage} />
                  </Pagination>
                </div>
              </Col>
            </Row>
          </React.Fragment>
        ) : (
          <Col mdOffset={1} md={10}>
            <FormattedMessage
              id="notFound"
              defaultMessage="No trunks were found"
            />
          </Col>
        )}
      </React.Fragment>
    );
  }

  changeCoutOnPage = e => {
    this.setState({ countPerPage: Number(e.target.value), page: 0 }, () =>
      this.pagination()
    );
  };

  incrementPage = () => {
    if (this.state.page >= this.state.countPages - 1) {
      return;
    }
    this.setState({ page: this.state.page + 1 });
  };

  decrementPage = () => {
    if (this.state.page === 0) {
      return;
    }
    this.setState({ page: this.state.page - 1 });
  };

  pagination = () => {
    const { countPerPage, trunks } = this.state;
    const countPages = Math.ceil(trunks.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = trunks.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = trunks.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationTrunks: paginationItems,
      pagination: false,
      countPages,
      page: 0
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.trunks
      .filter(trunk =>
        trunk.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(trunk => trunk);
    this.setState({ trunks: SearchArray }, () => this.pagination());
  };

  sortByName = () => {
    const { trunks, sortedBy } = this.state;
    if (sortedBy === "name") {
      const trunksSorted = trunks.reverse();
      this.setState({ trunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = trunks.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ trunks: trunksSorted, sortedBy: "name" }, () =>
        this.pagination()
      );
    }
  };

  sortByGroupId = () => {
    const { trunks, sortedBy } = this.state;
    if (sortedBy === "groupId") {
      const trunksSorted = trunks.reverse();
      this.setState({ trunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = trunks.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ trunks: trunksSorted, sortedBy: "groupId" }, () =>
        this.pagination()
      );
    }
  };

  sortByDeviceName = () => {
    const { trunks, sortedBy } = this.state;
    if (sortedBy === "deviceName") {
      const trunksSorted = trunks.reverse();
      this.setState({ trunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = trunks.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ trunks: trunksSorted, sortedBy: "deviceName" }, () =>
        this.pagination()
      );
    }
  };

  sortByDeviceLevel = () => {
    const { trunks, sortedBy } = this.state;
    if (sortedBy === "deviceLevel") {
      const trunksSorted = trunks.reverse();
      this.setState({ trunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = trunks.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ trunks: trunksSorted, sortedBy: "deviceLevel" }, () =>
        this.pagination()
      );
    }
  };

  sortByDepartment = () => {
    const { trunks, sortedBy } = this.state;
    if (sortedBy === "department") {
      const trunksSorted = trunks.reverse();
      this.setState({ trunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = trunks.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      this.setState({ trunks: trunksSorted, sortedBy: "department" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  trunks: state.trunksGroups
});

const mapDispatchToProps = {
  fetchGetTrunksGroupsByGroup
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trunks)
);
