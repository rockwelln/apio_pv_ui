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

import Loading from "../../../common/Loading";
import Trunk from "./Trunk";

import { fetchGetEnterpriseTrunksByTenant } from "../../../store/actions";
import { countsPerPages } from "../../../constants";

export class RoutingNumbers extends Component {
  state = {
    searchValue: "",
    isLoading: true,
    sortedBy: "",
    entTrunks: [],
    paginationTrunks: [],
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null
  };

  componentDidMount() {
    this.props
      .fetchGetEnterpriseTrunksByTenant(this.props.match.params.tenantId)
      .then(() =>
        this.setState(
          {
            entTrunks: this.props.enterpriseTrunks.sort((a, b) => {
              if (a.entTrunk < b.entTrunk) return -1;
              if (a.entTrunk > b.entTrunk) return 1;
              return 0;
            }),
            isLoading: false,
            sortedBy: "entTrunk"
          },
          () => this.pagination()
        )
      );
  }
  render() {
    const {
      isLoading,
      countPerPage,
      pagination,
      paginationTrunks,
      page
    } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-2"}>
          <Col mdOffset={1} md={11}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="Group ID or Name"
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
        </Row>
        <Row>
          <Col md={12}>
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
              <Col md={12}>
                <Table hover>
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage
                          id="ETid"
                          defaultMessage="Enterprise trunk"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByEntTrunk}
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="siteId"
                          defaultMessage="Site ID"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortBySiteID}
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="siteName"
                          defaultMessage="Site name"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortBySiteName}
                        />
                      </th>
                      <th>
                        <FormattedMessage id="iad" defaultMessage="IAD" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByIAD}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginationTrunks[page].map((trunk, i) => (
                      <Trunk
                        key={i + ""}
                        trunk={trunk}
                        //onReload={() => this.fetchReq()}
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
    const { countPerPage, entTrunks } = this.state;
    const countPages = Math.ceil(entTrunks.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = entTrunks.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = entTrunks.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationTrunks: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };

  sortByEntTrunk = () => {
    const { entTrunks, sortedBy } = this.state;
    if (sortedBy === "entTrunk") {
      const trunksSorted = entTrunks.reverse();
      this.setState({ entTrunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = entTrunks.sort((a, b) => {
        if (a.entTrunk < b.entTrunk) return -1;
        if (a.entTrunk > b.entTrunk) return 1;
        return 0;
      });
      this.setState({ entTrunks: trunksSorted, sortedBy: "entTrunk" }, () =>
        this.pagination()
      );
    }
  };
  sortBySiteID = () => {
    const { entTrunks, sortedBy } = this.state;
    if (sortedBy === "groupId") {
      const trunksSorted = entTrunks.reverse();
      this.setState({ entTrunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = entTrunks.sort((a, b) => {
        if (a.groupId < b.groupId) return -1;
        if (a.groupId > b.groupId) return 1;
        return 0;
      });
      this.setState({ entTrunks: trunksSorted, sortedBy: "groupId" }, () =>
        this.pagination()
      );
    }
  };

  sortBySiteName = () => {
    const { entTrunks, sortedBy } = this.state;
    if (sortedBy === "groupName") {
      const trunksSorted = entTrunks.reverse();
      this.setState({ entTrunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = entTrunks.sort((a, b) => {
        if (a.groupName < b.groupName) return -1;
        if (a.groupName > b.groupName) return 1;
        return 0;
      });
      this.setState({ entTrunks: trunksSorted, sortedBy: "groupName" }, () =>
        this.pagination()
      );
    }
  };

  sortByIAD = () => {
    const { entTrunks, sortedBy } = this.state;
    if (sortedBy === "iad") {
      const trunksSorted = entTrunks.reverse();
      this.setState({ entTrunks: trunksSorted }, () => this.pagination());
    } else {
      const trunksSorted = entTrunks.sort((a, b) => {
        if (a.iad < b.iad) return -1;
        if (a.iad > b.iad) return 1;
        return 0;
      });
      this.setState({ entTrunks: trunksSorted, sortedBy: "iad" }, () =>
        this.pagination()
      );
    }
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.enterpriseTrunks
      .filter(
        trunk =>
          trunk.entTrunk.toLowerCase().includes(searchValue.toLowerCase()) ||
          trunk.groupId.toLowerCase().includes(searchValue.toLowerCase()) ||
          trunk.groupName.toLowerCase().includes(searchValue.toLowerCase()) ||
          trunk.iad.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(trunk => trunk);
    this.setState({ entTrunks: SearchArray }, () => this.pagination());
  };
}

const mapStateToProps = state => ({
  enterpriseTrunks: state.tenantEnterpriseTrunks
});

const mapDispatchToProps = { fetchGetEnterpriseTrunksByTenant };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RoutingNumbers)
);
