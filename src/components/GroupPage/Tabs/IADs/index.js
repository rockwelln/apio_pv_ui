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
import Alert from "react-bootstrap/lib/Alert";

import { FormattedMessage } from "react-intl";

import Loading from "../../../../common/Loading";
import IAD from "./IAD";

import { fetchGetIADs, fetchGetConfig } from "../../../../store/actions";
import { countsPerPages } from "../../../../constants";

export class IADs extends Component {
  state = {
    paginationIads: [],
    isLoading: true,
    sortedBy: "",
    countPerPage: 25,
    page: 0,
    pagination: true,
    countPages: null,
    searchValue: ""
  };

  fetchIADs = () => {
    this.props.fetchGetConfig().then(() =>
      this.props
        .fetchGetIADs(
          this.props.match.params.tenantId,
          this.props.match.params.groupId
        )
        .then(() =>
          this.setState(
            {
              isLoading: false,
              iads: this.props.iads.iads.sort((a, b) => {
                if (a.iadId < b.iadId) return -1;
                if (a.iadId > b.iadId) return 1;
                return 0;
              }),
              sortedBy: "iadId"
            },
            () => this.pagination()
          )
        )
    );
  };

  componentDidMount() {
    this.fetchIADs();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.iads.iads.length !== this.props.iads.iads.length) {
      this.fetchIADs();
    }
  }

  render() {
    const { isLoading, countPerPage, paginationIads, page } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Row className={"margin-top-1"}>
          <Col mdOffset={1} md={10}>
            {this.props.iads.iads.length < this.props.iads.nbrIadsNeeded ? (
              <Alert bsStyle="danger">
                <FormattedMessage
                  id="moreIads"
                  defaultMessage={`You still need to create ${this.props.iads
                    .nbrIadsNeeded - this.props.iads.iads.length} IADs`}
                />
              </Alert>
            ) : (
              <FormattedMessage
                id="lessIads"
                defaultMessage={`This site as the expected amount of IADs. You cannot create additional IADs`}
              />
            )}
          </Col>
        </Row>
        <Row className={"margin-top-1"}>
          <Col mdOffset={1} md={10}>
            <InputGroup className={"margin-left-negative-4"}>
              <InputGroup.Addon>
                <Glyphicon glyph="lyphicon glyphicon-search" />
              </InputGroup.Addon>
              <FormattedMessage
                id="search_placeholder"
                defaultMessage="IAD ID or IAD Type or MAC Address"
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
          {this.props.iads.iads.length < this.props.iads.nbrIadsNeeded && (
            <Col md={1}>
              <Link
                to={`/provisioning/${this.props.match.params.gwName}/tenants/${this.props.match.params.tenantId}/groups/${this.props.match.params.groupId}/addiad`}
              >
                <Glyphicon
                  className={"x-large"}
                  glyph="glyphicon glyphicon-plus-sign"
                />
              </Link>
            </Col>
          )}
        </Row>
        <Row>
          <Col md={11}>
            <div className="flex flex-row flex-end-center indent-top-bottom-1">
              <div>
                <FormattedMessage
                  id="itemPerPage"
                  defaultMessage="Item per page"
                />
              </div>
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
        {paginationIads.length ? (
          <React.Fragment>
            <Row>
              <Col mdOffset={1} md={10}>
                <Table hover>
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage id="iadId" defaultMessage="IAD ID" />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByIadsId}
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="iadType"
                          defaultMessage="IAD Type"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByIadType}
                        />
                      </th>
                      <th>
                        <FormattedMessage
                          id="macAddress"
                          defaultMessage="Mac Address"
                        />
                        <Glyphicon
                          glyph="glyphicon glyphicon-sort"
                          onClick={this.sortByMacAddress}
                        />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {paginationIads[page].map(
                      iad =>
                        this.props.config.tenant && (
                          <IAD
                            key={iad.iadId}
                            iad={iad}
                            onReload={() => this.fetchIADs()}
                          />
                        )
                    )}
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
              id="notFoundIads"
              defaultMessage="No IADs were found"
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
    const { countPerPage, iads } = this.state;
    const countPages = Math.ceil(iads.length / countPerPage);

    let paginationItems = [];
    let counter = 0;

    for (let i = 0; i < countPages; i++) {
      if (i === 0) {
        const item = iads.slice(0, countPerPage);
        paginationItems.push(item);
      } else {
        const item = iads.slice(counter, counter + countPerPage);
        paginationItems.push(item);
      }
      counter = counter + countPerPage;
    }

    this.setState({
      paginationIads: paginationItems,
      pagination: false,
      countPages,
      page: this.state.page
    });
  };

  filterBySearchValue = () => {
    const { searchValue } = this.state;
    const SearchArray = this.props.iads.iads
      .filter(
        iad =>
          iad.iadId.toLowerCase().includes(searchValue.toLowerCase()) ||
          iad.type.toLowerCase().includes(searchValue.toLowerCase()) ||
          iad.macAddress.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(iad => iad);
    this.setState({ iads: SearchArray }, () => this.pagination());
  };

  sortByIadsId = () => {
    const { iads, sortedBy } = this.state;
    if (sortedBy === "iadId") {
      const iadsSorted = iads.reverse();
      this.setState({ iads: iadsSorted }, () => this.pagination());
    } else {
      const iadsSorted = iads.sort((a, b) => {
        if (a.iadId < b.iadId) return -1;
        if (a.iadId > b.iadId) return 1;
        return 0;
      });
      this.setState({ iads: iadsSorted, sortedBy: "iadId" }, () =>
        this.pagination()
      );
    }
  };

  sortByIadType = () => {
    const { iads, sortedBy } = this.state;
    if (sortedBy === "iadType") {
      const iadsSorted = iads.reverse();
      this.setState({ iads: iadsSorted }, () => this.pagination());
    } else {
      const iadsSorted = iads.sort((a, b) => {
        if (a.iadType < b.iadType) return -1;
        if (a.iadType > b.iadType) return 1;
        return 0;
      });
      this.setState({ iads: iadsSorted, sortedBy: "iadType" }, () =>
        this.pagination()
      );
    }
  };

  sortByMacAddress = () => {
    const { iads, sortedBy } = this.state;
    if (sortedBy === "macAddress") {
      const iadsSorted = iads.reverse();
      this.setState({ iads: iadsSorted }, () => this.pagination());
    } else {
      const iadsSorted = iads.sort((a, b) => {
        if (a.macAddress < b.macAddress) return -1;
        if (a.macAddress > b.macAddress) return 1;
        return 0;
      });
      this.setState({ iads: iadsSorted, sortedBy: "macAddress" }, () =>
        this.pagination()
      );
    }
  };
}

const mapStateToProps = state => ({
  config: state.config,
  admins: state.adminsGroup,
  iads: state.iads
});

const mapDispatchToProps = {
  fetchGetIADs,
  fetchGetConfig
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IADs)
);
